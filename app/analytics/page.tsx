import { DashboardShell } from "@/components/shell";
import { AnalyticsDashboard } from "@/components/analytics-dashboard";

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Document processing insights and metrics
          </p>
        </div>
        <AnalyticsDashboard />
      </div>
    </DashboardShell>
  );
}