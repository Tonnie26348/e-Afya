import { Search, Bell, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

const TopBar = () => {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-card px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search patients, hospitals, drugs..."
          className="pl-10 bg-accent border-0"
        />
      </div>

      {/* Alerts */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 rounded-md alert-critical px-3 py-1.5 text-xs font-medium">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>3 Critical Alerts</span>
        </div>
        <button className="relative rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-destructive" />
        </button>
      </div>
    </header>
  );
};

export default TopBar;
