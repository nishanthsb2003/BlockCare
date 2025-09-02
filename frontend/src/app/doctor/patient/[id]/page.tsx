"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDoctorAuth } from "@/hooks/supabase/useDoctorAuth";
import { patientService, documentService } from "@/lib/supabase/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  FileText,
  Download,
  AlertTriangle,
  Stethoscope,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  email: string;
  age: number;
  gender: string;
  phone?: string;
  address?: string;
  bloodtype?: string;
  emergencycontact?: string;
  allergies?: string[];
  condition?: string;
  created_at?: string;
  updated_at?: string;
}

interface Document {
  id: string;
  name: string;
  type: string;
  size: number;
  path: string;
  created_at: string;
}

export default function PatientDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { doctor, isAuthenticated, loading: authLoading } = useDoctorAuth();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const patientId = params.id as string;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push("/login/doctor");
      return;
    }

    if (doctor && patientId) {
      loadPatientDetails();
    }
  }, [authLoading, isAuthenticated, doctor, patientId, router]);

  const loadPatientDetails = async () => {
    try {
      setLoading(true);

      const patientData = await patientService.getPatientById(patientId);
      setPatient(patientData);

      const documentsData = await documentService.getPatientDocuments(
        patientId
      );
      setDocuments(documentsData || []);
    } catch (err: any) {
      console.error("Error loading patient details:", err);
      setError(
        "Failed to load patient details. You may not have access to this patient."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDocument = async (document: Document) => {
    try {
      // In a real implementation, you would download from Supabase Storage
      console.log("Downloading document:", document.name);
      // For now, just show an alert
      alert(
        `Download functionality for ${document.name} would be implemented here.`
      );
    } catch (error) {
      console.error("Error downloading document:", error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Access Error</h1>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => router.push("/doctor/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!patient) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <User className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-2">Patient Not Found</h1>
          <p className="text-muted-foreground mb-4">
            The requested patient could not be found.
          </p>
          <Button onClick={() => router.push("/doctor/dashboard")}>
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push("/doctor/dashboard")}
                className="p-0 h-auto font-normal text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="mr-1 h-4 w-4" />
                Back to Dashboard
              </Button>
            </div>

            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Patient Details
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Patient Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      {patient.name}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span>Age: {patient.age} years</span>
                      </div>
                      {patient.email && (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <span>{patient.email}</span>
                        </div>
                      )}
                      {patient.phone && (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <span>{patient.phone}</span>
                        </div>
                      )}
                      {patient.address && (
                        <div className="flex items-center space-x-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span>{patient.address}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground">
                        Gender
                      </label>
                      <p className="text-sm">{patient.gender}</p>
                    </div>
                    {patient.bloodtype && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Blood Type
                        </label>
                        <Badge variant="outline" className="ml-2">
                          {patient.bloodtype}
                        </Badge>
                      </div>
                    )}
                    {patient.condition && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Condition
                        </label>
                        <p className="text-sm">{patient.condition}</p>
                      </div>
                    )}
                    {patient.emergencycontact && (
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Emergency Contact
                        </label>
                        <p className="text-sm">{patient.emergencycontact}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Allergies */}
                {patient.allergies && patient.allergies.length > 0 && (
                  <div className="mt-6 p-4 bg-red-50 rounded-lg">
                    <div className="flex items-center space-x-2 text-red-600 mb-2">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium">Allergies</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {patient.allergies.map((allergy, index) => (
                        <Badge key={index} variant="destructive">
                          {allergy}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Medical Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Medical Documents</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {documents.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No documents available
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {documents.map((document) => (
                      <div
                        key={document.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {document.name}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {document.type} •{" "}
                              {(document.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDownloadDocument(document)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <FileText className="h-4 w-4 mr-2" />
                  Add Medical Note
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Appointment
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Records
                </Button>
              </CardContent>
            </Card>

            {/* Patient Stats */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Record Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {documents.length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Medical Documents
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">
                    {patient.created_at
                      ? Math.floor(
                          (new Date().getTime() -
                            new Date(patient.created_at).getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                      : "N/A"}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Days in System
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
