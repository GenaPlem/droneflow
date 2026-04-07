"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
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
  const router = useRouter();

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
                try {
                  await archiveProjectAction(projectId);
                  toast.success("Project archived", {
                    description:
                      "You can find it in the archived projects page.",
                  });
                  router.push("/projects");
                  router.refresh();
                } catch {
                  toast.error("Failed to archive project");
                }
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
  const router = useRouter();

  return (
    <Button
      variant="outline"
      className="cursor-pointer"
      disabled={isPending}
      type="button"
      onClick={() => {
        startTransition(async () => {
          try {
            await restoreProjectAction(projectId);
            toast.success("Project restored", {
              description: "The project is back in the active projects list.",
            });
            router.push("/projects");
            router.refresh();
          } catch {
            toast.error("Failed to restore project");
          }
        });
      }}
    >
      {isPending ? "Restoring..." : "Restore"}
    </Button>
  );
}
