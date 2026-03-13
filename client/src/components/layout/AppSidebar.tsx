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
import { useAuthStore, UserRole } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const allModules = [
  { path: "/", icon: LayoutDashboard, label: "Command Center", roles: ["Admin", "Doctor", "Pharmacist", "CHW", "MinistryAnalyst"] },
  { path: "/health-exchange", icon: FileHeart, label: "Health Data Exchange", roles: ["Admin", "Doctor"] },
  { path: "/referrals", icon: ArrowRightLeft, label: "Referrals & Capacity", roles: ["Admin", "Doctor"] },
  { path: "/analytics", icon: BarChart3, label: "Health Analytics", roles: ["Admin", "MinistryAnalyst"] },
  { path: "/drug-supply", icon: Pill, label: "Drug Supply", roles: ["Admin", "Pharmacist"] },
  { path: "/community-health", icon: Users, label: "Community Health", roles: ["Admin", "CHW"] },
];

interface AppSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

const AppSidebar = ({ collapsed, onToggle, mobileOpen, onMobileClose }: AppSidebarProps) => {
  const location = useLocation();
  const { user, login } = useAuthStore();

  const filteredModules = allModules.filter(m => m.roles.includes(user?.role || 'Admin'));

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
          "flex h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border shadow-sm",
          // Desktop
          "hidden md:flex",
          collapsed ? "w-[72px]" : "w-64"
        )}
      >
        <SidebarContent 
          collapsed={collapsed} 
          location={location} 
          onToggle={onToggle} 
          modules={filteredModules}
          user={user}
          login={login}
        />
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
        <SidebarContent 
          collapsed={false} 
          location={location} 
          onMobileClose={onMobileClose} 
          modules={filteredModules}
          user={user}
          login={login}
        />
      </aside>
    </>
  );
};

interface SidebarContentProps {
  collapsed: boolean;
  location: ReturnType<typeof useLocation>;
  onToggle?: () => void;
  onMobileClose?: () => void;
  modules: typeof allModules;
  user: any;
  login: (role: UserRole) => void;
}

const SidebarContent = ({ collapsed, location, onToggle, onMobileClose, modules, user, login }: SidebarContentProps) => (
  <>
    {/* Logo */}
    <div className={cn("flex h-16 items-center gap-3 border-b border-sidebar-border px-4", collapsed && "justify-center px-0")}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
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

    {/* Simple Role Switcher Dropdown */}
    <div className="border-t border-sidebar-border p-3">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn(
            "flex items-center gap-3 w-full rounded-lg bg-sidebar-accent/50 p-3 hover:bg-sidebar-accent transition-colors border border-transparent hover:border-sidebar-border",
            collapsed && "justify-center px-0"
          )}>
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary">
              <Shield className="h-4 w-4" />
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="truncate text-xs font-semibold text-sidebar-foreground">{user?.role || 'Admin'}</p>
                <p className="text-[10px] text-sidebar-muted uppercase tracking-tighter">Switch Role</p>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mb-2">
          <DropdownMenuLabel className="text-xs">Select Ecosystem Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(['Doctor', 'Pharmacist', 'Admin', 'CHW', 'MinistryAnalyst'] as UserRole[]).map((role) => (
            <DropdownMenuItem key={role} onClick={() => login(role)}>
              <span className={cn("text-sm", user?.role === role && "font-bold text-primary")}>
                {role} View
              </span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

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
