"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { MoreHorizontal, FileText, Play } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HistoryListProps {
  filter: string;
}

const documents = [
  {
    id: "1",
    name: "Financial Report Q4.pdf",
    status: "processed",
    type: "PDF",
    date: "2024-03-20",
    size: "2.4 MB",
  },
  {
    id: "2",
    name: "Contract Agreement.docx",
    status: "processing",
    type: "DOCX",
    date: "2024-03-19",
    size: "1.8 MB",
  },
  {
    id: "3",
    name: "Meeting Minutes.md",
    status: "failed",
    type: "MD",
    date: "2024-03-18",
    size: "156 KB",
  },
];

export function HistoryList({ filter }: HistoryListProps) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  
  const filteredDocs = filter === "all" 
    ? documents 
    : documents.filter(doc => doc.status === filter);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocs(filteredDocs.map(doc => doc.id));
    } else {
      setSelectedDocs([]);
    }
  };

  const handleSelectDoc = (docId: string, checked: boolean) => {
    if (checked) {
      setSelectedDocs([...selectedDocs, docId]);
    } else {
      setSelectedDocs(selectedDocs.filter(id => id !== docId));
    }
  };

  const handleProcess = () => {
    // TODO: Implement processing logic
    console.log("Processing documents:", selectedDocs);
  };

  return (
    <div className="flex flex-col gap-4">
      {selectedDocs.length > 0 && (
        <div className="flex items-center gap-4 p-4 bg-muted rounded-md">
          <span className="text-sm text-muted-foreground">
            {selectedDocs.length} document{selectedDocs.length > 1 ? 's' : ''} selected
          </span>
          <Button size="sm" onClick={handleProcess}>
            <Play className="h-4 w-4 mr-2" />
            Process Selected
          </Button>
        </div>
      )}
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">
                <Checkbox 
                  checked={selectedDocs.length === filteredDocs.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="w-[70px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocs.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>
                  <Checkbox 
                    checked={selectedDocs.includes(doc.id)}
                    onCheckedChange={(checked) => handleSelectDoc(doc.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4" />
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      doc.status === "processed"
                        ? "success"
                        : doc.status === "processing"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {doc.status}
                  </Badge>
                </TableCell>
                <TableCell>{doc.type}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Download</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleProcess()}>Process</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}