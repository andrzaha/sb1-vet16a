"use client";

import { DashboardShell } from "@/components/shell";
import { DocumentProcessor } from "@/components/processor/document-processor";

export default function ProcessingPage() {
  return (
    <DashboardShell>
      <DocumentProcessor />
    </DashboardShell>
  );
}
