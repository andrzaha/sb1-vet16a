'use client'

import { useState, useMemo, useEffect } from 'react'
import { Upload, FolderTree, ArrowUpDown, Check, Play, Trash2, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { FloatingActionPill } from '@/components/floating-action-pill'

import { ProcessingFile, FileSource, schemas } from './types'
import { FileTable } from './file-table'
import { FilePreview } from './file-preview'

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
  const [activeTab, setActiveTab] = useState<'all' | 'queued' | 'processing' | 'completed' | 'failed'>('all')
  const [showFileResults, setShowFileResults] = useState(false)
  
  // Cloud storage states
  const [cloudProvider, setCloudProvider] = useState<FileSource>('s3')
  const [cloudPath, setCloudPath] = useState('')
  const [extractionEnabled, setExtractionEnabled] = useState(false)
  const [selectedSchema, setSelectedSchema] = useState<string>('')

  const [selectedRows, setSelectedRows] = useState<Record<string, boolean>>({})

  // Calculate selected count
  const selectedCount = Object.values(selectedRows).filter(Boolean).length

  // Define actions for selected files
  const actions = [
    {
      icon: <Play className="w-4 h-4" />,
      label: "Process",
      onClick: () => {
        // Handle processing selected files
        console.log("Processing selected files")
      },
      disabled: false,
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
      onClick: () => {
        // Handle settings for selected files
        console.log("Opening settings for selected files")
      },
      disabled: false,
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      label: "Delete",
      onClick: () => {
        // Handle deleting selected files
        console.log("Deleting selected files")
      },
      variant: "destructive" as const,
      disabled: false,
    },
  ]

  // Filter files based on active tab
  const filteredFiles = useMemo(() => {
    return files.filter(file => activeTab === 'all' ? true : file.status === activeTab)
  }, [files, activeTab])

  // Auto-select first file when filtered files change
  useEffect(() => {
    if (!selectedFile && filteredFiles.length > 0) {
      setSelectedFile(filteredFiles[0])
    }
  }, [filteredFiles, selectedFile])

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Processing</h1>
          <p className="text-muted-foreground">Process documents from local storage or cloud providers</p>
        </div>
        <Button onClick={() => setShowConfig(true)}>
          <Upload className="mr-2 h-4 w-4" />
          Documents
        </Button>
      </div>

      <div className="flex space-x-2">
        {(['all', 'queued', 'processing', 'completed', 'failed'] as const).map(tab => (
          <Button
            key={tab}
            variant={activeTab === tab ? "secondary" : "ghost"}
            onClick={() => setActiveTab(tab)}
            className="min-w-[120px] justify-center"
          >
            {tab === 'all' ? 'All Documents' : 
             tab.charAt(0).toUpperCase() + tab.slice(1)}
          </Button>
        ))}
      </div>

      <div className="relative flex gap-6">
        <Card className={cn(
          "flex-grow transition-all duration-150 ease-out", 
          showFileResults ? "w-1/2" : "w-full"
        )}>
          <CardContent className="p-6">
            <FileTable 
              files={filteredFiles} 
              onFileSelect={(file) => {
                setSelectedFile(file)
                setShowFileResults(true)
              }}
              onRowSelectionChange={setSelectedRows}
            />
          </CardContent>
        </Card>

        <FilePreview 
          file={selectedFile}
          showFileResults={showFileResults}
          onToggleFileResults={() => setShowFileResults(!showFileResults)}
        />
      </div>

      <FloatingActionPill
        selectedCount={selectedCount}
        actions={actions}
      />
    </div>
  )
}
