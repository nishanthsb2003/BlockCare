"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Eye, FileText, Loader2 } from "lucide-react";
import { useFileUpload } from "@/hooks/supabase";

interface Document {
  id: string;
  name: string;
  type: string;
  created_at: string;
  size: number;
  path: string;
  patient_id: string;
  metadata?: Record<string, any>;
}

interface DocumentListProps {
  documents: Document[];
  onView: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({ documents, onView }) => {
  const { getFileUrl } = useFileUpload();
  const [loadingDocId, setLoadingDocId] = useState<string | null>(null);

  // Format file size
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle download
  const handleDownload = async (doc: Document) => {
    try {
      setLoadingDocId(doc.id);
      // Get a signed URL from Supabase
      const url = await getFileUrl(doc.path);

      // Create a temporary link and trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = doc.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    } finally {
      setLoadingDocId(null);
    }
  };
  if (documents.length === 0) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No documents available for this patient
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-card-foreground">{doc.name}</h4>
              <p className="text-sm text-muted-foreground">
                {formatDate(doc.created_at)} • {formatFileSize(doc.size)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onView(doc)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDownload(doc)}
              className="hover:bg-primary/10 hover:text-primary"
              disabled={loadingDocId === doc.id}
            >
              {loadingDocId === doc.id ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
