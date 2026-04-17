import Link from "next/link";
interface LogoProps {
  variant?: "white" | "purple";
}

export default function Logo({ variant = "white" }: LogoProps) {
  const color = variant === "white" ? "text-white" : "text-[#8528FF]";
  return (
    <Link href="/page">
      <span className={`text-2xl font-bold tracking-tight cursor-pointer ${color}`}>
        Smart City
      </span>
    </Link>
  );
}
