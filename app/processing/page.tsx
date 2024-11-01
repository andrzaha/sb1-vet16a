"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { ProcessingConfig } from "@/components/processing-config";
import { ProcessingQueue } from "@/components/processing-queue";
import { ProcessingFilters } from "@/components/processing-filters";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function ProcessingPage() {
  const [showConfig, setShowConfig] = useState(false);
  const [filter, setFilter] = useState("all");

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Document Processing</h1>
            <p className="text-muted-foreground">
              Process documents from local storage or cloud providers
            </p>
          </div>
          <Button onClick={() => setShowConfig(true)}>
            <Upload className="mr-2 h-4 w-4" />
            Documents
          </Button>
        </div>

        <ProcessingFilters activeFilter={filter} onFilterChange={setFilter} />
        <ProcessingQueue filter={filter} />

        <Sheet open={showConfig} onOpenChange={setShowConfig}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Add/Process Documents</SheetTitle>
              <SheetDescription>
                Configure processing options and select files
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <ProcessingConfig onClose={() => setShowConfig(false)} />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardShell>
  );
} 