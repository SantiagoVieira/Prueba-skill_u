import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skill_u — Acceso",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
