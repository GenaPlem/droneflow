import { PageHeader } from "@/components/shared/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewProjectPage() {
  return (
    <div className="space-y-8 p-6">
      <PageHeader
        title="New Project"
        description="Create a new drone shoot project."
      />

      <Card className="max-w-2xl">
        <CardContent className="space-y-6 pt-6">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input placeholder="Luxury Villa Shoot" />
          </div>

          <div className="space-y-2">
            <Label>Location</Label>
            <Input placeholder="Dublin, Ireland" />
          </div>

          <div className="space-y-2">
            <Label>Description</Label>
            <Input placeholder="Short description..." />
          </div>

          <div className="space-y-2">
            <Label>Shoot Date</Label>
            <Input type="date" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
