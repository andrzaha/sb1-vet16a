"use client";

import { DashboardShell } from "@/components/shell";
import { Settings } from "@/components/settings";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="container mx-auto p-6 space-y-8 max-w-full">
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        <Settings />
      </div>
    </DashboardShell>
  );
}