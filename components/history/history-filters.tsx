"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface HistoryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function HistoryFilters({ activeFilter, onFilterChange }: HistoryFiltersProps) {
  const filters = React.useMemo(() => [
    { id: "all", label: "All Documents" },
    { id: "completed", label: "Completed" },
    { id: "processing", label: "Processing" },
    { id: "failed", label: "Failed" },
  ], []);

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "secondary" : "ghost"}
          onClick={() => {
            try {
              onFilterChange(filter.id);
            } catch (error) {
              console.error("Error changing filter:", error);
            }
          }}
          className="min-w-[120px] justify-center"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}