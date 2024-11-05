export type FileStatus = 'queued' | 'processing' | 'completed' | 'failed'
export type FileSource = 'local' | 's3' | 'azure' | 'gcs'
export type ViewMode = 'original' | 'markdown' | 'structured'

export interface ProcessingFile {
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

export const schemas = [
  { label: "Dynamic Schema", value: "dynamic" },
  { label: "Predefined Schema", value: "predefined" },
  { label: "Custom Schema", value: "custom" },
]
