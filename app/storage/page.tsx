"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { StorageConfig } from "@/components/storage/storage-config";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StoragePage() {
  const [showConfig, setShowConfig] = useState(false);

  return (
    <DashboardShell>
      <div className="container mx-auto p-6 space-y-8 max-w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Storage</h1>
            <p className="text-muted-foreground">
              Manage cloud storage connections and monitor usage
            </p>
          </div>
          <Button onClick={() => setShowConfig(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Configure Storage
          </Button>
        </div>

        <div className="relative flex gap-6">
          <div className="flex-grow w-full">
            <Card>
              <CardHeader>
                <CardTitle>Cloud Storage Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Connect your preferred cloud storage provider to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Process documents stored in your cloud storage</li>
                  <li>Automatically sync processed results back to your storage</li>
                  <li>Maintain your existing storage organization</li>
                  <li>Enable automated document processing workflows</li>
                  <li>Secure access to your documents with provider credentials</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  Click the Configure Storage button to set up your cloud storage connection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Sheet open={showConfig} onOpenChange={setShowConfig}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Storage Configuration</SheetTitle>
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