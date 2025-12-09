import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, MessageSquare, X, RefreshCw } from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface DocumentVerificationStageProps {
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
  isResubmitted: boolean;
  resubmitDate?: string;
}

export function DocumentVerificationStage({ onApprove, onRequestDocuments, onClose }: DocumentVerificationStageProps) {
  const [documents, setDocuments] = useState<Document[]>([
    { id: "1", name: "Vet Consultation Bill", status: "pending", note: "", isMandatory: true, isResubmitted: true, resubmitDate: "Dec 10, 2025" },
    { id: "2", name: "Treatment Proof (Prescription)", status: "pending", note: "", isMandatory: true, isResubmitted: false },
    { id: "3", name: "Discharge Summary", status: "pending", note: "", isMandatory: false, isResubmitted: false },
    { id: "4", name: "Diagnostic Reports", status: "pending", note: "", isMandatory: false, isResubmitted: false },
    { id: "5", name: "Pharmacy Bill", status: "pending", note: "", isMandatory: false, isResubmitted: false },
  ]);

  const [expandedNotes, setExpandedNotes] = useState<string[]>([]);
  const [requestNote, setRequestNote] = useState("");
  const [showRequestModal, setShowRequestModal] = useState(false);

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

  const handleApprove = () => {
    if (allMandatoryApproved) {
      onApprove();
    }
  };

  const handleRequestDocuments = () => {
    if (requestNote.trim()) {
      onRequestDocuments(requestNote);
      setShowRequestModal(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mt-4 animate-in fade-in-0 slide-in-from-top-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Stage 2 — Document Verification</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Timestamp: Dec 08, 2025 3:45 PM • Status: <span className="text-amber-600 font-medium">Pending</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Summary Strip */}
      <div className="bg-muted/50 rounded-lg px-4 py-3 mb-6">
        <p className="text-sm text-foreground">
          Review the updated documents submitted by the customer.
        </p>
      </div>

      {/* Document Review Panel */}
      <div className="space-y-4">
        {/* Mandatory Documents */}
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
            Mandatory Documents
          </p>
          {mandatoryDocs.map(doc => (
            <Card key={doc.id} className="p-4 bg-muted/30 border-border">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-primary mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{doc.name}</p>
                    {doc.isResubmitted && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                        <RefreshCw className="h-3 w-3" />
                        Re-uploaded {doc.resubmitDate}
                      </span>
                    )}
                  </div>
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
            <p className="text-xs text-muted-foreground uppercase tracking-wide font-medium">
              Optional Documents
            </p>
            {optionalDocs.map(doc => (
              <Card key={doc.id} className="p-4 bg-muted/30 border-border">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-foreground">{doc.name}</p>
                      {doc.isResubmitted && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                          <RefreshCw className="h-3 w-3" />
                          Re-uploaded {doc.resubmitDate}
                        </span>
                      )}
                    </div>
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
          Request Document Again
        </Button>
        <Button 
          onClick={handleApprove}
          disabled={!allMandatoryApproved}
        >
          Approve Documents
        </Button>
      </div>

      {/* Request Documents Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-md p-6 bg-card border-border">
            <h4 className="text-lg font-semibold text-foreground mb-2">Request Document Again</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Please specify which documents need to be re-uploaded and why.
            </p>
            <Textarea 
              placeholder="e.g., Uploaded prescription is incomplete. Bill dates do not match incident date."
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
