'use client'

import { useState, useEffect, useMemo } from 'react'
import { Upload, FileText, Settings, Eye, Play, Trash2, Download, RefreshCw, CheckCircle, XCircle, Clock, AlertCircle, ArrowUpDown, Info, FolderTree, Check, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type FileStatus = 'queued' | 'processing' | 'completed' | 'failed'
type FileSource = 'local' | 's3' | 'azure' | 'gcs'
type ViewMode = 'original' | 'markdown' | 'structured'

interface ProcessingFile {
  id: string
  name: string
  status: FileStatus
  source: FileSource
  progress: number
  runtime?: number
  error?: string
  output?: {
    markdown?: string
    structured?: object
  }
}

const schemas = [
  { label: "Dynamic Schema", value: "dynamic" },
  { label: "Predefined Schema", value: "predefined" },
  { label: "Custom Schema", value: "custom" },
]

export function DocumentProcessor() {
  const [files, setFiles] = useState<ProcessingFile[]>([
    { id: '1', name: 'Financial-Report-Q4.pdf', status: 'processing', source: 'local', progress: 45, runtime: 120 },
    { id: '2', name: 'Invoice-March-2024.pdf', status: 'completed', source: 's3', progress: 100, runtime: 180 },
    { id: '3', name: 'Contract-Draft.docx', status: 'queued', source: 'azure', progress: 0 },
    { id: '4', name: 'Meeting-Notes.pdf', status: 'processing', source: 'local', progress: 75, runtime: 90 },
    { id: '5', name: 'Product-Specs.docx', status: 'failed', source: 's3', progress: 30, error: 'Invalid format' },
    { id: '6', name: 'Customer-Data.xlsx', status: 'processing', source: 'local', progress: 90, runtime: 150 }
  ])
  const [selectedFile, setSelectedFile] = useState<ProcessingFile | null>(null)
  const [activeTab, setActiveTab] = useState<FileStatus | 'all'>('all')
  const [viewMode, setViewMode] = useState<ViewMode>('original')
  const [extractionEnabled, setExtractionEnabled] = useState(false)
  const [selectedSchema, setSelectedSchema] = useState<string>('')
  const [cloudProvider, setCloudProvider] = useState<FileSource>('s3')
  const [cloudPath, setCloudPath] = useState('')
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [showFileResults, setShowFileResults] = useState(false)

  const filteredFiles = useMemo(() => {
    return files.filter(file => activeTab === 'all' ? true : file.status === activeTab)
  }, [files, activeTab])

  const columns: ColumnDef<ProcessingFile>[] = [
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <button 
          onClick={() => {
            setSelectedFile(row.original);
            setShowFileResults(true);
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="w-full"
          >
            Status
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const status = row.getValue("status") as FileStatus
        const runtime = row.original.runtime
        
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center justify-center">
                  {getStatusIcon(status)}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-sm">
                  <p>Status: {status}</p>
                  {runtime && <p>Runtime: {runtime}s</p>}
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )
      },
    },
    {
      accessorKey: "source",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Source
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <Badge variant="outline">{row.getValue("source")}</Badge>,
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }) => (
        <Progress value={row.getValue("progress")} className="w-[100px] h-1" />
      ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const file = row.original
        return (
          <div className="flex justify-end gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    disabled={file.status !== 'queued'}
                  >
                    <Play className="w-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Process
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Settings className="w-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Settings
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="w-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  Delete
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredFiles,
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
  })

  const getStatusIcon = (status: FileStatus) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      case 'processing':
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return null
    }
  }

  useEffect(() => {
    if (!selectedFile && filteredFiles.length > 0) {
      setSelectedFile(filteredFiles[0])
    }
  }, [filteredFiles, selectedFile])

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Document Processing</h1>
          <p className="text-muted-foreground">
            Process documents from local storage or cloud providers
          </p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>
              <Upload className="mr-2 h-4 w-4" />
              New Document
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[400px] sm:w-[540px]">
            <SheetHeader>
              <SheetTitle>Add/Process Documents</SheetTitle>
            </SheetHeader>
            <div className="grid gap-6 mt-4">
              <Tabs defaultValue="local">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="local">Local Files</TabsTrigger>
                  <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
                </TabsList>
                <TabsContent value="local" className="space-y-4">
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mb-2">
                      Drag and drop files here or click to browse
                    </p>
                    <Button>Choose Files</Button>
                  </div>
                </TabsContent>
                <TabsContent value="cloud" className="space-y-4">
                  <Select value={cloudProvider} onValueChange={(value: FileSource) => setCloudProvider(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select storage provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="s3">Amazon S3</SelectItem>
                      <SelectItem value="azure">Azure Blob Storage</SelectItem>
                      <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex items-center space-x-2">
                    <FolderTree className="w-4 h-4" />
                    <Input 
                      placeholder={`Enter ${cloudProvider} file path`}
                      value={cloudPath}
                      onChange={(e) => setCloudPath(e.target.value)}
                    />
                  </div>
                </TabsContent>
              </Tabs>
              <div className="space-y-4">
                <h4 className="font-medium">Processing Options</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="extract" 
                      checked={extractionEnabled}
                      onCheckedChange={(checked) => setExtractionEnabled(checked as boolean)}
                    />
                    <label htmlFor="extract" className="text-sm">
                      Enable Key Information Extraction
                    </label>
                  </div>
                  {extractionEnabled && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          className="w-full justify-between"
                        >
                          {selectedSchema
                            ? schemas.find((schema) => schema.value === selectedSchema)?.label
                            : "Select schema..."}
                          <ArrowUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput  placeholder="Search schema..." />
                          <CommandEmpty>No schema found.</CommandEmpty>
                          <CommandGroup>
                            {schemas.map((schema) => (
                              <CommandItem
                                key={schema.value}
                                value={schema.value}
                                onSelect={() => {
                                  setSelectedSchema(schema.value === selectedSchema ? "" : schema.value)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    selectedSchema === schema.value ? "opacity-100" : "opacity-0"
                                  )}
                                />
                                {schema.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  )}
                  <div className="flex items-center space-x-2">
                    <Checkbox id="immediate" />
                    <label htmlFor="immediate" className="text-sm">
                      Process Immediately
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="metadata" defaultChecked />
                    <label htmlFor="metadata" className="text-sm">
                      Extract Metadata
                    </label>
                  </div>
                </div>
              </div>
              <Button>Save</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <div className="flex space-x-2">
        <Button
          variant={activeTab === 'all' ? "secondary" : "ghost"}
          onClick={() => setActiveTab('all')}
          className="min-w-[120px] justify-center"
        >
          All Documents
        </Button>
        <Button
          variant={activeTab === 'queued' ? "secondary" : "ghost"}
          onClick={() => setActiveTab('queued')}
          className="min-w-[120px] justify-center"
        >
          Queued
        </Button>
        <Button
          variant={activeTab === 'processing' ? "secondary" : "ghost"}
          onClick={() => setActiveTab('processing')}
          className="min-w-[120px] justify-center"
        >
          Processing
        </Button>
        <Button
          variant={activeTab === 'completed' ? "secondary" : "ghost"}
          onClick={() => setActiveTab('completed')}
          className="min-w-[120px] justify-center"
        >
          Completed
        </Button>
        <Button
          variant={activeTab === 'failed' ? "secondary" : "ghost"}
          onClick={() => setActiveTab('failed')}
          className="min-w-[120px] justify-center"
        >
          Failed
        </Button>
      </div>

      <div className="relative flex gap-6">
        <Card className={cn(
          "flex-grow transition-all duration-150 ease-out", 
          showFileResults ? "w-1/2" : "w-full"
        )}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between py-4">
              <Input
                placeholder="Filter files..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) =>
                  table.getColumn("name")?.setFilterValue(event.target.value)
                }
                className="max-w-sm"
              />
            </div>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
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
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
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
            <div className="flex items-center justify-between py-4">
              <p className="text-sm text-muted-foreground">
                Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{" "}
                {Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length
                )}{" "}
                of {table.getFilteredRowModel().rows.length} items
              </p>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {showFileResults && (
          <Card className="w-1/2 transition-all duration-150 ease-out">
            <CardContent className="p-6">
              {selectedFile ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <h3 className="font-semibold">{selectedFile.name}</h3>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant={viewMode === 'original' ? "secondary" : "ghost"}
                        onClick={() => setViewMode('original')}
                        className="min-w-[120px] justify-center"
                      >
                        Original
                      </Button>
                      <Button
                        variant={viewMode === 'markdown' ? "secondary" : "ghost"}
                        onClick={() => setViewMode('markdown')}
                        className="min-w-[120px] justify-center"
                      >
                        Markdown
                      </Button>
                      <Button
                        variant={viewMode === 'structured' ? "secondary" : "ghost"}
                        onClick={() => setViewMode('structured')}
                        className="min-w-[120px] justify-center"
                      >
                        Structured
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[600px] border rounded-lg p-4">
                    {viewMode === 'original' && (
                      <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                        <FileText className="w-12 h-12 text-muted-foreground" />
                      </div>
                    )}
                    {viewMode === 'markdown' && (
                      <div className="prose prose-sm max-w-none">
                        {selectedFile.output?.markdown || 'No markdown preview available'}
                      </div>
                    )}
                    {viewMode === 'structured' && (
                      <pre className="text-sm">
                        {JSON.stringify(selectedFile.output?.structured || {}, null, 2)}
                      </pre>
                    )}
                  </ScrollArea>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FileText className="w-12 h-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No File Selected</h3>
                  <p className="text-muted-foreground">Select a file from the list to view its details and preview content.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        <Button
          variant="outline"
          size="icon"
          onClick={() => setShowFileResults(!showFileResults)}
          className={cn(
            "absolute h-8 w-8 rounded-full border bg-background z-50",
            "top-1/2 -translate-y-1/2 transition-all duration-150 ease-out",
            showFileResults 
              ? "left-[calc(50%-1rem)]" 
              : "-right-4"
          )}
        >
          {showFileResults ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  )
}