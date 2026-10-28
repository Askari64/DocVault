# DocVault

> Documented at commit `203acd9` ("env update", 2026-06-12), the latest commit on `main` at the time of writing.

A multi-tenant document sharing system. Teams (Clerk Organizations) upload files to a private AWS S3 vault, and every member of the organization can list and download them. Uploads and downloads never pass through the server - the backend only issues short-lived presigned URLs and the browser talks to S3 directly.

- **Frontend:** React 19 + Vite, Tailwind 4 + shadcn/ui, TanStack Query, Clerk React. Deployed on Vercel (`doc-vault-dun.vercel.app`).
- **Backend:** Node + Express 5, Prisma 7 (PostgreSQL / Neon), Clerk Express, AWS SDK v3, Redis rate limiting.
- **Storage:** AWS S3 (presigned POST for upload, presigned GET for download).
- **Auth / tenancy:** Clerk. The Organization ID is the tenant ID - every document and S3 key is namespaced to it, and every request is authorized against the caller's active org.

Detailed docs: [ARCHITECTURE.md](ARCHITECTURE.md) (how the pieces fit together), [DATAFLOW.md](DATAFLOW.md) (what happens on upload, download and delete, step by step) and [CODE-WALKTHROUGH.md](CODE-WALKTHROUGH.md) (function-level execution trace: middleware order, every check, what each handler calls and returns).

## Repository layout

```
backend/    Express API - auth, presigned URLs, document records, rate limiting
frontend/   React SPA - landing page, document list, uploader
```

| Path | What it is |
| --- | --- |
| `backend/src/server.js` | Express entry point: CORS, Clerk middleware, routes, graceful shutdown |
| `backend/src/routes/` | Two routers: `/api/documents` (DB records) and `/api/S3FileAccess` (presigned URLs) |
| `backend/src/controllers/` | Request handlers for the two routers |
| `backend/src/middlewares/rateLimiter.js` | Four Redis-backed rate limiters (user + org, upload + download) |
| `backend/src/helpers/userKeyGenerartor.js` | Builds the per-user / per-org rate-limit keys (note: filename has a typo) |
| `backend/src/config/` | Prisma/pg pool, Redis client, S3 client |
| `backend/prisma/schema.prisma` | The one and only model: `Document` |
| `frontend/src/pages/` | `LandingPage`, `DocumentList`, `Uploader`, `NotFound` |
| `frontend/src/hooks/` | TanStack Query hooks: `useDocuments`, `useDocumentUpload`, `useDocumentDownload`, `useDocumentDelete` |
| `frontend/src/services/documentService.js` | All backend calls in one place |
| `frontend/src/utils/api.js` | fetch wrapper (base URL, bearer token, JSON + error handling) |
| `frontend/src/utils/ProtectedRoutes.jsx` | Route guard: redirects signed-out users to `/` |
| `todo.md` | Working roadmap with done / pending features |

## How it works in one paragraph

A user signs in with Clerk and picks an Organization. To upload, the browser asks the backend for an "upload ticket" (a presigned POST) scoped to `organizations/<orgId>/<uuid>-<filename>`, posts the file straight to S3, then tells the backend to save the metadata row. To download, the browser asks for a presigned GET URL, fetches the file from S3 as a blob and saves it locally. To delete, the frontend calls the backend twice: delete the S3 object, then delete the database row. Listing is a plain `SELECT ... WHERE orgId = <active org>`.

## Setup

### Prerequisites

- **Node.js 22.12 or later** (22 LTS recommended; any 22.x from 22.12 up works). The exact requirement from the installed packages' `engines` fields is `^20.19 || ^22.12 || >=24.0` (Prisma 7 and Vite 8) - so Node 18 and Node 21 do **not** work, and `@clerk/express`, `@clerk/react` and `redis` all demand Node 20+. The old "v18+" note in the folder READMEs is wrong for this dependency set.
- PostgreSQL (Neon works)
- Redis (local or hosted) - the backend will not boot without `REDIS_URL`
- A Clerk application with **Organizations enabled**
- An AWS account with an S3 bucket, plus an IAM user with put/get/delete on that bucket

### What is verified vs untested

Verified by actually running the steps below on Node v22.23.4 (commit `203acd9`):

- `npm install` in both `backend/` and `frontend/` succeeds; the backend `postinstall` hook runs `prisma generate` and the client lands in `backend/generated/prisma/`.
- `npm run build` and `npm run lint` in `frontend/` both pass (build prints only a chunk-size warning).

Not verified (needs real credentials/infra, so treat as code-inferred):

- Booting the backend (`npm run dev`). `server.js` connects to Postgres at startup and `config/redisClient.js` connects to Redis on import, so a boot needs a live `DATABASE_URL` and `REDIS_URL`.
- `npx prisma db push` against a live database, and every Clerk / AWS S3 flow.

### Backend

```bash
cd backend
npm install
cp .env.example .env   # fill in the values
npx prisma generate
npx prisma db push     # see warning below
npm run dev            # http://localhost:5000
```

> **Warning - `prisma db push` syncs the schema directly into whatever database `DATABASE_URL` points at, and can drop or alter real data.** Run it only against a disposable/local development database. Check which database `DATABASE_URL` names first, and never run it against production or your real Neon data without explicit approval and a backup.

### Frontend

```bash
cd frontend
npm install
cp .env.example .env   # VITE_CLERK_PUBLISHABLE_KEY and VITE_API_BASE_URL
npm run dev            # http://localhost:5173
```

### S3 bucket notes

- CORS on the bucket must allow the frontend origin for the browser's direct POST/GET to work. `todo.md` still has "Change bucket CORS policy later to live frontend url" open.
- The IAM user needs `s3:PutObject`, `s3:GetObject` and `s3:DeleteObject` on the bucket.

## Environment variables

Backend (`backend/.env`): `PORT`, `DATABASE_URL`, `CLERK_SECRET_KEY`, `CLERK_PUBLISHABLE_KEY`, `AWS_REGION`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`, `S3_BUCKET_NAME`, `REDIS_URL`.

Frontend (`frontend/.env`): `VITE_CLERK_PUBLISHABLE_KEY`, `VITE_API_BASE_URL` (e.g. `http://localhost:5000/api`).

## The Document model

```prisma
model Document {
  id         String   @id @default(uuid())
  name       String   // original file name
  s3Key      String   @unique // path inside the S3 bucket
  size       Int      // bytes
  mimeType   String
  orgId      String   // Clerk Organization ID = tenant ID
  uploaderId String   // Clerk User ID
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt

  @@index([orgId])    // tenant queries stay fast
}
```

## API summary

| Method + path | Purpose | Guards |
| --- | --- | --- |
| `POST /api/S3FileAccess/upload-url` | Presigned POST ticket (max 10 MB, 2 min expiry) | signed in + active org, user 20/hr and org 500/hr rate limits |
| `POST /api/S3FileAccess/download-url` | Presigned GET URL (2 min expiry) | signed in + active org, key prefix check, user 50/hr and org 250/hr rate limits |
| `POST /api/S3FileAccess/delete-file` | Delete the S3 object | signed in + active org, key prefix check, uploader or `org:admin` |
| `POST /api/documents` | Save the metadata row after a successful S3 upload | signed in + active org, key prefix check |
| `GET /api/documents` | List the active org's documents, newest first | signed in + active org |
| `DELETE /api/documents/:id` | Delete the metadata row | signed in + active org, record belongs to org, uploader or `org:admin` |

## Known gaps (from `todo.md` and the code)

- No pagination or search on the document list yet.
- No "my files" view, no file versioning.
- Delete is two separate calls (S3, then DB); if the second fails the row points at nothing. See ARCHITECTURE.md.
- Rate limits apply to the presign endpoints only, not to delete or list.
- Frontend also shows the delete button to `org:owner`, but the backend only accepts the uploader or `org:admin`.
