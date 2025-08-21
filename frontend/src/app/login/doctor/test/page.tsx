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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Stethoscope,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// Mock data for demonstration
const doctorData = {
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
  bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice in interventional cardiology. She specializes in complex cardiac procedures and has published numerous research papers in cardiovascular medicine.",
  avatar: "/professional-doctor-headshot.png",
};

const patientsData = [
  {
    id: 1,
    name: "John Smith",
    age: 45,
    condition: "Hypertension",
    lastVisit: "2024-01-15",
    nextAppointment: "2024-02-15",
    status: "Active",
  },
  {
    id: 2,
    name: "Emily Davis",
    age: 62,
    condition: "Arrhythmia",
    lastVisit: "2024-01-12",
    nextAppointment: "2024-02-10",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Brown",
    age: 58,
    condition: "Coronary Artery Disease",
    lastVisit: "2024-01-10",
    nextAppointment: "2024-02-08",
    status: "Active",
  },
  {
    id: 4,
    name: "Lisa Wilson",
    age: 39,
    condition: "Chest Pain Evaluation",
    lastVisit: "2024-01-08",
    nextAppointment: "2024-02-05",
    status: "Follow-up",
  },
  {
    id: 5,
    name: "Robert Taylor",
    age: 67,
    condition: "Heart Failure",
    lastVisit: "2024-01-05",
    nextAppointment: "2024-02-01",
    status: "Critical",
  },
  {
    id: 6,
    name: "Jennifer Martinez",
    age: 52,
    condition: "Valve Disease",
    lastVisit: "2024-01-03",
    nextAppointment: "2024-01-30",
    status: "Active",
  },
];

const upcomingAppointments = [
  { time: "09:00 AM", patient: "John Smith", type: "Follow-up" },
  { time: "10:30 AM", patient: "Emily Davis", type: "Consultation" },
  { time: "02:00 PM", patient: "Michael Brown", type: "Procedure" },
  { time: "03:30 PM", patient: "Lisa Wilson", type: "Check-up" },
];

export function DoctorProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const filteredPatients = patientsData.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      case "Follow-up":
        return "bg-secondary text-secondary-foreground";
      case "Active":
        return "bg-primary text-secondary";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
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

      {/* Header Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <Card className="flex-1 shadow-lg border-0">
          <CardHeader className="pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={doctorData.avatar || "/placeholder.svg"}
                  alt={doctorData.name}
                />
                <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                  {doctorData.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-3xl font-bold text-foreground">
                  {doctorData.name}
                </CardTitle>
                <CardDescription className="text-lg flex items-center gap-2">
                  <Stethoscope className="h-5 w-5" />
                  {doctorData.specialty}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {doctorData.certifications.slice(0, 2).map((cert, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{doctorData.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{doctorData.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{doctorData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
                <span>{doctorData.experience} experience</span>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              {doctorData.bio}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="patients" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:grid-cols-3">
          <TabsTrigger value="patients" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Patients
          </TabsTrigger>
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Stethoscope className="h-4 w-4" />
            Overview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="patients" className="space-y-6">
          {/* Patients Section */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Patient List ({filteredPatients.length})
                  </CardTitle>
                  <CardDescription>
                    Manage and view your patient information
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 shadow-md border-0"
                    />
                  </div>
                  <Button className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 shadow-md border-0">
                    <Plus className="h-4 w-4" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg shadow-md">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-muted/50">
                      <TableHead className="font-semibold">
                        Patient Name
                      </TableHead>
                      <TableHead className="font-semibold">Age</TableHead>
                      <TableHead className="font-semibold">Condition</TableHead>
                      <TableHead className="font-semibold">
                        Last Visit
                      </TableHead>
                      <TableHead className="font-semibold">
                        Next Appointment
                      </TableHead>
                      <TableHead className="font-semibold">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPatients.map((patient) => (
                      <TableRow key={patient.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">
                          {patient.name}
                        </TableCell>
                        <TableCell>{patient.age}</TableCell>
                        <TableCell>{patient.condition}</TableCell>
                        <TableCell>{patient.lastVisit}</TableCell>
                        <TableCell>{patient.nextAppointment}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Patients
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {patientsData.length}
                </div>
                <p className="text-xs text-muted-foreground">Active in care</p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Today's Appointments
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">
                  {upcomingAppointments.length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Scheduled for today
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-0">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Critical Cases
                </CardTitle>
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-destructive">
                  {patientsData.filter((p) => p.status === "Critical").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Professional Details */}
          <Card className="shadow-lg border-0">
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Education</h4>
                <p className="text-muted-foreground">{doctorData.education}</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Certifications</h4>
                <div className="flex flex-wrap gap-2">
                  {doctorData.certifications.map((cert, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-0 shadow-md"
                    >
                      {cert}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default DoctorProfile;
