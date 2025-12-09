import { useState } from "react";
import { CheckAdmissibilityStage } from "./CheckAdmissibilityStage";

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

export function ClaimTimeline({ stages, onStagesUpdate }: ClaimTimelineProps) {
  const [expandedStageId, setExpandedStageId] = useState<number | null>(null);
  const [localStages, setLocalStages] = useState(stages);

  const handleStageClick = (stageId: number) => {
    setExpandedStageId(prev => prev === stageId ? null : stageId);
  };

  const handleApproveAdmissibility = () => {
    const now = new Date();
    const timestamp = now.toLocaleString("en-US", { 
      hour: "numeric", 
      minute: "2-digit", 
      hour12: true 
    }) + " | " + now.toLocaleDateString("en-US", { 
      month: "short", 
      day: "2-digit", 
      year: "numeric" 
    });

    const updatedStages: Stage[] = [
      { ...localStages[0], status: "Completed", dateTime: timestamp },
      { id: 2, title: "Documents Requested", dateTime: null, status: "Pending" }
    ];
    
    setLocalStages(updatedStages);
    setExpandedStageId(null);
    onStagesUpdate?.(updatedStages);
  };

  const handleRequestDocuments = (note: string) => {
    console.log("Document request note:", note);
    const updatedStages = localStages.map(stage => 
      stage.id === 1 ? { ...stage, status: "On Hold" as StageStatus } : stage
    );
    setLocalStages(updatedStages);
    setExpandedStageId(null);
    onStagesUpdate?.(updatedStages);
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
          {expandedStageId === stage.id && stage.title === "Check Admissibility" && (
            <CheckAdmissibilityStage
              onApprove={handleApproveAdmissibility}
              onRequestDocuments={handleRequestDocuments}
              onClose={() => setExpandedStageId(null)}
            />
          )}
        </div>
      ))}
    </div>
  );
}
