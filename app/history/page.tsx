"use client";

import { useState, memo } from "react";
import { DashboardShell } from "@/components/shell";
import { HistoryList } from "@/components/history/history-list";
import { HistoryFilters } from "@/components/history/history-filters";

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");

  const MemoizedHistoryFilters = memo(HistoryFilters);
  const MemoizedHistoryList = memo(HistoryList);

  return (
    <DashboardShell>
      <div className="container mx-auto p-6 space-y-8 max-w-full overflow-x-hidden">
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-3xl font-bold">Document History</h1>
            <p className="text-muted-foreground">View and manage processed documents</p>
          </div>
          <div className="absolute right-0 top-0">
            {/* Add your action buttons or components here */}
            {/* Example: <Button>Upload</Button> */}
          </div>
        </div>
        
        <MemoizedHistoryList filter={filter} />
      </div>
    </DashboardShell>
  );
}