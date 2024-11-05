"use client";

import { Button } from "@/components/ui/button";

interface TemplateFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export function TemplateFilters({ activeFilter, onFilterChange }: TemplateFiltersProps) {
  const filters = [
    { id: "default", label: "Default Templates" },
    { id: "user", label: "User-Created Templates" },
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