"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Play, Pause, Trash2, 
  ArrowUpDown 
} from "lucide-react";
import { toast } from "sonner";
import { FloatingActionPill } from "@/components/floating-action-pill";
import { SchedulerFilters } from "@/components/sheduler/scheduler-filters";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { 
  ScheduledJob, 
  exampleJobs, 
  ExecutionHistory, 
  executionHistory 
} from "./example-jobs";

export function ScheduledJobs() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState<ScheduledJob | null>(null);
  const [showJobStats, setShowJobStats] = useState(false);

  const columns: ColumnDef<ScheduledJob>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <button 
          onClick={() => {
            setSelectedJob(row.original);
            setShowJobStats(true);
          }}
          className="hover:text-primary transition-colors hover:underline text-left font-medium"
        >
          {row.getValue("name")}
        </button>
      ),
    },
    {
      accessorKey: "schedule",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Schedule
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.getValue("schedule")}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as ScheduledJob['status'];
        const statusStyles = {
          running: "text-green-500 bg-green-50",
          paused: "text-gray-500 bg-gray-50",
          queued: "text-yellow-500 bg-yellow-50",
          completed: "text-green-500 bg-green-50",
          failed: "text-red-500 bg-red-50"
        };
        return (
          <div className="flex justify-start">
            <div className={`flex items-center gap-2 px-2 py-1 rounded-full ${statusStyles[status]}`}>
              <div className={`h-2 w-2 rounded-full ${
                status === 'running' ? 'bg-green-500 animate-pulse' : 
                status === 'paused' ? 'bg-gray-500' :
                status === 'queued' ? 'bg-yellow-500' :
                status === 'completed' ? 'bg-green-500' :
                'bg-red-500'
              }`} />
              <span className="text-sm capitalize">{status}</span>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "lastRun",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Run
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "nextRun",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Next Run
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ];

  const filteredJobs = useMemo(() => {
    let result = [...exampleJobs];
    
    // Apply status filter
    if (filter !== "all") {
      result = result.filter(job => job.status === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(job => 
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [filter, searchTerm]);

  const handleRowSelectionChange = (selection: Record<string, boolean>) => {
    setSelectedJobs(
      Object.keys(selection).map(key => filteredJobs[parseInt(key)].id)
    );
  };

  const handleBulkAction = (action: 'start' | 'pause' | 'delete') => {
    const actionMessages = {
      start: 'Started',
      pause: 'Paused',
      delete: 'Deleted'
    };

    toast.success(`${actionMessages[action]} ${selectedJobs.length} jobs`);
    if (action === 'delete') {
      setSelectedJobs([]);
    }
  };

  const pillActions = [
    {
      icon: <Play className="h-4 w-4" />,
      label: "Start Selected",
      onClick: () => handleBulkAction('start'),
    },
    {
      icon: <Pause className="h-4 w-4" />,
      label: "Pause Selected",
      onClick: () => handleBulkAction('pause'),
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "Delete Selected",
      onClick: () => handleBulkAction('delete'),
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SchedulerFilters activeFilter={filter} onFilterChange={setFilter} />

      <DataTable 
        columns={columns} 
        data={filteredJobs}
        onRowSelectionChange={handleRowSelectionChange}
        searchKey="name"
        searchPlaceholder="Search by job name..."
        bordered={true}
      />

      <FloatingActionPill 
        selectedCount={selectedJobs.length}
        actions={pillActions}
      />

      <Sheet open={showJobStats} onOpenChange={setShowJobStats}>
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>{selectedJob?.name}</SheetTitle>
          </SheetHeader>
          <div className="mt-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Job Overview</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Schedule:</span>
                  <span className="font-mono">{selectedJob?.schedule}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center gap-2">
                    {selectedJob?.status === "running" && (
                      <>
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-green-500">Running</span>
                      </>
                    )}
                    {selectedJob?.status === "paused" && (
                      <>
                        <div className="h-2 w-2 bg-gray-500 rounded-full" />
                        <span className="text-gray-500">Paused</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Run:</span>
                  <span>{selectedJob?.lastRun}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Next Run:</span>
                  <span>{selectedJob?.nextRun}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Processing Statistics</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-2xl">85%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Avg. Duration</p>
                    <p className="text-2xl">5m</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Processing Success</span>
                    <span>85%</span>
                  </div>
                  <Progress value={85} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Recent Executions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {executionHistory.map((execution) => (
                    <div key={execution.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{execution.startTime}</p>
                        <p className="text-sm text-muted-foreground">
                          {execution.status === "completed" 
                            ? `${execution.documentsProcessed} documents processed`
                            : execution.error}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {execution.status === "completed" ? (
                          <div className="h-2 w-2 bg-green-500 rounded-full" />
                        ) : (
                          <div className="h-2 w-2 bg-red-500 rounded-full" />
                        )}
                        <span className={execution.status === "completed" ? "text-green-500" : "text-red-500"}>
                          {execution.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
