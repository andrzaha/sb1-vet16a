'use client'

import { useState, useEffect } from 'react'
import { FileText, X, Download, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import type { Components } from 'react-markdown'

import { ProcessingFile, ViewMode } from './types'

interface FilePreviewProps {
  file: ProcessingFile | null
  showFileResults: boolean
  onToggleFileResults?: () => void
  isDialog?: boolean
}

interface MarkdownComponentProps {
  children?: React.ReactNode
  className?: string
}

interface CodeComponentProps extends MarkdownComponentProps {
  inline?: boolean
}

export function FilePreview({ 
  file, 
  showFileResults, 
  onToggleFileResults,
  isDialog 
}: FilePreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('original')
  const [sampleMarkdown, setSampleMarkdown] = useState<string>('')
  const [sampleJson, setSampleJson] = useState<any>(null)

  useEffect(() => {
    // Load sample markdown
    fetch('/examples/sample.md')
      .then(response => response.text())
      .then(text => setSampleMarkdown(text))
      .catch(error => console.error('Error loading sample markdown:', error));

    // Load sample JSON
    fetch('/examples/sample.json')
      .then(response => response.json())
      .then(json => setSampleJson(json))
      .catch(error => console.error('Error loading sample JSON:', error));
  }, []);

  const markdownComponents: Components = {
    h1: ({children}: MarkdownComponentProps) => (
      <h1 className="text-2xl font-bold mb-4">{children}</h1>
    ),
    h2: ({children}: MarkdownComponentProps) => (
      <h2 className="text-xl font-bold mb-3">{children}</h2>
    ),
    h3: ({children}: MarkdownComponentProps) => (
      <h3 className="text-lg font-bold mb-2">{children}</h3>
    ),
    p: ({children}: MarkdownComponentProps) => (
      <p className="mb-4">{children}</p>
    ),
    ul: ({children}: MarkdownComponentProps) => (
      <ul className="list-disc pl-6 mb-4">{children}</ul>
    ),
    ol: ({children}: MarkdownComponentProps) => (
      <ol className="list-decimal pl-6 mb-4">{children}</ol>
    ),
    li: ({children}: MarkdownComponentProps) => (
      <li className="mb-1">{children}</li>
    ),
    blockquote: ({children}: MarkdownComponentProps) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>
    ),
    code: ({inline, className, children}: CodeComponentProps) => {
      const match = /language-(\w+)/.exec(className || '')
      return !inline ? (
        <pre className="bg-gray-100 dark:bg-gray-800 rounded p-4 overflow-x-auto my-4">
          <code className={className}>{children}</code>
        </pre>
      ) : (
        <code className="bg-gray-100 dark:bg-gray-800 rounded px-1">{children}</code>
      )
    }
  }

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

      <ScrollArea className="flex-1 p-4 w-full">
        {file ? (
          <div className="space-y-4 min-w-full">
            {viewMode === 'original' && (
              <div className="relative w-full overflow-auto">
                <div className="min-h-[300px] h-[calc(100vh-250px)] relative">
                  <Image
                    src="/examples/sample-image.jpg"
                    alt="Document preview"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            )}
            {viewMode === 'markdown' && (
              <div className="min-w-full overflow-x-auto">
                <article className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500">
                  <ReactMarkdown 
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                  >
                    {file?.output?.markdown || sampleMarkdown}
                  </ReactMarkdown>
                </article>
              </div>
            )}
            {viewMode === 'structured' && (
              <div className="min-w-full h-[calc(100vh-250px)] overflow-auto">
                <pre className="p-4 rounded-lg">
                  <code className="text-sm text-foreground">
                    {JSON.stringify(
                      file?.output?.structured || sampleJson,
                      null,
                      2
                    )}
                  </code>
                </pre>
              </div>
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
