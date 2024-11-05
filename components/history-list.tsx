"use client";

import { useEffect, useMemo, useState } from "react";
import { logger } from "@/utils/logger";

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
import { 
  MoreHorizontal, 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  RotateCw,
  Eye,
  FileSearch,
  Download,
  Settings
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { FloatingActionPill } from "@/components/floating-action-pill";
import { DocumentActions } from "@/components/document-actions";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ProcessingConfig } from "@/components/processing-config";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HistoryListProps {
  filter: string;
}

const documents = [
  {
    id: "1",
    name: "Financial Report Q4.pdf",
    status: "completed", 
    type: "PDF",
    date: "2024-03-20",
    size: "2.4 MB",
  },
  {
    id: "2", 
    name: "Product Brochure.jpg",
    status: "completed",
    type: "JPG",
    date: "2024-03-19",
    size: "3.1 MB",
  },
  {
    id: "3",
    name: "Marketing Presentation.pdf",
    status: "failed",
    type: "PDF", 
    date: "2024-03-18",
    size: "5.2 MB",
    error: "Failed to parse document",
  },
  {
    id: "4",
    name: "Company Logo.png",
    status: "completed",
    type: "PNG",
    date: "2024-03-17",
    size: "256 KB",
  },
  {
    id: "5",
    name: "Annual Report.pdf",
    status: "processing",
    type: "PDF",
    date: "2024-03-16",
    size: "8.4 MB",
  },
  {
    id: "6", 
    name: "Team Photo.jpeg",
    status: "completed",
    type: "JPEG",
    date: "2024-03-15",
    size: "4.2 MB",
  },
  {
    id: "7",
    name: "Contract Draft.pdf",
    status: "failed",
    type: "PDF",
    date: "2024-03-14", 
    size: "892 KB",
    error: "Invalid format",
  },
  {
    id: "8",
    name: "Product Photos.gif",
    status: "processing",
    type: "GIF",
    date: "2024-03-13",
    size: "1.8 MB",
  },
  {
    id: "9",
    name: "User Manual.pdf",
    status: "completed",
    type: "PDF",
    date: "2024-03-12",
    size: "3.4 MB",
  },
  {
    id: "10",
    name: "Banner Design.webp",
    status: "completed", 
    type: "WEBP",
    date: "2024-03-11",
    size: "567 KB",
  },
];

const ITEMS_PER_PAGE = 6;

export function HistoryList({ filter }: HistoryListProps) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const getFilteredDocs = (filter: string) => {
    return filter === "all" 
      ? documents 
      : documents.filter(doc => doc.status === filter);
  };

  const getPaginatedDocs = (docs: Document[], currentPage: number) => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return docs.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  };

  const filteredDocs = useMemo(() => getFilteredDocs(filter), [filter, documents]);
  const paginatedDocs = useMemo(() => getPaginatedDocs(filteredDocs, currentPage), [filteredDocs, currentPage]);
  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);

  useEffect(() => {
    setSelectedDocs([]);
  }, [paginatedDocs]);

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedDocs(paginatedDocs.map(doc => doc.id));
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
    logger.info("Processing documents:", selectedDocs);
  };

  const handleReprocess = (options?: ProcessingOptions) => {
    logger.info("Reprocessing documents:", selectedDocs, options);
    setEditingConfig(null);
  };

  const handleDelete = () => {
    logger.info("Deleting documents:", selectedDocs);
    setSelectedDocs([]); // Clear selection after delete
  };

  const handlePreview = (docId: string) => {
    logger.info("Preview document:", docId);
  };

  const handleViewResults = (docId: string) => {
    logger.info("View results for document:", docId);
  };

  const handleExport = () => {
    logger.info("Exporting results for documents:", selectedDocs);
  };

  const [editingConfig, setEditingConfig] = useState<string | null>(null);

  const pillActions = [
    {
      icon: <Download className="h-4 w-4" />,
      label: "Export Results",
      onClick: handleExport,
      disabled: !selectedDocs.some(id => 
        documents.find(doc => doc.id === id)?.status === "completed"
      ),
    },
    {
      icon: <Settings className="h-4 w-4" />,
      label: "Reprocess Options",
      onClick: () => setEditingConfig(selectedDocs[0]),
      disabled: selectedDocs.some(id => {
        const doc = documents.find(d => d.id === id);
        return doc?.status !== "failed" && doc?.status !== "completed";
      }),
    },
    {
      icon: <RotateCw className="h-4 w-4" />,
      label: "Reprocess",
      onClick: () => handleReprocess(),
      disabled: selectedDocs.some(id => {
        const doc = documents.find(d => d.id === id);
        return doc?.status !== "failed" && doc?.status !== "completed";
      }),
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "Delete",
      onClick: handleDelete,
      variant: "destructive" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-4 relative">
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground min-w-[200px]">
          Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredDocs.length)} of {filteredDocs.length} entries
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
          <div className="text-sm min-w-[100px] text-center">
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
                  checked={selectedDocs.length === paginatedDocs.length}
                  onCheckedChange={handleSelectAll}
                />
              </TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Size</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDocs.map((doc) => (
              <TableRow key={doc.id} className="hover:bg-muted/50">
                <TableCell>
                  <Checkbox 
                    checked={selectedDocs.includes(doc.id)}
                    onCheckedChange={(checked) => handleSelectDoc(doc.id, checked as boolean)}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{doc.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {doc.status === "failed" ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Badge
                            variant="destructive"
                            className="cursor-help"
                          >
                            {doc.status}
                          </Badge>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-sm">{doc.error || "Unknown error"}</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <Badge
                      variant={
                        doc.status === "completed"
                          ? "success"
                          : doc.status === "processing"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {doc.status}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-muted-foreground">{doc.type}</TableCell>
                <TableCell className="text-muted-foreground">{doc.date}</TableCell>
                <TableCell className="text-muted-foreground">{doc.size}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <DocumentActions 
                      onPreview={() => handlePreview(doc.id)}
                      onViewResults={() => handleViewResults(doc.id)}
                      showResults={doc.status === "completed"}
                    />
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleReprocess()}>
                          <RotateCw className="mr-2 h-4 w-4" />
                          Reprocess
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <FloatingActionPill 
        selectedCount={selectedDocs.length}
        actions={pillActions}
      />

      <Sheet 
        open={!!editingConfig} 
        onOpenChange={() => setEditingConfig(null)}
      >
        <SheetContent className="sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>
              {selectedDocs.length > 1 
                ? "Update Processing Options for Multiple Files" 
                : "Update Processing Options"}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <ProcessingConfig
              mode="edit"
              onClose={() => setEditingConfig(null)}
              onSave={(options) => handleReprocess(options)}
              existingConfig={{
                schema: "invoice",
                extractInfo: true,
                reduceSize: true,
                reduceQuality: false,
                extractMetadata: true,
                processImmediately: true,
              }}
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}