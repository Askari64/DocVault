import { useAuth } from "@clerk/react";
import { useMutation } from "@tanstack/react-query";
import { documentService } from "../services/documentService";
import { toast } from "sonner";

export function useDocumentDownload() {
  const { getToken } = useAuth();

  return useMutation({
    mutationFn: async ({ s3Key, fileName }) => {
      const token = await getToken();

      // 1. Get the AWS URL from our backend
      const response = await documentService.downloadDocument(s3Key, token);

      // 2. ACTUALLY FETCH THE FILE FROM AWS FIRST
      const awsResponse = await fetch(response.downloadUrl);

      // 3. Catch the AWS XML errors
      if (!awsResponse.ok) {
        const errorText = await awsResponse.text();
        console.error("AWS Error Details:", errorText);
        throw new Error("AWS denied the download. Check your server logs/CORS.");
      }

      // 4. Turn the real file into a secure Blob
      const blob = await awsResponse.blob();

      // 5. Create a temporary local URL for the Blob
      const localUrl = window.URL.createObjectURL(blob);

      // 6. Force the download using the safe local URL
      const link = document.createElement("a");
      link.href = localUrl;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();

      // 7. Clean up memory
      link.remove();
      window.URL.revokeObjectURL(localUrl);

      return fileName;
    },
    
    onSuccess: (fileName) => {
      toast.success("Download Complete", {
        description: `Successfully downloaded ${fileName}.`,
      });
    },
    
    onError: (error) => {
      toast.error("Download Failed", {
        description: error.message,
      });
    },
  });
}