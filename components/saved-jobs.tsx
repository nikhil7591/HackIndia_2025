"use client"

import { Button } from "@/components/ui/button"
import { CardContent } from "@/components/ui/card"
import { Bookmark, ExternalLink, Calendar, MapPin } from "lucide-react"
import { TrustScoreBadge } from "@/components/trust-score-badge"

// Mock data for saved jobs
const MOCK_SAVED_JOBS = [
  {
    id: 1,
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    location: "Remote",
    postedDate: "2023-05-10",
    trustScore: 95,
  },
  {
    id: 2,
    title: "Blockchain Engineer",
    company: "CryptoFuture",
    location: "New York, NY",
    postedDate: "2023-05-08",
    trustScore: 90,
  },
  {
    id: 3,
    title: "Data Scientist",
    company: "DataInsights",
    location: "Remote",
    postedDate: "2023-05-05",
    trustScore: 85,
  },
]

export function SavedJobs() {
  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        {MOCK_SAVED_JOBS.map((job) => (
          <div
            key={job.id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">{job.title}</h3>
              <p className="text-sm text-muted-foreground">{job.company}</p>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {job.location}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  Posted on {new Date(job.postedDate).toLocaleDateString()}
                </div>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <TrustScoreBadge score={job.trustScore} size="sm" />

              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Bookmark className="h-3 w-3 mr-1" />
                  Unsave
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
