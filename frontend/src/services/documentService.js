import { api } from "../utils/api";

export const documentService = {
  // =========================================================
  // STEP 1: Get Upload Ticket (Uses API Wrapper)
  // =========================================================
  getUploadTicket: async (filename, contentType, token) => {
    return await api("/S3FileAccess/upload-url", {
      method: "POST",
      token: token,
      body: JSON.stringify({ filename, contentType }),
    });
  },

  // =========================================================
  // STEP 2: Upload to S3 (Bypasses Wrapper due to FormData/AWS)
  // =========================================================
  uploadToS3: async (url, fields, file) => {
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
      formData.append(key, value),
    );
    formData.append("file", file);

    const response = await fetch(url, { method: "POST", body: formData });

    if (!response.ok) {
      throw new Error(`AWS S3 rejected the file (${response.statusText})`);
    }
    return response;
  },

  // =========================================================
  // STEP 3: Save to Database (Uses API Wrapper)
  // =========================================================
  saveDocumentRecord: async (fileDetails, s3Key, token) => {
    return await api("/documents", {
      method: "POST",
      token: token,
      body: JSON.stringify({ ...fileDetails, s3Key }),
    });
  },

  // =========================================================
  //  Get All Documents (Uses API Wrapper)
  // =========================================================
  getDocuments: async (token) => {
    return await api("/documents", {
      method: "GET",
      token: token,
    });
  },

  // =========================================================
  // Download Selected Document (Uses API Wrapper)
  // =========================================================
  downloadDocument: async (s3Key, token) => {
    return await api("/S3FileAccess/download-url", {
      method: "POST", // POST is correct because we are sending a body
      token: token,
      body: JSON.stringify({ s3Key }),
    });
  },

  // =========================================================
  // Delete from AWS S3
  // =========================================================
  deleteFromS3: async (s3Key, token) => {
    return await api("/S3FileAccess/delete-file", {
      method: "POST",
      token: token,
      body: JSON.stringify({ s3Key }),
    });
  },

  // =========================================================
  // Delete from Database
  // =========================================================
  deleteFromDatabase: async (id, token) => {
    return await api(`/documents/${id}`, {
      method: "DELETE",
      token: token,
    });
  },
};
