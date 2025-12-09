type StageStatus = "Pending" | "Submitted" | "On Hold" | "Cancelled" | "Completed";

interface Stage {
  id: number;
  title: string;
  dateTime: string | null;
  status: StageStatus;
}

interface ClaimTimelineProps {
  stages: Stage[];
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

export function ClaimTimeline({ stages }: ClaimTimelineProps) {
  return (
    <div className="space-y-3">
      {stages.map((stage) => (
        <div
          key={stage.id}
          className="bg-primary rounded-lg p-4 flex items-center justify-between transition-all hover:bg-primary/90"
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
      ))}
    </div>
  );
}
