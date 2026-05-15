"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireCurrentDbUser } from "@/lib/auth";
import { slugify } from "@/lib/utils/slugify";
import { z } from "zod";
import { projectFormSchema } from "@/lib/validations/project";
import type { ProjectStatus } from "@prisma/client";

type ProjectFormValues = z.infer<typeof projectFormSchema>;

type ProjectActionResult = {
  success: true;
  projectId: string;
};

async function requireOwnedProject(projectId: string) {
  const user = await requireCurrentDbUser();

  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: { id: true, userId: true, archived: true },
  });

  if (!project || project.userId !== user.id) {
    throw new Error("Unauthorized");
  }

  return project;
}

export async function createProjectAction(
  values: ProjectFormValues
): Promise<ProjectActionResult> {
  const parsed = projectFormSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid project data");
  }

  const data = parsed.data;

  const baseSlug = slugify(data.title);
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter += 1;
  }

  const user = await requireCurrentDbUser();

  const project = await prisma.project.create({
    data: {
      title: data.title,
      slug,
      location: data.location,
      description: data.description || null,
      shootDate: data.shootDate ? new Date(data.shootDate) : null,
      userId: user.id,
    },
  });
  revalidatePath("/projects");
  revalidatePath(`/projects/${project.id}`);
  return { success: true, projectId: project.id };
}

export async function updateProjectAction(
  projectId: string,
  values: ProjectFormValues
): Promise<ProjectActionResult> {
  const parsed = projectFormSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid project data");
  }

  const data = parsed.data;

  await requireOwnedProject(projectId);

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title: data.title,
      location: data.location,
      description: data.description || null,
      shootDate: data.shootDate ? new Date(data.shootDate) : null,
    },
  });
  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);
  return { success: true, projectId };
}

export async function archiveProjectAction(projectId: string) {
  await requireOwnedProject(projectId);

  await prisma.project.update({
    where: { id: projectId },
    data: {
      archived: true,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/projects/archived");
  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

export async function restoreProjectAction(projectId: string) {
  await requireOwnedProject(projectId);

  await prisma.project.update({
    where: { id: projectId },
    data: {
      archived: false,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/projects/archived");
  revalidatePath(`/projects/${projectId}`);

  return { success: true };
}

export async function updateProjectStatusAction(
  projectId: string,
  status: ProjectStatus
) {
  const project = await requireOwnedProject(projectId);

  if (project.archived) {
    throw new Error("Archived projects cannot be updated");
  }

  await prisma.project.update({
    where: {
      id: projectId,
    },
    data: {
      status,
    },
  });

  revalidatePath("/projects");
  revalidatePath(`/projects/${projectId}`);

  return { success: true, projectId };
}
