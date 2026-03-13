import {
  Users,
  Building2,
  ArrowRightLeft,
  Pill,
  Activity,
  Heart,
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "@/components/dashboard/StatCard";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import CapacityChart from "@/components/dashboard/CapacityChart";
import DiseaseTrendChart from "@/components/dashboard/DiseaseTrendChart";
import RecentReferrals from "@/components/dashboard/RecentReferrals";
import DrugStockSummary from "@/components/dashboard/DrugStockSummary";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const Index = () => {
  return (
    <motion.div
      className="space-y-6"
      variants={container}
      initial="hidden"
      animate="show"
    >
      <div className="page-header">
        <h1>Command Center</h1>
        <p>National health system overview — March 13, 2026</p>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard index={0} title="Active Patients" value="2.4M" change="+3.2% this month" changeType="positive" icon={Users} />
        <StatCard index={1} title="Hospitals Online" value="847" change="12 offline" changeType="negative" icon={Building2} />
        <StatCard index={2} title="Active Referrals" value="1,247" change="+8% today" changeType="neutral" icon={ArrowRightLeft} />
        <StatCard index={3} title="Drug Alerts" value="23" change="5 critical" changeType="negative" icon={Pill} iconColor="bg-destructive/10" />
        <StatCard index={4} title="CHW Reports" value="8,432" change="+12% this week" changeType="positive" icon={Heart} iconColor="bg-secondary/10" />
        <StatCard index={5} title="System Uptime" value="99.7%" change="Last 30 days" changeType="positive" icon={Activity} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <motion.div variants={item}><CapacityChart /></motion.div>
        <motion.div variants={item}><DiseaseTrendChart /></motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
        <motion.div variants={item}><AlertsPanel /></motion.div>
        <motion.div variants={item}><RecentReferrals /></motion.div>
        <motion.div variants={item}><DrugStockSummary /></motion.div>
      </div>
    </motion.div>
  );
};

export default Index;
