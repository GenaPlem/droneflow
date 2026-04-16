import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";

export async function getCurrentAuthUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return user;
}

export async function getCurrentDbUser() {
  const authUser = await getCurrentAuthUser();

  if (!authUser?.email) {
    return null;
  }

  const existingByAuthId = await prisma.user.findUnique({
    where: {
      supabaseAuthId: authUser.id,
    },
  });

  if (existingByAuthId) {
    return existingByAuthId;
  }

  const existingByEmail = await prisma.user.findUnique({
    where: {
      email: authUser.email,
    },
  });

  if (existingByEmail) {
    return prisma.user.update({
      where: {
        id: existingByEmail.id,
      },
      data: {
        supabaseAuthId: authUser.id,
        name: existingByEmail.name ?? authUser.user_metadata?.name ?? null,
      },
    });
  }

  return prisma.user.create({
    data: {
      supabaseAuthId: authUser.id,
      email: authUser.email,
      name: authUser.user_metadata?.name ?? null,
    },
  });
}

export async function requireCurrentDbUser() {
  const user = await getCurrentDbUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  return user;
}
