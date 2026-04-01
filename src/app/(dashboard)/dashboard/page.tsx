import { mockProjects } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>

      <pre>{JSON.stringify(mockProjects, null, 2)}</pre>
    </div>
  );
}
