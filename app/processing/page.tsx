"use client";

import { DashboardShell } from "@/components/shell";
import { DocumentProcessor } from "@/components/document-processor/document-processor";

export default function ProcessingPage() {
  return (
    <DashboardShell>
      <DocumentProcessor />
    </DashboardShell>
  );
}
