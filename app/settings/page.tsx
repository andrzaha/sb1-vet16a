"use client";

import { DashboardShell } from "@/components/shell";
import { SettingsTabs } from "@/components/settings-tabs";

export default function SettingsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account and application preferences
          </p>
        </div>
        <SettingsTabs />
      </div>
    </DashboardShell>
  );
}