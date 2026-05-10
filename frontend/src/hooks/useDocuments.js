import { useAuth } from "@clerk/react";
import { useQuery } from "@tanstack/react-query";
import { documentService } from "../services/documentService";

export function useDocuments() {
  const { getToken, orgId, isLoaded } = useAuth();

  return useQuery({
    // By including orgId, the cache automatically resets if the user switches organizations!
    queryKey: ["documents", orgId],

    queryFn: async () => {
      const token = await getToken();
      const response = await documentService.getDocuments(token);

      return response.data;
    },

    // Don't run the query until Clerk has finished loading the user's auth state
    enabled: isLoaded && !!orgId,

    // Refresh: How long the data is considered "fresh" before refetching in the background (e.g., 10 minutes)
    staleTime: 1000 * 60 * 10,
  });
}
