import {S3Client} from "@aws-sdk/client-s3"

// Initialize the AWS S3 Client
const s3ClientInstance = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export default s3ClientInstance;