"use client";

import * as React from "react";
import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "next-themes";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleGroup 
      type="single" 
      value={theme}
      onValueChange={(value) => {
        if (value) setTheme(value);
      }}
      className="bg-background border rounded-md h-9"
    >
      <ToggleGroupItem 
        value="light" 
        aria-label="Light mode" 
        className="data-[state=on]:bg-muted h-8 w-8 p-0 rounded-none first:rounded-l-[0.4rem]"
      >
        <Sun className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="dark" 
        aria-label="Dark mode" 
        className="data-[state=on]:bg-muted h-8 w-8 p-0 rounded-none border-x"
      >
        <Moon className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem 
        value="system" 
        aria-label="System mode" 
        className="data-[state=on]:bg-muted h-8 w-8 p-0 rounded-none last:rounded-r-[0.4rem]"
      >
        <Laptop className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}