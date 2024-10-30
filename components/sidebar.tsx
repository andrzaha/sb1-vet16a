"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  FileText,
  LayoutDashboard,
  Settings,
  FileCode,
  BarChart3,
  Calendar,
  Cloud,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Processing",
    href: "/processing",
    icon: Play,
  },
  {
    title: "History",
    href: "/history",
    icon: FileText,
  },
  {
    title: "Schemas",
    href: "/schemas",
    icon: FileCode,
  },
  {
    title: "Scheduler",
    href: "/scheduler",
    icon: Calendar,
  },
  {
    title: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    title: "Storage",
    href: "/storage",
    icon: Cloud,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "relative flex h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex w-full flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            {!isCollapsed && <span className="font-bold">DocProcessor</span>}
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-4">
            {sidebarNavItems.map((item) => (
              <Button
                key={item.href}
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  pathname === item.href && "bg-secondary",
                  isCollapsed && "justify-center px-2"
                )}
                asChild
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4" />
                  {!isCollapsed && item.title}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
        <div className="p-4 mt-auto border-t">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              className={cn(
                "h-9 w-9 p-0",
                !isCollapsed && "w-full justify-start px-3"
              )}
              asChild
            >
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                {!isCollapsed && <span>Settings</span>}
              </Link>
            </Button>
            {!isCollapsed && <ModeToggle />}
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 h-8 w-8 rounded-full border bg-background"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}