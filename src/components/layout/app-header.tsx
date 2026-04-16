import { getCurrentDbUser } from "@/lib/auth";
import { AccountMenu } from "@/components/layout/account-menu";

export async function AppHeader() {
  const user = await getCurrentDbUser();

  const displayName = user?.name?.trim() || user?.email || "User";
  const email = user?.email ?? "";
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Manage shoots, planning, editing, and delivery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <AccountMenu
            displayName={displayName}
            email={email}
            initial={initial}
          />
        </div>
      </div>
    </header>
  );
}
