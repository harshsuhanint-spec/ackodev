import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter 
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  Eye, 
  Upload, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Clock
} from "lucide-react";

interface VetInvestigationStageProps {
  handlerNote?: string;
  onApprove: (amount: number, notes: string) => void;
  onReject: (reason: string) => void;
  onRequestDocuments: (note: string) => void;
  onClose: () => void;
}

type MedicalAssessment = "Medically Justified" | "Partially Justified" | "Not Justified" | "";
type VetRecommendation = "Approve" | "Reject" | "Partial Approval" | "";

interface VetFindings {
  assessment: MedicalAssessment;
  comments: string;
  recommendation: VetRecommendation;
  uploadedFiles: string[];
}

export function VetInvestigationStage({
  handlerNote = "Please verify if the claimed surgery was medically required based on documents.",
  onApprove,
  onReject,
  onRequestDocuments,
  onClose
}: VetInvestigationStageProps) {
  const { toast } = useToast();
  const [vetSubmitted, setVetSubmitted] = useState(false);
  const [vetFindings, setVetFindings] = useState<VetFindings>({
    assessment: "",
    comments: "",
    recommendation: "",
    uploadedFiles: []
  });
  
  // Handler action states
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showRequestDocsDialog, setShowRequestDocsDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [requestDocsNote, setRequestDocsNote] = useState("");
  const [finalAmount, setFinalAmount] = useState("");
  const [handlerNotes, setHandlerNotes] = useState("");

  // Mock data
  const petDetails = {
    name: "Bruno",
    breed: "Golden Retriever",
    age: "4 years",
    claimType: "Surgery"
  };

  const incidentSummary = {
    description: "Pet underwent emergency surgery after ingesting a foreign object during a walk in the park.",
    incidentDate: "Dec 01, 2024",
    vetVisitDate: "Dec 01, 2024",
    clinicName: "PetCare Veterinary Hospital"
  };

  const documents = [
    { name: "Consultation Bill", type: "PDF" },
    { name: "Treatment Proof", type: "PDF" },
    { name: "X-Ray Report", type: "PDF" }
  ];

  const handleVetSubmit = () => {
    if (!vetFindings.assessment) {
      toast({
        title: "Assessment Required",
        description: "Please select a medical assessment.",
        variant: "destructive"
      });
      return;
    }

    if (!vetFindings.comments.trim()) {
      toast({
        title: "Comments Required",
        description: "Please add comments for your assessment.",
        variant: "destructive"
      });
      return;
    }

    if (!vetFindings.recommendation) {
      toast({
        title: "Recommendation Required",
        description: "Please select a recommendation.",
        variant: "destructive"
      });
      return;
    }

    setVetSubmitted(true);
    toast({
      title: "Vet Findings Submitted",
      description: "The handler can now review and take action."
    });
  };

  const handleApproveClick = () => {
    const amount = parseFloat(finalAmount);
    if (!amount || amount <= 0) {
      toast({
        title: "Amount Required",
        description: "Enter final admissible amount to proceed.",
        variant: "destructive"
      });
      return;
    }

    onApprove(amount, handlerNotes);
    toast({
      title: "Claim Approved",
      description: `Claim approved for ₹${amount.toLocaleString()}`
    });
  };

  const handleRejectConfirm = () => {
    if (!rejectReason.trim()) {
      toast({
        title: "Reason Required",
        description: "Please enter a rejection reason.",
        variant: "destructive"
      });
      return;
    }

    onReject(rejectReason);
    setShowRejectDialog(false);
    toast({
      title: "Claim Rejected",
      description: "The claim has been rejected."
    });
  };

  const handleRequestDocsConfirm = () => {
    if (!requestDocsNote.trim()) {
      toast({
        title: "Note Required",
        description: "Please add a note explaining what documents are needed.",
        variant: "destructive"
      });
      return;
    }

    onRequestDocuments(requestDocsNote);
    setShowRequestDocsDialog(false);
    toast({
      title: "Documents Requested",
      description: "Claim sent back to Document Verification."
    });
  };

  const getAssessmentIcon = (assessment: MedicalAssessment) => {
    switch (assessment) {
      case "Medically Justified":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "Partially Justified":
        return <AlertTriangle className="h-4 w-4 text-amber-600" />;
      case "Not Justified":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getRecommendationBadge = (recommendation: VetRecommendation) => {
    switch (recommendation) {
      case "Approve":
        return <Badge className="bg-green-100 text-green-700">Recommend Approval</Badge>;
      case "Reject":
        return <Badge className="bg-red-100 text-red-700">Recommend Rejection</Badge>;
      case "Partial Approval":
        return <Badge className="bg-amber-100 text-amber-700">Recommend Partial Approval</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-3 bg-muted/30 rounded-lg p-4 space-y-4">
      {/* Summary Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Case Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Pet Details */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Pet Details</h4>
              <div className="space-y-1 text-sm">
                <p><span className="text-muted-foreground">Name:</span> {petDetails.name}</p>
                <p><span className="text-muted-foreground">Breed:</span> {petDetails.breed}</p>
                <p><span className="text-muted-foreground">Age:</span> {petDetails.age}</p>
                <p><span className="text-muted-foreground">Claim Type:</span> {petDetails.claimType}</p>
              </div>
            </div>

            {/* Incident Summary */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Incident Summary</h4>
              <div className="space-y-1 text-sm">
                <p className="text-muted-foreground line-clamp-2">{incidentSummary.description}</p>
                <p><span className="text-muted-foreground">Incident:</span> {incidentSummary.incidentDate}</p>
                <p><span className="text-muted-foreground">Vet Visit:</span> {incidentSummary.vetVisitDate}</p>
                <p><span className="text-muted-foreground">Clinic:</span> {incidentSummary.clinicName}</p>
              </div>
            </div>

            {/* Documents */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Documents Provided</h4>
              <div className="space-y-2">
                {documents.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between text-sm bg-background rounded px-2 py-1.5">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span>{doc.name}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Eye className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Handler's Note to Vet */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-medium">Handler's Note to Vet</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-sm text-amber-800">
            "{handlerNote}"
          </div>
        </CardContent>
      </Card>

      {/* Vet Input Section */}
      {!vetSubmitted ? (
        <Card className="border-2 border-dashed border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <CardTitle className="text-base font-medium">External Vet Review</CardTitle>
              <Badge variant="outline" className="text-xs">Pending Input</Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Medical Assessment */}
            <div className="space-y-2">
              <Label>Medical Assessment *</Label>
              <Select
                value={vetFindings.assessment}
                onValueChange={(value: MedicalAssessment) => 
                  setVetFindings(prev => ({ ...prev, assessment: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Medically Justified">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Medically Justified
                    </div>
                  </SelectItem>
                  <SelectItem value="Partially Justified">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-600" />
                      Partially Justified
                    </div>
                  </SelectItem>
                  <SelectItem value="Not Justified">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-red-600" />
                      Not Justified
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Comments */}
            <div className="space-y-2">
              <Label>Comments *</Label>
              <Textarea
                placeholder="Add detailed comments about your assessment..."
                value={vetFindings.comments}
                onChange={(e) => setVetFindings(prev => ({ ...prev, comments: e.target.value }))}
                rows={3}
              />
            </div>

            {/* Upload Supporting Notes */}
            <div className="space-y-2">
              <Label>Upload Supporting Notes (Optional)</Label>
              <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center">
                <Upload className="h-6 w-6 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  Handwritten notes, annotated images, reports
                </p>
              </div>
            </div>

            {/* Final Recommendation */}
            <div className="space-y-2">
              <Label>Final Recommendation *</Label>
              <Select
                value={vetFindings.recommendation}
                onValueChange={(value: VetRecommendation) => 
                  setVetFindings(prev => ({ ...prev, recommendation: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select recommendation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Approve">Recommend Approval</SelectItem>
                  <SelectItem value="Partial Approval">Recommend Partial Approval</SelectItem>
                  <SelectItem value="Reject">Recommend Rejection</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button onClick={handleVetSubmit} className="w-full">
              Submit Vet Findings
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Vet Findings Summary (After Submission) */}
          <Card className="border-green-200 bg-green-50/30">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base font-medium">Vet Investigation Completed</CardTitle>
                <Badge className="bg-green-100 text-green-700">Submitted</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Assessment:</span>
                    <div className="flex items-center gap-1">
                      {getAssessmentIcon(vetFindings.assessment)}
                      <span className="text-sm font-medium">{vetFindings.assessment}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Recommendation:</span>
                    <div className="mt-1">{getRecommendationBadge(vetFindings.recommendation)}</div>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Vet Comments:</span>
                  <p className="text-sm mt-1 bg-background rounded p-2">"{vetFindings.comments}"</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Handler Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-medium">Handler Decision</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Final Amount Entry */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Final Admissible Amount (₹) *</Label>
                  <Input
                    type="number"
                    placeholder="Enter amount"
                    value={finalAmount}
                    onChange={(e) => setFinalAmount(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Handler Notes (Optional)</Label>
                  <Input
                    placeholder="Add any notes..."
                    value={handlerNotes}
                    onChange={(e) => setHandlerNotes(e.target.value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-2">
                <Button 
                  onClick={handleApproveClick}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve Claim & Proceed to Payout
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => setShowRejectDialog(true)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject Claim
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowRequestDocsDialog(true)}
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Request Additional Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}

      {/* SLA Alert (shown when vet hasn't submitted) */}
      {!vetSubmitted && (
        <div className="flex items-center gap-2 text-sm text-amber-600 bg-amber-50 rounded-md p-3">
          <Clock className="h-4 w-4" />
          <span>Awaiting vet review — handler may intervene manually if delayed.</span>
        </div>
      )}

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Claim</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Rejection Reason *</Label>
              <Textarea
                placeholder="Enter the reason for rejection..."
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

      {/* Request Documents Dialog */}
      <Dialog open={showRequestDocsDialog} onOpenChange={setShowRequestDocsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Request Additional Documents</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              This will send the claim back to Document Verification stage.
            </p>
            <div className="space-y-2">
              <Label>Note for Customer *</Label>
              <Textarea
                placeholder="Explain what additional documents are needed..."
                value={requestDocsNote}
                onChange={(e) => setRequestDocsNote(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRequestDocsDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleRequestDocsConfirm}>
              Request Documents
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
