import { CheckCircle, XCircle, RefreshCw, Clock } from 'lucide-react'
import { FileStatus } from './types'

export const getStatusIcon = (status: FileStatus) => {
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
