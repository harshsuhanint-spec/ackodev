import { useState } from "react";
import { Card } from "@/components/ui/card";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface ClaimDetails {
  policyId: string;
  petName: string;
  breed: string;
  ownerName: string;
  ownerPhone: string;
  email: string;
  policyPeriod: string;
  referenceId: string;
  claimNumber: string;
  claimStatus: string;
  claimType: string;
  createdOn: string;
  lastUpdatedOn: string;
}

interface PolicyDetailsPanelProps {
  claim: ClaimDetails;
}

export function PolicyDetailsPanel({ claim }: PolicyDetailsPanelProps) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <div className="space-y-4">
      {/* Policy Details Card */}
      <Card className="p-5 bg-card border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-foreground">Policy Details</h3>
          <ExternalLink className="h-4 w-4 text-primary cursor-pointer hover:text-primary/80" />
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Policy ID</p>
            <p className="text-sm text-foreground">{claim.policyId}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Pet Name</p>
            <p className="text-sm text-foreground">{claim.petName}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Breed</p>
            <p className="text-sm text-foreground">{claim.breed}</p>
          </div>

          <Separator className="my-2" />

          <div>
            <p className="text-xs text-muted-foreground font-medium">Customer</p>
            <p className="text-sm text-foreground">{claim.ownerName}</p>
            <p className="text-sm text-muted-foreground">{claim.ownerPhone}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">{claim.email}</p>
          </div>

          <Separator className="my-2" />

          <div>
            <p className="text-xs text-muted-foreground font-medium">Policy Period</p>
            <p className="text-sm text-foreground">{claim.policyPeriod}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Reference ID</p>
            <p className="text-sm text-foreground">{claim.referenceId}</p>
          </div>

          {/* More Details Toggle */}
          <button
            onClick={() => setShowMoreDetails(!showMoreDetails)}
            className="flex items-center gap-1 text-primary text-sm font-medium hover:text-primary/80 transition-colors w-full justify-center pt-2"
          >
            More details
            {showMoreDetails ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </button>

          {showMoreDetails && (
            <div className="space-y-4 pt-2 animate-in fade-in-0 slide-in-from-top-2">
              <div>
                <p className="text-xs text-muted-foreground font-medium">Pet Age</p>
                <p className="text-sm text-foreground">3 years</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Pet Gender</p>
                <p className="text-sm text-foreground">Male</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Microchip ID</p>
                <p className="text-sm text-foreground">MC9876543210</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Claim Details Card */}
      <Card className="p-5 bg-card border-border">
        <h3 className="text-sm font-semibold text-foreground mb-4">Claim Details</h3>

        <div className="space-y-4">
          <div>
            <p className="text-xs text-muted-foreground font-medium">Claim Number</p>
            <p className="text-sm text-foreground">{claim.claimNumber}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Status</p>
            <p className="text-sm text-foreground">{claim.claimStatus}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Claim Type</p>
            <p className="text-sm text-foreground">{claim.claimType}</p>
          </div>

          <Separator className="my-2" />

          <div>
            <p className="text-xs text-muted-foreground font-medium">Created On</p>
            <p className="text-sm text-foreground">{claim.createdOn}</p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground font-medium">Last Updated On</p>
            <p className="text-sm text-foreground">{claim.lastUpdatedOn}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
