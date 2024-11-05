"use client";

import { Button } from "@/components/ui/button";

interface SchedulerFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function SchedulerFilters({ activeFilter, onFilterChange }: SchedulerFiltersProps) {
  const filters = [
    { id: "all", label: "All Jobs" },
    { id: "running", label: "Running Jobs" },
    { id: "queued", label: "Queued Jobs" },
    { id: "paused", label: "Paused Jobs" },
  ];

  return (
    <div className="flex space-x-2">
      {filters.map((filter) => (
        <Button
          key={filter.id}
          variant={activeFilter === filter.id ? "secondary" : "ghost"}
          onClick={() => onFilterChange(filter.id)}
          className="min-w-[120px] justify-center"
        >
          {filter.label}
        </Button>
      ))}
    </div>
  );
} 