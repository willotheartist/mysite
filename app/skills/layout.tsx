import type { ReactNode } from "react";
import NoHeader from "@/components/NoHeader"; 
// adjust if it actually lives under components/layout/NoHeader.tsx

export default function SkillsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <NoHeader />
      {children}
    </>
  );
}
