import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JobDetails } from "@/components/job-details"
import { JobApplication } from "@/components/job-application"

export default function JobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <JobDetails jobId={Number.parseInt(params.id)} />
        <div className="mt-8">
          <JobApplication jobId={Number.parseInt(params.id)} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
