"use client";

import { Button } from "@/components/ui/button";

interface SchedulerFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function SchedulerFilters({ activeFilter, onFilterChange }: SchedulerFiltersProps) {
  const filters = [
    { id: "all", label: "All Jobs" },
    { id: "active", label: "Active Jobs" },
    { id: "paused", label: "Paused Jobs" },
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