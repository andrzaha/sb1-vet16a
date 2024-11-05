"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface SchedulerConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchedulerConfig({ open, onOpenChange }: SchedulerConfigProps) {
  const [enabled, setEnabled] = useState(false);

  const handleSave = () => {
    toast.success("Scheduler configuration saved successfully");
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Configure Processing Job</SheetTitle>
          <SheetDescription>
            Set up automated document processing schedules
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="scheduler-active">Enable Scheduler</Label>
            <Switch
              id="scheduler-active"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-name">Job Name</Label>
            <Input id="job-name" placeholder="Enter job name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cron">Schedule (Cron Expression)</Label>
            <Input id="cron" placeholder="*/30 * * * *" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="schema">Processing Schema</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select schema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">Invoice Schema</SelectItem>
                <SelectItem value="contract">Contract Schema</SelectItem>
                <SelectItem value="resume">Resume Schema</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="batch-size">Batch Size</Label>
            <Input
              id="batch-size"
              type="number"
              placeholder="Number of files to process"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="source">Source Path</Label>
            <Input id="source" placeholder="/incoming" />
          </div>
          <Button onClick={handleSave} className="w-full">
            Save Job Configuration
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}