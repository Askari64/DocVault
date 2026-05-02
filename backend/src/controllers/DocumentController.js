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
