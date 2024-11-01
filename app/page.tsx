import { DashboardShell } from '@/components/shell';
import { ProcessingStats } from '@/components/processing-stats';
import { RecentDocuments } from '@/components/recent-documents';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentErrors = [
  {
    id: "1",
    document: "Financial-Report-Q4.pdf",
    error: "Invalid schema mapping",
    time: "2 hours ago"
  },
  {
    id: "2",
    document: "Contract-v2.docx",
    error: "OCR processing failed",
    time: "5 hours ago"
  },
  {
    id: "3",
    document: "Invoice-2024-03.pdf",
    error: "Timeout during processing",
    time: "1 day ago"
  }
];

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
          <Card>
            <CardHeader>
              <CardTitle>Recent Errors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentErrors.map((error) => (
                  <div key={error.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{error.document}</p>
                      <p className="text-sm text-muted-foreground">{error.error}</p>
                    </div>
                    <Badge variant="outline">{error.time}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  );
}