import Link from "next/link";
import { PageHeader } from "@/components/shared/page-header";
import { ProjectCard } from "@/components/projects/project-card";
import { getArchivedProjects } from "@/lib/db/projects";

export default async function ArchivedProjectsPage() {
  const projects = await getArchivedProjects();

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Archived Projects"
        description="Previously archived drone projects."
        action={
          <Link href="/projects" className="text-sm text-primary">
            ← Back to active projects
          </Link>
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
          No archived projects yet.
        </div>
      )}
    </div>
  );
}
