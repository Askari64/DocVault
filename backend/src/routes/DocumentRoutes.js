import express, { Router } from "express";
import { requireAuth } from "@clerk/express";
import { saveDocument } from "../controllers/DocumentController.js";

const router = new express.Router();

router.use(requireAuth());

// Route: POST /api/documents
// Triggered ONLY after the frontend successfully uploads to S3
router.post("/", saveDocument);

export default router;
