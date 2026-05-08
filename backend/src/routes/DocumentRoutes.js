import express, { Router } from "express";
import { saveDocument } from "../controllers/DocumentController.js";

const router = new express.Router();


// Route: POST /api/documents
// Triggered ONLY after the frontend successfully uploads to S3
router.post("/", saveDocument);

export default router;
