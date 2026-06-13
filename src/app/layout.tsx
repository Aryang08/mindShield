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

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased text-[var(--text-primary)] bg-[var(--bg-primary)]">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
