"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  LayoutDashboard,
  Settings,
  FileCode,
  Calendar,
  Cloud,
  LogIn,
  Play,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export function AppSidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Auto-collapse on mobile screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };

    // Initial check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={cn(
      "relative flex h-screen border-r bg-background transition-all duration-300",
      isCollapsed ? "w-20" : "w-64"
    )}>
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
        <div className="flex-1 overflow-y-auto px-3">
          <div className="space-y-1 py-4">
            {sidebarNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  pathname === item.href 
                    ? "bg-secondary text-secondary-foreground" 
                    : "hover:bg-accent hover:text-accent-foreground",
                  isCollapsed && "justify-center px-2"
                )}
              >
                <item.icon className="h-4 w-4" />
                {!isCollapsed && <span>{item.title}</span>}
              </Link>
            ))}
          </div>
        </div>
        <div className="mt-auto border-t p-4">
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              isCollapsed && "justify-center px-2"
            )}
          >
            <Settings className="h-4 w-4" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
          <Link
            href="/login"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground",
              isCollapsed && "justify-center px-2"
            )}
          >
            <LogIn className="h-4 w-4" />
            {!isCollapsed && <span>Login</span>}
          </Link>
        </div>
      </div>
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border bg-background"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}