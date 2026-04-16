import { prisma } from "@/lib/prisma";
import { requireCurrentDbUser } from "@/lib/auth";

export async function getActiveProjects() {
  const user = await requireCurrentDbUser();
  return prisma.project.findMany({
    where: {
      userId: user.id,
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
  const user = await requireCurrentDbUser();
  return prisma.project.findFirst({
    where: {
      id,
      userId: user.id,
    },
    include: {
      shots: true,
      media: true,
    },
  });
}

export async function getArchivedProjects() {
  const user = await requireCurrentDbUser();
  return prisma.project.findMany({
    where: {
      userId: user.id,
      archived: true,
    },
    orderBy: { createdAt: "desc" },
    include: {
      shots: true,
      media: true,
    },
  });
}
