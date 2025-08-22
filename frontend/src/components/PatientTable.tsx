"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Patient } from "@/types/medical";

interface PatientTableProps {
  patients: Patient[];
  onPatientClick: (patient: Patient) => void;
}

const PatientTable: React.FC<PatientTableProps> = ({
  patients,
  onPatientClick,
}) => {
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
    <div className="rounded-lg shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Patient Name</TableHead>
            <TableHead className="font-semibold">Age</TableHead>
            <TableHead className="font-semibold">Condition</TableHead>
            <TableHead className="font-semibold">Last Visit</TableHead>
            <TableHead className="font-semibold">Next Appointment</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow
              key={patient.id}
              className="hover:bg-muted/30 cursor-pointer transition-colors"
              onClick={() => onPatientClick(patient)}
            >
              <TableCell className="font-medium">{patient.name}</TableCell>
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
  );
};

export default PatientTable;
