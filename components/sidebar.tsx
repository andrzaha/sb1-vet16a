"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useState, useMemo, useCallback } from "react";

const sidebarNavItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "File Processing",
    href: "/processing",
    icon: Play,
  },
  {
    title: "Processing History",
    href: "/history",
    icon: FileText,
  },
  {
    title: "Templates",
    href: "/templates",
    icon: FileCode,
  },
  {
    title: "Job Scheduler",
    href: "/scheduler",
    icon: Calendar,
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

  const memoizedSidebarNavItems = useMemo(() => sidebarNavItems, [sidebarNavItems]);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed((prev) => !prev);
  }, []);

  const SettingsButton = ({ isCollapsed }) => (
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
  );

  const LoginButton = ({ isCollapsed }) => (
    <Button
      variant="ghost"
      className={cn(
        "h-9 w-9 p-0 mt-2",
        !isCollapsed && "w-full justify-start px-3"
      )}
      asChild
    >
      <Link href="/login" className="flex items-center gap-2">
        <LogIn className="h-4 w-4" />
        {!isCollapsed && <span>Login</span>}
      </Link>
    </Button>
  );

  return (
    <div
      className={cn(
        "relative flex h-screen border-r bg-background transition-all duration-300",
        isCollapsed ? "w-20" : "w-52"
      )}
    >
      <div className="flex w-full flex-col">
        <div className="p-6">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/Paper_Parsley_Black_and_White_logo.png"
              alt="PaperParsley Logo"
              width={isCollapsed ? 24 : 32}
              height={isCollapsed ? 24 : 32}
            />
            {!isCollapsed && <span className="font-bold">PaperParsley</span>}
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 py-4">
            {memoizedSidebarNavItems.map((item) => (
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
          <SettingsButton isCollapsed={isCollapsed} />
          <LoginButton isCollapsed={isCollapsed} />
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 z-10 h-8 w-8 rounded-full border bg-background"
        onClick={toggleCollapse}
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