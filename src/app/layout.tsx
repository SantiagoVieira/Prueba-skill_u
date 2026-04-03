import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill_u — Marketplace Universitario",
  description: "Compra, vende y conecta con estudiantes de tu universidad.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
