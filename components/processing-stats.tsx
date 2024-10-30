"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Clock, CheckCircle } from "lucide-react";

const stats = [
  {
    title: "Documents Processed",
    value: "1,234",
    icon: FileText,
    description: "Last 30 days",
  },
  {
    title: "Processing Time",
    value: "1.2s",
    icon: Clock,
    description: "Average",
  },
  {
    title: "Success Rate",
    value: "99.8%",
    icon: CheckCircle,
    description: "Last 30 days",
  },
];

export function ProcessingStats() {
  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}