export function AppHeader() {
  return (
    <header className="border-b bg-background px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Manage shoots, planning, editing, and delivery
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted text-sm font-medium">
            G
          </div>
        </div>
      </div>
    </header>
  );
}
