import {
  Users,
  Building2,
  ArrowRightLeft,
  Pill,
  Activity,
  Heart,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import CapacityChart from "@/components/dashboard/CapacityChart";
import DiseaseTrendChart from "@/components/dashboard/DiseaseTrendChart";
import RecentReferrals from "@/components/dashboard/RecentReferrals";
import DrugStockSummary from "@/components/dashboard/DrugStockSummary";

const Index = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-foreground">Command Center</h1>
        <p className="text-sm text-muted-foreground">National health system overview — March 13, 2026</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard title="Active Patients" value="2.4M" change="+3.2% this month" changeType="positive" icon={Users} />
        <StatCard title="Hospitals Online" value="847" change="12 offline" changeType="negative" icon={Building2} />
        <StatCard title="Active Referrals" value="1,247" change="+8% today" changeType="neutral" icon={ArrowRightLeft} />
        <StatCard title="Drug Alerts" value="23" change="5 critical" changeType="negative" icon={Pill} iconColor="bg-destructive/10" />
        <StatCard title="CHW Reports" value="8,432" change="+12% this week" changeType="positive" icon={Heart} iconColor="bg-secondary/10" />
        <StatCard title="System Uptime" value="99.7%" change="Last 30 days" changeType="positive" icon={Activity} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CapacityChart />
        <DiseaseTrendChart />
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <AlertsPanel />
        <RecentReferrals />
        <DrugStockSummary />
      </div>
    </div>
  );
};

export default Index;
