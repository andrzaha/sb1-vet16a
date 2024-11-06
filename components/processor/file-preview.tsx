'use client'

import { useState } from 'react'
import { FileText, ChevronRight, X, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from "@/lib/utils"

import { ProcessingFile, ViewMode } from './types'

interface FilePreviewProps {
  file: ProcessingFile | null
  showFileResults: boolean
  onToggleFileResults?: () => void
  isDialog?: boolean
}

export function FilePreview({ 
  file, 
  showFileResults, 
  onToggleFileResults,
  isDialog 
}: FilePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('original')

  const content = (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center py-2 px-4 border-b">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-muted-foreground" />
          <h3 className="font-medium truncate max-w-[200px]">
            {file?.name || 'No File Selected'}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          {file && (
            <>
              <Button variant="ghost" size="icon">
                <Download className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
              </Button>
              <Separator orientation="vertical" className="h-6" />
            </>
          )}
          {!isDialog && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggleFileResults}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 p-4 bg-muted/50">
        {file && (
          <>
            <Button
              variant={viewMode === 'original' ? "secondary" : "ghost"}
              onClick={() => setViewMode('original')}
              size="sm"
            >
              Original
            </Button>
            <Button
              variant={viewMode === 'markdown' ? "secondary" : "ghost"}
              onClick={() => setViewMode('markdown')}
              size="sm"
            >
              Markdown
            </Button>
            <Button
              variant={viewMode === 'structured' ? "secondary" : "ghost"}
              onClick={() => setViewMode('structured')}
              size="sm"
            >
              Structured
            </Button>
          </>
        )}
      </div>

      <ScrollArea className="flex-1 p-4">
        {file ? (
          <div className="space-y-4">
            {viewMode === 'original' && (
              <div className="aspect-[3/4] bg-muted rounded-lg flex items-center justify-center">
                <FileText className="w-12 h-12 text-muted-foreground" />
              </div>
            )}
            {viewMode === 'markdown' && (
              <div className="prose prose-sm max-w-none dark:prose-invert">
                {file?.output?.markdown || 'No markdown preview available'}
              </div>
            )}
            {viewMode === 'structured' && (
              <pre className="bg-muted p-4 rounded-lg overflow-auto">
                <code className="text-sm">
                  {JSON.stringify(file?.output?.structured || {}, null, 2)}
                </code>
              </pre>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <FileText className="w-12 h-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No File Selected</h3>
            <p className="text-muted-foreground">Select a file from the list to view its details and preview content.</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );

  if (isDialog) {
    return content;
  }

  return content;
}
