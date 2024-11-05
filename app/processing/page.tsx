"use client";

import { DashboardShell } from "@/components/shell";
import { DocumentProcessor } from "@/components/document-processor/document-processor";
import { FloatingActionPill } from "@/components/floating-action-pill";

export default function ProcessingPage() {
  return (
    <DashboardShell>
      <DocumentProcessor />
    </DashboardShell>
  );
}
