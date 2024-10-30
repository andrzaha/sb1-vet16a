"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText, HardDrive, Cog } from "lucide-react";

interface Schema {
  id: string;
  name: string;
  description: string;
  fields: string[];
  fileTypes: string[];
  maxFileSize: number;
  processingRules: string[];
}

interface SchemaPanelProps {
  schema: Schema | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const supportedFormats = ["PDF", "JPG", "JPEG", "PNG", "BMP", "TIFF", "HEIC"];

export function SchemaPanel({ schema, open, onOpenChange }: SchemaPanelProps) {
  if (!schema) return null;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader className="space-y-1">
          <SheetTitle>{schema.name}</SheetTitle>
          <SheetDescription>{schema.description}</SheetDescription>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* File Format Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Supported File Formats</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {supportedFormats.map((format) => (
                <Badge
                  key={format}
                  variant={schema.fileTypes.includes(format) ? "default" : "secondary"}
                >
                  {format}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          {/* Storage Limits */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <HardDrive className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Storage Limits</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Maximum file size:</span>
                <span className="font-medium">{schema.maxFileSize} MB</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Processing Rules */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Cog className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Processing Rules</h3>
            </div>
            <ul className="space-y-2">
              {schema.processingRules.map((rule) => (
                <li key={rule} className="text-sm flex items-start gap-2">
                  <span className="text-muted-foreground">•</span>
                  <span>{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Fields */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <h3 className="font-semibold">Extracted Fields</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {schema.fields.map((field) => (
                <Badge key={field} variant="outline">
                  {field}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}