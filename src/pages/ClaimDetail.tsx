import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PolicyDetailsPanel } from "@/components/PolicyDetailsPanel";
import { ClaimTimeline } from "@/components/ClaimTimeline";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dummy claim data - in real app this would come from API
const claimData = {
  PETCLM00012345: {
    policyId: "PETPOL00089234",
    petName: "Bruno",
    breed: "Golden Retriever",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    email: "arjun.mehta@email.com",
    policyPeriod: "4 November, 2024 - 2 November, 2025",
    referenceId: "DMAG0000760",
    claimNumber: "PETCLM00012345",
    claimStatus: "Pending Verification",
    claimType: "Injury",
    createdOn: "Dec 05, 2025",
    lastUpdatedOn: "Dec 08, 2025",
    stages: [
      { id: 1, title: "Check Admissibility", dateTime: "12:04 PM | Dec 05, 2025", status: "Completed" as const },
      { id: 2, title: "Documents Requested", dateTime: "7:38 PM | Dec 06, 2025", status: "Submitted" as const },
      { id: 3, title: "Claim Verification", dateTime: null, status: "Pending" as const },
    ],
  },
  PETCLM00012312: {
    policyId: "PETPOL00089235",
    petName: "Coco",
    breed: "Labrador",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    email: "arjun.mehta@email.com",
    policyPeriod: "1 January, 2025 - 31 December, 2025",
    referenceId: "DMAG0000761",
    claimNumber: "PETCLM00012312",
    claimStatus: "Document Requested",
    claimType: "Illness",
    createdOn: "Nov 28, 2025",
    lastUpdatedOn: "Dec 07, 2025",
    stages: [
      { id: 1, title: "Check Admissibility", dateTime: "10:30 AM | Nov 28, 2025", status: "Completed" as const },
      { id: 2, title: "Documents Requested", dateTime: null, status: "Pending" as const },
    ],
  },
};

// Default data for claims not in our dummy data
const defaultClaimData = {
  policyId: "PETPOL00089000",
  petName: "Unknown",
  breed: "Unknown",
  ownerName: "Unknown",
  ownerPhone: "0000000000",
  email: "unknown@email.com",
  policyPeriod: "1 January, 2025 - 31 December, 2025",
  referenceId: "DMAG0000000",
  claimNumber: "",
  claimStatus: "Pending Admissibility Check",
  claimType: "Unknown",
  createdOn: "Dec 09, 2025",
  lastUpdatedOn: "Dec 09, 2025",
  stages: [
    { id: 1, title: "Check Admissibility", dateTime: null, status: "Pending" as const },
  ],
};

export default function ClaimDetail() {
  const { claimNumber } = useParams();
  const navigate = useNavigate();

  const claim = claimData[claimNumber as keyof typeof claimData] || {
    ...defaultClaimData,
    claimNumber: claimNumber || "Unknown",
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        breadcrumb={[
          { label: "Jarvis", href: "/" },
          { label: "Pets", href: "/claims/pets" },
          { label: claim.petName, href: "/claims/pets" },
          { label: `#${claim.claimNumber}` },
        ]}
      />

      <div className="p-6">
        <Button
          variant="ghost"
          onClick={() => navigate("/claims/pets")}
          className="mb-4 text-muted-foreground hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Claims
        </Button>

        <div className="flex gap-6">
          {/* Left Panel - Policy & Claim Details */}
          <div className="w-80 flex-shrink-0">
            <PolicyDetailsPanel claim={claim} />
          </div>

          {/* Right Panel - Claim Timeline */}
          <div className="flex-1">
            <ClaimTimeline stages={claim.stages} />
          </div>
        </div>
      </div>
    </div>
  );
}
