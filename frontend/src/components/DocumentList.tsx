"use client";

import { Button } from "@/components/ui/button";
import { Download, Eye, FileText } from "lucide-react";

interface Document {
  id: number;
  name: string;
  type: string;
  date: string;
  size: string;
}

interface DocumentListProps {
  documents: Document[];
  onView: (document: Document) => void;
  onDownload: (document: Document) => void;
}

const DocumentList: React.FC<DocumentListProps> = ({
  documents,
  onView,
  onDownload,
}) => {
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
                {doc.date} • {doc.size}
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
              onClick={() => onDownload(doc)}
              className="hover:bg-primary/10 hover:text-primary"
            >
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;
