import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { JobPostForm } from "@/components/job-post-form"
import { NetworkWarning } from "@/components/network-warning"

export default function PostJobPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <NetworkWarning />
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <JobPostForm />
      </main>
      <Footer />
    </div>
  )
}
