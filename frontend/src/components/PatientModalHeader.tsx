"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface PatientModalHeaderProps {
  patient: any;
  onClose: () => void;
}

const PatientModalHeader: React.FC<PatientModalHeaderProps> = ({
  patient,
  onClose,
}) => {
  return (
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
  );
};

export default PatientModalHeader;
