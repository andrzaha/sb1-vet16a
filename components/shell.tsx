interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className="container flex-1 overflow-auto">
      <div className="grid items-start gap-8 pb-8 pt-6">
        {children}
      </div>
    </div>
  );
}