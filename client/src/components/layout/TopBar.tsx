import { Search, Bell, AlertTriangle, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";

interface TopBarProps {
  onMenuClick: () => void;
}

const TopBar = ({ onMenuClick }: TopBarProps) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card/80 backdrop-blur-md px-4 md:px-6">
      <div className="flex items-center gap-3">
        {/* Mobile menu */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors md:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Search */}
        <div className="relative hidden sm:block w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients, hospitals, drugs..."
            className="pl-10 bg-muted/50 border-0 rounded-lg focus-visible:ring-1"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 rounded-lg alert-critical px-3 py-1.5 text-xs font-medium">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">3 Critical Alerts</span>
          <span className="sm:hidden">3</span>
        </div>
        <button className="relative rounded-lg p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
