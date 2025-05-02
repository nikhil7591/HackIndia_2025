import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Briefcase, Search, CheckCircle, AlertTriangle } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { FeatureCard } from "@/components/feature-card"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <HeroSection />

        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How Job Shield Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Briefcase className="h-10 w-10 text-primary" />}
                title="Post Legitimate Jobs"
                description="Recruiters can post job listings with clear requirements and conditions, backed by smart contracts."
              />
              <FeatureCard
                icon={<Search className="h-10 w-10 text-primary" />}
                title="AI-Powered Verification"
                description="Our AI analyzes job postings to detect potential scams and assigns a Trust Score to each listing."
              />
              <FeatureCard
                icon={<Shield className="h-10 w-10 text-primary" />}
                title="Blockchain Protection"
                description="Smart contracts automatically verify applicant qualifications and handle secure token transfers."
              />
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">For Job Seekers & Recruiters</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Job Seekers
                  </h3>
                  <ul className="space-y-2 pl-7">
                    <li>Apply with confidence to verified job listings</li>
                    <li>Get automatic qualification verification</li>
                    <li>Receive tokens when you meet job requirements</li>
                    <li>Avoid scams with our Trust Score system</li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/jobs">
                      <Button>Browse Jobs</Button>
                    </Link>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2 text-green-500" />
                    Recruiters
                  </h3>
                  <ul className="space-y-2 pl-7">
                    <li>Post jobs with verifiable requirements</li>
                    <li>Automate initial candidate screening</li>
                    <li>Build trust with blockchain verification</li>
                    <li>Access a pool of qualified candidates</li>
                  </ul>
                  <div className="pt-4">
                    <Link href="/dashboard/post">
                      <Button>Post a Job</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 px-4 md:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-amber-100 dark:bg-amber-900 rounded-full mb-6">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Protect Yourself From Fake Job Scams</h2>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Job scams are on the rise. Job Shield uses blockchain technology and AI to verify job postings and protect
              job seekers from fraudulent listings.
            </p>
            <Link href="/register">
              <Button size="lg">Get Started Today</Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
