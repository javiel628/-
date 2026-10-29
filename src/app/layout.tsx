import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Order of the Veil",
  description: "A community dedicated to knowledge, integrity, unity, and personal growth."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
