import express, { Router } from "express";
import { deleteDocument, listDocuments, saveDocument } from "../controllers/DocumentController.js";

const router = new express.Router();


// Route: POST /api/documents
// Triggered ONLY after the frontend successfully uploads to S3
router.post("/", saveDocument);

// Route: GET /api/documents
router.get("/", listDocuments);

// Route: DELETE /api/documents
router.delete("/:id", deleteDocument);

export default router;
