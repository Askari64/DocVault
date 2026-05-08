// src/hooks/useDocumentUpload.js
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../services/documentService";

export function useDocumentUpload(options = {}) {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (file) => {
      // 1. Get Token
      const token = await getToken();

      // 2. Step 1: Get Ticket
      const { url, fields, s3Key } = await documentService.getUploadTicket(
        file.name,
        file.type,
        token,
      );

      // 3. Step 2: Upload to S3
      await documentService.uploadToS3(url, fields, file);

      // 4. Step 3: Save to Database
      const fileDetails = {
        name: file.name,
        size: file.size,
        mimeType: file.type,
      };

      const savedDoc = await documentService.saveDocumentRecord(
        fileDetails,
        s3Key,
        token,
      );

      return savedDoc;
    },

    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      if (options.onSuccess) options.onSuccess(data, variables, context);
    },

    onError: (error) => {
      if (options.onError) options.onError(error);
    },
  });
}
