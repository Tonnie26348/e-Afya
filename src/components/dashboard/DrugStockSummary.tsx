import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

const drugs = [
  { name: "Paracetamol", stock: 12, unit: "boxes" },
  { name: "Amoxicillin", stock: 35, unit: "boxes" },
  { name: "Artemether/Lumefantrine", stock: 58, unit: "packs" },
  { name: "Metformin", stock: 72, unit: "bottles" },
  { name: "ORS Sachets", stock: 88, unit: "cartons" },
  { name: "Blood Type O-", stock: 8, unit: "units" },
];

const DrugStockSummary = () => {
  return (
    <div className="module-card">
      <h3 className="font-heading text-sm font-semibold text-foreground mb-4">Drug Stock Levels</h3>
      <div className="space-y-4">
        {drugs.map((drug, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-foreground font-medium">{drug.name}</span>
              <span className={cn(
                "text-xs font-medium",
                drug.stock <= 15 ? "text-destructive" : drug.stock <= 40 ? "text-warning" : "text-secondary"
              )}>
                {drug.stock}%
              </span>
            </div>
            <Progress
              value={drug.stock}
              className={cn(
                "h-2",
                drug.stock <= 15 ? "[&>div]:bg-destructive" : drug.stock <= 40 ? "[&>div]:bg-warning" : "[&>div]:bg-secondary"
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DrugStockSummary;
