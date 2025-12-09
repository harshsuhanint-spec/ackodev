import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, AlertTriangle, FileText, MessageSquare, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface CheckAdmissibilityStageProps {
  onApprove: () => void;
  onRequestDocuments: (note: string) => void;
  onClose: () => void;
}

interface Document {
  id: string;
  name: string;
  status: "pending" | "approved" | "not_approved";
  note: string;
  isMandatory: boolean;
}

interface ChecklistItem {
  id: string;
  label: string;
  value: string;
  status: "pass" | "warning" | "fail";
}

export function CheckAdmissibilityStage({ onApprove, onRequestDocuments, onClose }: CheckAdmissibilityStageProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "Vet Consultation Bill", status: "pending", note: "", isMandatory: true },
    { id: "2", name: "Treatment Proof (Prescription)", status: "pending", note: "", isMandatory: true },
    { id: "3", name: "Discharge Summary", status: "pending", note: "", isMandatory: false },
  ]);

  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);
  const [accountApproved, setAccountApproved] = useState(false);
  const [accountNote, setAccountNote] = useState("");
  const [requestNote, setRequestNote] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

  const checklist: ChecklistItem[] = [
    { id: "pet", label: "Pet Insured", value: "Bruno — Active Policy", status: "pass" },
    { id: "coverage", label: "Coverage Type matches incident", value: "Yes — Injury covered", status: "pass" },
    { id: "premium", label: "Premium Paid", value: "Yes", status: "pass" },
    { id: "active", label: "Policy Active During Incident", value: "Dec 05, 2025 within policy period", status: "pass" },
    { id: "claims", label: "Previous Claims", value: "2 previous claims", status: "warning" },
  ];

  const accountVerification = {
    policyHolderName: "Arjun Mehta",
    bankAccountName: "Arjun Kumar Mehta",
    nameMatchStatus: "Partial" as const,
  };

  const toggleNoteExpand = (docId: string) => {
    setExpandedNotes(prev => 
      prev.includes(docId) ? prev.filter(id => id !== docId) : [...prev, docId]
    );
  };

  const updateDocumentStatus = (docId: string, status: "pending" | "approved" | "not_approved") => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, status } : doc
    ));
  };

  const updateDocumentNote = (docId: string, note: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === docId ? { ...doc, note } : doc
    ));
  };

  const mandatoryDocs = documents.filter(d => d.isMandatory);
  const optionalDocs = documents.filter(d => !d.isMandatory);
  const hasUnapprovedMandatory = mandatoryDocs.some(d => d.status === "not_approved");
  const allMandatoryApproved = mandatoryDocs.every(d => d.status === "approved");
  const canApprove = allMandatoryApproved && (accountApproved || accountNote.trim().length > 0);

  const handleApprove = () => {
    if (canApprove) {
      onApprove();
    }
  };

  const handleRequestDocuments = () => {
    if (requestNote.trim()) {
      onRequestDocuments(requestNote);
      setShowRequestModal(false);
    }
  };

  const getStatusIcon = (status: "pass" | "warning" | "fail") => {
    switch (status) {
      case "pass":
        return <Check className="h-4 w-4 text-green-600" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case "fail":
        return <X className="h-4 w-4 text-red-500" />;
    }
  };

  const getMatchStatusStyle = (status: "Complete" | "Partial" | "Mismatch") => {
    switch (status) {
      case "Complete":
        return "bg-green-100 text-green-700";
      case "Partial":
        return "bg-amber-100 text-amber-700";
      case "Mismatch":
        return "bg-red-100 text-red-700";
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-4 animate-in fade-in-0 slide-in-from-top-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Stage 1 — Check Admissibility</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Timestamp: Dec 05, 2025 12:04 PM • Status: <span className="text-amber-600 font-medium">Pending</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Side - Checklist */}
        <div className="space-y-6">
          {/* Pet & Policy Eligibility */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">Pet & Policy Eligibility</h4>
            <div className="space-y-3">
              {checklist.map(item => (
                <div key={item.id} className="flex items-start gap-3">
                  <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Account Verification */}
          <Card className="p-4 bg-muted/30 border-border">
            <h4 className="text-sm font-semibold text-foreground mb-4">Account Verification</h4>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-muted-foreground">Policy Holder Name</p>
                  <p className="text-sm text-foreground font-medium">{accountVerification.policyHolderName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Bank Account Name</p>
                  <p className="text-sm text-foreground font-medium">{accountVerification.bankAccountName}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Name Match Status</p>
                <span className={`px-2 py-1 rounded text-xs font-medium ${getMatchStatusStyle(accountVerification.nameMatchStatus)}`}>
                  {accountVerification.nameMatchStatus}
                </span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">Is Approved</span>
                <Switch checked={accountApproved} onCheckedChange={setAccountApproved} />
              </div>
              {!accountApproved && (
                <Textarea 
                  placeholder="Add note for non-approval..." 
                  value={accountNote}
                  onChange={(e) => setAccountNote(e.target.value)}
                  className="text-sm"
                />
              )}
            </div>
          </Card>
        </div>

        {/* Right Side - Document Review */}
        <div className="space-y-4">
          <h4 className="text-sm font-semibold text-foreground">Document Review</h4>
          
          {/* Mandatory Documents */}
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground uppercase tracking-wide">Mandatory Documents</p>
            {mandatoryDocs.map(doc => (
              <Card key={doc.id} className="p-4 bg-muted/30 border-border">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <Select 
                        value={doc.status} 
                        onValueChange={(value) => updateDocumentStatus(doc.id, value as "pending" | "approved" | "not_approved")}
                      >
                        <SelectTrigger className="w-36 h-8 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="not_approved">Not Approved</SelectItem>
                        </SelectContent>
                      </Select>
                      <button 
                        onClick={() => toggleNoteExpand(doc.id)}
                        className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                      >
                        <MessageSquare className="h-3 w-3" />
                        Add note
                      </button>
                    </div>
                    {expandedNotes.includes(doc.id) && (
                      <Textarea 
                        placeholder="Add note about this document..."
                        value={doc.note}
                        onChange={(e) => updateDocumentNote(doc.id, e.target.value)}
                        className="mt-2 text-sm"
                        rows={2}
                      />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Optional Documents */}
          {optionalDocs.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Optional Documents</p>
              {optionalDocs.map(doc => (
                <Card key={doc.id} className="p-4 bg-muted/30 border-border">
                  <div className="flex items-start gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <Select 
                          value={doc.status} 
                          onValueChange={(value) => updateDocumentStatus(doc.id, value as "pending" | "approved" | "not_approved")}
                        >
                          <SelectTrigger className="w-36 h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="not_approved">Not Approved</SelectItem>
                          </SelectContent>
                        </Select>
                        <button 
                          onClick={() => toggleNoteExpand(doc.id)}
                          className="flex items-center gap-1 text-xs text-primary hover:text-primary/80"
                        >
                          <MessageSquare className="h-3 w-3" />
                          Add note
                        </button>
                      </div>
                      {expandedNotes.includes(doc.id) && (
                        <Textarea 
                          placeholder="Add note about this document..."
                          value={doc.note}
                          onChange={(e) => updateDocumentNote(doc.id, e.target.value)}
                          className="mt-2 text-sm"
                          rows={2}
                        />
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <Separator className="my-6" />
      <div className="flex items-center justify-end gap-3">
        {hasUnapprovedMandatory && (
          <p className="text-sm text-amber-600 mr-auto">
            Some mandatory documents are not approved. Please request re-upload.
          </p>
        )}
        <Button 
          variant="outline" 
          onClick={() => setShowRequestModal(true)}
        >
          Ask for Documents Again
        </Button>
        <Button 
          onClick={handleApprove}
          disabled={!canApprove}
        >
          Approve Admissibility
        </Button>
      </div>

      {/* Request Documents Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 bg-card border-border">
            <h4 className="text-lg font-semibold text-foreground mb-4">Request Documents</h4>
            <Textarea 
              placeholder="Please upload a clearer consultation bill..."
              value={requestNote}
              onChange={(e) => setRequestNote(e.target.value)}
              rows={4}
            />
            <div className="flex justify-end gap-3 mt-4">
              <Button variant="outline" onClick={() => setShowRequestModal(false)}>Cancel</Button>
              <Button onClick={handleRequestDocuments} disabled={!requestNote.trim()}>
                Send Request
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
