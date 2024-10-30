"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Play, Pause, Trash2, MoreHorizontal } from "lucide-react";
import { toast } from "sonner";

const jobs = [
  {
    id: "1",
    name: "Invoice Processing",
    schedule: "*/30 * * * *",
    status: "active",
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
    status: "active",
    lastRun: "2024-03-20 00:00",
    nextRun: "2024-03-21 00:00",
  },
];

export function ScheduledJobs() {
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);

  const isAllSelected = selectedJobs.length === jobs.length;
  const isAnySelected = selectedJobs.length > 0;

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs.map(job => job.id));
    }
  };

  const handleSelectJob = (jobId: string) => {
    if (selectedJobs.includes(jobId)) {
      setSelectedJobs(selectedJobs.filter(id => id !== jobId));
    } else {
      setSelectedJobs([...selectedJobs, jobId]);
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

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col space-y-4">
          <div className="flex h-10 items-center justify-between">
            <CardTitle>Scheduled Jobs</CardTitle>
            <div className="flex items-center gap-2">
              {isAnySelected ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('start')}
                  >
                    <Play className="mr-2 h-4 w-4" />
                    Start Selected
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleBulkAction('pause')}
                  >
                    <Pause className="mr-2 h-4 w-4" />
                    Pause Selected
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleBulkAction('delete')}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Selected
                  </Button>
                </>
              ) : null}
            </div>
          </div>
          <div className="border rounded-lg">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="px-4 py-3 text-left">
                    <Checkbox 
                      checked={isAllSelected}
                      onCheckedChange={handleSelectAll}
                    />
                  </th>
                  <th className="px-4 py-3 text-left font-medium">Name</th>
                  <th className="px-4 py-3 text-left font-medium">Schedule</th>
                  <th className="px-4 py-3 text-left font-medium">Status</th>
                  <th className="px-4 py-3 text-left font-medium">Last Run</th>
                  <th className="px-4 py-3 text-left font-medium">Next Run</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id} className="border-b last:border-0">
                    <td className="px-4 py-3">
                      <Checkbox 
                        checked={selectedJobs.includes(job.id)}
                        onCheckedChange={() => handleSelectJob(job.id)}
                      />
                    </td>
                    <td className="px-4 py-3 font-medium">{job.name}</td>
                    <td className="px-4 py-3 font-mono text-sm">{job.schedule}</td>
                    <td className="px-4 py-3">
                      <Badge variant={job.status === 'active' ? 'secondary' : 'outline'}>
                        {job.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{job.lastRun}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{job.nextRun}</td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
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
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}