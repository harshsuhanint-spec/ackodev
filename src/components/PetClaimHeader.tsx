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
  ownerPhone
}: PetClaimHeaderProps) {
  return <Card className="p-4 mb-6 bg-card border-border">
      
    </Card>;
}