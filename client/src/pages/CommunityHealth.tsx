import { Badge } from "@/components/ui/badge";
import { 
  Users, MapPin, Syringe, ClipboardList, ShieldCheck, 
  Search, Award, School, Building, Loader2, Plus, 
  CheckCircle2, AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface Professional {
  professional_id: string;
  full_name: string;
  level: string;
  education: string;
  specialization: string;
  hospital_name: string;
  hospital_location: string;
}

const CommunityHealth = () => {
  const [profId, setProfId] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verifiedProf, setVerifiedProf] = useState<Professional | null>(null);
  const [reports, setReports] = useState<any[]>([]);
  const [loadingReports, setLoadingReports] = useState(false);

  const handleVerify = async () => {
    if (!profId.trim()) return toast.error("Please enter a Professional ID");
    
    setVerifying(true);
    try {
      const response = await api.verifyProfessional(profId);
      if (response.data.success) {
        setVerifiedProf(response.data.data);
        toast.success("Identity Verified Successfully");
        fetchReports();
      }
    } catch (error: any) {
      toast.error(error.message || "Verification Failed");
    } finally {
      setVerifying(false);
    }
  };

  const fetchReports = async () => {
    setLoadingReports(true);
    try {
      const response = await api.get('/reports');
      if (response.data.success) {
        setReports(response.data.data.slice(0, 5));
      }
    } catch (error) {
      console.error("Failed to fetch reports");
    } finally {
      setLoadingReports(false);
    }
  };

  if (!verifiedProf) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center min-h-[70vh] space-y-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="text-center space-y-3">
          <div className="inline-flex p-4 bg-primary/10 rounded-full text-primary mb-4">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Health Professional Verification</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Please enter your unique Kenyan Professional ID to access the National Reporting & Vaccination Tracker.
          </p>
        </div>

        <div className="w-full max-w-md space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
              placeholder="Enter ID (e.g., CHW-KE-2026-001)" 
              className="pl-10 h-12 text-lg border-2 focus-visible:ring-primary"
              value={profId}
              onChange={(e) => setProfId(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
            />
          </div>
          <Button 
            className="w-full h-12 text-lg gap-2" 
            onClick={handleVerify}
            disabled={verifying}
          >
            {verifying ? <Loader2 className="h-5 w-5 animate-spin" /> : <ShieldCheck className="h-5 w-5" />}
            Verify Credentials
          </Button>
          <p className="text-center text-xs text-muted-foreground">
            Identity verification is required for all Ministry of Health field personnel.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Verified Professional Profile Header */}
      <Card className="border-2 border-primary/20 overflow-hidden bg-primary/5">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row items-center md:items-start p-6 gap-6">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg">
              <Award className="h-12 w-12" />
            </div>
            <div className="space-y-4 flex-1 text-center md:text-left">
              <div>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 justify-center md:justify-start">
                  <h2 className="text-2xl font-bold">{verifiedProf.full_name}</h2>
                  <Badge className="bg-green-600 hover:bg-green-700 w-fit mx-auto md:mx-0">
                    <CheckCircle2 className="h-3 w-3 mr-1" /> Verified Professional
                  </Badge>
                </div>
                <p className="text-primary font-semibold flex items-center justify-center md:justify-start gap-1">
                  {verifiedProf.professional_id} • {verifiedProf.level}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                  <School className="h-4 w-4 shrink-0 text-primary" />
                  <span>{verifiedProf.education}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start">
                  <Award className="h-4 w-4 shrink-0 text-primary" />
                  <span>{verifiedProf.specialization}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center md:justify-start lg:col-span-1 sm:col-span-2">
                  <Building className="h-4 w-4 shrink-0 text-primary" />
                  <span>{verifiedProf.hospital_name} • {verifiedProf.hospital_location}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => setVerifiedProf(null)}>
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Reporting Tools Card */}
        <Card className="md:col-span-2">
          <CardHeader className="border-b bg-muted/30">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">Professional Tools</CardTitle>
                <CardDescription>Digitally record community health activities</CardDescription>
              </div>
              <div className="flex gap-2">
                 <Button size="sm" className="gap-1.5"><ClipboardList className="h-4 w-4" /> New Field Report</Button>
                 <Button size="sm" variant="secondary" className="gap-1.5"><Syringe className="h-4 w-4" /> Log Vaccination</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl border-2 border-dashed border-muted hover:border-primary/40 transition-colors flex flex-col items-center justify-center space-y-3 cursor-pointer group text-center">
                  <div className="p-3 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                    <ClipboardList className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold">Routine Visit</h3>
                    <p className="text-xs text-muted-foreground">Log standard household health assessment</p>
                  </div>
                </div>
                <div className="p-6 rounded-2xl border-2 border-dashed border-muted hover:border-red-500/40 transition-colors flex flex-col items-center justify-center space-y-3 cursor-pointer group text-center">
                  <div className="p-3 bg-red-500/10 rounded-full text-red-500 group-hover:scale-110 transition-transform">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-red-600">Emergency Report</h3>
                    <p className="text-xs text-muted-foreground">Report urgent disease symptoms in community</p>
                  </div>
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Your Recent Field Submissions</h3>
                <div className="space-y-3">
                  {loadingReports ? (
                    <div className="text-center py-8 text-muted-foreground">Syncing records...</div>
                  ) : reports.map((r, i) => (
                    <motion.div 
                      key={i} 
                      className="flex items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-all cursor-pointer"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
                          {r.visit_type === 'Emergency' ? <AlertCircle className="h-5 w-5 text-red-500" /> : <CheckCircle2 className="h-5 w-5 text-green-500" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm">{r.visit_type || 'Field Assessment'}</p>
                          <p className="text-xs text-muted-foreground">{r.patients?.name || 'Anonymous Patient'} • {new Date(r.visit_date).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Verified</Badge>
                    </motion.div>
                  ))}
                </div>
             </div>
          </CardContent>
        </Card>

        {/* Stats & Guidelines Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-muted-foreground uppercase">Deployment Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Field Reports</span>
                <span className="font-bold">42</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b">
                <span className="text-sm text-muted-foreground">Vaccinations</span>
                <span className="font-bold text-primary">156</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-muted-foreground">Last Sync</span>
                <span className="text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full">3 mins ago</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/10 border-none">
            <CardContent className="p-6 space-y-4 text-center">
               <div className="inline-flex p-3 bg-secondary/20 rounded-xl text-secondary mx-auto">
                 <ShieldCheck className="h-6 w-6" />
               </div>
               <h3 className="font-bold text-sm">Official Guidelines</h3>
               <p className="text-xs text-muted-foreground leading-relaxed">
                 All data entered through this portal is legal evidence. Ensure accuracy in patient symptoms and vaccination dosage.
               </p>
               <Button variant="link" className="text-xs font-bold text-secondary p-0">View CHW Handbook</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default CommunityHealth;
