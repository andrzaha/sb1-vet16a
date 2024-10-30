"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, ArrowUp, ArrowDown, AlertCircle } from "lucide-react";

const recentActivity = [
  {
    id: "1",
    filename: "Q4-Financial-Report.pdf",
    action: "upload",
    size: "2.4 MB",
    timestamp: "2 minutes ago",
    status: "complete"
  },
  {
    id: "2",
    filename: "Contract-Draft-v2.docx",
    action: "download",
    size: "1.8 MB",
    timestamp: "15 minutes ago",
    status: "complete"
  },
  {
    id: "3",
    filename: "Meeting-Notes.pdf",
    action: "upload",
    size: "542 KB",
    timestamp: "1 hour ago",
    status: "failed"
  },
  {
    id: "4",
    filename: "Product-Specs.pdf",
    action: "upload",
    size: "3.1 MB",
    timestamp: "2 hours ago",
    status: "complete"
  }
];

export function StorageStats() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage Used</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">58.1 GB</div>
            <p className="text-xs text-muted-foreground">of 150 GB total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upload Speed</CardTitle>
            <ArrowUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4 MB/s</div>
            <p className="text-xs text-muted-foreground">Average last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Download Speed</CardTitle>
            <ArrowDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5.1 MB/s</div>
            <p className="text-xs text-muted-foreground">Average last hour</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Failed Transfers</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Storage Usage</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>S3 Storage</span>
              <span>45.8 GB / 100 GB</span>
            </div>
            <Progress value={45.8} />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Azure Blob</span>
              <span>12.3 GB / 50 GB</span>
            </div>
            <Progress value={24.6} />
          </div>
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted p-4">
            <div>
              <p className="text-sm font-medium">Total Files</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <div>
              <p className="text-sm font-medium">Processing Queue</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recent Storage Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File Name</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id}>
                  <TableCell className="font-medium">{activity.filename}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {activity.action === 'upload' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                      {activity.action}
                    </div>
                  </TableCell>
                  <TableCell>{activity.size}</TableCell>
                  <TableCell>{activity.timestamp}</TableCell>
                  <TableCell>
                    <Badge variant={activity.status === 'complete' ? 'secondary' : 'destructive'}>
                      {activity.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}