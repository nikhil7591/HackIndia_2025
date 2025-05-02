"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { TrustScoreBadge } from "@/components/trust-score-badge"
import { Briefcase, MapPin, Calendar, Building, DollarSign, Shield, Bookmark, Share2 } from "lucide-react"

// Mock job data (in a real app, this would come from your API/blockchain)
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedDate: "2023-05-10",
    trustScore: 95,
    description:
      "We're looking for a Senior Frontend Developer with experience in React, Next.js, and TypeScript to join our team. You'll be responsible for building and maintaining our web applications, collaborating with designers and backend developers, and ensuring high-quality code.",
    responsibilities: [
      "Develop and maintain web applications using React, Next.js, and TypeScript",
      "Collaborate with designers to implement UI/UX designs",
      "Work with backend developers to integrate APIs",
      "Write clean, maintainable, and efficient code",
      "Participate in code reviews and provide feedback",
    ],
    requirements: [
      "5+ years of experience in frontend development",
      "Strong knowledge of React, Next.js, and TypeScript",
      "Experience with state management libraries (Redux, Zustand, etc.)",
      "Familiarity with CSS frameworks (Tailwind, Bootstrap, etc.)",
      "Good understanding of web performance optimization",
    ],
    benefits: [
      "Competitive salary and benefits",
      "Remote work options",
      "Flexible working hours",
      "Professional development opportunities",
      "Health insurance",
    ],
    companyDescription:
      "TechCorp Inc. is a leading technology company specializing in web and mobile application development. We work with clients across various industries to deliver high-quality software solutions.",
  },
]

interface JobDetailsProps {
  jobId: number
}

export function JobDetails({ jobId }: JobDetailsProps) {
  const [job, setJob] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would fetch from your API/blockchain
    const fetchJob = () => {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        const foundJob = MOCK_JOBS.find((j) => j.id === jobId)
        setJob(foundJob || null)
        setLoading(false)
      }, 1000)
    }

    fetchJob()
  }, [jobId])

  if (loading) {
    return <JobDetailsSkeleton />
  }

  if (!job) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Job Not Found</h2>
        <p className="text-muted-foreground">The job you're looking for doesn't exist or has been removed.</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">{job.title}</h1>
          <p className="text-lg mt-1">{job.company}</p>
        </div>
        <TrustScoreBadge score={job.trustScore} size="lg" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Job Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Job Type</p>
                <p className="font-medium">{job.type}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Posted Date</p>
                <p className="font-medium">{new Date(job.postedDate).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Building className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Company</p>
                <p className="font-medium">{job.company}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Salary</p>
                <p className="font-medium">{job.salary}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Verification</p>
                <p className="font-medium">Blockchain Verified</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{job.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Responsibilities</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {job.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Requirements</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {job.requirements.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Benefits</h3>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {job.benefits.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">About the Company</h3>
              <p className="text-muted-foreground">{job.companyDescription}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center text-sm">
            <Shield className="h-4 w-4 mr-1 text-primary" />
            <span>Blockchain Verified</span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Bookmark className="h-4 w-4 mr-2" />
              Save Job
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}

function JobDetailsSkeleton() {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-40" />
        </div>
        <Skeleton className="h-8 w-32" />
      </div>

      <Card className="mb-8">
        <CardHeader>
          <Skeleton className="h-7 w-40" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-5 w-32" />
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            {[...Array(5)].map((_, i) => (
              <div key={i}>
                <Skeleton className="h-6 w-40 mb-2" />
                <div className="space-y-2">
                  {[...Array(3)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-full" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
