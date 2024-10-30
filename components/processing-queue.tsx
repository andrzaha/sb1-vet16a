"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { FileText, X, PlayCircle, PauseCircle } from "lucide-react";

const queueItems = [
  {
    id: "1",
    name: "Financial-Report-Q4.pdf",
    progress: 45,
    status: "processing",
    source: "local",
  },
  {
    id: "2",
    name: "Invoice-March-2024.pdf",
    progress: 100,
    status: "completed",
    source: "s3",
  },
  {
    id: "3",
    name: "Contract-Draft.docx",
    progress: 0,
    status: "queued",
    source: "azure",
  },
];

export function ProcessingQueue() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Queue</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {queueItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 rounded-lg border p-4"
            >
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.name}</span>
                  <Badge variant="outline">{item.source}</Badge>
                </div>
                {item.status === "processing" && (
                  <Progress value={item.progress} className="h-2" />
                )}
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      item.status === "completed"
                        ? "success"
                        : item.status === "processing"
                        ? "default"
                        : "secondary"
                    }
                  >
                    {item.status}
                  </Badge>
                  {item.progress === 100 && (
                    <span className="text-sm text-muted-foreground">
                      Completed
                    </span>
                  )}
                  {item.status === "processing" && (
                    <span className="text-sm text-muted-foreground">
                      {item.progress}%
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {item.status === "processing" && (
                  <Button variant="ghost" size="icon">
                    <PauseCircle className="h-4 w-4" />
                  </Button>
                )}
                {item.status === "queued" && (
                  <Button variant="ghost" size="icon">
                    <PlayCircle className="h-4 w-4" />
                  </Button>
                )}
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 