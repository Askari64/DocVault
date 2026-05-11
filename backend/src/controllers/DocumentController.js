import { prisma } from "../config/db.js";
import { getAuth } from "@clerk/express";

export const saveDocument = async (req, res) => {
  try {
    // Verify User and organization from clerk
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!auth.orgId) {
      return res.status(403).json({ error: "Organization Required" });
    }

    // Get file details
    const { name, s3Key, size, mimeType } = req.body;

    // Validate all required data
    if (!name || !s3Key || !size || !mimeType) {
      return res.status(400).json({ error: "Missing required document data." });
    }

    //Security Check: Validate user is uploading to correct organization path
    if (!s3Key.startsWith(`organizations/${auth.orgId}/`)) {
      return res
        .status(403)
        .json({ error: "File key does not match your active organization." });
    }

    // All checks passed: Save data to db
    const savedDocument = await prisma.document.create({
      data: {
        name: name,
        s3Key: s3Key,
        size: size,
        mimeType: mimeType,
        orgId: auth.orgId,
        uploaderId: auth.userId,
      },
    });

    return res.status(201).json({
      message: "Document saved successfully.",
      document: savedDocument,
    });
  } catch (error) {
    console.error("Error saving document to DB:", error);
    return res.status(500).json({ error: "Failed to save document record." });
  }
};

export const listDocuments = async (req, res) => {
  try {
    // Verify User and organization from clerk
    const auth = getAuth(req);

    if (!auth.userId) {
      return res.status(401).json({ error: "Unauthorised" });
    }

    if (!auth.orgId) {
      return res.status(403).json({ error: "Organization Required" });
    }

    const allDocuments = await prisma.document.findMany({
      where: { orgId: auth.orgId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return res.status(200).json({
      status: "success",
      data: allDocuments,
    });
  } catch (error) {
    console.error("Error fetching documents from DB:", error);
    return res.status(500).json({ error: "Failed to fetch documents form DB" });
  }
};

export const deleteDocument = async (req, res) => {
  try {
    const auth = getAuth(req);

    if (!auth.userId) return res.status(401).json({ error: "Unauthorized" });
    if (!auth.orgId) return res.status(403).json({ error: "Organization Required" });

    const documentId = req.params.id;

    // 1. Fetch the document to ensure it belongs to this organization
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      return res.status(404).json({ error: "Document not found." });
    }

    // Security Check: Prevent deleting another organization's records
    if (document.orgId !== auth.orgId) {
      return res.status(403).json({ error: "Access Denied." });
    }

    // 2. Delete the record from Neon Database
    await prisma.document.delete({
      where: { id: documentId },
    });

    return res.status(200).json({ message: "Database record deleted successfully." });
  } catch (error) {
    console.error("Error deleting document record:", error);
    return res.status(500).json({ error: "Failed to delete database record." });
  }
};