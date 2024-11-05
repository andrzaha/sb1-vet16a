"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { SchedulerConfig } from "@/components/sheduler/scheduler-config";
import { ScheduledJobs } from "@/components/sheduler/scheduled-jobs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function SchedulerPage() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Job Scheduler</h1>
            <p className="text-muted-foreground">
              Configure automated document processing jobs
            </p>
          </div>
          <Button onClick={() => setShowConfig(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Job
          </Button>
        </div>
        <ScheduledJobs />
        <SchedulerConfig open={showConfig} onOpenChange={setShowConfig} />
      </div>
    </DashboardShell>
  );
}