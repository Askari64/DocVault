import express from "express";
import { generateUploadUrl, generateDownloadUrl } from "../controllers/S3FileAccessController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.use(requireAuth());

// Route: POST /api/S3FileAccess/upload-url
router.post("/upload-url", generateUploadUrl);

// Route: POST /api/S3FileAccess/download-url
router.post("/download-url", generateDownloadUrl);

export default router;
