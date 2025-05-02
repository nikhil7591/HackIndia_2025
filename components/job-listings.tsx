"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, MapPin, Clock, Shield, ChevronRight, AlertTriangle } from "lucide-react"
import { TrustScoreBadge } from "@/components/trust-score-badge"

// Mock data for job listings
const MOCK_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $150,000",
    postedAt: "2 days ago",
    trustScore: 95,
    description:
      "We're looking for a Senior Frontend Developer with experience in React, Next.js, and TypeScript to join our team.",
    requirements: ["5+ years of experience", "React", "Next.js", "TypeScript"],
  },
  {
    id: 2,
    title: "Blockchain Engineer",
    company: "CryptoFuture",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $160,000",
    postedAt: "1 day ago",
    trustScore: 90,
    description: "Join our team to build decentralized applications on Ethereum and Polygon.",
    requirements: ["3+ years of experience", "Solidity", "Ethers.js", "Smart Contracts"],
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataInsights",
    location: "Remote",
    type: "Contract",
    salary: "$100/hr",
    postedAt: "3 days ago",
    trustScore: 85,
    description: "Looking for a Data Scientist to help us build ML models for our products.",
    requirements: ["Python", "TensorFlow", "Data Analysis", "Statistics"],
  },
  {
    id: 4,
    title: "Marketing Specialist",
    company: "GrowthHackers",
    location: "San Francisco, CA",
    type: "Part-time",
    salary: "$70,000 - $90,000",
    postedAt: "5 days ago",
    trustScore: 40,
    description: "Join our marketing team to help grow our user base.",
    requirements: ["2+ years of experience", "Social Media Marketing", "Content Creation"],
  },
  {
    id: 5,
    title: "Customer Support Representative",
    company: "SupportHub",
    location: "Remote",
    type: "Full-time",
    salary: "$50,000 - $60,000",
    postedAt: "1 week ago",
    trustScore: 75,
    description: "We're looking for customer support representatives to help our users.",
    requirements: ["1+ years of experience", "Communication Skills", "Problem Solving"],
  },
]

export function JobListings() {
  const [jobs] = useState(MOCK_JOBS)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <p className="text-sm text-muted-foreground">Showing {jobs.length} jobs</p>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort by:</span>
          <select className="text-sm border rounded p-1">
            <option>Newest</option>
            <option>Trust Score</option>
            <option>Salary</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>

      <div className="flex justify-center pt-4">
        <Button variant="outline">Load More Jobs</Button>
      </div>
    </div>
  )
}

interface JobCardProps {
  job: {
    id: number
    title: string
    company: string
    location: string
    type: string
    salary: string
    postedAt: string
    trustScore: number
    description: string
    requirements: string[]
  }
}

function JobCard({ job }: JobCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{job.title}</CardTitle>
            <p className="text-sm font-medium mt-1">{job.company}</p>
          </div>
          <TrustScoreBadge score={job.trustScore} />
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {job.location}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 mr-1" />
            {job.type}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-1" />
            Posted {job.postedAt}
          </div>
        </div>

        <p className="text-sm mb-4">{job.description}</p>

        <div className="flex flex-wrap gap-2 mb-2">
          {job.requirements.map((req, index) => (
            <Badge key={index} variant="secondary">
              {req}
            </Badge>
          ))}
        </div>

        <p className="text-sm font-medium mt-2">Salary: {job.salary}</p>

        {job.trustScore < 50 && (
          <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 rounded-md flex items-start gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400 mt-0.5" />
            <p className="text-xs text-amber-800 dark:text-amber-300">
              This job has a low trust score. Please proceed with caution and verify the company before applying.
            </p>
          </div>
        )}
      </CardContent>

      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm">
          <Shield className="h-4 w-4 mr-1 text-primary" />
          <span>Blockchain Verified</span>
        </div>
        <Link href={`/jobs/${job.id}`}>
          <Button>
            View Job
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
