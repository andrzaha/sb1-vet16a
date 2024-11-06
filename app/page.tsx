"use client";

import { DashboardCards } from "@/components/dashboard/dashboard-cards";

const metrics = {
  totalProcessed: 1234,
  failedJobs: 23,
  averageProcessingTime: 3.5,
  successRate: 98.5,
  activeSchedules: 15,
  failedSchedules: 2
};

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <DashboardCards metrics={metrics} />
      {/* Add other dashboard components here */}
    </div>
  );
}