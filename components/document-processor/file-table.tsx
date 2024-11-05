'use client'

import { useState } from 'react'
import { 
  Upload, FileText, Settings, Trash2, ArrowUpDown, Check 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
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
  useReactTable 
} from "@tanstack/react-table"
import { cn } from "@/lib/utils"

import { ProcessingFile, FileStatus, FileSource } from './types'
import { getStatusIcon } from './status-utils'

interface FileTableProps {
  files: ProcessingFile[]
  onFileSelect: (file: ProcessingFile) => void
}

export function FileTable({ files, onFileSelect }: FileTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

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
          onClick={() => onFileSelect(row.original)}
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
      cell: ({ row }) => (
        <div className="flex justify-start">
          <Badge variant="outline">{row.getValue("source")}</Badge>
        </div>
      ),
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
                    <Upload className="w-4 w-4" />
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
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="hover:bg-red-100 hover:text-red-500 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-4 w-4 text-red-500" />
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
    data: files,
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

  return (
    <>
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
    </>
  )
}
