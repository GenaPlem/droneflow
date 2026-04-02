import { Badge } from "@/components/ui/badge";
import type { ProjectStatus } from "@/types/project";

const statusMap: Record<ProjectStatus, string> = {
  planned: "Planned",
  ready_to_shoot: "Ready to Shoot",
  filmed: "Filmed",
  editing: "Editing",
  delivered: "Delivered",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return <Badge variant="secondary">{statusMap[status]}</Badge>;
}
