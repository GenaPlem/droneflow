"use client";

import { useTransition } from "react";
import type { ProjectStatus } from "@prisma/client";
import { toast } from "sonner";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateProjectStatusAction } from "@/app/(dashboard)/projects/actions";
import { PROJECT_STATUS_OPTIONS } from "@/lib/project-status";

type ProjectStatusSelectProps = {
  projectId: string;
  currentStatus: ProjectStatus;
};

export function ProjectStatusSelect({
  projectId,
  currentStatus,
}: ProjectStatusSelectProps) {
  const [isPending, startTransition] = useTransition();

  function handleStatusChange(status: ProjectStatus) {
    startTransition(async () => {
      const result = await updateProjectStatusAction(projectId, status);

      if (!result.success) {
        toast.error("Failed to update status");
        return;
      }

      toast.success("Project status updated");
    });
  }

  return (
    <Select
      value={currentStatus}
      onValueChange={(value) => handleStatusChange(value as ProjectStatus)}
      disabled={isPending}
    >
      <SelectTrigger className="w-40 cursor-pointer">
        <SelectValue placeholder="Select status" />
      </SelectTrigger>

      <SelectContent>
        {PROJECT_STATUS_OPTIONS.map((status) => (
          <SelectItem
            key={status.value}
            value={status.value}
            className="cursor-pointer"
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
