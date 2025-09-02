"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import PatientDocumentModal from "@/components/PatientDocumentModal";
import PatientTable from "@/components/PatientTable";
import { ArrowLeft, Clock, Search, Stethoscope, Users } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Patient, Doctor } from "@/types/medical";

// Mock data for doctor
const doctorData: Doctor = {
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  email: "sarah.johnson@hospital.com",
  phone: "+1 (555) 123-4567",
  location: "Metropolitan Medical Center",
  experience: "15 years",
  education: "MD from Harvard Medical School",
  certifications: [
    "Board Certified Cardiologist",
    "Advanced Cardiac Life Support",
    "Interventional Cardiology",
  ],
  bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice in interventional cardiology.",
  avatar: "/professional-doctor-headshot.png",
};

// Mock data for patients
const patientsData: Patient[] = [
  {
    id: 1,
    name: "Nishant",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    status: "Active",
    email: "nishant@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main Street, New York, NY 10001",
    bloodType: "A+",
    emergencyContact: "nishant - +1 (555) 987-6544",
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 62,
    condition: "Arrhythmia",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-02-10",
    status: "Active",
    email: "emily.davis@email.com",
    phone: "+1 (555) 456-7890",
    address: "456 Oak Avenue, Los Angeles, CA 90210",
    bloodType: "B-",
    emergencyContact: "Robert Davis - +1 (555) 456-7891",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 58,
    condition: "Coronary Artery Disease",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-08",
    status: "Active",
    email: "michael.brown@email.com",
    phone: "+1 (555) 234-5678",
    address: "789 Pine Street, Chicago, IL 60601",
    bloodType: "O+",
    emergencyContact: "Susan Brown - +1 (555) 234-5679",
  },
  {
    id: 4,
    name: "Lisa Wilson",
    age: 39,
    condition: "Chest Pain Evaluation",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-05",
    status: "Follow-up",
    email: "lisa.wilson@email.com",
    phone: "+1 (555) 345-6789",
    address: "321 Elm Street, Houston, TX 77001",
    bloodType: "AB+",
    emergencyContact: "David Wilson - +1 (555) 345-6790",
  },
  {
    id: 5,
    name: "Robert Taylor",
    age: 67,
    condition: "Heart Failure",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-02-01",
    status: "Critical",
    email: "robert.taylor@email.com",
    phone: "+1 (555) 567-8901",
    address: "654 Maple Drive, Phoenix, AZ 85001",
    bloodType: "A-",
    emergencyContact: "Mary Taylor - +1 (555) 567-8902",
  },
];

// Mock data for recently viewed patients
const recentlyViewedPatients = [
  {
    id: 2,
    name: "Emily Davis",
    time: "Today, 10:30 AM",
    condition: "Arrhythmia",
  },
  {
    id: 5,
    name: "Robert Taylor",
    time: "Today, 9:15 AM",
    condition: "Heart Failure",
  },
  {
    id: 1,
    name: "Nishant",
    time: "Yesterday, 4:45 PM",
    condition: "Hypertension",
  },
  {
    id: 3,
    name: "Michael Brown",
    time: "Yesterday, 11:20 AM",
    condition: "Coronary Artery Disease",
  },
];

function DoctorProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentlyViewed, setRecentlyViewed] = useState(recentlyViewedPatients);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);

    // Add to recently viewed if not already at the top
    const isAlreadyTop =
      recentlyViewed.length > 0 && recentlyViewed[0].id === patient.id;

    if (!isAlreadyTop) {
      const now = new Date();
      const timeString =
        now.getHours() >= 12
          ? `Today, ${now.getHours() % 12 || 12}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")} PM`
          : `Today, ${now.getHours()}:${now
              .getMinutes()
              .toString()
              .padStart(2, "0")} AM`;

      const newRecentItem = {
        id: patient.id,
        name: patient.name,
        time: timeString,
        condition: patient.condition,
      };

      // Remove if exists and add to top
      const filteredRecent = recentlyViewed.filter((p) => p.id !== patient.id);
      setRecentlyViewed([newRecentItem, ...filteredRecent].slice(0, 10)); // Keep only 10 items
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPatient(null);
  };

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 sm:space-y-8">
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

        {/* Doctor Header */}
        <Card className="border-border shadow-md bg-card">
          <CardContent className="pt-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-16 w-16 sm:h-20 sm:w-20 bg-primary/10 border-2 border-primary/20">
                <AvatarImage
                  src={doctorData.avatar || "/placeholder.svg"}
                  alt={doctorData.name}
                />
                <AvatarFallback className="text-xl font-bold text-primary bg-primary/10">
                  {doctorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="space-y-1">
                  <h2 className="text-xl sm:text-2xl font-bold text-card-foreground">
                    {doctorData.name}
                  </h2>
                  <p className="text-base flex items-center gap-2 text-primary">
                    <Stethoscope className="h-4 w-4" />
                    {doctorData.specialty}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground max-w-2xl">
                  {doctorData.bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content - Patient Records Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Patient Records */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-border shadow-md bg-card">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg sm:text-xl text-card-foreground">
                      <Users className="h-5 w-5 text-primary" />
                      Patient Records
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      View and access patient medical records
                    </CardDescription>
                  </div>
                  <div className="w-full sm:w-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search patients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-full bg-input border-input text-foreground focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
                      />
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="rounded-lg border border-border overflow-hidden">
                  <PatientTable
                    patients={filteredPatients}
                    onPatientClick={handlePatientClick}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recently Viewed Records */}
          <div className="space-y-6">
            <Card className="border-border shadow-md bg-card">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg text-card-foreground">
                  <Clock className="h-5 w-5 text-primary" />
                  Recently Viewed
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Patient records you've accessed recently
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-2">
                  {recentlyViewed.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <p>No recently viewed patients</p>
                    </div>
                  ) : (
                    recentlyViewed.map((patient) => {
                      const fullPatient = patientsData.find(
                        (p) => p.id === patient.id
                      );

                      return (
                        <div
                          key={`${patient.id}-${patient.time}`}
                          onClick={() =>
                            fullPatient && handlePatientClick(fullPatient)
                          }
                          className="p-3 rounded-lg border border-border hover:border-primary/30 bg-card/60 hover:bg-card/90 cursor-pointer transition-all duration-200"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <h3 className="font-medium text-primary">
                                {patient.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {patient.condition}
                              </p>
                            </div>
                            <Badge
                              variant="outline"
                              className="text-xs bg-accent/10 border-accent/20"
                            >
                              {patient.time}
                            </Badge>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Patient Document Modal */}
        <PatientDocumentModal
          patient={selectedPatient}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}

export default DoctorProfile;
