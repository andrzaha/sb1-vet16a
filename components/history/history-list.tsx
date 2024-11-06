"use client";

import { useMemo, useState } from "react";
import { logger } from "@/utils/logger";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  RotateCw,
  Trash2,
  ArrowUpDown
} from "lucide-react";
import { 
  ColumnDef
} from "@tanstack/react-table";

import { DataTable } from "@/components/shared/data-table";
import { FilePreview } from "@/components/document-processor/file-preview";
import { getStatusIcon } from "@/components/document-processor/status-utils";
import { ProcessingFile } from "@/components/document-processor/types";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { FloatingActionPill } from "@/components/floating-action-pill";
import { Document, exampleDocuments } from "./example-documents";

interface HistoryListProps {
  filter: string;
}

export function HistoryList({ filter }: HistoryListProps) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<ProcessingFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const columns: ColumnDef<Document>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <button 
          onClick={() => {
            const processingFile: ProcessingFile = {
              id: row.original.id,
              name: row.original.name,
              status: row.original.status,
              source: row.original.source,
              progress: row.original.progress,
              output: row.original.output,
              error: row.original.error,
              runtime: row.original.runtime
            };
            setSelectedFile(processingFile);
            setIsPreviewOpen(true);
          }}
          className="flex items-center gap-2 hover:text-primary transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span className="hover:underline">{row.getValue("name")}</span>
        </button>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as Document['status'];
        return (
          <div className="flex justify-center">
            {getStatusIcon(status)}
          </div>
        );
      },
    },
    {
      accessorKey: "type",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "size",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Size
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
  ];

  const filteredDocs = useMemo(() => {
    let result = [...exampleDocuments];
    
    // Apply status filter (excluding 'queued')
    if (filter !== "all") {
      // Only allow 'completed', 'processing', and 'failed' filters
      const validStatuses = ['completed', 'processing', 'failed'];
      if (validStatuses.includes(filter)) {
        result = result.filter(doc => doc.status === filter);
      }
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [filter, searchTerm]);

  const handleRowSelectionChange = (selection: Record<string, boolean>) => {
    setSelectedDocs(
      Object.keys(selection).map(key => filteredDocs[parseInt(key)].id)
    );
  };

  const handleBulkReprocess = () => {
    const selectedDocIds = selectedDocs;
    logger.info("Reprocessing documents:", selectedDocIds);
  };

  const handleBulkDelete = () => {
    const selectedDocIds = selectedDocs;
    logger.info("Deleting documents:", selectedDocIds);
  };

  return (
    <>
      <div className="relative flex gap-6">
        <Card className="flex-grow">
          <CardContent className="p-6">
            <DataTable 
              columns={columns} 
              data={filteredDocs}
              onRowSelectionChange={handleRowSelectionChange}
              searchKey="name"
              searchPlaceholder="Search by file name..."
            />
          </CardContent>
        </Card>

        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>
                {selectedFile?.name || 'Document Preview'}
              </DialogTitle>
            </DialogHeader>
            <FilePreview 
              file={selectedFile}
              showFileResults={true}
              isDialog={true}
            />
          </DialogContent>
        </Dialog>
      </div>

      <FloatingActionPill
        selectedCount={selectedDocs.length}
        actions={[
          {
            icon: <RotateCw className="h-4 w-4" />,
            label: "Reprocess",
            onClick: handleBulkReprocess,
          },
          {
            icon: <Trash2 className="h-4 w-4" />,
            label: "Delete",
            onClick: handleBulkDelete,
            variant: "destructive",
          },
        ]}
      />
    </>
  );
}
