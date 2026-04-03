"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ProjectFormValues = {
  title: string;
  location: string;
  description?: string;
  shootDate?: string;
};

type ProjectFormProps = {
  defaultValues?: ProjectFormValues;
};

export function ProjectForm({ defaultValues }: ProjectFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input defaultValue={defaultValues?.title} />
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input defaultValue={defaultValues?.location} />
      </div>

      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea defaultValue={defaultValues?.description} />
      </div>

      <div className="space-y-2">
        <Label>Shoot Date</Label>
        <Input type="date" defaultValue={defaultValues?.shootDate} />
      </div>

      <Button className="w-full">Save Project</Button>
    </div>
  );
}
