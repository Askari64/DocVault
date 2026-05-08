import { useState } from "react";
import { useNavigate } from "react-router";
import { useDocumentUpload } from "../hooks/useDocumentUpload";

function Uploader() {
  const navigate = useNavigate();

  // Local state to temporarily hold document before upload
  const [selectedFile, setSelectedFile] = useState(null);

  const uploadMutation = useDocumentUpload({
    onSuccess: (response) => {
      alert(`Success! File ID ${response.document.id} named ${response.document.name} is safe.`);
      setSelectedFile(null);
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
