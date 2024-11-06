export interface ScheduledJob {
  id: string;
  name: string;
  schedule: string;
  status: 'running' | 'paused' | 'queued' | 'completed' | 'failed';
  lastRun: string;
  nextRun: string;
}

export const exampleJobs: ScheduledJob[] = [
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

export interface ExecutionHistory {
  id: number;
  startTime: string;
  endTime: string;
  status: 'completed' | 'failed';
  documentsProcessed?: number;
  error?: string;
}

export const executionHistory: ExecutionHistory[] = [
  { id: 1, startTime: "2024-03-20 15:30", endTime: "2024-03-20 15:35", status: "completed", documentsProcessed: 15 },
  { id: 2, startTime: "2024-03-20 15:00", endTime: "2024-03-20 15:05", status: "completed", documentsProcessed: 12 },
  { id: 3, startTime: "2024-03-20 14:30", endTime: "2024-03-20 14:32", status: "failed", error: "Connection timeout" },
  { id: 4, startTime: "2024-03-20 14:00", endTime: "2024-03-20 14:05", status: "completed", documentsProcessed: 18 },
];
