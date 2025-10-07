import { StatCard } from "@/components/widgets/stat-card"

export function DashboardView() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard title="Users" value="1,234" description="Total users" />
      <StatCard title="Revenue" value="$12.3k" description="This month" />
      <StatCard title="Errors" value="12" description="Last 24h" />
      <StatCard title="Latency" value="123ms" description="p95" />
    </div>
  )
}