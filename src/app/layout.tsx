import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MindShield AI — Your Mental Wellness Companion for Exam Success",
  description:
    "AI-powered mental wellness platform for students preparing for NEET, JEE, CUET, CAT, GATE, UPSC & Board Exams. Track mood, analyze journals, predict burnout, and get personalized wellness coaching.",
  keywords: [
    "mental wellness",
    "exam stress",
    "student wellness",
    "AI coach",
    "mood tracker",
    "burnout prediction",
    "NEET preparation",
    "JEE preparation",
    "UPSC preparation",
    "exam anxiety",
    "mindfulness",
    "stress management",
  ],
  authors: [{ name: "MindShield AI Team" }],
  openGraph: {
    title: "MindShield AI — AI Mental Wellness for Exam Students",
    description:
      "Monitor, understand, and improve your mental well-being during exam preparation with AI-powered insights.",
    type: "website",
  },
};

import { Outfit, Manrope } from 'next/font/google';
import { ThemeProvider } from "@/components/ThemeProvider";

const outfit = Outfit({ subsets: ['latin'], display: 'swap', variable: '--font-outfit' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap', variable: '--font-manrope' });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} ${outfit.variable} ${manrope.variable} antialiased text-[var(--on-background)] bg-[var(--background)]`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
