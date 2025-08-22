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
import UploadComponent from "@/components/Upload";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  FileText,
  Download,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Search,
  Stethoscope,
  Users,
  X,
  Calendar,
  Activity,
  Heart,
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
    email: "john.smith@email.com",
    phone: "+1 (555) 987-6543",
    address: "123 Main Street, New York, NY 10001",
    bloodType: "A+",
    emergencyContact: "Jane Smith - +1 (555) 987-6544",
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
  {
    id: 6,
    name: "Jennifer Martinez",
    age: 52,
    condition: "Valve Disease",
    lastVisit: "2024-01-03",
    nextAppointment: "2024-01-30",
    status: "Active",
    email: "jennifer.martinez@email.com",
    phone: "+1 (555) 678-9012",
    address: "987 Cedar Lane, Miami, FL 33101",
    bloodType: "O-",
    emergencyContact: "Carlos Martinez - +1 (555) 678-9013",
  },
];

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

const upcomingAppointments = [
  { time: "09:00 AM", patient: "John Smith", type: "Follow-up" },
  { time: "10:30 AM", patient: "Emily Davis", type: "Consultation" },
  { time: "02:00 PM", patient: "Michael Brown", type: "Procedure" },
  { time: "03:30 PM", patient: "Lisa Wilson", type: "Check-up" },
];

// Custom Modal Component
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      {/* Modal Content */}
      <div className="relative bg-card border border-border rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
        {children}
      </div>
    </div>
  );
};

// Patient Document Modal Component
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      case "Follow-up":
        return "bg-secondary text-secondary-foreground";
      case "Active":
        return "bg-primary text-primary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

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
      <div className="flex items-center justify-between p-6 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary text-primary-foreground font-bold">
              {patient?.name
                ?.split(" ")
                .map((n: string) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-2xl font-bold text-card-foreground">
              {patient?.name}
            </h2>
            <p className="text-muted-foreground">Patient ID: {patient?.id}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="hover:bg-muted rounded-full"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      {/* Modal Content */}
      <div className="flex h-[calc(90vh-120px)]">
        {/* Left Panel - Patient Details */}
        <div className="w-1/3 border-r border-border bg-muted/30 p-6 overflow-y-auto">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-card-foreground mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Patient Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Age</p>
                    <p className="font-medium text-card-foreground">
                      {patient?.age} years
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Heart className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Condition</p>
                    <p className="font-medium text-card-foreground">
                      {patient?.condition}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-card-foreground">
                      {patient?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-card-foreground">
                      {patient?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-card rounded-lg">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium text-card-foreground">
                      {patient?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-card-foreground mb-3">
                Medical Details
              </h4>
              <div className="space-y-3">
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Blood Type</p>
                  <p className="font-medium text-card-foreground">
                    {patient?.bloodType}
                  </p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    Emergency Contact
                  </p>
                  <p className="font-medium text-card-foreground">
                    {patient?.emergencyContact}
                  </p>
                </div>
                <div className="p-3 bg-card rounded-lg">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(patient?.status)}>
                    {patient?.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                {documents.length > 0 ? (
                  <div className="space-y-3">
                    {documents.map((doc: any) => (
                      <div
                        key={doc.id}
                        className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-accent/10 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium text-card-foreground">
                              {doc.name}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {doc.date} • {doc.size}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleView(doc)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDownload(doc)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No documents available for this patient
                    </p>
                  </div>
                )}
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

export function DoctorProfile() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  const handlePatientClick = (patient: any) => {
    setSelectedPatient(patient);
    setIsModalOpen(true);
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Critical":
        return "bg-destructive text-destructive-foreground";
      case "Follow-up":
        return "bg-secondary text-secondary-foreground";
      case "Active":
        return "bg-primary text-primary-foreground";
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
                      <TableRow
                        key={patient.id}
                        className="hover:bg-muted/30 cursor-pointer transition-colors"
                        onClick={() => handlePatientClick(patient)}
                      >
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

      {/* Patient Document Modal */}
      <PatientDocumentModal
        patient={selectedPatient}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default DoctorProfile;
