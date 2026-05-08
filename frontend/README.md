## 📝 Roadmap / TODO

- [x] Add Clerk
- [x] Setup Orgs / Multi-tenancy
- [x] Add Navbar
- [x] Add Upload Page
- [x] Add Upload functionality
- [x] Refactor Uploader with tanstackQuery hook
- [] Add Listing of Org docs
- [] Add Download functionality
- [] Add Delete functionality
- [x] Add Protected Routes Utility
- [] Store user isSignedIn in store for immediate rerouting
- [x] Add ScrollToTop Utility

## Frontend Setup Instructions

### Prerequisites
- Node.js (v18+)
- Clerk account (for authentication)

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your Clerk keys

# Start development server
npm run dev