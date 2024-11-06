"use client";

import { useMemo, useState } from "react";
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
  ArrowUpDown
} from "lucide-react";
import { FloatingActionPill } from "@/components/shared/floating-action-pill";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/shared/data-table";
import { TemplateFilters } from "./template-filters";
import { Template, exampleTemplates } from "./example-templates";

type ViewMode = "grid" | "table";

export function SchemaList() {
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [filter, setFilter] = useState("default");

  const columns: ColumnDef<Template>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "name",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span className="font-medium">{row.getValue("name")}</span>
          {row.original.type === "user" && (
            <Button variant="ghost" size="icon" className="hover:bg-muted">
              <Settings className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "fields",
      header: "Fields",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-1">
          {(row.getValue("fields") as string[]).map((field) => (
            <Badge key={field} variant="secondary">
              {field}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      accessorKey: "documentCount",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Documents
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "lastUsed",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Used
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <div className="flex justify-end">
          <Button variant="ghost" size="icon">
            <Info className="h-4 w-4" />
          </Button>
          {row.original.type === "user" && (
            <Button variant="ghost" size="icon" className="text-destructive">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      ),
    },
  ];

  const filteredTemplates = useMemo(() => {
    return exampleTemplates.filter(template => template.type === filter);
  }, [filter]);

  const handleRowSelectionChange = (selection: Record<string, boolean>) => {
    setSelectedTemplates(
      Object.keys(selection).map(key => filteredTemplates[parseInt(key)].id)
    );
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
        exampleTemplates.find(template => template.id === id)?.type === "default"
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
                      onCheckedChange={(checked) => {
                        const selectedSet = new Set(selectedTemplates);
                        if (checked) {
                          selectedSet.add(template.id);
                        } else {
                          selectedSet.delete(template.id);
                        }
                        setSelectedTemplates(Array.from(selectedSet));
                      }}
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
          <DataTable 
            columns={columns} 
            data={filteredTemplates}
            onRowSelectionChange={handleRowSelectionChange}
            searchKey="name"
            searchPlaceholder="Search templates..."
            bordered={true}
          />
        )}
      </div>

      <FloatingActionPill 
        selectedCount={selectedTemplates.length}
        actions={pillActions}
      />
    </div>
  );
}
