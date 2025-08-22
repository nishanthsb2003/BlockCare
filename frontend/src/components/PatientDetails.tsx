"use client";

import { Badge } from "@/components/ui/badge";
import { Activity, Calendar, Heart, Mail, MapPin, Phone } from "lucide-react";

interface PatientDetailsProps {
  patient: any;
}

const PatientDetails: React.FC<PatientDetailsProps> = ({ patient }) => {
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
              <p className="text-sm text-muted-foreground">Emergency Contact</p>
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
  );
};

export default PatientDetails;
