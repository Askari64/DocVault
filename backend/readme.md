## 📝 Roadmap / TODO

- [x] Add Clerk Middleware
- [x] Get Clerk API Key
- [] Protect routes using getAuth() https://clerk.com/docs/expressjs/getting-started/quickstart https://clerk.com/docs/reference/express/get-auth checkout clerk client for express reference - WIP
- [] Setup IAM user
- [] Setup AWS S3 presigned POST URL
- [] Setup AWS S3 presigned GET URL
- [] Setup AWS S3 presigned POST URL
- [] Add Version Control

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL (Neon)
- Clerk account (Organizations enabled)
- AWS account with S3 bucket

### Installation

# Clone repository
git clone <your-repo-url>
cd into backend folder

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your credentials

# Initialize database
npx prisma generate
npx prisma db push

# Start server
npm run dev