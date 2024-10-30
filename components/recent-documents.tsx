"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

const recentDocs = [
  {
    name: "Financial Report Q4.pdf",
    status: "Processed",
    date: "2024-03-20",
  },
  {
    name: "Contract Agreement.docx",
    status: "Processing",
    date: "2024-03-19",
  },
  {
    name: "Meeting Minutes.md",
    status: "Failed",
    date: "2024-03-18",
  },
];

export function RecentDocuments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentDocs.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center justify-between space-x-4"
            >
              <div className="flex items-center space-x-4">
                <FileText className="h-6 w-6 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium leading-none">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{doc.date}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className={`text-sm ${
                    doc.status === "Processed"
                      ? "text-green-500"
                      : doc.status === "Processing"
                      ? "text-blue-500"
                      : "text-red-500"
                  }`}
                >
                  {doc.status}
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Details</DropdownMenuItem>
                    <DropdownMenuItem>Download</DropdownMenuItem>
                    <DropdownMenuItem>Reprocess</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}