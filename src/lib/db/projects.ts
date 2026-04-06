import { prisma } from "@/lib/prisma";

export async function getActiveProjects() {
  return prisma.project.findMany({
    where: {
      archived: false,
    },
    orderBy: { createdAt: "desc" },
    include: {
      shots: true,
      media: true,
    },
  });
}

export async function getProjectById(id: string) {
  return prisma.project.findUnique({
    where: { id },
    include: {
      shots: true,
      media: true,
    },
  });
}

export async function getArchivedProjects() {
  return prisma.project.findMany({
    where: {
      archived: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      shots: true,
      media: true,
    },
  });
}
