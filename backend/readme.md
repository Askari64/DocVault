## 📝 Roadmap / TODO

- [x] Add Clerk Middleware
- [x] Get Clerk API Key
- [x] Protect routes using getAuth()
- [x] Setup S3 bucket and policy
- [x] Setup IAM user
- [x] Setup AWS S3 presigned POST URL 
- [] Implement Document saving in DB after upload
- [] Setup AWS S3 presigned GET URL
- [] Add object delete policy to IAM user
- [] Build Delete object functionality
- [] Add Version Control
- [] Change bucket CORS policy later to live frontend url

## References

- https://clerk.com/docs/expressjs/getting-started/quickstart 
- https://clerk.com/docs/reference/express/get-auth
- https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-presigned-url.html 
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner/ 
- https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-presigned-post/

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