"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop } from "lucide-react";
import { toast } from "sonner";

export function Settings() {
  const { theme, setTheme } = useTheme();

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
            Customize your application theme
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
            <Switch />
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
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Error Notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive alerts about processing errors
              </p>
            </div>
            <Switch />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Weekly Reports</Label>
              <p className="text-sm text-muted-foreground">
                Get a summary of processed documents every week
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </div>
    </div>
  );
} 