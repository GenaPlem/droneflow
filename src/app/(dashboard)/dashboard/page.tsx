import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/shared/page-header";
import { StatCard } from "@/components/dashboard/stat-card";
import { ProjectCard } from "@/components/projects/project-card";
import { getProjects } from "@/lib/db/projects";
import { formatDate } from "@/lib/utils/format-date";

export default async function DashboardPage() {
  const projects = await getProjects();

  const totalProjects = projects.length;
  const readyToShoot = projects.filter(
    (project) => project.status === "ready_to_shoot"
  ).length;
  const inEditing = projects.filter(
    (project) => project.status === "editing"
  ).length;
  const delivered = projects.filter(
    (project) => project.status === "delivered"
  ).length;

  const upcomingShoots = projects.filter(
    (project) => !!project.shootDate && !project.archived
  );

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Dashboard"
        description="Manage your drone shoots and public portfolio."
        action={
          <Button asChild>
            <Link href="/projects/new">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Link>
          </Button>
        }
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Projects" value={totalProjects} />
        <StatCard title="Ready to Shoot" value={readyToShoot} />
        <StatCard title="In Editing" value={inEditing} />
        <StatCard title="Delivered" value={delivered} />
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <div className="space-y-4 xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              Recent Projects
            </h2>
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border bg-background p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Upcoming Shoots
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Scheduled shoots and planned work.
          </p>

          <div className="mt-6 space-y-4">
            {upcomingShoots.length > 0 ? (
              upcomingShoots.map((project) => (
                <div key={project.id} className="rounded-xl border p-4 text-sm">
                  <p className="font-medium text-foreground">{project.title}</p>
                  <p className="mt-1 text-muted-foreground">
                    {project.location}
                  </p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatDate(project.shootDate)}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No upcoming shoots yet.
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
