import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/projects/status-badge";
import { mockProjects } from "@/lib/mock-data";

type ProjectDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const project = mockProjects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-10 p-6">
      <PageHeader
        title={project.title}
        description={`${project.location} • ${
          project.shootDate ?? "No shoot date yet"
        }`}
        action={
          <div className="flex items-center gap-3">
            <StatusBadge status={project.status} />
            <Button variant="outline">Archive</Button>
            <Button>Edit Project</Button>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="xl:col-span-2 rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold tracking-tight">
              Project Overview
            </CardTitle>
          </CardHeader>

          <CardContent className="grid gap-6 text-sm md:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Location
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {project.location}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Shoot Date
              </p>
              <p className="mt-2 text-sm font-medium text-foreground">
                {project.shootDate ?? "Not set"}
              </p>
            </div>

            <div className="md:col-span-2">
              <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Description
              </p>
              <p className="mt-2 text-sm leading-6 text-foreground">
                {project.description ?? "No description yet."}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-semibold tracking-tight">
              Project Meta
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-muted-foreground">Featured</span>
              <span className="font-medium text-foreground">
                {project.featured ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-muted-foreground">Public</span>
              <span className="font-medium text-foreground">
                {project.isPublic ? "Yes" : "No"}
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border px-4 py-3">
              <span className="text-muted-foreground">Archived</span>
              <span className="font-medium text-foreground">
                {project.archived ? "Yes" : "No"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold tracking-tight">
            Shot Planner
          </CardTitle>
        </CardHeader>

        <CardContent>
          {project.shots.length > 0 ? (
            <div className="space-y-3">
              {project.shots.map((shot) => (
                <div
                  key={shot.id}
                  className="rounded-2xl border bg-background p-4 text-sm"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-medium text-foreground">
                        {shot.title}
                      </p>
                      <p className="mt-1 text-muted-foreground">
                        {shot.type} • Order {shot.order}
                      </p>
                    </div>

                    <span className="text-xs font-medium text-muted-foreground">
                      {shot.completed ? "Done" : "Pending"}
                    </span>
                  </div>

                  {shot.notes ? (
                    <p className="mt-3 text-sm leading-6 text-muted-foreground">
                      {shot.notes}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              No shots yet. Add your first planned shot for this project.
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="rounded-2xl">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold tracking-tight">
            Media
          </CardTitle>
        </CardHeader>

        <CardContent>
          {project.media.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {project.media.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl border bg-background p-4 text-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium capitalize text-foreground">
                      {item.type}
                    </p>
                    {item.isBestShot ? (
                      <span className="text-xs font-medium text-muted-foreground">
                        Best shot
                      </span>
                    ) : null}
                  </div>

                  <p className="mt-3 break-all text-muted-foreground">
                    {item.url}
                  </p>

                  {item.caption ? (
                    <p className="mt-3 leading-6 text-foreground">
                      {item.caption}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed p-6 text-sm text-muted-foreground">
              No media added yet. Upload visuals after the shoot.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
