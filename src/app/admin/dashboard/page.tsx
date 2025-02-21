import type { Metadata } from "next"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentArticles } from "@/components/dashboard/recent-articles"
import { PopularArticles } from "@/components/dashboard/popular-articles"
import { EngagementChart } from "@/components/dashboard/engagement-chart"

export const metadata: Metadata = {
  title: "Dashboard | Administration",
  description: "Dashboard administratif de Jeune Afrique",
}

export default async function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">Vue d'ensemble des performances du site</p>
      </div>

      <DashboardStats />

      <div className="grid gap-8 md:grid-cols-2">
        <EngagementChart />
        <PopularArticles />
      </div>

      <RecentArticles />
    </div>
  )
}

