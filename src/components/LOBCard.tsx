import { useNavigate } from "react-router-dom";

interface LOBCardProps {
  title: string;
  path: string;
}

export function LOBCard({ title, path }: LOBCardProps) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className="px-8 py-4 bg-primary text-primary-foreground font-semibold text-sm tracking-wide rounded-md hover:bg-primary/90 transition-colors min-w-[140px]"
    >
      {title}
    </button>
  );
}
