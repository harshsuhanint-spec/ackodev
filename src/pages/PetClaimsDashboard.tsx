import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PetClaimHeader } from "@/components/PetClaimHeader";
import { ClaimStatusFilters } from "@/components/ClaimStatusFilters";
import { ClaimsTable } from "@/components/ClaimsTable";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";

const PetClaimsDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="px-6 py-4">
        {/* Breadcrumb */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/">My Pets</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to="/claims/pets">Bruno</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Claims Dashboard</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Pet Claim Header */}
        <PetClaimHeader
          claimNumber="PETCLM00012345"
          petName="Bruno"
          ownerName="Arjun Mehta"
          ownerPhone="9876543210"
        />

        {/* Status Filters */}
        <ClaimStatusFilters />

        {/* Claims Table */}
        <ClaimsTable />
      </main>
    </div>
  );
};

export default PetClaimsDashboard;
