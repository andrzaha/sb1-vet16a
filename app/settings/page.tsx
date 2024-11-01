"use client";

import { DashboardShell } from "@/components/shell";
import { Settings } from "@/components/settings";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your document processing preferences and notifications
          </p>
        </div>
        <Settings />
      </div>
    </DashboardShell>
  );
}