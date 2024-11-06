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
import { FloatingActionPill } from '@/components/shared/floating-action-pill'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { ScrollArea } from "@/components/ui/scroll-area"

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
  const [loading, setLoading] = useState(false)
  const actions = [
    {
      icon: <Play className="w-4 h-4" />,
      label: "Process",
      onClick: async () => {
        setLoading(true)
        try {
          console.log("Processing selected files")
          await new Promise(resolve => setTimeout(resolve, 2000))
        } catch (error) {
          console.error("Error processing files:", error)
        } finally {
          setLoading(false)
        }
      },
      disabled: loading,
    },
    {
      icon: <Settings className="w-4 h-4" />,
      label: "Settings",
      onClick: () => {
        console.log("Opening settings for selected files")
      },
      disabled: false,
    },
    {
      icon: <Trash2 className="w-4 h-4" />,
      label: "Delete",
      onClick: () => {
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

  // Add this with your other state declarations
  const [showConfig, setShowConfig] = useState(false)

  return (
    <div className="container mx-auto p-6 space-y-8 max-w-full overflow-x-hidden">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Document Processing</h1>
          <p className="text-muted-foreground">Process documents from local storage or cloud providers</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button size="lg">
              <Upload className="w-4 h-4 mr-2" />
              Documents
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
                          <CommandInput placeholder="Search schema..." />
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
              <Button disabled={loading}>Save</Button>
            </div>
          </SheetContent>
        </Sheet>
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

      <ResizablePanelGroup 
        direction="horizontal" 
        className="min-h-[600px] rounded-lg border"
      >
        <ResizablePanel defaultSize={60}>
          <div className="p-4 h-full">
            <FileTable 
              files={filteredFiles} 
              onFileSelect={(file) => {
                setSelectedFile(file)
                setShowFileResults(true)
              }}
              onRowSelectionChange={setSelectedRows}
            />
          </div>
        </ResizablePanel>
        
        {showFileResults && (
          <>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={40}>
              <ScrollArea className="h-full">
                <div className="p-4">
                  <FilePreview 
                    file={selectedFile}
                    showFileResults={showFileResults}
                    onToggleFileResults={() => setShowFileResults(!showFileResults)}
                  />
                </div>
              </ScrollArea>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      <FloatingActionPill
        selectedCount={selectedCount}
        actions={actions}
      />
    </div>
  )
}
