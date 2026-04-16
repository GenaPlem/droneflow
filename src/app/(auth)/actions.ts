"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthActionState = {
  error?: string;
  fields?: {
    name?: string;
    email?: string;
  };
};

export async function signUpAction(
  _: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();

  const fields = {
    name,
    email,
  };

  if (!email || !password) {
    return {
      error: "Email and password are required",
      fields,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });

  if (error) {
    return {
      error: error.message,
      fields,
    };
  }

  redirect("/dashboard");
}

export async function signInAction(
  _: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  const fields = {
    email,
  };

  if (!email || !password) {
    return {
      error: "Email and password are required",
      fields,
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return {
      error: "Invalid email or password",
      fields,
    };
  }

  redirect("/dashboard");
}

export async function signOutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
