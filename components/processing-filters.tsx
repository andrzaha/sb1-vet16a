"use client";

import { Button } from "@/components/ui/button";

interface ProcessingFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function ProcessingFilters({ activeFilter, onFilterChange }: ProcessingFiltersProps) {
  const filters = [
    { id: "all", label: "All Files" },
    { id: "queued", label: "Queued" },
    { id: "processing", label: "Processing" },
    { id: "completed", label: "Completed" },
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