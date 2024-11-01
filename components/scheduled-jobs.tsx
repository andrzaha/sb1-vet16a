"use client";

import { useState } from "react";
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
import { Play, Pause, Trash2, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { FloatingActionPill } from "@/components/floating-action-pill";
import { SchedulerFilters } from "@/components/scheduler-filters";

const jobs = [
  {
    id: "1",
    name: "Invoice Processing",
    schedule: "*/30 * * * *",
    status: "active",
    lastRun: "2024-03-20 15:30",
    nextRun: "2024-03-20 16:00",
    isRunning: true,
  },
  {
    id: "2",
    name: "Contract Validation",
    schedule: "0 */2 * * *",
    status: "paused",
    lastRun: "2024-03-20 14:00",
    nextRun: "2024-03-20 16:00",
    isRunning: false,
  },
  {
    id: "3",
    name: "Resume Parser",
    schedule: "0 0 * * *",
    status: "active",
    lastRun: "2024-03-20 00:00",
    nextRun: "2024-03-21 00:00",
    isRunning: true,
  },
  {
    id: "4",
    name: "Daily Reports",
    schedule: "0 9 * * *",
    status: "active",
    lastRun: "2024-03-20 09:00",
    nextRun: "2024-03-21 09:00",
    isRunning: false,
  },
  {
    id: "5",
    name: "Data Backup",
    schedule: "0 */4 * * *",
    status: "paused",
    lastRun: "2024-03-20 12:00",
    nextRun: "2024-03-20 16:00",
    isRunning: false,
  },
  {
    id: "6",
    name: "Weekly Analytics",
    schedule: "0 0 * * 1",
    status: "active",
    lastRun: "2024-03-18 00:00",
    nextRun: "2024-03-25 00:00",
    isRunning: true,
  },
  {
    id: "7",
    name: "Monthly Report",
    schedule: "0 0 1 * *",
    status: "active",
    lastRun: "2024-03-01 00:00",
    nextRun: "2024-04-01 00:00",
    isRunning: false,
  },
];

const ITEMS_PER_PAGE = 5;

export function ScheduledJobs() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState("all");

  // Filter jobs based on the selected filter
  const filteredJobs = filter === "all"
    ? jobs
    : jobs.filter(job => job.status === filter);

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

  return (
    <div className="flex flex-col gap-4">
      <SchedulerFilters activeFilter={filter} onFilterChange={setFilter} />

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredJobs.length)} of {filteredJobs.length} jobs
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="text-sm">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-muted/50">
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedJobs.length === paginatedJobs.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Schedule</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Running</TableHead>
              <TableHead>Last Run</TableHead>
              <TableHead>Next Run</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                <TableCell className="font-medium">{job.name}</TableCell>
                <TableCell className="font-mono text-sm text-muted-foreground">{job.schedule}</TableCell>
                <TableCell>
                  <Badge variant={job.status === 'active' ? 'success' : 'outline'}>
                    {job.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {job.isRunning ? (
                    <div className="flex items-center">
                      <div className="animate-pulse h-2 w-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="text-sm text-green-500">Running</span>
                    </div>
                  ) : (
                    <span className="text-sm text-muted-foreground">Not Running</span>
                  )}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.lastRun}</TableCell>
                <TableCell className="text-sm text-muted-foreground">{job.nextRun}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Play className="mr-2 h-4 w-4" /> Start Job
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pause className="mr-2 h-4 w-4" /> Pause Job
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="mr-2 h-4 w-4" /> Delete Job
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FloatingActionPill 
        selectedCount={selectedJobs.length}
        actions={pillActions}
      />
    </div>
  );
}