import { useState } from "react";
import { CheckAdmissibilityStage } from "./CheckAdmissibilityStage";
import { DocumentVerificationStage } from "./DocumentVerificationStage";

type StageStatus = "Pending" | "Submitted" | "On Hold" | "Cancelled" | "Completed";

interface Stage {
  id: number;
  title: string;
  dateTime: string | null;
  status: StageStatus;
}

interface ClaimTimelineProps {
  stages: Stage[];
  onStagesUpdate?: (stages: Stage[]) => void;
}

function getStatusStyle(status: StageStatus): string {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Submitted":
      return "bg-primary/10 text-primary";
    case "On Hold":
      return "bg-amber-100 text-amber-700";
    case "Cancelled":
      return "bg-red-100 text-red-700";
    case "Pending":
    default:
      return "bg-muted text-muted-foreground";
  }
}

function generateTimestamp(): string {
  const now = new Date();
  return now.toLocaleString("en-US", { 
    hour: "numeric", 
    minute: "2-digit", 
    hour12: true 
  }) + " | " + now.toLocaleDateString("en-US", { 
    month: "short", 
    day: "2-digit", 
    year: "numeric" 
  });
}

export function ClaimTimeline({ stages, onStagesUpdate }: ClaimTimelineProps) {
  const [expandedStageId, setExpandedStageId] = useState<number | null>(null);
  const [localStages, setLocalStages] = useState(stages);

  const handleStageClick = (stageId: number) => {
    setExpandedStageId(prev => prev === stageId ? null : stageId);
  };

  // Stage 1 handlers
  const handleApproveAdmissibility = () => {
    // All docs approved in Stage 1 → Skip to Claim Verification (Stage 3)
    const updatedStages: Stage[] = [
      { ...localStages[0], status: "Completed", dateTime: generateTimestamp() },
      { id: 2, title: "Claim Verification", dateTime: null, status: "Pending" }
    ];
    
    setLocalStages(updatedStages);
    setExpandedStageId(null);
    onStagesUpdate?.(updatedStages);
  };

  const handleRequestDocumentsStage1 = (note: string) => {
    // Request docs → Create Document Verification stage (Stage 2)
    console.log("Stage 1 - Document request note:", note);
    const updatedStages: Stage[] = [
      { ...localStages[0], status: "Completed", dateTime: generateTimestamp() },
      { id: 2, title: "Document Verification", dateTime: null, status: "Pending" }
    ];
    setLocalStages(updatedStages);
    setExpandedStageId(2); // Auto-expand Stage 2
    onStagesUpdate?.(updatedStages);
  };

  // Stage 2 (Document Verification) handlers
  const handleApproveDocuments = () => {
    // All docs approved → Move to Claim Verification
    const updatedStages: Stage[] = [
      ...localStages.map((stage) => 
        stage.title === "Document Verification" 
          ? { ...stage, status: "Completed" as StageStatus, dateTime: generateTimestamp() } 
          : stage
      ),
      { id: localStages.length + 1, title: "Claim Verification", dateTime: null, status: "Pending" }
    ];
    
    setLocalStages(updatedStages);
    setExpandedStageId(null);
    onStagesUpdate?.(updatedStages);
  };

  const handleRequestDocumentsStage2 = (note: string) => {
    // Request docs again → Keep stage On Hold, waiting for customer re-upload
    console.log("Stage 2 - Document request note:", note);
    const updatedStages = localStages.map(stage => 
      stage.title === "Document Verification" ? { ...stage, status: "On Hold" as StageStatus } : stage
    );
    setLocalStages(updatedStages);
    setExpandedStageId(null);
    onStagesUpdate?.(updatedStages);
  };

  const renderExpandedStage = (stage: Stage) => {
    if (expandedStageId !== stage.id) return null;

    switch (stage.title) {
      case "Check Admissibility":
        return (
          <CheckAdmissibilityStage
            onApprove={handleApproveAdmissibility}
            onRequestDocuments={handleRequestDocumentsStage1}
            onClose={() => setExpandedStageId(null)}
          />
        );
      case "Document Verification":
        return (
          <DocumentVerificationStage
            onApprove={handleApproveDocuments}
            onRequestDocuments={handleRequestDocumentsStage2}
            onClose={() => setExpandedStageId(null)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-3">
      {localStages.map((stage) => (
        <div key={stage.id}>
          <div
            onClick={() => handleStageClick(stage.id)}
            className="bg-primary rounded-lg p-4 flex items-center justify-between transition-all hover:bg-primary/90 cursor-pointer"
          >
            <div className="flex items-center gap-4">
              {/* Stage Number Circle */}
              <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center text-foreground font-semibold text-sm flex-shrink-0">
                {stage.id}
              </div>

              {/* Stage Info */}
              <div>
                <h4 className="text-primary-foreground font-medium text-base">
                  {stage.title}
                </h4>
                {stage.dateTime && (
                  <p className="text-primary-foreground/70 text-sm mt-0.5">
                    {stage.dateTime}
                  </p>
                )}
              </div>
            </div>

            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded text-sm font-medium ${getStatusStyle(
                stage.status
              )}`}
            >
              {stage.status}
            </span>
          </div>

          {/* Expanded Stage Content */}
          {renderExpandedStage(stage)}
        </div>
      ))}
    </div>
  );
}
