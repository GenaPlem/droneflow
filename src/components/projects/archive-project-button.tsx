"use client";

import { useTransition } from "react";
import {
  archiveProjectAction,
  restoreProjectAction,
} from "@/app/(dashboard)/projects/actions";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ArchiveProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          type="button"
          className="cursor-pointer"
          disabled={isPending}
        >
          {isPending ? "Archiving..." : "Archive"}
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Archive project?</AlertDialogTitle>
          <AlertDialogDescription>
            This project will be moved to the archived list. You can restore it
            later.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer" disabled={isPending}>
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            className="cursor-pointer"
            disabled={isPending}
            onClick={(event) => {
              event.preventDefault();

              startTransition(async () => {
                await archiveProjectAction(projectId);
              });
            }}
          >
            {isPending ? "Archiving..." : "Archive"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function RestoreProjectButton({ projectId }: { projectId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(async () => {
          await restoreProjectAction(projectId);
        });
      }}
    >
      {isPending ? "Restoring..." : "Restore"}
    </Button>
  );
}
