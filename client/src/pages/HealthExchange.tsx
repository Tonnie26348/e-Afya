import { FileHeart, Search, Shield, Clock, Plus, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
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

const patientSchema = z.object({
  digital_health_id: z.string().min(5, "ID must be at least 5 characters"),
  name: z.string().min(2, "Name is required"),
  dob: z.string().refine((val) => !isNaN(Date.parse(val)), "Invalid date"),
  gender: z.string().min(1, "Gender is required"),
  county: z.string().min(1, "County is required"),
});

type PatientFormValues = z.infer<typeof patientSchema>;

interface Patient {
  id: string;
  name: string;
  age: number;
  county: string;
  lastVisit: string;
  conditions: string[];
}

const mockPatients: Patient[] = [
  { id: "KE-2024-001847", name: "John Kamau", age: 45, county: "Nairobi", lastVisit: "Mar 12, 2026", conditions: ["Diabetes Type 2", "Hypertension"] },
  { id: "KE-2024-003291", name: "Grace Otieno", age: 32, county: "Kisumu", lastVisit: "Mar 11, 2026", conditions: ["Malaria", "Anemia"] },
  { id: "KE-2024-005623", name: "Hassan Ali", age: 58, county: "Mombasa", lastVisit: "Mar 10, 2026", conditions: ["COPD"] },
];

const HealthExchange = () => {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<PatientFormValues>({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      digital_health_id: "",
      name: "",
      dob: "",
      gender: "",
      county: "",
    },
  });

  const fetchPatients = async () => {
    setLoading(true);
    try {
      const response = await api.get('/patients');
      if (response.data.success && response.data.data.length > 0) {
        const mappedPatients = response.data.data.map((p: any) => ({
          id: p.digital_health_id,
          name: p.name,
          age: new Date().getFullYear() - new Date(p.dob).getFullYear(),
          county: p.county || "Unknown",
          lastVisit: new Date(p.created_at).toLocaleDateString(),
          conditions: [] 
        }));
        setPatients(mappedPatients);
      }
    } catch (error) {
      console.error("Failed to fetch patients:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  async function onSubmit(values: PatientFormValues) {
    setSubmitting(true);
    try {
      const response = await api.post('/patients', values);
      if (response.data.success) {
        toast.success("Patient registered successfully");
        setIsDialogOpen(false);
        form.reset();
        fetchPatients();
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to register patient");
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
          <h1>National Health Data Exchange</h1>
          <p>Secure patient record sharing across providers</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="gap-1.5 hidden sm:flex">
            <Shield className="h-3 w-3" /> FHIR R4 Compliant
          </Badge>
          
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" /> New Patient
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register New Patient</DialogTitle>
                <DialogDescription>
                  Enter the patient's details to create a new Digital Health record.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
                  <FormField
                    control={form.control}
                    name="digital_health_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Digital Health ID</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. KEN-2024-XXX" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Male">Male</SelectItem>
                              <SelectItem value="Female">Female</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <FormControl>
                          <Input placeholder="Nairobi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button type="submit" disabled={submitting} className="w-full">
                      {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Register Patient
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {[
          { label: "Digital Health IDs", value: "12.4M" },
          { label: "Records Shared Today", value: "34,521" },
          { label: "Connected Facilities", value: "847" },
          { label: "Consent Rate", value: "94.2%", color: "text-secondary" },
        ].map((s, i) => (
          <motion.div
            key={i}
            className="stat-card"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{s.label}</p>
            <p className={`font-heading text-xl sm:text-2xl font-bold mt-2 ${s.color || "text-foreground"}`}>{s.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="module-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h3 className="font-heading text-sm font-semibold text-foreground">Patient Records</h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search by ID or name..." className="pl-10 bg-muted/50 border-0 rounded-lg" />
          </div>
        </div>
        <div className="space-y-2">
          {loading ? (
             <div className="p-4 text-center text-muted-foreground">Loading records...</div>
          ) : patients.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 + i * 0.04 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border bg-accent/30 p-4 hover:bg-accent/50 transition-colors cursor-pointer gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary font-heading font-bold text-sm">
                  {p.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.id} · {p.county} · Age {p.age}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 ml-13 sm:ml-0">
                <div className="flex flex-wrap gap-1.5">
                  {p.conditions.map((c, ci) => (
                    <Badge key={ci} variant="outline" className="text-[11px]">{c}</Badge>
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground whitespace-nowrap">
                  <Clock className="h-3 w-3" />
                  {p.lastVisit}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default HealthExchange;
