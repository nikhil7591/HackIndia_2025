"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { Users, Calendar, Edit, ExternalLink, Plus } from "lucide-react"
import { TrustScoreBadge } from "@/components/trust-score-badge"

// Mock data for posted jobs
const MOCK_POSTED_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    postedDate: "2023-05-10",
    applicants: 12,
    active: true,
    trustScore: 95,
  },
  {
    id: 2,
    title: "Blockchain Engineer",
    postedDate: "2023-05-08",
    applicants: 8,
    active: true,
    trustScore: 90,
  },
  {
    id: 3,
    title: "Data Scientist",
    postedDate: "2023-05-05",
    applicants: 5,
    active: false,
    trustScore: 85,
  },
]

export function PostedJobs() {
  return (
    <CardContent className="p-6">
      <div className="flex justify-end mb-4">
        <Link href="/dashboard/post">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="space-y-6">
        {MOCK_POSTED_JOBS.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{job.title}</h3>
                <Badge variant={job.active ? "default" : "outline"}>{job.active ? "Active" : "Closed"}</Badge>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted on {new Date(job.postedDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Users className="h-4 w-4 mr-1" />
                  {job.applicants} Applicants
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <TrustScoreBadge score={job.trustScore} size="sm" />

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button variant="outline" size="sm">
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}
