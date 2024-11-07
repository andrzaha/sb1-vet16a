"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Calendar } from "@/components/ui/calendar";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { DayPicker } from "react-day-picker"
import { addDays } from "date-fns"

interface SchedulerConfigProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SchedulerConfig({ open, onOpenChange }: SchedulerConfigProps) {
  const [enabled, setEnabled] = useState(false);
  const [scheduleType, setScheduleType] = useState("cron");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("12:00");
  const [frequency, setFrequency] = useState("daily");
  const [storageProvider, setStorageProvider] = useState<string>("");
  const [storagePath, setStoragePath] = useState("");

  const handleSave = () => {
    toast.success("Scheduler configuration saved successfully");
    onOpenChange(false);
  };

  const calendarStyles = {
    months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
    month: "space-y-4",
    caption: "flex justify-center pt-1 relative items-center",
    caption_label: "text-sm font-medium",
    nav: "space-x-1 flex items-center",
    nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
    nav_button_previous: "absolute left-1",
    nav_button_next: "absolute right-1",
    table: "w-full border-collapse space-y-1",
    head_row: "flex",
    head_cell: "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
    row: "flex w-full mt-2",
    cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
    day: "h-8 w-8 p-0 font-normal aria-selected:opacity-100",
    day_range_end: "day-range-end",
    day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
    day_today: "bg-accent text-accent-foreground",
    day_outside: "day-outside text-muted-foreground opacity-50",
    day_disabled: "text-muted-foreground opacity-50",
    day_hidden: "invisible",
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="h-full overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Configure Processing Job</SheetTitle>
          <SheetDescription>
            Set up automated document processing schedules
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="scheduler-active">Enable Scheduler</Label>
            <Switch
              id="scheduler-active"
              checked={enabled}
              onCheckedChange={setEnabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="job-name">Job Name</Label>
            <Input id="job-name" placeholder="Enter job name" />
          </div>

          <Tabs value={scheduleType} onValueChange={setScheduleType}>
            <Label>Schedule Type</Label>
            <TabsList className="grid w-full grid-cols-2 mt-2">
              <TabsTrigger value="cron">Cron Expression</TabsTrigger>
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
            </TabsList>
            <TabsContent value="cron" className="space-y-2">
              <Label htmlFor="cron">Schedule (Cron Expression)</Label>
              <Input id="cron" placeholder="*/30 * * * *" />
            </TabsContent>
            <TabsContent value="calendar" className="space-y-4">
              <div className="space-y-2">
                <Label>Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="once">Once</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-auto p-0">
                    <DayPicker
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0, 0, 0, 0))
                      }
                      classNames={calendarStyles}
                      showOutsideDays={false}
                      fromDate={new Date()}
                      toDate={addDays(new Date(), 365)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Time</Label>
                <div className="flex items-center space-x-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="flex-1"
                  />
                  <Clock className="h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-2">
            <Label htmlFor="schema">Processing Schema</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select schema" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invoice">Invoice Schema</SelectItem>
                <SelectItem value="contract">Contract Schema</SelectItem>
                <SelectItem value="resume">Resume Schema</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Storage Provider</Label>
            <Select value={storageProvider} onValueChange={setStorageProvider}>
              <SelectTrigger>
                <SelectValue placeholder="Select storage provider" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="s3">Amazon S3</SelectItem>
                <SelectItem value="gcs">Google Cloud Storage</SelectItem>
                <SelectItem value="azure">Azure Blob Storage</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Source Path</Label>
            <Input
              placeholder={`Enter ${storageProvider || 'storage'} path`}
              value={storagePath}
              onChange={(e) => setStoragePath(e.target.value)}
            />
          </div>

          <Button onClick={handleSave} className="w-full">
            Save Job Configuration
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}