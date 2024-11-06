"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Counter } from "@/components/ui/counter";
import { 
  BarChart3, 
  Clock, 
  FileCheck2, 
  FileX2,
  CalendarCheck,
  AlertCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

interface DashboardMetrics {
  totalProcessed: number;
  failedJobs: number;
  averageProcessingTime: number;
  successRate: number;
  activeSchedules: number;
  failedSchedules: number;
}

export function DashboardCards({ metrics }: { metrics: DashboardMetrics }) {
  const isFailureCard = (cardType: string) => {
    return ['failedJobs', 'failedSchedules'].includes(cardType);
  };

  const getCardClassName = (cardType: string) => {
    return cn(
      "relative overflow-hidden",
      isFailureCard(cardType) && metrics[cardType as keyof DashboardMetrics] > 0 && [
        "animate-pulse-subtle border-red-200 dark:border-red-900",
        "before:absolute before:inset-0 before:-z-10 before:bg-red-50/50 dark:before:bg-red-950/20",
        "hover:border-red-300 dark:hover:border-red-800 transition-colors"
      ]
    );
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Processed
          </CardTitle>
          <FileCheck2 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter value={metrics.totalProcessed} />
          </div>
          <p className="text-xs text-muted-foreground">
            Documents processed
          </p>
        </CardContent>
      </Card>

      <Card className={getCardClassName('failedJobs')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={cn(
            "text-sm font-medium",
            metrics.failedJobs > 0 && "text-red-600 dark:text-red-400"
          )}>
            Failed Jobs
          </CardTitle>
          <FileX2 className={cn(
            "h-4 w-4",
            metrics.failedJobs > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
          )} />
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-2xl font-bold",
            metrics.failedJobs > 0 && "text-red-600 dark:text-red-400"
          )}>
            <Counter value={metrics.failedJobs} />
          </div>
          <p className="text-xs text-muted-foreground">
            Failed processing attempts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Average Processing Time
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter 
              value={metrics.averageProcessingTime} 
              decimals={1} 
              suffix="s"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Per document
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Success Rate
          </CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter 
              value={metrics.successRate} 
              decimals={1}
              suffix="%"
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Processing success rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Schedules
          </CardTitle>
          <CalendarCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <Counter value={metrics.activeSchedules} />
          </div>
          <p className="text-xs text-muted-foreground">
            Running scheduled jobs
          </p>
        </CardContent>
      </Card>

      <Card className={getCardClassName('failedSchedules')}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className={cn(
            "text-sm font-medium",
            metrics.failedSchedules > 0 && "text-red-600 dark:text-red-400"
          )}>
            Failed Schedules
          </CardTitle>
          <AlertCircle className={cn(
            "h-4 w-4",
            metrics.failedSchedules > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"
          )} />
        </CardHeader>
        <CardContent>
          <div className={cn(
            "text-2xl font-bold",
            metrics.failedSchedules > 0 && "text-red-600 dark:text-red-400"
          )}>
            <Counter value={metrics.failedSchedules} />
          </div>
          <p className="text-xs text-muted-foreground">
            Failed scheduled jobs
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 