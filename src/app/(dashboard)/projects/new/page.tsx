import { PageHeader } from "@/components/shared/page-header";
import { ProjectForm } from "@/components/projects/project-form";
import { Card, CardContent } from "@/components/ui/card";

export default function NewProjectPage() {
  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="New Project"
        description="Create a new drone shoot project."
      />

      <Card className="max-w-2xl">
        <CardContent className="pt-6">
          <ProjectForm />
        </CardContent>
      </Card>
    </div>
  );
}
