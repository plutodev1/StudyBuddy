import type { Metadata } from "next";
import DashboardClient from "./study-dashboard";
import "./dashboard.css";

export const metadata: Metadata = {
  title: "StudyBuddy Dashboard",
  description: "Upload notes and generate AI study materials.",
};

export default function DashboardPage() {
  return <DashboardClient />;
}
