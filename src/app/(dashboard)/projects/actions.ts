"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils/slugify";
import { projectFormSchema } from "@/lib/validations/project";

export async function createProjectAction(values: unknown) {
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

  const user = await prisma.user.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (!user) {
    throw new Error("No user found for project creation");
  }

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

  redirect(`/projects/${project.id}`);
}

export async function updateProjectAction(projectId: string, values: unknown) {
  const parsed = projectFormSchema.safeParse(values);

  if (!parsed.success) {
    throw new Error("Invalid project data");
  }

  const data = parsed.data;

  await prisma.project.update({
    where: { id: projectId },
    data: {
      title: data.title,
      location: data.location,
      description: data.description || null,
      shootDate: data.shootDate ? new Date(data.shootDate) : null,
    },
  });

  redirect(`/projects/${projectId}`);
}

export async function archiveProjectAction(projectId: string) {
  await prisma.project.update({
    where: { id: projectId },
    data: {
      archived: true,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/projects/archived");
  revalidatePath(`/projects/${projectId}`);

  redirect("/projects");
}

export async function restoreProjectAction(projectId: string) {
  await prisma.project.update({
    where: { id: projectId },
    data: {
      archived: false,
    },
  });

  revalidatePath("/projects");
  revalidatePath("/projects/archived");
  revalidatePath(`/projects/${projectId}`);

  redirect("/projects");
}
