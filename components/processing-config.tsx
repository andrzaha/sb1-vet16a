"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { toast } from "sonner";

interface ProcessingConfigProps {
  onClose: () => void;
}

export function ProcessingConfig({ onClose }: ProcessingConfigProps) {
  const [source, setSource] = useState("local");
  const [selectedSchema, setSelectedSchema] = useState("");
  const [options, setOptions] = useState({
    extractInfo: false,
    reduceSize: true,
    reduceQuality: false,
    extractMetadata: true,
  });

  const handleProcess = () => {
    // TODO: Implement actual processing logic
    toast.success("Processing started successfully");
    onClose();
  };

  return (
    <div className="space-y-6">
      <Tabs value={source} onValueChange={setSource}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="local">Local Files</TabsTrigger>
          <TabsTrigger value="cloud">Cloud Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="local" className="space-y-4">
          <div className="space-y-2">
            <Label>Upload Files</Label>
            <Input type="file" multiple />
          </div>
        </TabsContent>

        <TabsContent value="cloud" className="space-y-4">
          <div className="space-y-2">
            <Label>Storage Provider</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="azure">Azure Blob Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Path</Label>
            <Input placeholder="/path/to/files" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="space-y-4">
        <Label>Processing Options</Label>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="extractInfo"
              checked={options.extractInfo}
              onCheckedChange={(checked) =>
                setOptions({ ...options, extractInfo: checked as boolean })
              }
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="extractInfo"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Enable Key Information Extraction
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Extract structured data based on selected schema</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          {options.extractInfo && (
            <div className="ml-6 space-y-2">
              <Label>Processing Schema</Label>
              <Select value={selectedSchema} onValueChange={setSelectedSchema}>
                <SelectTrigger>
                  <SelectValue placeholder="Select schema" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invoice">Invoice Processing</SelectItem>
                  <SelectItem value="contract">Contract Analysis</SelectItem>
                  <SelectItem value="receipt">Receipt Extraction</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reduceSize"
              checked={options.reduceSize}
              onCheckedChange={(checked) =>
                setOptions({ ...options, reduceSize: checked as boolean })
              }
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="reduceSize"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Reduce Image Size
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Resize images to optimize storage and processing speed</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="reduceQuality"
              checked={options.reduceQuality}
              onCheckedChange={(checked) =>
                setOptions({ ...options, reduceQuality: checked as boolean })
              }
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="reduceQuality"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Reduce Image Quality
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Compress images to reduce storage space while maintaining readability</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="extractMetadata"
              checked={options.extractMetadata}
              onCheckedChange={(checked) =>
                setOptions({ ...options, extractMetadata: checked as boolean })
              }
            />
            <div className="flex items-center gap-2">
              <label
                htmlFor="extractMetadata"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Extract Metadata
              </label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Extract document metadata (date, author, title, etc.)</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleProcess} className="w-full">
        Start Processing
      </Button>
    </div>
  );
} 