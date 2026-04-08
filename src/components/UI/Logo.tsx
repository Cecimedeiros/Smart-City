interface LogoProps {
  variant?: "white" | "purple";
}

export default function Logo({ variant = "white" }: LogoProps) {
  const color = variant === "white" ? "text-white" : "text-[#8528FF]";
  return (
    <span className={`text-2xl font-bold tracking-tight ${color}`}>
      Smart City
    </span>
  );
}
