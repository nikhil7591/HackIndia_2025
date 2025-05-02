import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { DashboardTabs } from "@/components/dashboard-tabs"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { EventListener } from "@/components/event-listener"
import { NetworkWarning } from "@/components/network-warning"

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <NetworkWarning />
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

        <DashboardStats />

        <div className="mt-8">
          <DashboardTabs />
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <RecentActivity />
          <EventListener />
        </div>
      </main>
      <Footer />
    </div>
  )
}
