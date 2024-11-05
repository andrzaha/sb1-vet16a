"use client";

import { useState } from "react";
import { DashboardShell } from "@/components/shell";
import { SchemaList } from "@/components/template/template-list";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function SchemasPage() {
  const [showSchemaCreator, setShowSchemaCreator] = useState(false);

  return (
    <DashboardShell>
      <div className="container mx-auto p-6 space-y-8 max-w-full">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Templates</h1>
            <p className="text-muted-foreground">
              Manage document processing templates
            </p>
          </div>
          <Button onClick={() => setShowSchemaCreator(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Create Template
          </Button>
        </div>

        <div className="relative flex gap-6">
          <div className="flex-grow w-full">
            <SchemaList />
          </div>
        </div>

        <Sheet open={showSchemaCreator} onOpenChange={setShowSchemaCreator}>
          <SheetContent className="sm:max-w-xl">
            <SheetHeader>
              <SheetTitle>Create New Template</SheetTitle>
              <SheetDescription>
                Define a new document processing template with fields and rules
              </SheetDescription>
            </SheetHeader>
            <div className="mt-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Template Name</Label>
                <Input id="name" placeholder="e.g., Invoice Processing Template" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  placeholder="Describe the purpose and use case of this template"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fields">Fields (one per line)</Label>
                <Textarea 
                  id="fields" 
                  placeholder="Invoice Number&#10;Date&#10;Amount&#10;Vendor"
                  className="min-h-[100px] font-mono"
                />
              </div>
              <Button className="w-full">
                Create Schema
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </DashboardShell>
  );
}