"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { toast } from "sonner";
import { useSettings } from '@/lib/settings';
import { useState } from "react";

export function Settings() {
  const { theme, setTheme } = useTheme();
  const { fontSize, setFontSize } = useSettings();

  const [autoDelete, setAutoDelete] = useState(false);
  const [notifyProcessing, setNotifyProcessing] = useState(false);
  const [notifyErrors, setNotifyErrors] = useState(false);
  const [weeklyReports, setWeeklyReports] = useState(false);

  const handleSave = () => {
    toast.success("Settings saved successfully");
  };

  return (
    <div className="space-y-10">
      {/* Appearance Settings */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium">Appearance</h3>
          <p className="text-sm text-muted-foreground">
            Customize your application theme and font size
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Select your preferred application theme
              </p>
            </div>
            <RadioGroup 
              defaultValue={theme} 
              onValueChange={setTheme}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="light" id="light" />
                <Label htmlFor="light" className="flex items-center gap-2">
                  <Sun className="h-4 w-4" />
                  Light
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="dark" id="dark" />
                <Label htmlFor="dark" className="flex items-center gap-2">
                  <Moon className="h-4 w-4" />
                  Dark
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="system" id="system" />
                <Label htmlFor="system" className="flex items-center gap-2">
                  <Laptop className="h-4 w-4" />
                  System
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Font Size Setting */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Font Size</Label>
              <p className="text-sm text-muted-foreground">
                Adjust the text size across the application
              </p>
            </div>
            <RadioGroup 
              value={fontSize} 
              onValueChange={(size) => setFontSize(size as 'small' | 'medium' | 'large')}
              className="flex gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="small" id="small" />
                <Label htmlFor="small">Small</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="medium" id="medium" />
                <Label htmlFor="medium">Medium</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="large" id="large" />
                <Label htmlFor="large">Large</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>

      {/* Storage Settings */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium">Storage</h3>
          <p className="text-sm text-muted-foreground">
            Manage your document storage preferences
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Auto-delete processed documents</Label>
              <p className="text-sm text-muted-foreground">
                Automatically remove source files after processing
              </p>
            </div>
            <Switch
              checked={autoDelete}
              onCheckedChange={setAutoDelete}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Retention Period</Label>
              <p className="text-sm text-muted-foreground">
                How long to keep processed documents
              </p>
            </div>
            <Input
              type="number"
              className="w-20"
              min={1}
              max={365}
              defaultValue={30}
            />
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="space-y-6">
        <div>
          <h3 className="text-xl font-medium">Notifications</h3>
          <p className="text-sm text-muted-foreground">
            Choose when and how you want to be notified
          </p>
        </div>
        <Separator />
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Processing Complete</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when document processing is finished
              </p>
            </div>
            <Switch
              checked={notifyProcessing}
              onCheckedChange={setNotifyProcessing}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Error Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts about processing errors
              </p>
            </div>
            <Switch
              checked={notifyErrors}
              onCheckedChange={setNotifyErrors}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Get a summary of processed documents every week
              </p>
            </div>
            <Switch
              checked={weeklyReports}
              onCheckedChange={setWeeklyReports}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 