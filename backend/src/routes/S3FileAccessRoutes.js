import express from "express";
import { generateUploadUrl } from "../controllers/S3FileAccessController.js";
import { requireAuth } from "@clerk/express";

const router = express.Router();

router.use(requireAuth());

// Route: POST /api/S3FileAccess/upload-url
router.post("/upload-url", generateUploadUrl);

export default router;
