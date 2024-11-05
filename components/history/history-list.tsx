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
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  RotateCw,
  ArrowUpDown,
  CheckCircle,
  XCircle,
  RefreshCw,
  Clock,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ColumnDef, 
  ColumnFiltersState, 
  SortingState, 
  VisibilityState, 
  flexRender, 
  getCoreRowModel, 
  getFilteredRowModel, 
  getPaginationRowModel, 
  getSortedRowModel, 
  useReactTable,
  HeaderGroup,
  Row,
  Cell
} from "@tanstack/react-table";
import { cn } from "@/lib/utils";

import { FilePreview } from "@/components/document-processor/file-preview";
import { getStatusIcon } from "@/components/document-processor/status-utils";
import { Card, CardContent } from "@/components/ui/card";
import { ProcessingFile } from "@/components/document-processor/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface HistoryListProps {
  filter: string;
}

type DocumentStatus = 'completed' | 'processing' | 'failed' | 'queued';

interface Document extends ProcessingFile {
  type: string;
  date: string;
  size: string;
  error?: string;
}

const documents: Document[] = [
  {
    id: "1",
    name: "Financial Report Q4.pdf",
    status: "completed", 
    type: "PDF",
    date: "2024-03-20",
    size: "2.4 MB",
    source: 'local',
    progress: 100,
    output: {
      markdown: "# Financial Report Q4\n\n## Key Highlights\n- Revenue: $1.2M\n- Expenses: $800K\n- Net Profit: $400K",
      structured: {
        revenue: 1200000,
        expenses: 800000,
        netProfit: 400000
      }
    }
  },
  {
    id: "2", 
    name: "Product Brochure.jpg",
    status: "completed",
    type: "JPG",
    date: "2024-03-19",
    size: "3.1 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "3",
    name: "Marketing Presentation.pdf",
    status: "failed",
    type: "PDF", 
    date: "2024-03-18",
    size: "5.2 MB",
    source: 'local',
    progress: 30,
    error: "Failed to parse document"
  },
  {
    id: "4",
    name: "Company Logo.png",
    status: "completed",
    type: "PNG",
    date: "2024-03-17",
    size: "256 KB",
    source: 'local',
    progress: 100
  },
  {
    id: "5",
    name: "Annual Report.pdf",
    status: "processing",
    type: "PDF",
    date: "2024-03-16",
    size: "8.4 MB",
    source: 'local',
    progress: 45
  },
  {
    id: "6", 
    name: "Team Photo.jpeg",
    status: "completed",
    type: "JPEG",
    date: "2024-03-15",
    size: "4.2 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "7",
    name: "Contract Draft.pdf",
    status: "failed",
    type: "PDF",
    date: "2024-03-14", 
    size: "892 KB",
    source: 'local',
    progress: 30,
    error: "Invalid format"
  },
  {
    id: "8",
    name: "Product Photos.gif",
    status: "processing",
    type: "GIF",
    date: "2024-03-13",
    size: "1.8 MB",
    source: 'local',
    progress: 60
  },
  {
    id: "9",
    name: "User Manual.pdf",
    status: "completed",
    type: "PDF",
    date: "2024-03-12",
    size: "3.4 MB",
    source: 'local',
    progress: 100
  },
  {
    id: "10",
    name: "Banner Design.webp",
    status: "completed", 
    type: "WEBP",
    date: "2024-03-11",
    size: "567 KB",
    source: 'local',
    progress: 100
  },
];

const ITEMS_PER_PAGE = 6;

export function HistoryList({ filter }: HistoryListProps) {
  const [selectedDocs, setSelectedDocs] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState<ProcessingFile | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
          className="w-full"
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const status = row.getValue("status") as DocumentStatus;
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
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const doc = row.original;
        return (
          <div className="flex items-center justify-end gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleReprocess(doc.id)}
              title="Reprocess"
            >
              <RotateCw className="h-4 w-4" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleDelete(doc.id)}
              title="Delete"
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
  ];

  const filteredDocs = useMemo(() => {
    let result = documents;
    
    // Filter by status
    if (filter !== "all") {
      result = result.filter(doc => doc.status === filter);
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    return result;
  }, [filter, searchTerm]);

  const table = useReactTable({
    data: filteredDocs,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);

  const handleReprocess = (docId: string) => {
    logger.info("Reprocessing document:", docId);
  };

  const handleDelete = (docId: string) => {
    logger.info("Deleting document:", docId);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <div className="relative flex gap-6">
        <Card className={cn(
          "flex-grow transition-all duration-150 ease-out", 
          isPreviewOpen ? "w-1/2" : "w-full"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between py-4">
              <div className="relative flex-grow max-w-sm">
                <Input 
                  placeholder="Search by file name"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              </div>
            </div>

            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup: HeaderGroup<Document>) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row: Row<Document>) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell: Cell<Document, unknown>) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
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

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to {Math.min(currentPage * ITEMS_PER_PAGE, filteredDocs.length)} of {filteredDocs.length} entries
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
    </div>
  );
}
