"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface ActionItem {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
}

interface FloatingActionPillProps {
  selectedCount: number;
  actions: ActionItem[];
}

export function FloatingActionPill({ selectedCount, actions }: FloatingActionPillProps) {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 animate-in fade-in slide-in-from-bottom-4">
      <div className="bg-background border rounded-full shadow-lg px-4 py-2.5 flex items-center gap-2">
        <span className="text-sm text-muted-foreground px-2">
          {selectedCount} selected
        </span>
        {actions.map((action, index) => (
          <div key={action.label} className="flex items-center">
            {index > 0 && <Separator orientation="vertical" className="h-4 mr-2" />}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={action.onClick}
              className={`gap-2 ${action.variant === "destructive" ? "text-destructive hover:text-destructive" : ""}`}
              disabled={action.disabled}
            >
              {action.icon}
              {action.label}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
} 