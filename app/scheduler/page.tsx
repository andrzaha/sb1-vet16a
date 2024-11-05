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
      <div className="container mx-auto p-6 space-y-8 max-w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Job Scheduler</h1>
            <p className="text-muted-foreground">
              Configure automated document processing jobs
            </p>
          </div>
          <Button onClick={() => setShowConfig(true)}>
            <Plus className="mr-2 h-4 w-4" />
            New Job
          </Button>
        </div>

        <div className="relative flex gap-6">
          <div className="flex-grow w-full">
            <ScheduledJobs />
          </div>
        </div>

        <SchedulerConfig open={showConfig} onOpenChange={setShowConfig} />
      </div>
    </DashboardShell>
  );
}