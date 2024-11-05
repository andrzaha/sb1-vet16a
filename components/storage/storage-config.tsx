"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function StorageConfig() {
  const [activeProvider, setActiveProvider] = useState("s3");

  return (
    <div className="space-y-6">
      <Tabs value={activeProvider} onValueChange={setActiveProvider} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="s3">Amazon S3</TabsTrigger>
          <TabsTrigger value="azure">Azure Blob</TabsTrigger>
        </TabsList>
        <TabsContent value="s3" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="accessKeyId">Access Key ID</Label>
            <Input
              id="accessKeyId"
              placeholder="Enter your AWS access key"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="secretKey">Secret Access Key</Label>
            <Input
              id="secretKey"
              placeholder="Enter your AWS secret key"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bucket">Bucket Name</Label>
            <Input
              id="bucket"
              placeholder="Enter your S3 bucket name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="region">Region</Label>
            <Input
              id="region"
              placeholder="e.g., us-east-1"
            />
          </div>
        </TabsContent>
        <TabsContent value="azure" className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="connectionString">Connection String</Label>
            <Input
              id="connectionString"
              placeholder="Enter your Azure connection string"
              type="password"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="container">Container Name</Label>
            <Input
              id="container"
              placeholder="Enter your container name"
            />
          </div>
        </TabsContent>
      </Tabs>
      <Button className="w-full">
        Save Configuration
      </Button>
    </div>
  );
}