import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { BlobServiceClient } from "@azure/storage-blob";

export class StorageService {
  private s3Client: S3Client | null = null;
  private blobClient: BlobServiceClient | null = null;

  constructor() {
    // Initialize clients based on configuration
  }

  async uploadToS3(file: File, bucket: string, key: string) {
    if (!this.s3Client) throw new Error("S3 client not initialized");

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: file.type,
    });

    return this.s3Client.send(command);
  }

  async uploadToAzure(file: File, containerName: string, blobName: string) {
    if (!this.blobClient) throw new Error("Azure client not initialized");

    const containerClient = this.blobClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return blockBlobClient.uploadData(buffer, {
      blobHTTPHeaders: { blobContentType: file.type },
    });
  }
}

export const storageService = new StorageService();
