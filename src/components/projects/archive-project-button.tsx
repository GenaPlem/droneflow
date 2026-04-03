"use client";

import { useTransition } from "react";
import { archiveProjectAction } from "@/app/(dashboard)/projects/actions";
import { Button } from "@/components/ui/button";

export function ArchiveProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => {
        const confirmed = window.confirm(
          "Are you sure you want to archive this project?"
        );

        if (!confirmed) return;

        startTransition(async () => {
          await archiveProjectAction(projectId);
        });
      }}
    >
      {isPending ? "Archiving..." : "Archive"}
    </Button>
  );
}
