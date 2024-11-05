"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Play, Pause, Trash2, MoreHorizontal, ChevronLeft, ChevronRight, Search, ArrowUpDown } from "lucide-react";
import { toast } from "sonner";
import { FloatingActionPill } from "@/components/floating-action-pill";
import { SchedulerFilters } from "@/components/sheduler/scheduler-filters";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const jobs = [
  {
    id: "1",
    name: "Invoice Processing",
    schedule: "*/30 * * * *",
    status: "running",
    lastRun: "2024-03-20 15:30",
    nextRun: "2024-03-20 16:00",
  },
  {
    id: "2",
    name: "Contract Validation",
    schedule: "0 */2 * * *",
    status: "paused",
    lastRun: "2024-03-20 14:00",
    nextRun: "2024-03-20 16:00",
  },
  {
    id: "3",
    name: "Resume Parser",
    schedule: "0 0 * * *",
    status: "running",
    lastRun: "2024-03-20 00:00",
    nextRun: "2024-03-21 00:00",
  },
  {
    id: "4",
    name: "Daily Reports",
    schedule: "0 9 * * *",
    status: "running",
    lastRun: "2024-03-20 09:00",
    nextRun: "2024-03-21 09:00",
  },
  {
    id: "5",
    name: "Data Backup",
    schedule: "0 */4 * * *",
    status: "queued",
    lastRun: "2024-03-20 12:00",
    nextRun: "2024-03-20 16:00",
  },
  {
    id: "6",
    name: "Weekly Analytics",
    schedule: "0 0 * * 1",
    status: "running",
    lastRun: "2024-03-18 00:00",
    nextRun: "2024-03-25 00:00",
  },
  {
    id: "7",
    name: "Monthly Report",
    schedule: "0 0 1 * *",
    status: "completed",
    lastRun: "2024-03-01 00:00",
    nextRun: "2024-04-01 00:00",
  },
];

const ITEMS_PER_PAGE = 6;

export function ScheduledJobs() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<{ id: string; desc: boolean } | null>(null);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  const [showJobStats, setShowJobStats] = useState(false);

  // Filter jobs based on the selected filter
  const filteredJobs = useMemo(() => {
    let result = jobs;
    
    // Apply status filter
    if (filter !== "all") {
      result = filter === "running"
        ? result.filter(job => job.status === "running")
        : result.filter(job => job.status === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(job => 
        job.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [filter, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedJobs = filteredJobs.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedJobs(paginatedJobs.map(job => job.id));
    } else {
      setSelectedJobs([]);
    }
  };

  const handleSelectJob = (jobId: string, checked: boolean) => {
    if (checked) {
      setSelectedJobs([...selectedJobs, jobId]);
    } else {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    }
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

  // Add mock execution history
  const executionHistory = [
    { id: 1, startTime: "2024-03-20 15:30", endTime: "2024-03-20 15:35", status: "completed", documentsProcessed: 15 },
    { id: 2, startTime: "2024-03-20 15:00", endTime: "2024-03-20 15:05", status: "completed", documentsProcessed: 12 },
    { id: 3, startTime: "2024-03-20 14:30", endTime: "2024-03-20 14:32", status: "failed", error: "Connection timeout" },
    { id: 4, startTime: "2024-03-20 14:00", endTime: "2024-03-20 14:05", status: "completed", documentsProcessed: 18 },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SchedulerFilters activeFilter={filter} onFilterChange={setFilter} />

      <div className="rounded-md border bg-card">
        <div className="flex items-center justify-between py-4 px-4">
          <div className="relative max-w-sm">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by job name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-8 max-w-sm"
            />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedJobs.length === paginatedJobs.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSorting(sorting?.id === 'name' && !sorting.desc
                      ? null
                      : { id: 'name', desc: sorting?.id === 'name' })
                  }}
                  className="flex items-center"
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSorting(sorting?.id === 'schedule' && !sorting.desc
                      ? null
                      : { id: 'schedule', desc: sorting?.id === 'schedule' })
                  }}
                >
                  Schedule
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSorting(sorting?.id === 'status' && !sorting.desc
                      ? null
                      : { id: 'status', desc: sorting?.id === 'status' })
                  }}
                  className="w-full"
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSorting(sorting?.id === 'lastRun' && !sorting.desc
                      ? null
                      : { id: 'lastRun', desc: sorting?.id === 'lastRun' })
                  }}
                >
                  Last Run
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => {
                    setSorting(sorting?.id === 'nextRun' && !sorting.desc
                      ? null
                      : { id: 'nextRun', desc: sorting?.id === 'nextRun' })
                  }}
                >
                  Next Run
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedJobs.map((job) => (
              <TableRow key={job.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox 
                    checked={selectedJobs.includes(job.id)}
                    onCheckedChange={(checked) => handleSelectJob(job.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <button 
                    onClick={() => {
                      setSelectedJob(job);
                      setShowJobStats(true);
                    }}
                    className="hover:text-primary transition-colors hover:underline text-left font-medium"
                  >
                    {job.name}
                  </button>
                </TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">
                  {job.schedule}
                </TableCell>
                <TableCell>
                  <div className="flex justify-start">
                    {job.status === "running" && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
                        <span className="text-sm text-green-500">Running</span>
                      </div>
                    )}
                    {job.status === "failed" && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-red-500 rounded-full" />
                        <span className="text-sm text-red-500">Failed</span>
                      </div>
                    )}
                    {job.status === "queued" && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-yellow-500 rounded-full" />
                        <span className="text-sm text-yellow-500">Queued</span>
                      </div>
                    )}
                    {job.status === "completed" && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-green-500 rounded-full" />
                        <span className="text-sm text-green-500">Completed</span>
                      </div>
                    )}
                    {job.status === "paused" && (
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 bg-gray-500 rounded-full" />
                        <span className="text-sm text-gray-500">Paused</span>
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {job.lastRun}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {job.nextRun}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <div className="flex items-center justify-between px-4 py-4 border-t">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} jobs
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

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