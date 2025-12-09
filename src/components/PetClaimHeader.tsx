import { Card } from "@/components/ui/card";
import { PawPrint, User, Phone, FileText } from "lucide-react";

interface PetClaimHeaderProps {
  claimNumber: string;
  petName: string;
  ownerName: string;
  ownerPhone: string;
}

export function PetClaimHeader({
  claimNumber,
  petName,
  ownerName,
  ownerPhone,
}: PetClaimHeaderProps) {
  return (
    <Card className="p-4 mb-6 bg-card border-border">
      <div className="flex flex-wrap items-center gap-6">
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Claim Number:</span>
          <span className="font-semibold text-foreground">{claimNumber}</span>
        </div>
        <div className="flex items-center gap-2">
          <PawPrint className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Pet Name:</span>
          <span className="font-semibold text-foreground">{petName}</span>
        </div>
        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Owner Name:</span>
          <span className="font-semibold text-foreground">{ownerName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-primary" />
          <span className="text-sm text-muted-foreground">Owner Phone:</span>
          <span className="font-semibold text-foreground">{ownerPhone}</span>
        </div>
      </div>
    </Card>
  );
}
