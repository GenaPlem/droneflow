import Link from "next/link";
import { CalendarDays, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/types/project";
import { StatusBadge } from "@/components/projects/status-badge";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.id}`}>
      <Card className="h-full rounded-2xl transition-shadow hover:shadow-md">
        <CardHeader className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base">{project.title}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.description ?? "No description yet"}
              </p>
            </div>

            <StatusBadge status={project.status} />
          </div>
        </CardHeader>

        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>

          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{project.shootDate ?? "Date not set"}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <span>{project.shots.length} shots</span>
            <span>{project.media.length} media items</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
