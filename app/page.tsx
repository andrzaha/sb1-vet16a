import { DashboardShell } from '@/components/shell';
import { ProcessingStats } from '@/components/processing-stats';
import { RecentDocuments } from '@/components/recent-documents';

export default function Home() {
  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Upload, process, and manage your documents with intelligent parsing and schema detection.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ProcessingStats />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <RecentDocuments />
        </div>
      </div>
    </DashboardShell>
  );
}