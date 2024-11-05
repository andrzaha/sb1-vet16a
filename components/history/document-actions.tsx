"use client";

import { Button } from "@/components/ui/button";
import { Eye, FileSearch } from "lucide-react";

interface DocumentActionsProps {
  onPreview: () => void;
  onViewResults?: () => void;
  showResults?: boolean;
}

export function DocumentActions({ onPreview, onViewResults, showResults }: DocumentActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={onPreview}
        title="Preview Document"
      >
        <Eye className="h-4 w-4" />
      </Button>
      {showResults && onViewResults && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onViewResults}
          title="View Results"
        >
          <FileSearch className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
} 