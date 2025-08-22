"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Plus } from "lucide-react";
import Modal from "@/components/Modal";
import PatientModalHeader from "@/components/PatientModalHeader";
import PatientDetails from "@/components/PatientDetails";
import DocumentList from "@/components/DocumentList";
import UploadComponent from "@/components/Upload";

// Mock documents data for each patient
const patientDocuments = {
  1: [
    {
      id: 1,
      name: "ECG Report - Jan 2024",
      type: "pdf",
      date: "2024-01-15",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "Blood Pressure Log",
      type: "pdf",
      date: "2024-01-10",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "Medication List",
      type: "pdf",
      date: "2024-01-05",
      size: "0.9 MB",
    },
    {
      id: 4,
      name: "Lab Results - December",
      type: "pdf",
      date: "2023-12-28",
      size: "1.2 MB",
    },
  ],
  2: [
    {
      id: 1,
      name: "Holter Monitor Report",
      type: "pdf",
      date: "2024-01-12",
      size: "3.1 MB",
    },
    {
      id: 2,
      name: "Arrhythmia Analysis",
      type: "pdf",
      date: "2024-01-08",
      size: "2.7 MB",
    },
    {
      id: 3,
      name: "Cardiac MRI Results",
      type: "pdf",
      date: "2023-12-20",
      size: "4.5 MB",
    },
  ],
  3: [
    {
      id: 1,
      name: "Angiogram Report",
      type: "pdf",
      date: "2024-01-10",
      size: "5.2 MB",
    },
    {
      id: 2,
      name: "Stress Test Results",
      type: "pdf",
      date: "2024-01-05",
      size: "2.9 MB",
    },
    {
      id: 3,
      name: "Cholesterol Panel",
      type: "pdf",
      date: "2023-12-30",
      size: "1.1 MB",
    },
    {
      id: 4,
      name: "Treatment Plan",
      type: "pdf",
      date: "2023-12-25",
      size: "0.8 MB",
    },
  ],
  4: [
    {
      id: 1,
      name: "Chest X-Ray Report",
      type: "pdf",
      date: "2024-01-08",
      size: "3.3 MB",
    },
    {
      id: 2,
      name: "Initial Consultation",
      type: "pdf",
      date: "2024-01-01",
      size: "1.5 MB",
    },
  ],
  5: [
    {
      id: 1,
      name: "Echocardiogram Report",
      type: "pdf",
      date: "2024-01-05",
      size: "4.1 MB",
    },
    {
      id: 2,
      name: "Heart Failure Assessment",
      type: "pdf",
      date: "2023-12-28",
      size: "2.8 MB",
    },
    {
      id: 3,
      name: "Medication Dosage Chart",
      type: "pdf",
      date: "2023-12-20",
      size: "0.7 MB",
    },
    {
      id: 4,
      name: "Diet and Exercise Plan",
      type: "pdf",
      date: "2023-12-15",
      size: "1.3 MB",
    },
    {
      id: 5,
      name: "Emergency Action Plan",
      type: "pdf",
      date: "2023-12-10",
      size: "1.0 MB",
    },
  ],
  6: [
    {
      id: 1,
      name: "Valve Function Test",
      type: "pdf",
      date: "2024-01-03",
      size: "3.7 MB",
    },
    {
      id: 2,
      name: "Pre-Surgery Assessment",
      type: "pdf",
      date: "2023-12-22",
      size: "2.6 MB",
    },
    {
      id: 3,
      name: "Surgical Consultation",
      type: "pdf",
      date: "2023-12-18",
      size: "1.9 MB",
    },
  ],
};

interface PatientDocumentModalProps {
  patient: any;
  isOpen: boolean;
  onClose: () => void;
}

const PatientDocumentModal: React.FC<PatientDocumentModalProps> = ({
  patient,
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState("documents");
  const documents =
    patientDocuments[patient?.id as keyof typeof patientDocuments] || [];

  const handleFileSelect = (file: File) => {
    console.log("File selected:", file.name);
  };

  const handleUpload = (file: File) => {
    console.log("Uploading file:", file.name);
    // Add upload logic here
  };

  const handleDownload = (document: any) => {
    console.log("Downloading:", document.name);
    // Add download logic here
  };

  const handleView = (document: any) => {
    console.log("Viewing:", document.name);
    // Add view logic here
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/* Modal Header */}
      <PatientModalHeader patient={patient} onClose={onClose} />

      {/* Modal Content */}
      <div className="flex h-[calc(90vh-120px)]">
        {/* Left Panel - Patient Details */}
        <PatientDetails patient={patient} />

        {/* Right Panel - Documents and Upload */}
        <div className="flex-1 p-6 overflow-y-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="h-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="documents"
                className="flex items-center gap-2"
              >
                <FileText className="h-4 w-4" />
                Documents ({documents.length})
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Upload New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="documents" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Patient Documents
                </h3>
                <DocumentList
                  documents={documents}
                  onView={handleView}
                  onDownload={handleDownload}
                />
              </div>
            </TabsContent>

            <TabsContent value="upload" className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-card-foreground mb-4">
                  Upload New Document
                </h3>
                <UploadComponent
                  onFileSelect={handleFileSelect}
                  onUpload={handleUpload}
                  acceptedTypes={[
                    ".pdf",
                    ".jpg",
                    ".jpeg",
                    ".png",
                    ".doc",
                    ".docx",
                  ]}
                  maxSize={25}
                  showCamera={true}
                  showDragDrop={true}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Modal>
  );
};

export default PatientDocumentModal;
