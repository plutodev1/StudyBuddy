import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StudyBuddy | AI Study Partner",
  description: "StudyBuddy is an AI agent that helps students organize coursework, summarize lecture notes, and create effective study schedules. Perfect for the Nigerian university crowd.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Header />
        <main style={{ paddingTop: '80px', flex: 1 }}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
