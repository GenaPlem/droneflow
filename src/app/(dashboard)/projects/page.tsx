import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { getActiveProjects } from "@/lib/db/projects";
import { getCurrentDbUser } from "@/lib/auth";

export default async function ProjectsPage() {
  const projects = await getActiveProjects();

  const user = await getCurrentDbUser();

  console.log("Current DB user:", user);

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Projects"
        description="Track shoot planning, filming, editing, and delivery."
        action={
          <div className="flex gap-3">
            <Button asChild variant="outline">
              <Link href="/projects/archived">Archived</Link>
            </Button>

            <Button asChild>
              <Link href="/projects/new">
                <Plus className="mr-2 h-4 w-4" />
                New Project
              </Link>
            </Button>
          </div>
        }
      />

      {projects.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed p-8 text-sm text-muted-foreground">
          No projects yet. Create your first drone project to get started.
        </div>
      )}
    </div>
  );
}
