"use client";

import { useActionState } from "react";
import { signInAction, signUpAction, type AuthActionState } from "../actions";

const initialState: AuthActionState = {
  error: "",
  fields: {
    name: "",
    email: "",
  },
};

export default function LoginPage() {
  const [signInState, signInFormAction] = useActionState(
    signInAction,
    initialState
  );
  const [signUpState, signUpFormAction] = useActionState(
    signUpAction,
    initialState
  );

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md space-y-8 rounded-lg border bg-background p-6 shadow-sm">
        <section>
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Access your DroneFlow workspace.
          </p>

          <form action={signInFormAction} className="mt-4 flex flex-col gap-3">
            <div className="min-h-5">
              {signInState.error ? (
                <p className="text-sm text-destructive">{signInState.error}</p>
              ) : null}
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              defaultValue={signInState.fields?.email ?? ""}
              className="h-10 rounded-md border px-3 text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              autoComplete="current-password"
              className="h-10 rounded-md border px-3 text-sm"
            />
            <button
              type="submit"
              className="h-10 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Sign in
            </button>
          </form>
        </section>

        <div className="h-px bg-border" />

        <section>
          <h2 className="text-xl font-semibold">Sign up</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Create a new account to manage your drone projects.
          </p>

          <form action={signUpFormAction} className="mt-4 flex flex-col gap-3">
            <div className="min-h-5">
              {signUpState.error ? (
                <p className="text-sm text-destructive">{signUpState.error}</p>
              ) : null}
            </div>

            <input
              name="name"
              type="text"
              placeholder="Name"
              autoComplete="name"
              defaultValue={signUpState.fields?.name ?? ""}
              className="h-10 rounded-md border px-3 text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              autoComplete="email"
              defaultValue={signUpState.fields?.email ?? ""}
              className="h-10 rounded-md border px-3 text-sm"
            />
            <input
              name="password"
              type="password"
              placeholder="Password"
              required
              autoComplete="new-password"
              className="h-10 rounded-md border px-3 text-sm"
            />
            <button
              type="submit"
              className="h-10 rounded-md bg-primary text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Sign up
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
