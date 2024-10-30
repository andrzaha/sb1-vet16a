"use client";

import { useState } from "react";
import { Upload, File, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

const SUPPORTED_FORMATS = ["pdf", "jpg", "jpeg", "png", "bmp", "tiff", "heic"];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

export function DocumentUploader() {
  const [isDragging, setIsDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    
    if (!extension || !SUPPORTED_FORMATS.includes(extension)) {
      throw new Error(`Unsupported file format. Supported formats: ${SUPPORTED_FORMATS.join(", ")}`);
    }

    if (file.size > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds 50MB limit`);
    }
  };

  const handleFiles = (files: File[]) => {
    setError(null);
    setProgress(0);

    try {
      Array.from(files).forEach(validateFile);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            toast.success("Files uploaded successfully");
            return 100;
          }
          return prev + 10;
        });
      }, 200);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      toast.error(err instanceof Error ? err.message : "An error occurred");
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Documents</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-muted"
          }`}
        >
          <Upload className="h-10 w-10 text-muted-foreground" />
          <p className="mt-2 text-sm text-muted-foreground">
            Drag and drop your documents here or click to browse
          </p>
          <div className="mt-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              multiple
              accept={SUPPORTED_FORMATS.map(format => `.${format}`).join(",")}
              onChange={handleFileSelect}
            />
            <Button variant="secondary" onClick={() => document.getElementById("file-upload")?.click()}>
              Select Files
            </Button>
          </div>
          {progress > 0 && progress < 100 && (
            <div className="mt-4 w-full max-w-xs">
              <Progress value={progress} className="h-2 w-full" />
            </div>
          )}
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Alert>
          <File className="h-4 w-4" />
          <AlertDescription>
            Supported formats: PDF, JPG, JPEG, PNG, BMP, TIFF, HEIC (max 50MB)
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}