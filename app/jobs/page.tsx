import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JobListings } from "@/components/job-listings"
import { JobFilters } from "@/components/job-filters"
import { NetworkWarning } from "@/components/network-warning"

export default function JobsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <NetworkWarning />
        <h1 className="text-3xl font-bold mb-6">Find Verified Jobs</h1>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <JobFilters />
          </div>

          <div className="lg:col-span-3">
            <JobListings />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
