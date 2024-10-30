"use client";

import { Button } from "@/components/ui/button";

interface HistoryFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function HistoryFilters({ activeFilter, onFilterChange }: HistoryFiltersProps) {
  const filters = [
    { id: "all", label: "All Documents" },
    { id: "processed", label: "Processed" },
    { id: "processing", label: "Processing" },
    { id: "failed", label: "Failed" },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "secondary" : "ghost"}
          onClick={() => onFilterChange(filter.id)}
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
}