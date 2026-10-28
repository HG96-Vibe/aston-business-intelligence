import type { Metadata } from "next";
import { BaPage } from "./ba";

export const metadata: Metadata = {
  alternates: { canonical: "/services/business-analysis/" },
  title: "Business Analysis",
  description: "Projects scoped before money is spent. Discovery & Scoping from £4,500: process maps, prioritised requirements, options appraisal and a specification any vendor can price.",
};

export default function BusinessAnalysisPage() {
  return <BaPage />;
}
