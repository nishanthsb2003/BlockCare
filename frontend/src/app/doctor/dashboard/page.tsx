"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDoctorAuth } from "@/hooks/supabase/useDoctorAuth";
import { doctorService, patientService } from "@/lib/supabase/database";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Users,
  Clock,
  Stethoscope,
  User,
  Calendar,
  LogOut,
  AlertCircle,
  ChevronRight,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  condition: string;
  last_visit?: string;
}

interface RecentPatient {
  patient_id: string;
  accessed_at: string;
  patients: Patient;
}

export default function DoctorDashboard() {
  const router = useRouter();
  const { doctor, logout, isAuthenticated, loading } = useDoctorAuth();
  const [patientId, setPatientId] = useState("");
  const [recentPatients, setRecentPatients] = useState<RecentPatient[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push("/login/doctor");
      return;
    }

    if (doctor) {
      loadRecentPatients();
    }
  }, [loading, isAuthenticated, doctor, router]);

  const loadRecentPatients = async () => {
    if (!doctor) return;

    try {
      const patients = await doctorService.getDoctorPatients(doctor.id);
      setRecentPatients(patients || []);
    } catch (error) {
      console.error("Error loading recent patients:", error);
    }
  };

  const handlePatientSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientId.trim() || !doctor) return;

    setIsSearching(true);
    setError(null);

    try {
      // Try to find the patient by ID first, then by email
      let patient;
      try {
        patient = await patientService.getPatientById(patientId);
      } catch {
        // If not found by ID, try by email
        try {
          patient = await patientService.getPatientByEmail(patientId);
        } catch {
          setError("Patient not found. Please check the Patient ID or email.");
          setIsSearching(false);
          return;
        }
      }

      // Add patient access record
      await doctorService.addPatientAccess(doctor.id, patient.id);

      // Refresh recent patients
      await loadRecentPatients();

      // Redirect to patient details
      router.push(`/doctor/patient/${patient.id}`);
    } catch (err) {
      console.error("Error searching for patient:", err);
      setError("Failed to access patient. Please try again.");
    } finally {
      setIsSearching(false);
    }
  };

  const handlePatientSelect = (patient: RecentPatient) => {
    router.push(`/doctor/patient/${patient.patients.id}`);
  };

  const handleSignOut = () => {
    logout();
    router.push("/login/doctor");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !doctor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Stethoscope className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">
                  Medical Dashboard
                </h1>
                <p className="text-sm text-muted-foreground">
                  Welcome back, {doctor.name}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{doctor.name}</span>
                <Badge variant="secondary">
                  {doctor.specialty || "Doctor"}
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Search Section */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Search className="h-5 w-5" />
                  <span>Access Patient Records</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePatientSearch} className="space-y-4">
                  <div className="flex space-x-3">
                    <Input
                      type="text"
                      placeholder="Enter patient ID or email"
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      className="flex-1 h-12 text-base"
                    />
                    <Button
                      type="submit"
                      disabled={isSearching || !patientId.trim()}
                      className="h-12 px-6"
                    >
                      {isSearching ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Searching...</span>
                        </div>
                      ) : (
                        <>
                          <Search className="h-4 w-4 mr-2" />
                          Access
                        </>
                      )}
                    </Button>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="h-4 w-4" />
                      <span>{error}</span>
                    </div>
                  )}

                  <div className="text-sm text-muted-foreground">
                    <p>
                      Enter a patient's ID or email address to access their
                      medical records.
                    </p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Doctor Info Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Doctor Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Name
                  </label>
                  <p className="text-sm">{doctor.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Profession
                  </label>
                  <p className="text-sm">
                    {doctor.specialty || "Medical Professional"}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Experience
                  </label>
                  <p className="text-sm">{doctor.experience || "N/A"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Hospital
                  </label>
                  <p className="text-sm">{doctor.hospital || "N/A"}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Patients */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Recent Patients</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {recentPatients.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No recent patients</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Patient records will appear here after you access them
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentPatients.map((recentPatient) => (
                    <div
                      key={recentPatient.patient_id}
                      onClick={() => handlePatientSelect(recentPatient)}
                      className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">
                            {recentPatient.patients.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {recentPatient.patients.condition} • Age{" "}
                            {recentPatient.patients.age}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            Last accessed
                          </p>
                          <p className="text-sm font-medium">
                            {new Date(
                              recentPatient.accessed_at
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
