"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  FileText, 
  X, 
  PlayCircle, 
  PauseCircle, 
  ChevronLeft, 
  ChevronRight,
  Download,
  RotateCw,
  Play,
  Settings
} from "lucide-react";
import { DocumentActions } from "@/components/document-actions";
import { FloatingActionPill } from "@/components/floating-action-pill";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProcessingConfig, ProcessingOptions } from "@/components/processing-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
  {
    id: "4",
    name: "Meeting-Notes.pdf",
    progress: 75,
    status: "processing",
    source: "local",
  },
  {
    id: "5",
    name: "Product-Specs.docx",
    progress: 0,
    status: "failed",
    source: "s3",
    error: "Invalid document format",
  },
  {
    id: "6",
    name: "Customer-Data.xlsx",
    progress: 90,
    status: "processing",
    source: "local",
  },
  {
    id: "7",
    name: "Annual-Report.pdf",
    progress: 0,
    status: "failed",
    source: "azure",
    error: "Processing timeout",
  },
  {
    id: "8",
    name: "Employee-List.csv",
    progress: 100,
    status: "completed",
    source: "local",
  },
];

const ITEMS_PER_PAGE = 8;

interface ProcessingQueueProps {
  filter: string;
}

export function ProcessingQueue({ filter }: ProcessingQueueProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [editingItem, setEditingItem] = useState<string | null>(null);

  // Update filtering logic to include failed status
  const filteredItems = filter === "all" 
    ? queueItems 
    : queueItems.filter(item => {
        switch (filter) {
          case "completed":
            return item.status === "completed";
          case "processing":
            return item.status === "processing";
          case "queued":
            return item.status === "queued";
          case "failed":
            return item.status === "failed";
          default:
            return true;
        }
      });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(paginatedItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems([...selectedItems, itemId]);
    } else {
      setSelectedItems(selectedItems.filter(id => id !== itemId));
    }
  };

  const handlePreview = (itemId: string) => {
    console.log("Preview file:", itemId);
  };

  const handleViewResults = (itemId: string) => {
    console.log("View results for:", itemId);
  };

  const handleProcess = () => {
    console.log("Processing items:", selectedItems);
  };

  const handleRemove = () => {
    console.log("Removing items:", selectedItems);
    setSelectedItems([]);
  };

  const handleEditOptions = (itemId: string | string[]) => {
    const isMultiple = Array.isArray(itemId);
    console.log(`Editing options for ${isMultiple ? 'multiple items' : 'item'}:`, itemId);
    setEditingItem(Array.isArray(itemId) ? itemId[0] : itemId);
  };

  const pillActions = [
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Edit Options",
      onClick: () => handleEditOptions(selectedItems),
    },
    {
      icon: <Play className="h-4 w-4" />,
      label: "Process",
      onClick: handleProcess,
      disabled: selectedItems.some(id => 
        queueItems.find(item => item.id === id)?.status === "processing"
      ),
    },
    {
      icon: <X className="h-4 w-4" />,
      label: "Remove",
      onClick: handleRemove,
      variant: "destructive" as const,
    },
  ];

  const handleUpdateOptions = (options: ProcessingOptions) => {
    console.log("Updating options for item:", editingItem, options);
    setEditingItem(null);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredItems.length)} of {filteredItems.length} items
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
                  checked={selectedItems.length === paginatedItems.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedItems.map((item) => (
              <TableRow key={item.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox 
                    checked={selectedItems.includes(item.id)}
                    onCheckedChange={(checked) => handleSelectItem(item.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{item.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {item.status === "failed" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="destructive"
                            className="cursor-help"
                          >
                            {item.status}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{item.error || "Unknown error"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
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
                  )}
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{item.source}</Badge>
                </TableCell>
                <TableCell>
                  {item.status === "processing" && (
                    <div className="flex items-center gap-2">
                      <Progress value={item.progress} className="h-2 w-[100px]" />
                      <span className="text-sm text-muted-foreground">
                        {item.progress}%
                      </span>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <DocumentActions 
                      onPreview={() => handlePreview(item.id)}
                      onViewResults={() => handleViewResults(item.id)}
                      showResults={item.status === "completed"}
                    />
                    {item.status !== "processing" && (
                      <>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditOptions(item.id)}
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleProcess()}
                        >
                          <Play className="h-4 w-4" />
                        </Button>
                      </>
                    )}
                    {item.status === "processing" && (
                      <Button variant="ghost" size="icon">
                        <PauseCircle className="h-4 w-4" />
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleRemove()}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FloatingActionPill 
        selectedCount={selectedItems.length}
        actions={pillActions}
      />

      <Sheet 
        open={!!editingItem} 
        onOpenChange={() => setEditingItem(null)}
      >
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {selectedItems.length > 1 
                ? "Edit Processing Options for Multiple Files" 
                : "Edit Processing Options"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ProcessingConfig
              mode="edit"
              onClose={() => setEditingItem(null)}
              onSave={handleUpdateOptions}
              existingConfig={{
                schema: "invoice",
                extractInfo: true,
                reduceSize: true,
                reduceQuality: false,
                extractMetadata: true,
                processImmediately: false,
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
} 