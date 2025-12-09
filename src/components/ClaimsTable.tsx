import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface Claim {
  claimNumber: string;
  petName: string;
  ownerName: string;
  ownerPhone: string;
  claimType: string;
  createdOn: string;
  ageing: number;
  status: string;
  score: number;
  nextBreachIn: string;
  activeTasks: number;
}

const dummyClaims: Claim[] = [
  {
    claimNumber: "PETCLM00012345",
    petName: "Bruno",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Injury",
    createdOn: "Dec 05, 2025",
    ageing: 4,
    status: "Pending Verification",
    score: 0,
    nextBreachIn: "2 days 5 hours",
    activeTasks: 2,
  },
  {
    claimNumber: "PETCLM00012312",
    petName: "Coco",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Illness",
    createdOn: "Nov 28, 2025",
    ageing: 11,
    status: "Document Requested",
    score: 0,
    nextBreachIn: "1 day 3 hours",
    activeTasks: 1,
  },
  {
    claimNumber: "PETCLM00011239",
    petName: "Snow",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Surgery",
    createdOn: "Oct 12, 2025",
    ageing: 58,
    status: "Pending Review",
    score: 0,
    nextBreachIn: "12 days 8 hours",
    activeTasks: 3,
  },
  {
    claimNumber: "PETCLM00011234",
    petName: "Max",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Wellness",
    createdOn: "Sep 15, 2025",
    ageing: 85,
    status: "Closed",
    score: 5,
    nextBreachIn: "-",
    activeTasks: 0,
  },
  {
    claimNumber: "PETCLM00011200",
    petName: "Bella",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Injury",
    createdOn: "Dec 01, 2025",
    ageing: 8,
    status: "Pending Admissibility Check",
    score: 0,
    nextBreachIn: "3 days 12 hours",
    activeTasks: 2,
  },
  {
    claimNumber: "PETCLM00011188",
    petName: "Charlie",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Surgery",
    createdOn: "Nov 20, 2025",
    ageing: 19,
    status: "Pending Payment",
    score: 0,
    nextBreachIn: "5 days 2 hours",
    activeTasks: 1,
  },
  {
    claimNumber: "PETCLM00011150",
    petName: "Luna",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Illness",
    createdOn: "Nov 10, 2025",
    ageing: 29,
    status: "Payment Failed",
    score: 0,
    nextBreachIn: "Overdue",
    activeTasks: 1,
  },
  {
    claimNumber: "PETCLM00011100",
    petName: "Rocky",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Wellness",
    createdOn: "Oct 25, 2025",
    ageing: 45,
    status: "Closed",
    score: 4,
    nextBreachIn: "-",
    activeTasks: 0,
  },
  {
    claimNumber: "PETCLM00011050",
    petName: "Daisy",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Injury",
    createdOn: "Oct 18, 2025",
    ageing: 52,
    status: "Pending Closure",
    score: 0,
    nextBreachIn: "1 day 8 hours",
    activeTasks: 1,
  },
  {
    claimNumber: "PETCLM00011000",
    petName: "Milo",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Surgery",
    createdOn: "Sep 28, 2025",
    ageing: 72,
    status: "Closed",
    score: 3,
    nextBreachIn: "-",
    activeTasks: 0,
  },
  {
    claimNumber: "PETCLM00010950",
    petName: "Simba",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Illness",
    createdOn: "Dec 03, 2025",
    ageing: 6,
    status: "Document Requested",
    score: 0,
    nextBreachIn: "4 days 6 hours",
    activeTasks: 2,
  },
  {
    claimNumber: "PETCLM00010900",
    petName: "Oscar",
    ownerName: "Arjun Mehta",
    ownerPhone: "9876543210",
    claimType: "Wellness",
    createdOn: "Aug 15, 2025",
    ageing: 116,
    status: "Closed",
    score: 5,
    nextBreachIn: "-",
    activeTasks: 0,
  },
];

function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
  if (status === "Closed") return "secondary";
  if (status === "Payment Failed") return "destructive";
  return "outline";
}

function getStatusStyle(status: string): string {
  switch (status) {
    case "Pending Verification":
    case "Pending Admissibility Check":
    case "Pending Review":
    case "Pending Payment":
    case "Pending Closure":
      return "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100";
    case "Document Requested":
      return "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100";
    case "Payment Failed":
      return "bg-red-100 text-red-700 border-red-200 hover:bg-red-100";
    case "Closed":
      return "bg-green-100 text-green-700 border-green-200 hover:bg-green-100";
    default:
      return "bg-muted text-muted-foreground";
  }
}

function getBreachStyle(breach: string): string {
  if (breach === "-") return "text-muted-foreground";
  if (breach === "Overdue") return "text-destructive font-semibold";
  return "text-primary";
}

export function ClaimsTable() {
  return (
    <div className="border border-border rounded-lg overflow-hidden bg-card">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Claim Number</TableHead>
            <TableHead className="font-semibold">Pet Name</TableHead>
            <TableHead className="font-semibold">Owner Name</TableHead>
            <TableHead className="font-semibold">Owner Phone</TableHead>
            <TableHead className="font-semibold">Claim Type</TableHead>
            <TableHead className="font-semibold">Created On</TableHead>
            <TableHead className="font-semibold">Ageing (days)</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold text-center">Score</TableHead>
            <TableHead className="font-semibold">Next Breach In</TableHead>
            <TableHead className="font-semibold text-center">Active Tasks</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyClaims.map((claim) => (
            <TableRow
              key={claim.claimNumber}
              className="hover:bg-muted/30 cursor-pointer transition-colors"
            >
              <TableCell className="font-medium text-primary">
                {claim.claimNumber}
              </TableCell>
              <TableCell>{claim.petName}</TableCell>
              <TableCell>{claim.ownerName}</TableCell>
              <TableCell>{claim.ownerPhone}</TableCell>
              <TableCell>{claim.claimType}</TableCell>
              <TableCell>{claim.createdOn}</TableCell>
              <TableCell>{claim.ageing}</TableCell>
              <TableCell>
                <Badge
                  variant={getStatusVariant(claim.status)}
                  className={getStatusStyle(claim.status)}
                >
                  {claim.status}
                </Badge>
              </TableCell>
              <TableCell className="text-center">{claim.score}</TableCell>
              <TableCell className={getBreachStyle(claim.nextBreachIn)}>
                {claim.nextBreachIn}
              </TableCell>
              <TableCell className="text-center">
                {claim.activeTasks > 0 ? (
                  <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                    {claim.activeTasks}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
