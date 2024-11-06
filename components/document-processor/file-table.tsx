'use client'

import { 
  FileText, ArrowUpDown 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Checkbox } from '@/components/ui/checkbox'
import { Badge } from '@/components/ui/badge'
import { 
  ColumnDef
} from "@tanstack/react-table"

import { DataTable } from '@/components/shared/data-table'
import { ProcessingFile, FileStatus } from './types'
import { getStatusIcon } from './status-utils'

interface FileTableProps {
  files: ProcessingFile[]
  onFileSelect: (file: ProcessingFile) => void
  onRowSelectionChange: (selection: Record<string, boolean>) => void
}

export function FileTable({ files, onFileSelect, onRowSelectionChange }: FileTableProps) {
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
        return (
          <div className="flex justify-center">
            {getStatusIcon(status)}
          </div>
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
  ]

  return (
    <DataTable 
      columns={columns} 
      data={files} 
      onRowSelectionChange={onRowSelectionChange}
      searchKey="name"
      searchPlaceholder="Search by file name..."
    />
  )
}
