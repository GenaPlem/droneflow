import { signInAction, signUpAction } from "../actions";

export default function LoginPage() {
  return (
    <main className="space-y-8 p-6">
      <section>
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <form
          action={signInAction}
          className="mt-4 flex flex-col gap-3 max-w-sm"
        >
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Sign in</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Sign up</h2>
        <form
          action={signUpAction}
          className="mt-4 flex flex-col gap-3 max-w-sm"
        >
          <input name="name" type="text" placeholder="Name" />
          <input name="email" type="email" placeholder="Email" required />
          <input
            name="password"
            type="password"
            placeholder="Password"
            required
          />
          <button type="submit">Sign up</button>
        </form>
      </section>
    </main>
  );
}
