import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commercial Glass Services Atlanta | GlassXperts",
  description: "Commercial-only glass installation, storefront replacement, office partitions, commercial doors and emergency glass response across Metro Atlanta.",
};

export default function CommercialLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
