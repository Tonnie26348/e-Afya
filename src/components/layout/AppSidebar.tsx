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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const modules = [
  { path: "/", icon: LayoutDashboard, label: "Command Center" },
  { path: "/health-exchange", icon: FileHeart, label: "Health Data Exchange" },
  { path: "/referrals", icon: ArrowRightLeft, label: "Referrals & Capacity" },
  { path: "/analytics", icon: BarChart3, label: "Health Analytics" },
  { path: "/drug-supply", icon: Pill, label: "Drug Supply" },
  { path: "/community-health", icon: Users, label: "Community Health" },
];

const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "flex h-screen flex-col border-r bg-card transition-all duration-200",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
          <Heart className="h-4 w-4 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div>
            <h1 className="font-heading text-lg font-bold text-foreground">E-Afya</h1>
            <p className="text-[10px] text-muted-foreground">Kenya Digital Health</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-2">
        {modules.map((mod) => {
          const isActive = location.pathname === mod.path;
          return (
            <NavLink
              key={mod.path}
              to={mod.path}
              className={cn(
                "nav-item",
                isActive ? "nav-item-active" : "nav-item-inactive"
              )}
              title={collapsed ? mod.label : undefined}
            >
              <mod.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{mod.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Role indicator */}
      {!collapsed && (
        <div className="border-t p-3">
          <div className="flex items-center gap-2 rounded-md bg-accent p-2">
            <Shield className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs font-medium text-foreground">Dr. Amina Wanjiku</p>
              <p className="text-[10px] text-muted-foreground">Hospital Admin</p>
            </div>
          </div>
        </div>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex h-10 items-center justify-center border-t text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
};

export default AppSidebar;
