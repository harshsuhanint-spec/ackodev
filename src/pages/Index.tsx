import { Header } from "@/components/Header";
import { LOBCard } from "@/components/LOBCard";

const lobCategories = [
  { title: "INTERNET", path: "/claims/internet" },
  { title: "ELECTRONICS", path: "/claims/electronics" },
  { title: "RETAIL TRAVEL", path: "/claims/retail-travel" },
  { title: "PETS", path: "/claims/pets" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="text-xl font-medium text-foreground mb-12">
          Please select the LOB
        </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {lobCategories.map((lob) => (
            <LOBCard key={lob.path} title={lob.title} path={lob.path} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
