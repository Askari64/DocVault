import s3ClientInstance from "../config/S3ClientInstance.js";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";
import { getAuth } from "@clerk/express";
import { error } from "node:console";

export const generateUploadUrl = async (req, res) => {
  try {
    // Verify User and organization from clerk
    const auth = getAuth(req);

    if (!auth.userId) {
      return res
        .status(401)
        .json({ error: "You must be logged in to upload files." });
    }

    if (!auth.orgId) {
      return res
        .status(403)
        .json({ error: "You must select an Organization first." });
    }

    //  Get File Details
    const { filename, contentType } = req.body;

    if (!filename || !contentType) {
      return res
        .status(400)
        .json({ error: "file name and contentType are required" });
    }

    // 3. Create the secure, tenant-isolated S3 Key
    // e.g., organizations/org_123abc/9b1deb4d-report.pdf
    const s3Key = `organizations/${auth.orgId}/${uuidv4()}-${filename}`;

    // 4. Ask AWS for the temporary upload ticket
    const { url, fields } = await createPresignedPost(s3ClientInstance, {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
      Conditions: [
        ["content-length-range", 0, 10485760], // Max 10MB per file
        ["starts-with", "$Content-Type", contentType], // Strict file type matching
      ],
      Fields: {
        "Content-Type": contentType,
      },
      Expires: 120, // Ticket expires in 2 minutes
    });

    // 5. Send the ticket back to the React frontend
    return res.status(200).json({ url, fields, s3Key });
  } catch (error) {
    console.error("Error generating S3 Upload URL:", error);
    return res
      .status(500)
      .json({ error: "Failed to generate secure upload URL." });
  }
};

export const generateDownloadUrl = async (req, res) => {
  try {
    // Verify user and organization
    const auth = getAuth(req);

    if (!auth.userId) {
      return res
        .status(401)
        .json({ error: "You must be logged in to upload files." });
    }

    if (!auth.orgId) {
      return res
        .status(403)
        .json({ error: "You must select an Organization first." });
    }

    // Get file path user want to download
    const { s3Key } = req.body;
    if (!s3Key) {
      return res
        .status(400)
        .json({ error: "s3Key is required to locate the document." });
    }

    // Security Check: verify user is downloading from correct organization

    if (!s3Key.startsWith(`organizations/${auth.orgId}/`)) {
      return res
        .status(403)
        .json({
          error:
            "Access Denied: You cannot access files outside your workspace.",
        });
    }

    // Create a command asking AWS for a file
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: s3Key,
    });

    // Generate a temporary signed Url for download (valid for 2 minutes)
    const downloadUrl = await getSignedUrl(s3ClientInstance, command, {
      expiresIn: 120,
    });

    // Send download url to client
    return res.status(200).json({ downloadUrl: downloadUrl });
  } catch (error) {
    console.log(`Error generating download URL: ${error}`);
    return res
      .status(500)
      .json({ error: "Failed to generate secure download URL." });
  }
};
