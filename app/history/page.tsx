"use client";

import { useState, memo } from "react";
import { DashboardShell } from "@/components/shell";
import { HistoryList } from "@/components/history/history-list";
import { Button } from "@/components/ui/button";

export default function HistoryPage() {
  const [filter, setFilter] = useState("all");

  return (
    <DashboardShell>
      <div className="container mx-auto p-6 space-y-8 max-w-full overflow-x-hidden">
        <div className="flex justify-between items-center relative">
          <div>
            <h1 className="text-3xl font-bold">Document History</h1>
            <p className="text-muted-foreground">View and manage processed documents</p>
          </div>
          <div className="absolute right-0 top-0">
            {/* Add action buttons if needed */}
          </div>
        </div>

        <div className="flex space-x-2">
          {(['all', 'processing', 'completed', 'failed'] as const).map(status => (
            <Button
              key={status}
              variant={filter === status ? "secondary" : "ghost"}
              onClick={() => setFilter(status)}
              className="min-w-[120px] justify-center"
            >
              {status === 'all' ? 'All Documents' : 
               status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>

        <HistoryList filter={filter} />
      </div>
    </DashboardShell>
  );
}
