import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { PetClaimHeader } from "@/components/PetClaimHeader";
import { ClaimStatusFilters } from "@/components/ClaimStatusFilters";
import { ClaimsTable } from "@/components/ClaimsTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
const PetClaimsDashboard = () => {
  const navigate = useNavigate();
  return <div className="min-h-screen bg-background">
      <Header />
      
    </div>;
};
export default PetClaimsDashboard;