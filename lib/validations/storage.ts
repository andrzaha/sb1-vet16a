import { z } from "zod"

export const s3ConfigSchema = z.object({
  accessKeyId: z.string().min(1, { message: "Access Key ID is required" }),
  secretKey: z.string().min(1, { message: "Secret Key is required" }),
  bucket: z.string().min(1, { message: "Bucket name is required" }),
  region: z.string().min(1, { message: "Region is required" })
})

export const azureConfigSchema = z.object({
  connectionString: z.string().min(1, { message: "Connection string is required" }),
  container: z.string().min(1, { message: "Container name is required" })
}) 