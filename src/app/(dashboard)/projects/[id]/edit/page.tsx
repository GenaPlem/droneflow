import { notFound } from "next/navigation";
import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectForm } from "@/components/projects/project-form";
import { mockProjects } from "@/lib/mock-data";

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;

  const project = mockProjects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="Edit Project"
        description={`Editing ${project.title}`}
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <ProjectForm
            submitLabel="Update Project"
            defaultValues={{
              title: project.title,
              location: project.location,
              description: project.description,
              shootDate: project.shootDate,
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
