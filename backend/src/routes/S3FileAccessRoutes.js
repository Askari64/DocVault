import express from "express";
import { generateUploadUrl, generateDownloadUrl, deleteS3File } from "../controllers/S3FileAccessController.js";

const router = express.Router();


// Route: POST /api/S3FileAccess/upload-url
router.post("/upload-url", generateUploadUrl);

// Route: POST /api/S3FileAccess/download-url
router.post("/download-url", generateDownloadUrl);

// Route: POST /api/S3FileAccess/delete-file
router.post("/delete-file", deleteS3File);

export default router;
