import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, X, AlertTriangle, FileCheck, Stethoscope } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ClaimVerificationStageProps {
  onApprove: (amount: number, notes: string) => void;
  onSendToVet: (note: string) => void;
  onReject: (reason: string) => void;
  onClose: () => void;
}

export function ClaimVerificationStage({ 
  onApprove, 
  onSendToVet, 
  onReject, 
  onClose 
}: ClaimVerificationStageProps) {
  const { toast } = useToast();
  const [finalAmount, setFinalAmount] = useState<string>("");
  const [reductionReason, setReductionReason] = useState("");
  const [vetNote, setVetNote] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [showVetModal, setShowVetModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);

  // Mock data
  const caseData = {
    petName: "Bruno",
    claimType: "Injury",
    incidentDate: "Dec 03, 2025",
    vetVisitDate: "Dec 04, 2025",
    clinicName: "PawCare Veterinary Clinic",
    policyActive: true,
    coverageApplicable: true,
    remainingSI: 45000,
    previousClaims: 2,
  };

  const bills = {
    consultation: 1200,
    treatment: 4500,
    other: 800,
  };

  const totalBills = bills.consultation + bills.treatment + bills.other;
  const maxAdmissible = Math.min(totalBills, caseData.remainingSI, 5000); // Sub-limit example

  const handleApprove = () => {
    const amount = parseFloat(finalAmount);
    
    if (!finalAmount || isNaN(amount)) {
      toast({
        title: "Amount Required",
        description: "Enter final admissible amount to proceed.",
        variant: "destructive",
      });
      return;
    }

    if (amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Amount cannot be zero or negative.",
        variant: "destructive",
      });
      return;
    }

    if (amount > maxAdmissible) {
      toast({
        title: "Amount Exceeds Limit",
        description: `Amount cannot exceed maximum admissible (₹${maxAdmissible.toLocaleString()}).`,
        variant: "destructive",
      });
      return;
    }

    if (amount < totalBills && !reductionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for the reduced amount.",
        variant: "destructive",
      });
      return;
    }

    onApprove(amount, reductionReason);
  };

  const handleSendToVet = () => {
    if (!vetNote.trim()) {
      toast({
        title: "Note Required",
        description: "Please add a note for the vet investigation.",
        variant: "destructive",
      });
      return;
    }
    onSendToVet(vetNote);
    setShowVetModal(false);
  };

  const handleReject = () => {
    if (!rejectionReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a rejection reason.",
        variant: "destructive",
      });
      return;
    }
    onReject(rejectionReason);
    setShowRejectModal(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-4 animate-in fade-in-0 slide-in-from-top-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Stage 3 — Claim Verification</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Timestamp: Dec 09, 2025 10:30 AM • Status: <span className="text-amber-600 font-medium">Pending</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Header */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-6 overflow-x-auto">
        <span className="text-green-600 font-medium">Check Admissibility</span>
        <span>→</span>
        <span className="text-green-600 font-medium">Doc Verification</span>
        <span>→</span>
        <span className="text-primary font-medium">Claim Verification</span>
        <span>→</span>
        <span>Payment</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Case Summary */}
        <div className="space-y-4">
          {/* Pet & Incident Summary */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Pet & Incident Summary</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Pet Name</p>
                <p className="font-medium text-foreground">{caseData.petName}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Claim Type</p>
                <p className="font-medium text-foreground">{caseData.claimType}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Incident Date</p>
                <p className="font-medium text-foreground">{caseData.incidentDate}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vet Visit Date</p>
                <p className="font-medium text-foreground">{caseData.vetVisitDate}</p>
              </div>
              <div className="col-span-2">
                <p className="text-xs text-muted-foreground">Clinic Name</p>
                <p className="font-medium text-foreground">{caseData.clinicName}</p>
              </div>
            </div>
          </Card>

          {/* Policy Summary */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Policy Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Policy Active?</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <Check className="h-4 w-4" /> Yes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Coverage Applicable?</span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <Check className="h-4 w-4" /> Yes
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Remaining Sum Insured</span>
                <span className="font-medium text-foreground">₹{caseData.remainingSI.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Previous Claims</span>
                <span className="font-medium text-foreground">{caseData.previousClaims} claims</span>
              </div>
            </div>
          </Card>

          {/* Document Status */}
          <Card className="p-4 bg-green-50 border-green-200">
            <div className="flex items-center gap-2">
              <FileCheck className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">All mandatory documents approved</span>
            </div>
          </Card>
        </div>

        {/* Right Side - Bill Review & Amount */}
        <div className="space-y-4">
          {/* Bills Submitted */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Total Bills Submitted</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Consultation Bill</span>
                <span className="font-medium text-foreground">₹{bills.consultation.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Treatment Bill</span>
                <span className="font-medium text-foreground">₹{bills.treatment.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Other Bills</span>
                <span className="font-medium text-foreground">₹{bills.other.toLocaleString()}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex items-center justify-between">
                <span className="font-medium text-foreground">Total</span>
                <span className="font-semibold text-foreground">₹{totalBills.toLocaleString()}</span>
              </div>
            </div>
          </Card>

          {/* Maximum Admissible */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Maximum Admissible Amount</p>
                <p className="text-xs text-muted-foreground mt-0.5">(Based on SI, sub-limits, cover rules)</p>
              </div>
              <span className="text-xl font-bold text-primary">₹{maxAdmissible.toLocaleString()}</span>
            </div>
          </Card>

          {/* Final Amount Entry */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-3">Final Admissible Amount</h4>
            <div className="space-y-3">
              <div>
                <Label htmlFor="finalAmount" className="text-sm">Enter Amount (₹)</Label>
                <Input
                  id="finalAmount"
                  type="number"
                  placeholder="0"
                  value={finalAmount}
                  onChange={(e) => setFinalAmount(e.target.value)}
                  className="mt-1"
                />
              </div>
              {finalAmount && parseFloat(finalAmount) < totalBills && (
                <div>
                  <Label htmlFor="reductionReason" className="text-sm flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3 text-amber-500" />
                    Reason for Reduction
                  </Label>
                  <Textarea
                    id="reductionReason"
                    placeholder="e.g., Medication amount not covered under policy..."
                    value={reductionReason}
                    onChange={(e) => setReductionReason(e.target.value)}
                    className="mt-1"
                    rows={2}
                  />
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Decision Actions */}
      <Separator className="my-6" />
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3">
        <Button 
          variant="destructive" 
          onClick={() => setShowRejectModal(true)}
          className="order-3 sm:order-1"
        >
          <X className="h-4 w-4 mr-2" />
          Reject Claim
        </Button>
        <Button 
          variant="outline" 
          onClick={() => setShowVetModal(true)}
          className="order-2"
        >
          <Stethoscope className="h-4 w-4 mr-2" />
          Send for Vet Investigation
        </Button>
        <Button 
          onClick={handleApprove}
          className="order-1 sm:order-3"
        >
          <Check className="h-4 w-4 mr-2" />
          Approve Claim & Proceed to Payout
        </Button>
      </div>

      {/* Vet Investigation Modal */}
      {showVetModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-card border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Send for Vet Investigation</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Add a note for the veterinary investigator explaining what needs to be verified.
            </p>
            <Textarea 
              placeholder="e.g., Injury details unclear — please verify incident. Check medical justification for surgery recommendation."
              value={vetNote}
              onChange={(e) => setVetNote(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowVetModal(false)}>Cancel</Button>
              <Button onClick={handleSendToVet}>
                <Stethoscope className="h-4 w-4 mr-2" />
                Send to Vet
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Reject Claim Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md p-6 bg-card border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Reject Claim</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Please provide a reason for rejecting this claim. This will be recorded and shared with the customer.
            </p>
            <Textarea 
              placeholder="e.g., Incident occurred outside policy period. Non-covered illness / exclusion. Insufficient documentation."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowRejectModal(false)}>Cancel</Button>
              <Button variant="destructive" onClick={handleReject}>
                <X className="h-4 w-4 mr-2" />
                Confirm Rejection
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
