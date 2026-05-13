# 📝 Roadmap / TODO

## Frontend

- [x] Add Clerk
- [x] Setup Orgs / Multi-tenancy
- [x] Add Navbar
- [x] Add Upload Page
- [x] Add Upload functionality
- [x] Refactor Uploader with tanstackQuery hook
- [x] Add Listing of Org docs
- [x] Add Download functionality
- [x] Add Delete functionality
- [x] Add Protected Routes Utility
- [x] Add ScrollToTop Utility
- [] Store user isSignedIn in store for immediate rerouting
- [x] Add RBAC for deletion - Only Admin and Uploader can see delete button. 
- [] Add my files page - user may see their own files.
- [] Add Pagination when listing
- [] Add Search Docs functionality on listing
- [] Add Landing Page

## Backend

- [x] Add Clerk Middleware
- [x] Get Clerk API Key
- [x] Protect routes using getAuth()
- [x] Setup S3 bucket and policy
- [x] Setup IAM user
- [x] Setup AWS S3 presigned POST URL 
- [x] Implement Document saving in DB after upload
- [x] Setup AWS S3 presigned GET URL
- [x] List files from DB
- [x] Add object delete policy to IAM user
- [x] Build Delete object functionality
- [x] Authorization Check: Only Admin and Uploader can delete. 
- [] Add Version Control
- [] Change bucket CORS policy later to live frontend url