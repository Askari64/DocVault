import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDocumentUpload(options = {}) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      const token = await getToken();

      // =========================================================
      // STEP 1: Get the Ticket and the s3Key from Node.js
      // =========================================================

      const ticketResponse = await fetch(
        "http://localhost:5000/api/S3FileAccess/upload-url",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
          }),
        },
      );

      if (!ticketResponse.ok) {
        const errorData = await ticketResponse.json();
        throw new Error(
          errorData.error || "Failed to get secure upload ticket.",
        );
      }
      const { url, fields, s3Key } = await ticketResponse.json();

      // =========================================================
      // STEP 2: Upload directly to AWS S3
      // =========================================================

      const formData = new FormData();
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append("file", file);

      const awsResponse = await fetch(url, {
        method: "POST",
        body: formData,
      });

      if (!awsResponse.ok) {
        // S3 usually returns XML errors, but we can at least signal where it failed
        throw new Error(`AWS S3 rejected the file (${awsResponse.statusText})`);
      }

      // =========================================================
      // STEP 3: Save record to Neon Database
      // =========================================================

      const dbResponse = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: file.name,
          size: file.size,
          mimeType: file.type,
          s3Key,
        }),
      });

      if (!dbResponse.ok) {
        const errorData = await dbResponse.json();
        throw new Error(
          errorData.error || "Failed to save document to database.",
        );
      }
      return dbResponse.json();
    },

    // =========================================================
    // ON SUCCESS: What happens when it finishes?
    // =========================================================

    onSuccess: (data, variables, context) => {
      // 1. Tell TanStack to mark the 'documents' cache as stale
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      // 2. UI Logic: If the component passed an onSuccess function, run it!
      if (options.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    // Optional: Pass errors back to the component if needed
    onError: (error) => {
      if (options.onError) {
        options.onError(error);
      }
    },
  });
}
