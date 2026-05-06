import { useState } from "react";
import { useAuth } from "@clerk/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

function Uploader() {
  const { getToken } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  // Local state to temporarily hold document before upload
  const [selectedFile, setSelectedFile] = useState(null);

  // Tanstack Query Mutation for 3-step upload process
  const uploadMutation = useMutation({
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

    onSuccess: () => {
      // 1. Tell TanStack to mark the 'documents' cache as stale
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      // 2. Clear the input
      setSelectedFile(null);

      // 3. Redirect the user to the list page

      navigate("/documents");
    },
  });

  // Handle File selection
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  return (
    <div className=" max-w-125 my-10 mx-auto p-5 font-serif">
      <h2>Upload a Document</h2>
      <p className=" text-[#666] mb-5">
        Securely upload a fule to your organization's workspace.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3.75">
        <input
          type="file"
          onChange={handleFileChange}
          disabled={uploadMutation.isPending}
          accept=".pdf,.doc,.docx,.png,.jpg"
          className=" p-2.5 border border-dashed border-[#ccc] rounded-[5px]"
        />
        <button
          type="submit"
          disabled={!selectedFile || uploadMutation.isPending}
          className={`py-2.5 px-3.75 ${!selectedFile || uploadMutation.isPending ? " bg-[#ccc]" : "bg-[#007bff]"} text-white, border-none rounded-[5px] ${!selectedFile || uploadMutation.isPending ? "cursor-not-allowed" : "cursor-pointer"} `}
        >
          {uploadMutation.isPending
            ? "Uploading to secure vault..."
            : "Upload File"}
        </button>
      </form>

      {/* Error Message Display */}
      {uploadMutation.isError && (
        <div className="mt-5 p-2.5 bg-[#ffe6e6] text-[#d93025] rounded-[5px]">
          <p>
            <strong>Error:</strong> {uploadMutation.error.message}
          </p>
        </div>
      )}
    </div>
  );
}

export default Uploader;
