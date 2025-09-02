"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import UploadComponent from "@/components/Upload";

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  status: "uploaded" | "processing" | "verified";
  uploadedBy: "user" | "doctor";
  doctorName?: string;
}

export default function TestUserPage() {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Medical_Report_2024.pdf",
      type: "PDF",
      size: "2.3 MB",
      uploadDate: "2024-08-20",
      status: "verified",
      uploadedBy: "doctor",
      doctorName: "Dr. Sarah Johnson",
    },
    {
      id: "2",
      name: "Blood_Test_Results.pdf",
      type: "PDF",
      size: "1.1 MB",
      uploadDate: "2024-08-19",
      status: "uploaded",
      uploadedBy: "user",
    },
    {
      id: "3",
      name: "X_Ray_Scan.jpg",
      type: "Image",
      size: "4.7 MB",
      uploadDate: "2024-08-18",
      status: "processing",
      uploadedBy: "doctor",
      doctorName: "Dr. Michael Chen",
    },
    {
      id: "4",
      name: "Prescription_Notes.pdf",
      type: "PDF",
      size: "0.8 MB",
      uploadDate: "2024-08-17",
      status: "verified",
      uploadedBy: "user",
    },
    {
      id: "5",
      name: "Lab_Results_Comprehensive.pdf",
      type: "PDF",
      size: "3.2 MB",
      uploadDate: "2024-08-16",
      status: "uploaded",
      uploadedBy: "doctor",
      doctorName: "Dr. Emily Rodriguez",
    },
  ]);

  // User data (in a real app, this would come from authentication/API)
  const userDetails = {
    name: "Adarsh Kumar",
    email: "adarsh.kumar@email.com",
    phone: "+91 98765 43210",
    aadhaar: "1234 5678 9012",
    patientId: "P2024001",
    bloodGroup: "O+",
    age: 28,
  };

  const [searchQuery, setSearchQuery] = useState<string>("");

  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) => {
    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    return (
      doc.name.toLowerCase().includes(query) ||
      doc.type.toLowerCase().includes(query) ||
      doc.status.toLowerCase().includes(query) ||
      doc.uploadedBy.toLowerCase().includes(query) ||
      (doc.doctorName && doc.doctorName.toLowerCase().includes(query))
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
        {/* Go Back Button */}
        <div className="flex items-center mb-4 sm:mb-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2 hover:bg-accent/10 text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* User Details Section */}
        <Card className="border-border shadow-md bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-card-foreground">
              User Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  {userDetails.name}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Email: {userDetails.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Phone: {userDetails.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Aadhaar: {userDetails.aadhaar}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Patient ID: {userDetails.patientId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Blood Group: {userDetails.bloodGroup}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 p-2 rounded-md bg-accent/5">
                    <span className="font-medium text-foreground">
                      Age: {userDetails.age} years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Section */}
        <Card className="border-border shadow-md bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-card-foreground">
              Upload Document
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Select and upload your medical documents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full">
              <UploadComponent
                acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
                maxSize={10}
                showCamera={true}
                showDragDrop={true}
                className="transition-all duration-300 border border-border rounded-lg hover:border-primary/50"
                onUploadComplete={(document) => {
                  const newDocument: Document = {
                    id: Date.now().toString(),
                    name: document.name || "Uploaded document",
                    type: document.contentType?.includes("pdf")
                      ? "PDF"
                      : "Image",
                    size: `${((document.size || 0) / (1024 * 1024)).toFixed(
                      1
                    )} MB`,
                    uploadDate: new Date().toISOString().split("T")[0],
                    status: "processing",
                    uploadedBy: "user",
                  };
                  setDocuments((prev) => [newDocument, ...prev]);
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Document Details Section */}
        <Card className="border-border shadow-md bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg sm:text-xl text-card-foreground">
              Document Library
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              All your medical documents and reports
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-input border-input text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
            </div>

            <div className="space-y-4 mt-6">
              {filteredDocuments.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground bg-accent/5 rounded-lg">
                  <h3 className="text-lg font-semibold mb-2">
                    {searchQuery
                      ? "No matching documents found"
                      : "No documents uploaded yet"}
                  </h3>
                  <p>
                    {searchQuery
                      ? "Try adjusting your search terms"
                      : "Upload your first medical document to get started"}
                  </p>
                </div>
              ) : (
                filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="rounded-lg border border-border hover:border-primary/30 p-4 sm:p-6 shadow-sm hover:shadow-md transition-all duration-300 bg-card/80"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-2">
                        <h3 className="font-semibold text-primary text-base sm:text-lg line-clamp-1">
                          {doc.name}
                        </h3>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <span className="font-medium">{doc.type}</span>
                          <span>{doc.size}</span>
                          <span>
                            {new Date(doc.uploadDate).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              doc.uploadedBy === "doctor"
                                ? "bg-accent/10 text-accent-foreground border-accent/20"
                                : "bg-secondary/10 text-secondary-foreground border-secondary/20"
                            }`}
                          >
                            {doc.uploadedBy === "doctor"
                              ? `Doctor ${
                                  doc.doctorName ? `(${doc.doctorName})` : ""
                                }`
                              : "You"}
                          </span>
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                              doc.status === "verified"
                                ? "bg-chart-4/10 text-chart-4 border-chart-4/20"
                                : doc.status === "uploaded"
                                ? "bg-chart-2/10 text-chart-2 border-chart-2/20"
                                : "bg-chart-1/10 text-chart-1 border-chart-1/20 animate-pulse"
                            }`}
                          >
                            {doc.status === "verified"
                              ? "Verified"
                              : doc.status === "uploaded"
                              ? "Uploaded"
                              : "Processing"}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-3 mt-2 sm:mt-0">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-primary border-primary/30 hover:bg-primary/10"
                        >
                          View
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-secondary border-secondary/30 hover:bg-secondary/10"
                        >
                          Download
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
