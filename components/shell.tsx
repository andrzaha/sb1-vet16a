interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="flex h-screen bg-background">
      <SideMenu />
      <main className="flex-1 overflow-y-auto">
        <div className="h-full">
          {children}
        </div>
      </main>
    </div>
  );
}

export function SideMenu() {
  return (
    <aside className="w-0 bg-background border-r">
      {/* Side menu content */}
    </aside>
  );
}