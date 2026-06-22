export type FeatureIconId = "trophy" | "lab" | "faculty" | "placement" | "infrastructure" | "teaching";

type FeatureIconProps = {
  id: FeatureIconId;
  className?: string;
};

export default function FeatureIcon({ id, className = "h-7 w-7" }: FeatureIconProps) {
  const cn = `${className} text-brand-orange`;

  switch (id) {
    case "trophy":
    case "placement":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 3h14M9 3v2a3 3 0 006 0V3M5 3a2 2 0 00-2 2v1a4 4 0 004 4m12-7a2 2 0 012 2v1a4 4 0 01-4 4M7 10v1a5 5 0 0010 0v-1M9 21h6M12 17v4" />
        </svg>
      );
    case "lab":
    case "infrastructure":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "faculty":
    case "teaching":
      return (
        <svg className={cn} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
        </svg>
      );
  }
}
