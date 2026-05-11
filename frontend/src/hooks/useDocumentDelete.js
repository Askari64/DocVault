import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { documentService } from "../services/documentService";
import { toast } from "sonner";

export function useDocumentDelete() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    // We pass both the ID and the s3Key from the UI
    mutationFn: async ({ id, s3Key }) => {
      const token = await getToken();

      // Step 1: Tell the S3 Controller to delete the physical file
      await documentService.deleteFromS3(s3Key, token);

      // Step 2: Tell the DB Controller to delete the record
      await documentService.deleteFromDatabase(id, token);

      return id; 
    },
    
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      toast.success("File Deleted", {
        description: "The document has been securely removed from your workspace.",
      });
    },
    
    onError: (error) => {
      toast.error("Deletion Failed", {
        description: error.message,
      });
    },
  });
}