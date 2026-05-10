import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useDocumentUpload } from "../hooks/useDocumentUpload";
import {
  UploadCloud,
  File as FileIcon,
  Loader2,
  X,
} from "lucide-react";
import { toast } from "sonner";

export default function Uploader() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  // We use a ref so we can clear the hidden input if the user removes the file
  const fileInputRef = useRef(null);

  const uploadMutation = useDocumentUpload({
    onSuccess: (res) => {
      toast.success("Upload Complete", {
        description: `${res.document.name} has been securely saved.`,
      });
      setSelectedFile(null);
      navigate("/documents");
    },
    onError: (error) => {
      toast.error("Upload Failed", {
        description: error.message,
      });
    },
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the actual input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  return (
    // Outer wrapper centers the card on the screen with a subtle background
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 bg-gray-50/50 font-sans">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            Upload Document
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Securely add a file to your organization's workspace.
          </p>
        </div>

        {/* Body Section */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            {/* The "Dropzone" Area */}
            {!selectedFile ? (
              <label
                htmlFor="file-upload"
                className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-gray-100 hover:border-blue-400 transition-colors cursor-pointer group"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <div className="p-3 bg-white rounded-full shadow-sm mb-3 group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-6 h-6 text-blue-500" />
                  </div>
                  <p className="mb-1 text-sm text-gray-700 font-medium">
                    <span className="text-blue-600 font-semibold">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, PNG, or JPG (MAX. 10MB)
                  </p>
                </div>

                {/* The actual input is hidden! */}
                <input
                  id="file-upload"
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  disabled={uploadMutation.isPending}
                  accept=".pdf,.doc,.docx,.png,.jpg"
                  className="hidden"
                />
              </label>
            ) : (
              /* Selected File State */
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-center space-x-3 overflow-hidden">
                  <div className="p-2 bg-blue-100 rounded-lg shrink-0">
                    <FileIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>

                {/* Remove File Button */}
                {!uploadMutation.isPending && (
                  <button
                    type="button"
                    onClick={removeFile}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedFile || uploadMutation.isPending}
              className={`
                w-full flex items-center justify-center py-2.5 px-4 rounded-lg text-sm font-medium transition-all
                ${
                  !selectedFile || uploadMutation.isPending
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow"
                }
              `}
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading to secure vault...
                </>
              ) : (
                "Upload File"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
