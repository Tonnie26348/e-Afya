import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileHeart,
  ArrowRightLeft,
  BarChart3,
  Pill,
  Users,
  Shield,
  ChevronLeft,
  ChevronRight,
  Activity,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const modules = [
  { path: "/", icon: LayoutDashboard, label: "Command Center" },
  { path: "/health-exchange", icon: FileHeart, label: "Health Data Exchange" },
  { path: "/referrals", icon: ArrowRightLeft, label: "Referrals & Capacity" },
  { path: "/analytics", icon: BarChart3, label: "Health Analytics" },
  { path: "/drug-supply", icon: Pill, label: "Drug Supply" },
  { path: "/community-health", icon: Users, label: "Community Health" },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const AppSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: AppSidebarProps) => {
  const location = useLocation();

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
          onClick={onMobileClose}
        />
      )}

      <aside
        className={cn(
          "flex h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out",
          // Desktop
          "hidden md:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent collapsed={collapsed} location={location} onToggle={onToggle} />
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-sidebar transition-transform duration-300 ease-in-out md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <button
          onClick={onMobileClose}
          className="absolute right-3 top-4 rounded-lg p-1.5 text-sidebar-muted hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
        <SidebarContent collapsed={false} location={location} onMobileClose={onMobileClose} />
      </aside>
    </>
  );
};

interface SidebarContentProps {
  collapsed: boolean;
  location: ReturnType<typeof useLocation>;
  onToggle?: () => void;
  onMobileClose?: () => void;
}

const SidebarContent = ({ collapsed, location, onToggle, onMobileClose }: SidebarContentProps) => (
  <>
    {/* Logo - New Professional Design */}
    <div className={cn("flex h-16 items-center gap-3 border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-md">
        <Activity className="h-6 w-6" />
      </div>
      {!collapsed && (
        <div>
          <h1 className="font-heading text-lg font-bold text-sidebar-foreground tracking-tight">E-AFYA</h1>
          <p className="text-[10px] text-sidebar-muted font-medium uppercase tracking-wider">Kenya Health</p>
        </div>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex-1 space-y-1 overflow-y-auto p-3">
      {!collapsed && (
        <p className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-sidebar-muted">
          Modules
        </p>
      )}
      {modules.map((mod) => {
        const isActive = location.pathname === mod.path;
        return (
          <NavLink
            key={mod.path}
            to={mod.path}
            onClick={onMobileClose}
            className={cn(
              "nav-item",
              isActive ? "nav-item-active" : "nav-item-inactive",
              collapsed && "justify-center px-0"
            )}
            title={collapsed ? mod.label : undefined}
          >
            <mod.icon className="h-[18px] w-[18px] shrink-0" />
            {!collapsed && <span>{mod.label}</span>}
          </NavLink>
        );
      })}
    </nav>

    {/* Simple Role Indicator (Restore previous style) */}
    {!collapsed && (
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg bg-sidebar-accent p-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/20 text-primary">
            <Shield className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-sidebar-foreground">Dr. Amina Wanjiku</p>
            <p className="text-[10px] text-sidebar-muted uppercase tracking-tight font-bold">Admin</p>
          </div>
        </div>
      </div>
    )}

    {/* Collapse toggle — desktop only */}
    {onToggle && (
      <button
        onClick={onToggle}
        className="hidden md:flex h-10 items-center justify-center border-t border-sidebar-border text-sidebar-muted hover:text-sidebar-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    )}
  </>
);

export default AppSidebar;
