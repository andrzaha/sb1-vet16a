"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { HistoryList } from "@/components/history-list";
import { HistoryFilters } from "@/components/history-filters";

export default function DocumentsPage() {
  const [filter, setFilter] = useState("all");

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8 min-h-0">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Processing History</h1>
          <p className="text-muted-foreground">
            View and manage your processed documents
          </p>
        </div>

        <HistoryFilters activeFilter={filter} onFilterChange={setFilter} />
        <HistoryList filter={filter} />
      </div>
    </DashboardShell>
  );
}