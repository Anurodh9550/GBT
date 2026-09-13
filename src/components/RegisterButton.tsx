import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

type RegisterButtonProps = {
  className?: string;
  variant?: "primary" | "outline" | "outline-white" | "inline";
};

const variants: Record<NonNullable<RegisterButtonProps["variant"]>, string> = {
  primary: "btn-primary",
  outline:
    "inline-flex items-center gap-2 rounded-full border-2 border-brand-orange bg-white px-5 py-2.5 text-sm font-bold text-brand-orange transition hover:bg-brand-orange hover:text-white",
  "outline-white": "btn-outline-white",
  inline: "font-bold text-brand-orange hover:underline",
};

export default function RegisterButton({
  className = "",
  variant = "primary",
}: RegisterButtonProps) {
  return (
    <Link href="/admissions" className={`${variants[variant]} ${className}`.trim()}>
      {siteConfig.registerCtaLabel}
      {variant !== "inline" && <span aria-hidden="true"> →</span>}
    </Link>
  );
}
