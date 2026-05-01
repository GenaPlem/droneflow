import type { ProjectStatus } from "@prisma/client";

export const PROJECT_STATUS_OPTIONS = [
  { value: "planned", label: "Planned" },
  { value: "ready_to_shoot", label: "Ready to Shoot" },
  { value: "filmed", label: "Filmed" },
  { value: "editing", label: "Editing" },
  { value: "delivered", label: "Delivered" },
] as const satisfies {
  value: ProjectStatus;
  label: string;
}[];
