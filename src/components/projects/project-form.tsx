"use client";

import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  projectFormSchema,
  type ProjectFormValues,
} from "@/lib/validations/project";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type ProjectFormProps = {
  defaultValues?: Partial<ProjectFormValues>;
  submitLabel?: string;
  onSubmitAction: (values: ProjectFormValues) => Promise<{
    success: true;
    projectId: string;
  }>;
};

export function ProjectForm({
  defaultValues,
  submitLabel = "Save Project",
  onSubmitAction,
}: ProjectFormProps) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      title: defaultValues?.title ?? "",
      location: defaultValues?.location ?? "",
      description: defaultValues?.description ?? "",
      shootDate: defaultValues?.shootDate ?? "",
    },
  });

  function onSubmit(values: ProjectFormValues) {
    startTransition(async () => {
      try {
        const result = await onSubmitAction(values);

        toast.success(
          submitLabel === "Create Project"
            ? "Project created"
            : "Project updated",
          {
            description: (
              <span className="text-foreground">
                {submitLabel === "Create Project"
                  ? "Your new project has been created successfully."
                  : "Your changes have been saved successfully."}
              </span>
            ),
          }
        );

        router.push(`/projects/${result.projectId}`);
        router.refresh();
      } catch {
        toast.error("Something went wrong", {
          description: (
            <span className="text-foreground">Please try again.</span>
          ),
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-title">Title</FormLabel>
              <FormControl>
                <Input
                  id="project-title"
                  placeholder="Luxury Villa Shoot"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-location">Location</FormLabel>
              <FormControl>
                <Input
                  id="project-location"
                  placeholder="Dublin, Ireland"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-description">Description</FormLabel>
              <FormControl>
                <Textarea
                  id="project-description"
                  placeholder="Describe the project..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="shootDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="project-shoot-date">Shoot Date</FormLabel>
              <FormControl>
                <Input id="project-shoot-date" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending}
          variant="default"
        >
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </form>
    </Form>
  );
}
