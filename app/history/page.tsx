"use client";

import { useState, memo } from "react";
import { DashboardShell } from "@/components/shell";
import { HistoryList } from "@/components/history-list";
import { HistoryFilters } from "@/components/history-filters";

export default function DocumentsPage() {
  const [filter, setFilter] = useState("all");

  const MemoizedHistoryFilters = memo(HistoryFilters);
  const MemoizedHistoryList = memo(HistoryList);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8 min-h-0">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Processing History</h1>
          <p className="text-muted-foreground">
            View and manage your processed documents
            </p>
          </div>
        </div>

        <MemoizedHistoryFilters activeFilter={filter} onFilterChange={setFilter} />
        <MemoizedHistoryList filter={filter} />
      </div>
    </DashboardShell>
  );
}