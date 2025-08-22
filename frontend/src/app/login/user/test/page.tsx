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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleUpload = async (file: File) => {
    const newDocument: Document = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type.includes("pdf") ? "PDF" : "Image",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "processing",
      uploadedBy: "user",
    };

    setDocuments((prev) => [newDocument, ...prev]);
    setSelectedFile(null);
  };

  const getStatusBadge = (status: Document["status"]) => {
    const statusStyles = {
      verified: "bg-chart-4/20 text-chart-4 border-chart-4/30 shadow-sm",
      uploaded: "bg-chart-2/20 text-chart-2 border-chart-2/30 shadow-sm",
      processing:
        "bg-chart-1/20 text-chart-1 border-chart-1/30 shadow-sm animate-pulse",
    };

    const statusLabels = {
      verified: "✓ Verified",
      uploaded: "↑ Uploaded",
      processing: "⟳ Processing",
    };

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm transition-all duration-200 ${statusStyles[status]}`}
      >
        {statusLabels[status]}
      </span>
    );
  };

  const getUploadSourceBadge = (
    uploadedBy: Document["uploadedBy"],
    doctorName?: string
  ) => {
    if (uploadedBy === "doctor") {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200 shadow-sm">
          🩺 Doctor {doctorName ? `(${doctorName})` : ""}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-200 shadow-sm">
          👤 You
        </span>
      );
    }
  };

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

  // Function to highlight matching text
  const highlightText = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return (
      <span>
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark
              key={index}
              className="bg-yellow-200 text-yellow-900 px-1 rounded"
            >
              {part}
            </mark>
          ) : (
            part
          )
        )}
      </span>
    );
  };

  const getFileIcon = (type: string) => {
    const icons = {
      PDF: "📄",
      Image: "🖼️",
      Document: "📋",
    };
    return icons[type as keyof typeof icons] || "📄";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="max-w-6xl mx-auto p-6 space-y-8">
        {/* Go Back Button */}
        <div className="flex items-center mb-6">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="flex items-center gap-2 hover:bg-muted/50 shadow-md border-0"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* User Details Section */}
        <Card className="border-border shadow-lg bg-gradient-to-r from-primary/5 to-secondary/5">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-6">
              <div className="p-4 rounded-full bg-primary/10 shadow-lg">
                <div className="text-4xl">👤</div>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {userDetails.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">📧</span>
                    <span className="font-medium text-foreground">
                      {userDetails.email}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">📱</span>
                    <span className="font-medium text-foreground">
                      {userDetails.phone}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">🆔</span>
                    <span className="font-medium text-foreground">
                      Aadhaar: {userDetails.aadhaar}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">🏥</span>
                    <span className="font-medium text-foreground">
                      ID: {userDetails.patientId}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">🩸</span>
                    <span className="font-medium text-foreground">
                      Blood: {userDetails.bloodGroup}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-muted-foreground">📅</span>
                    <span className="font-medium text-foreground">
                      Age: {userDetails.age} years
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Enhanced Header */}
        <div className="text-center space-y-4 py-4">
          <div className="inline-block p-4 rounded-full bg-primary/10 mb-4">
            <div className="text-4xl">🏥</div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Medical Document Portal
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Securely upload, manage, and track your medical documents with
            seamless doctor collaboration
          </p>
        </div>

        {/* Enhanced Upload Section */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <span className="text-xl">📤</span>
            </div>
            <div>
              <h2 className="text-foreground text-xl font-semibold">
                Upload New Document
              </h2>
              <p className="text-muted-foreground text-base">
                Select and upload your medical documents for secure processing
              </p>
            </div>
          </div>

          <UploadComponent
            onFileSelect={handleFileSelect}
            onUpload={handleUpload}
            acceptedTypes={[".pdf", ".jpg", ".jpeg", ".png"]}
            maxSize={10}
            showCamera={true}
            showDragDrop={true}
            className="hover:shadow-xl transition-all duration-300"
          />

          {/* Enhanced Documents List */}
          <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm">
            <CardHeader className="border-b border-border bg-gradient-to-r from-secondary/30 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-secondary/20">
                    <span className="text-xl">📋</span>
                  </div>
                  <div>
                    <CardTitle className="text-foreground text-xl">
                      Document Library
                    </CardTitle>
                    <CardDescription className="text-base">
                      All your medical documents and reports from doctors
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                      </svg>
                    </div>
                    <Input
                      type="text"
                      placeholder="Search documents..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2 w-64 bg-white/80 border-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-8">
              {/* Search Results Info */}
              {searchQuery && (
                <div className="mb-6 p-4 bg-primary/5 rounded-lg border border-primary/20">
                  <p className="text-sm text-foreground">
                    <span className="font-medium">
                      {filteredDocuments.length} document
                      {filteredDocuments.length !== 1 ? "s" : ""} found
                    </span>
                    {filteredDocuments.length > 0 ? (
                      <span className="text-muted-foreground">
                        {" "}
                        for "{searchQuery}"
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        {" "}
                        for "{searchQuery}". Try a different search term.
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {filteredDocuments.length === 0 ? (
                  <div className="text-center py-16 text-muted-foreground">
                    <div className="text-6xl mb-4">📄</div>
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
                    {searchQuery && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                        className="mt-4"
                      >
                        Clear Search
                      </Button>
                    )}
                  </div>
                ) : (
                  filteredDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="group relative overflow-hidden rounded-xl border border-border hover:border-primary/30 bg-gradient-to-r from-card to-card/80 hover:from-card/90 hover:to-card/60 p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                          <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-200 shadow-sm">
                            <span className="text-3xl">
                              {getFileIcon(doc.type)}
                            </span>
                          </div>
                          <div className="space-y-2">
                            <h3 className="font-semibold text-foreground text-lg group-hover:text-primary transition-colors duration-200">
                              {highlightText(doc.name, searchQuery)}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span className="font-medium">{doc.type}</span>
                              <span>{doc.size}</span>
                              <span>
                                📅{" "}
                                {new Date(doc.uploadDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3 pt-1">
                              {getUploadSourceBadge(
                                doc.uploadedBy,
                                doc.doctorName
                              )}
                              {getStatusBadge(doc.status)}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 opacity-80 group-hover:opacity-100 transition-opacity duration-200">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-foreground border-border hover:bg-primary/10 hover:text-primary hover:border-primary/30 shadow-sm transition-all duration-200"
                          >
                            👁️ View
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-muted-foreground border-border hover:bg-secondary/20 hover:text-foreground shadow-sm transition-all duration-200"
                          >
                            📥 Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-chart-1/10 to-chart-1/5 hover:-translate-y-1">
              <CardContent className="pt-8 pb-6">
                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-chart-1/20 w-fit mx-auto">
                    <span className="text-2xl">📊</span>
                  </div>
                  <div className="text-3xl font-bold text-chart-1">
                    {searchQuery ? filteredDocuments.length : documents.length}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    {searchQuery ? "Found Documents" : "Total Documents"}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-chart-2/10 to-chart-2/5 hover:-translate-y-1">
              <CardContent className="pt-8 pb-6">
                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-chart-2/20 w-fit mx-auto">
                    <span className="text-2xl">✅</span>
                  </div>
                  <div className="text-3xl font-bold text-chart-2">
                    {searchQuery
                      ? filteredDocuments.filter((d) => d.status === "verified")
                          .length
                      : documents.filter((d) => d.status === "verified").length}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Verified
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:-translate-y-1">
              <CardContent className="pt-8 pb-6">
                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-blue-500/20 w-fit mx-auto">
                    <span className="text-2xl">🩺</span>
                  </div>
                  <div className="text-3xl font-bold text-blue-600">
                    {searchQuery
                      ? filteredDocuments.filter(
                          (d) => d.uploadedBy === "doctor"
                        ).length
                      : documents.filter((d) => d.uploadedBy === "doctor")
                          .length}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    From Doctors
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-green-500/10 to-green-500/5 hover:-translate-y-1">
              <CardContent className="pt-8 pb-6">
                <div className="text-center space-y-3">
                  <div className="p-3 rounded-full bg-green-500/20 w-fit mx-auto">
                    <span className="text-2xl">👤</span>
                  </div>
                  <div className="text-3xl font-bold text-green-600">
                    {searchQuery
                      ? filteredDocuments.filter((d) => d.uploadedBy === "user")
                          .length
                      : documents.filter((d) => d.uploadedBy === "user").length}
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Your Uploads
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Section */}
          <Card className="border-border shadow-lg bg-gradient-to-r from-muted/20 to-transparent">
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <span className="text-xl">⏰</span>
                </div>
                <div>
                  <CardTitle className="text-foreground">
                    Recent Activity
                  </CardTitle>
                  <CardDescription>
                    Latest document updates and uploads
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {documents.slice(0, 3).map((doc, index) => (
                  <div
                    key={doc.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-muted/30 transition-colors duration-200"
                  >
                    <div className="p-2 rounded-full bg-primary/10 text-sm">
                      {getFileIcon(doc.type)}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground text-sm">
                        {doc.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.uploadedBy === "doctor"
                          ? `Added by ${doc.doctorName || "Doctor"}`
                          : "Uploaded by you"}{" "}
                        • {new Date(doc.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    {getStatusBadge(doc.status)}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
