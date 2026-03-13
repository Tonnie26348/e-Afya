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
  Heart,
  X,
  LogOut,
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

  const filteredModules = allModules.filter(m => m.roles.includes(user?.role || ''));

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
          "flex h-screen flex-col bg-sidebar transition-all duration-300 ease-in-out border-r border-sidebar-border shadow-xl",
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
    <div className={cn("flex h-20 items-center gap-3 border-b border-sidebar-border/50 px-4", collapsed && "justify-center px-0")}>
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary via-primary to-primary shadow-lg shadow-primary/30 ring-4 ring-primary/10">
        <Heart className="h-5 w-5 text-primary-foreground animate-pulse" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <h1 className="font-heading text-lg font-bold tracking-tight text-sidebar-foreground leading-none">E-Afya</h1>
          <p className="text-[10px] font-medium text-sidebar-muted uppercase tracking-wider mt-1.5">Kenya Health Cloud</p>
        </div>
      )}
    </div>

    {/* Navigation */}
    <nav className="flex-1 space-y-1.5 overflow-y-auto p-4 custom-scrollbar">
      {!collapsed && (
        <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-sidebar-muted/60">
          Core Infrastructure
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
              "nav-item relative group py-2.5",
              isActive ? "nav-item-active bg-primary/10 text-primary" : "nav-item-inactive hover:bg-sidebar-accent/50",
              collapsed && "justify-center px-0 rounded-xl mx-2"
            )}
            title={collapsed ? mod.label : undefined}
          >
            <mod.icon className={cn("h-[19px] w-[19px] shrink-0 transition-transform duration-200 group-hover:scale-110", isActive && "text-primary")} />
            {!collapsed && <span className="font-medium">{mod.label}</span>}
            {isActive && !collapsed && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-full" />
            )}
          </NavLink>
        );
      })}
    </nav>

    {/* Role Indicator & Switcher */}
    <div className="border-t border-sidebar-border/50 p-4 bg-sidebar-accent/10">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className={cn(
            "flex items-center gap-3 w-full rounded-xl p-2.5 transition-all duration-200 hover:bg-sidebar-accent border border-transparent hover:border-sidebar-border/50",
            collapsed && "justify-center px-0"
          )}>
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
              <Shield className="h-4.5 w-4.5" />
            </div>
            {!collapsed && (
              <div className="min-w-0 text-left flex-1">
                <p className="truncate text-sm font-semibold text-sidebar-foreground leading-tight">{user?.name}</p>
                <p className="text-[11px] font-medium text-primary uppercase tracking-wide mt-0.5">{user?.role}</p>
              </div>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56 mb-2 rounded-xl shadow-2xl border-sidebar-border">
          <DropdownMenuLabel className="text-xs font-bold uppercase tracking-widest text-muted-foreground/60 py-2 px-3">Switch Ecosystem Role</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {(['Doctor', 'Pharmacist', 'Admin', 'CHW', 'MinistryAnalyst'] as UserRole[]).map((role) => (
            <DropdownMenuItem 
              key={role} 
              onClick={() => login(role)}
              className={cn("flex flex-col items-start gap-0.5 py-2 px-3", user?.role === role && "bg-primary/5")}
            >
              <span className="font-semibold text-sm">{role} Access</span>
              <span className="text-[10px] text-muted-foreground italic">Simulation Mode</span>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-destructive font-medium gap-2 py-2 px-3">
            <LogOut className="h-4 w-4" /> Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    {/* Collapse toggle — desktop only */}
    {onToggle && (
      <button
        onClick={onToggle}
        className="hidden md:flex h-12 items-center justify-center border-t border-sidebar-border/50 text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all"
      >
        {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
      </button>
    )}
  </>
);

export default AppSidebar;
