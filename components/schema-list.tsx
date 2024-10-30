"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info, Settings } from "lucide-react";

const schemas = [
  {
    id: "1",
    name: "Invoice Schema",
    description: "Extract data from invoice documents",
    fields: ["Invoice Number", "Date", "Amount", "Vendor"],
  },
  {
    id: "2",
    name: "Contract Schema",
    description: "Process legal contracts and agreements",
    fields: ["Parties", "Terms", "Effective Date", "Signatures"],
  },
  {
    id: "3",
    name: "Resume Schema",
    description: "Parse resume and CV documents",
    fields: ["Name", "Experience", "Education", "Skills"],
  },
];

export function SchemaList() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {schemas.map((schema) => (
        <Card key={schema.id} className="relative">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">{schema.name}</h3>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-muted rounded-full">
                  <Info className="h-4 w-4" />
                </button>
                <button className="p-2 hover:bg-muted rounded-full">
                  <Settings className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {schema.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {schema.fields.map((field) => (
                <Badge key={field} variant="secondary">
                  {field}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}