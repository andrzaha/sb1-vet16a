"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export function SettingsTabs() {
  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <Tabs defaultValue="general" className="w-full">
      <TabsList className="grid w-full max-w-[400px] grid-cols-2">
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>
      
      <TabsContent value="general">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" placeholder="Enter username" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="Enter email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" placeholder="Select timezone" />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch id="dark-mode" />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Changes
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="notifications">
        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications">Email Notifications</Label>
              <Switch id="email-notifications" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="processing-alerts">Processing Alerts</Label>
              <Switch id="processing-alerts" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="system-updates">System Updates</Label>
              <Switch id="system-updates" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="security-alerts">Security Alerts</Label>
              <Switch id="security-alerts" defaultChecked />
            </div>
            <Button onClick={handleSave} className="w-full">
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}