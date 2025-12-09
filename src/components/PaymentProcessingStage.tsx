import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  CheckCircle, 
  XCircle, 
  Pause,
  CreditCard,
  Building2,
  AlertTriangle,
  Clock,
  IndianRupee
} from "lucide-react";

interface PaymentProcessingStageProps {
  approvedAmount?: number;
  onProcessPayment: () => void;
  onHold: (reason: string) => void;
  onReject: (reason: string) => void;
  onClose: () => void;
}

export function PaymentProcessingStage({
  approvedAmount = 4200,
  onProcessPayment,
  onHold,
  onReject,
  onClose
}: PaymentProcessingStageProps) {
  const { toast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showHoldDialog, setShowHoldDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [holdReason, setHoldReason] = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  // Mock data
  const billsSummary = {
    totalSubmitted: 6500,
    totalApproved: 4200,
    deductibles: 800,
    nonPayables: 1500
  };

  const bankDetails = {
    accountHolderName: "Arjun Mehta",
    accountNumber: "****5678",
    ifscCode: "HDFC000123",
    bankName: "HDFC Bank"
  };

  const ownerName = "Arjun Mehta";
  const nameMatches = bankDetails.accountHolderName === ownerName;

  const handleProcessPayment = () => {
    setPaymentProcessed(true);
    setShowConfirmDialog(false);
    onProcessPayment();
    toast({
      title: "Payout Processed Successfully",
      description: `₹${approvedAmount.toLocaleString()} sent to ${bankDetails.bankName} - ${bankDetails.accountNumber}`
    });
  };

  const handleHoldConfirm = () => {
    if (!holdReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a reason for putting the claim on hold.",
        variant: "destructive"
      });
      return;
    }
    onHold(holdReason);
    setShowHoldDialog(false);
    toast({
      title: "Claim On Hold",
      description: "Payment processing has been paused."
    });
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please provide a rejection reason.",
        variant: "destructive"
      });
      return;
    }
    onReject(rejectReason);
    setShowRejectDialog(false);
    toast({
      title: "Claim Rejected",
      description: "The claim has been rejected at payment stage."
    });
  };

  if (paymentProcessed) {
    return (
      <div className="mt-3 bg-muted/30 rounded-lg p-4 space-y-4">
        <Card className="border-green-200 bg-green-50/50">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-700">Payment Successful</h3>
                <p className="text-sm text-muted-foreground mt-1">Claim has been closed successfully</p>
              </div>
              
              <div className="bg-white rounded-lg p-4 space-y-2 text-left max-w-sm mx-auto">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Amount Paid:</span>
                  <span className="font-semibold">₹{approvedAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Payment Ref:</span>
                  <span className="font-mono text-xs">TXN{Date.now().toString().slice(-10)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Paid To:</span>
                  <span>{bankDetails.bankName} - {bankDetails.accountNumber}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Date:</span>
                  <span>{new Date().toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" })}</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Amount will reflect in 1-3 working days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="mt-3 bg-muted/30 rounded-lg p-4 space-y-4">
      {/* Payout Summary */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <IndianRupee className="h-4 w-4" />
            Payout Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Final Amount - Prominent */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">Final Admissible Amount</p>
            <p className="text-3xl font-bold text-primary mt-1">₹{approvedAmount.toLocaleString()}</p>
            <Badge variant="secondary" className="mt-2">Read-only</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Bank Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Bank Details Confirmation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Holder:</span>
                <span className="font-medium">{bankDetails.accountHolderName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-mono">{bankDetails.accountNumber}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">IFSC Code:</span>
                <span className="font-mono">{bankDetails.ifscCode}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Bank Name:</span>
                <span className="font-medium">{bankDetails.bankName}</span>
              </div>
            </div>
          </div>

          {/* Name Match Check */}
          <div className={`flex items-center gap-2 p-3 rounded-lg ${nameMatches ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
            {nameMatches ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Account holder name matches owner name</span>
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                <span className="text-sm">Account holder name does not match owner name — Handler override allowed</span>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Handler Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <Button 
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => setShowConfirmDialog(true)}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Process Payout
            </Button>
            <Button 
              variant="outline"
              onClick={() => setShowHoldDialog(true)}
            >
              <Pause className="h-4 w-4 mr-2" />
              Put On Hold
            </Button>
            <Button 
              variant="destructive"
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="h-4 w-4 mr-2" />
              Reject Claim
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Confirm Payment Dialog */}
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Payout</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to process the payout?
            </p>
            <div className="mt-4 bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Amount:</span>
                <span className="font-semibold">₹{approvedAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>To:</span>
                <span>{bankDetails.bankName} - {bankDetails.accountNumber}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={handleProcessPayment}>
              Confirm Payout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Hold Dialog */}
      <Dialog open={showHoldDialog} onOpenChange={setShowHoldDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Put Claim On Hold</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Reason for Hold *</Label>
              <Textarea
                placeholder="e.g., Bank account mismatch — validation required"
                value={holdReason}
                onChange={(e) => setHoldReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowHoldDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleHoldConfirm}>
              Confirm Hold
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Claim at Payment Stage</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              This action will reject the claim at the final stage. Use only for critical issues.
            </p>
            <div className="space-y-2">
              <Label>Rejection Reason *</Label>
              <Textarea
                placeholder="e.g., Fraud detected / Documents found invalid"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRejectConfirm}>
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
