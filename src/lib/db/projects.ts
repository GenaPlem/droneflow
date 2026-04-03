import { prisma } from "@/lib/prisma";

export async function getProjects() {
  return prisma.project.findMany({
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
