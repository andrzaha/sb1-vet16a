"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Info, 
  Settings, 
  LayoutGrid, 
  List,
  Download,
  Trash2,
  MoreHorizontal
} from "lucide-react";
import { FloatingActionPill } from "@/components/floating-action-pill";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TemplateFilters } from "@/components/template-filters";

const templates = [
  {
    id: "1",
    name: "Invoice Template",
    description: "Extract data from invoice documents",
    fields: ["Invoice Number", "Date", "Amount", "Vendor"],
    documentCount: 156,
    lastUsed: "2024-03-20",
    type: "default",
  },
  {
    id: "2",
    name: "Contract Template",
    description: "Process legal contracts and agreements",
    fields: ["Parties", "Terms", "Effective Date", "Signatures"],
    documentCount: 89,
    lastUsed: "2024-03-19",
    type: "default",
  },
  {
    id: "3",
    name: "Resume Template",
    description: "Parse resume and CV documents",
    fields: ["Name", "Experience", "Education", "Skills"],
    documentCount: 234,
    lastUsed: "2024-03-18",
    type: "default",
  },
  // Example user-created template
  {
    id: "4",
    name: "Custom Template",
    description: "User-defined template for specific needs",
    fields: ["Custom Field 1", "Custom Field 2"],
    documentCount: 10,
    lastUsed: "2024-03-21",
    type: "user",
  },
];

type ViewMode = "grid" | "table";

export function SchemaList() {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [filter, setFilter] = useState("default");

  const filteredTemplates = templates.filter(template => template.type === filter);

  const handleSelectTemplate = (templateId: string, checked: boolean) => {
    if (checked) {
      setSelectedTemplates([...selectedTemplates, templateId]);
    } else {
      setSelectedTemplates(selectedTemplates.filter(id => id !== templateId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTemplates(filteredTemplates.map(template => template.id));
    } else {
      setSelectedTemplates([]);
    }
  };

  const handleExport = () => {
    console.log("Exporting templates:", selectedTemplates);
  };

  const handleDelete = () => {
    console.log("Deleting templates:", selectedTemplates);
    setSelectedTemplates([]);
  };

  const pillActions = [
    {
      icon: <Download className="h-4 w-4" />,
      label: "Export Templates",
      onClick: handleExport,
    },
    {
      icon: <Trash2 className="h-4 w-4" />,
      label: "Delete",
      onClick: handleDelete,
      variant: "destructive" as const,
      disabled: selectedTemplates.some(id => 
        templates.find(template => template.id === id)?.type === "default"
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <TemplateFilters activeFilter={filter} onFilterChange={setFilter} />

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground min-w-[200px]">
          {filteredTemplates.length} templates available
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === "grid" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("grid")}
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "table" ? "secondary" : "ghost"}
            size="icon"
            onClick={() => setViewMode("table")}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="relative">
        {viewMode === "grid" ? (
          <div 
            key="grid-view"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-0 duration-200"
          >
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="relative group bg-card">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Checkbox
                      checked={selectedTemplates.includes(template.id)}
                      onCheckedChange={(checked) => 
                        handleSelectTemplate(template.id, checked as boolean)
                      }
                    />
                    <h3 className="text-lg font-semibold flex-1">{template.name}</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="hover:bg-muted">
                        <Info className="h-4 w-4" />
                      </Button>
                      {template.type === "user" && (
                        <Button variant="ghost" size="icon" className="hover:bg-muted">
                          <Settings className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {template.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.fields.map((field) => (
                      <Badge key={field} variant="secondary">
                        {field}
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                    <span>{template.documentCount} documents</span>
                    <span>Last used: {template.lastUsed}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div 
            key="table-view"
            className="rounded-md border bg-card animate-in fade-in-0 duration-200"
          >
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-muted/50">
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={selectedTemplates.length === filteredTemplates.length}
                      onCheckedChange={handleSelectAll}
                    />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Fields</TableHead>
                  <TableHead>Documents</TableHead>
                  <TableHead>Last Used</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTemplates.map((template) => (
                  <TableRow key={template.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedTemplates.includes(template.id)}
                        onCheckedChange={(checked) => 
                          handleSelectTemplate(template.id, checked as boolean)
                        }
                      />
                    </TableCell>
                    <TableCell className="font-medium">{template.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {template.fields.map((field) => (
                          <Badge key={field} variant="secondary">
                            {field}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{template.documentCount}</TableCell>
                    <TableCell className="text-muted-foreground">{template.lastUsed}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Info className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          {template.type === "user" && (
                            <DropdownMenuItem>
                              <Settings className="mr-2 h-4 w-4" />
                              Edit Template
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="mr-2 h-4 w-4" />
                            Export Template
                          </DropdownMenuItem>
                          {template.type === "user" && (
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Template
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>

      <FloatingActionPill 
        selectedCount={selectedTemplates.length}
        actions={pillActions}
      />
    </div>
  );
}