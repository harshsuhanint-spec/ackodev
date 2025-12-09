import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X, SlidersHorizontal } from "lucide-react";

const statusFilters = [
  { label: "Pending Admissibility Check", count: 3 },
  { label: "Document Requested", count: 5 },
  { label: "Pending Verification", count: 2 },
  { label: "Pending Review", count: 1 },
  { label: "Pending Payment", count: 1 },
  { label: "Payment Failed", count: 0 },
  { label: "Pending Closure", count: 1 },
  { label: "Closed", count: 4 },
  { label: "Reopened", count: 0 },
];

export function ClaimStatusFilters() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeStatus, setActiveStatus] = useState<string | null>(null);

  const handleClear = () => {
    setSearchQuery("");
    setActiveStatus(null);
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Search Row */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Search By</span>
          <Select defaultValue="claim-number">
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Select field" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="claim-number">Claim Request Number</SelectItem>
              <SelectItem value="pet-name">Pet Name</SelectItem>
              <SelectItem value="owner-name">Owner Name</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Enter Claim Request Number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClear}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
          clear
        </Button>
      </div>

      {/* Status Chips */}
      <div className="flex flex-wrap gap-3">
        {statusFilters.map((status) => (
          <button
            key={status.label}
            onClick={() =>
              setActiveStatus(
                activeStatus === status.label ? null : status.label
              )
            }
            className={`
              px-4 py-2 rounded-full border text-sm font-medium transition-all
              flex items-center gap-2
              ${
                activeStatus === status.label
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-foreground hover:border-primary/50"
              }
            `}
          >
            <span>{status.label}</span>
            <span
              className={`
              px-2 py-0.5 rounded-full text-xs font-semibold
              ${
                activeStatus === status.label
                  ? "bg-primary text-primary-foreground"
                  : "bg-primary/20 text-primary"
              }
            `}
            >
              {status.count}
            </span>
          </button>
        ))}
      </div>

      {/* Dropdown Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">
          All Claims <span className="text-muted-foreground">(12 Claims)</span>
        </h2>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-32">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="By Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-32">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="By Plan" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Plans</SelectItem>
              <SelectItem value="basic">Basic</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-40">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="By Claim Handler" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Handlers</SelectItem>
              <SelectItem value="john">John Doe</SelectItem>
              <SelectItem value="jane">Jane Smith</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-36">
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              <SelectValue placeholder="By Claim Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="illness">Illness</SelectItem>
              <SelectItem value="injury">Injury</SelectItem>
              <SelectItem value="surgery">Surgery</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
