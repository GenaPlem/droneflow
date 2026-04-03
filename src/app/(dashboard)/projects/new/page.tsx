import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectForm } from "@/components/projects/project-form";
import { createProjectAction } from "@/app/(dashboard)/projects/actions";

export default function NewProjectPage() {
  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="New Project"
        description="Create a new drone shoot project."
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <ProjectForm
            submitLabel="Create Project"
            onSubmitAction={createProjectAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
