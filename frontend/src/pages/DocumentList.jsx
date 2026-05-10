import { useAuth, useOrganization } from "@clerk/react";
import { useDocuments } from "../hooks/useDocuments";
import { Link } from "react-router";
import { 
  FileText, 
  Download, 
  Trash2, 
  Plus, 
  FolderOpen, 
  Loader2, 
  AlertCircle 
} from "lucide-react";

// Shadcn UI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function DocumentList() {
  const { orgId } = useAuth();
  const { organization } = useOrganization();
  
  const { data: documents, isLoading, isError, error } = useDocuments();

  // Helper function to make file sizes readable
  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // 1. Handle "No Organization Selected" state
  if (!orgId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <FolderOpen className="w-12 h-12 mb-4 text-gray-300" />
        <h2 className="text-lg font-medium">Please select an organization to view your documents.</h2>
      </div>
    );
  }

  // 2. Handle Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
        <Loader2 className="w-8 h-8 mb-4 animate-spin text-blue-500" />
        <p className="text-sm font-medium animate-pulse">Loading your secure workspace...</p>
      </div>
    );
  }

  // 3. Handle Error state
  if (isError) {
    return (
      <div className="max-w-3xl mx-auto mt-10 flex items-start p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
        <AlertCircle className="w-5 h-5 mr-3 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-semibold">Error loading documents</h3>
          <p className="text-sm mt-1 text-red-600">{error.message}</p>
        </div>
      </div>
    );
  }

  // 4. Handle Empty state (No documents yet)
  if (!documents || documents.length === 0) {
    return (
      <div className="max-w-4xl mx-auto mt-12 flex flex-col items-center justify-center p-12 bg-white border border-dashed border-gray-300 rounded-2xl shadow-sm">
        <div className="p-4 bg-gray-50 rounded-full mb-4">
          <FolderOpen className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">No documents found</h3>
        <p className="text-gray-500 mb-6 text-sm text-center max-w-sm">
          Your organization's workspace is currently empty. Upload a file to get started.
        </p>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
          <Link to="/upload">
            <Plus className="w-4 h-4 mr-2" />
            Upload your first file
          </Link>
        </Button>
      </div>
    );
  }

  // 5. Success State: Render the Shadcn Table
  return (
    <div className="max-w-6xl mx-auto mt-10 p-5 font-sans">
      
      {/* Header Section */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
            {organization?.name ? `${organization.name} Vault` : "Organization Documents"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Manage and securely download your team's files.
          </p>
        </div>
        <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm">
          <Link to="/upload">
            <Plus className="w-4 h-4 mr-2" />
            Upload File
          </Link>
        </Button>
      </div>

      {/* Shadcn Table Wrapper */}
      <div className="border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50/80">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-100 font-semibold text-gray-600">File Name</TableHead>
              <TableHead className="font-semibold text-gray-600">Size</TableHead>
              <TableHead className="font-semibold text-gray-600">Type</TableHead>
              <TableHead className="font-semibold text-gray-600">Uploaded</TableHead>
              <TableHead className="text-right font-semibold text-gray-600">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-gray-50/50 transition-colors">
                
                {/* Name Column with Icon */}
                <TableCell className="font-medium text-gray-900">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                      <FileText className="w-4 h-4" />
                    </div>
                    <span className="truncate max-w-75" title={doc.name}>
                      {doc.name}
                    </span>
                  </div>
                </TableCell>
                
                {/* Size Column */}
                <TableCell className="text-gray-500 text-sm">
                  {formatBytes(doc.size)}
                </TableCell>
                
                {/* Type Column (Stylized Badge) */}
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-600 border border-gray-200 uppercase tracking-wider">
                    {doc.mimeType.split('/')[1] || 'FILE'}
                  </span>
                </TableCell>
                
                {/* Date Column */}
                <TableCell className="text-gray-500 text-sm">
                  {formatDate(doc.createdAt)}
                </TableCell>
                
                {/* Actions Column (Icon Buttons) */}
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}