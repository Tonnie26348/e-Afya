import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Building2, Bed, Stethoscope, Ambulance, Plus, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import api from "@/lib/api";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const referralSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  receiving_hospital_id: z.string().min(1, "Receiving hospital is required"),
  reason: z.string().min(5, "Reason must be at least 5 characters"),
  priority: z.string().min(1, "Priority is required"),
});

type ReferralFormValues = z.infer<typeof referralSchema>;

interface Hospital {
  id: string;
  name: string;
  county: string;
  beds: number;
  icu: number;
  specialists: number;
  ambulances: number;
}

interface Patient {
  id: string;
  name: string;
  digital_health_id: string;
}

const mockHospitals: Hospital[] = [
  { id: "1", name: "Kenyatta National Hospital", county: "Nairobi", beds: 85, icu: 92, specialists: 45, ambulances: 8 },
  { id: "2", name: "Moi Teaching & Referral", county: "Uasin Gishu", beds: 72, icu: 65, specialists: 38, ambulances: 6 },
];

const capacityColor = (val: number) => val >= 85 ? "text-destructive" : val >= 60 ? "text-warning" : "text-secondary";
const capacityBg = (val: number) => val >= 85 ? "bg-destructive" : val >= 60 ? "bg-warning" : "bg-secondary";

const Referrals = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<ReferralFormValues>({
    resolver: zodResolver(referralSchema),
    defaultValues: {
      patient_id: "",
      receiving_hospital_id: "",
      reason: "",
      priority: "Normal",
    },
  });

  const fetchHospitals = async () => {
    try {
      const response = await api.get('/hospitals');
      if (response.data.success && response.data.data.length > 0) {
        const mappedHospitals = response.data.data.map((h: any) => {
          const cap = h.hospital_capacity || {};
          const totalBeds = cap.total_beds || 100;
          const availBeds = cap.available_beds || 0;
          const bedsOcc = Math.round(((totalBeds - availBeds) / totalBeds) * 100);

          const totalIcu = cap.icu_beds || 10;
          const availIcu = cap.available_icu_beds || 0;
          const icuOcc = Math.round(((totalIcu - availIcu) / totalIcu) * 100);

          return {
            id: h.id,
            name: h.name,
            county: h.county,
            beds: bedsOcc,
            icu: icuOcc,
            specialists: (cap.specialists_available || []).length,
            ambulances: Math.floor(Math.random() * 5) + 1
          };
        });
        setHospitals(mappedHospitals);
      }
    } catch (error) {
      console.error("Failed to fetch hospitals:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      const response = await api.get('/patients');
      if (response.data.success) {
        setPatients(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    }
  };

  useEffect(() => {
    fetchHospitals();
    fetchPatients();
  }, []);

  async function onSubmit(values: ReferralFormValues) {
    setSubmitting(true);
    try {
      const response = await api.post('/hospitals/referrals', values);
      if (response.data.success) {
        toast.success("Referral initiated successfully");
        setIsDialogOpen(false);
        form.reset();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to initiate referral");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="page-header mb-0">
          <h1>Smart Referral & Hospital Capacity</h1>
          <p>Real-time bed availability and referral management</p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Initiate Referral
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[450px]">
            <DialogHeader>
              <DialogTitle>New Digital Referral</DialogTitle>
              <DialogDescription>
                Transfer a patient to another facility with real-time data sharing.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                <FormField
                  control={form.control}
                  name="patient_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select patient" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {patients.map((p) => (
                            <SelectItem key={p.id} value={p.id}>{p.name} ({p.digital_health_id})</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="receiving_hospital_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Receiving Hospital</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select facility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {hospitals.map((h) => (
                            <SelectItem key={h.id} value={h.id}>{h.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="priority"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Priority Level</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Normal">Normal</SelectItem>
                          <SelectItem value="Urgent">Urgent</SelectItem>
                          <SelectItem value="Emergency">Emergency</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clinical Reason for Referral</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe the clinical necessity for transfer..." 
                          className="min-h-[100px]"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit" disabled={submitting} className="w-full">
                    {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Send Digital Referral
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { icon: Bed, color: "text-primary", bg: "bg-primary/10", label: "Total Beds", value: "24,580" },
          { icon: Building2, color: "text-destructive", bg: "bg-destructive/10", label: "ICU Available", value: "127" },
          { icon: Stethoscope, color: "text-secondary", bg: "bg-secondary/10", label: "Specialists On-Call", value: "342" },
          { icon: Ambulance, color: "text-warning", bg: "bg-warning/10", label: "Ambulances Active", value: "89" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card flex items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className={cn("rounded-xl p-2.5", s.bg)}>
              <s.icon className={cn("h-5 w-5", s.color)} />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
              <p className="font-heading text-lg font-bold text-foreground">{s.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="module-card">
        <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Facility Capacity Monitor</h3>
        <div className="space-y-3">
          {loading ? (
             <div className="p-4 text-center text-muted-foreground">Loading hospitals...</div>
          ) : hospitals.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-lg border p-4 hover:bg-accent/30 transition-colors"
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1">
                <div>
                  <p className="text-sm font-medium text-foreground">{h.name}</p>
                  <p className="text-xs text-muted-foreground">{h.county} County</p>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{h.specialists} specialists</span>
                  <span>{h.ambulances} ambulances</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">Bed Occupancy</span>
                    <span className={cn("font-semibold", capacityColor(h.beds))}>{h.beds}%</span>
                  </div>
                  <Progress value={h.beds} className={cn("h-2 rounded-full", capacityBg(h.beds))} />
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-muted-foreground">ICU Occupancy</span>
                    <span className={cn("font-semibold", capacityColor(h.icu))}>{h.icu}%</span>
                  </div>
                  <Progress value={h.icu} className={cn("h-2 rounded-full", capacityBg(h.icu))} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Referrals;
