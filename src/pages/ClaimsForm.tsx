import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const lobTitles: Record<string, string> = {
  internet: "Internet",
  electronics: "Electronics",
  "retail-travel": "Retail Travel",
  pets: "Pets",
};

const ClaimsForm = () => {
  const { lob } = useParams<{ lob: string }>();
  const navigate = useNavigate();
  const title = lob ? lobTitles[lob] || lob : "Claims";

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="max-w-2xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm">Back to LOB Selection</span>
        </button>

        <Card>
          <CardHeader>
            <CardTitle>{title} Claims Form</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="Enter first name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Enter last name" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email address" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="Enter phone number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input id="policyNumber" placeholder="Enter policy number" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="claimDetails">Claim Details</Label>
              <Textarea
                id="claimDetails"
                placeholder="Describe your claim..."
                rows={4}
              />
            </div>

            <Button className="w-full">Submit Claim</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ClaimsForm;
