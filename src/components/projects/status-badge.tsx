import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { ProjectStatus } from "@/types/project";

const statusMap: Record<ProjectStatus, string> = {
  planned: "Planned",
  ready_to_shoot: "Ready to Shoot",
  filmed: "Filmed",
  editing: "Editing",
  delivered: "Delivered",
};

const statusStyles: Record<ProjectStatus, string> = {
  planned: "bg-slate-100 text-slate-700 border-slate-200",
  ready_to_shoot: "bg-blue-100 text-blue-700 border-blue-200",
  filmed: "bg-violet-100 text-violet-700 border-violet-200",
  editing: "bg-amber-100 text-amber-700 border-amber-200",
  delivered: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <Badge
      variant="outline"
      className={cn("font-medium", statusStyles[status])}
    >
      {statusMap[status]}
    </Badge>
  );
}
