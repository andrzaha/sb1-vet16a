import { z } from "zod"

export const documentMetadataSchema = z.object({
  fileName: z.string(),
  fileType: z.string(),
  fileSize: z.number().positive(),
  fileHash: z.string(),
  processingStatus: z.enum(["queued", "processing", "completed", "failed"]),
  reprocessed: z.boolean(),
  processingTime: z.number().optional()
}) 