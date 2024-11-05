'use client'

import { useState } from 'react'
import { FileText, ChevronRight, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from "@/lib/utils"

import { ProcessingFile, ViewMode } from './types'

interface FilePreviewProps {
  file: ProcessingFile | null
  showFileResults: boolean
  onToggleFileResults: () => void
}

export function FilePreview({ 
  file, 
  showFileResults, 
  onToggleFileResults 
}: FilePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('original')

  return (
    <>
      {showFileResults && (
        <Card className="w-1/2 transition-all duration-150 ease-out">
          <CardContent className="p-6">
            {file ? (
              <>
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    <h3 className="font-semibold">{file.name}</h3>
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
                      {file.output?.markdown || 'No markdown preview available'}
                    </div>
                  )}
                  {viewMode === 'structured' && (
                    <pre className="text-sm">
                      {JSON.stringify(file.output?.structured || {}, null, 2)}
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
        onClick={onToggleFileResults}
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
    </>
  )
}
