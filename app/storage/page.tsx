"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { StorageConfig } from "@/components/storage/storage-config";
import { Button } from "@/components/ui/button";
import { Settings, Cloud } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function StoragePage() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <DashboardShell>
      <div className="flex flex-col gap-8 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Cloud Storage Integration</h1>
            <p className="text-muted-foreground">
              Connect your cloud storage to process documents stored in the cloud
            </p>
          </div>
          <Button onClick={() => setShowConfig(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Configure Storage
          </Button>
        </div>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                About Cloud Storage Integration
              </CardTitle>
              <CardDescription>
                Process documents directly from your cloud storage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Connect your preferred cloud storage provider to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Process documents stored in your cloud storage</li>
                <li>Automatically sync processed results back to your storage</li>
                <li>Maintain your existing storage workflow</li>
                <li>Securely access your files without local downloads</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Configure your storage provider settings to get started. We currently support major cloud storage providers
                including AWS S3 and Azure Blob Storage.
              </p>
            </CardContent>
          </Card>
        </div>

        <Sheet open={showConfig} onOpenChange={setShowConfig}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Storage Configuration</SheetTitle>
              <SheetDescription>
                Connect and configure your cloud storage provider
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6">
              <StorageConfig />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardShell>
  );
}