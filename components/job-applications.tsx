"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Clock, ExternalLink } from "lucide-react"

// Mock data for job applications
const MOCK_APPLICATIONS = [
  {
    id: 1,
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedDate: "2023-05-10",
    status: "Verified",
    matchScore: 85,
    tokensPaid: 100,
  },
  {
    id: 2,
    jobTitle: "Blockchain Engineer",
    company: "CryptoFuture",
    appliedDate: "2023-05-08",
    status: "Pending",
    matchScore: 70,
    tokensPaid: 0,
  },
  {
    id: 3,
    jobTitle: "Data Scientist",
    company: "DataInsights",
    appliedDate: "2023-05-05",
    status: "Rejected",
    matchScore: 60,
    tokensPaid: 0,
  },
  {
    id: 4,
    jobTitle: "UX Designer",
    company: "DesignHub",
    appliedDate: "2023-05-01",
    status: "Verified",
    matchScore: 90,
    tokensPaid: 150,
  },
]

export function JobApplications() {
  return (
    <CardContent className="p-6">
      <div className="space-y-6">
        {MOCK_APPLICATIONS.map((application) => (
          <div
            key={application.id}
            className="border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <h3 className="font-semibold">{application.jobTitle}</h3>
              <p className="text-sm text-muted-foreground">{application.company}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-muted-foreground">
                  Applied on {new Date(application.appliedDate).toLocaleDateString()}
                </p>
                <Badge
                  variant={
                    application.status === "Verified"
                      ? "success"
                      : application.status === "Pending"
                        ? "outline"
                        : "destructive"
                  }
                >
                  {application.status === "Verified" ? (
                    <CheckCircle className="h-3 w-3 mr-1" />
                  ) : application.status === "Pending" ? (
                    <Clock className="h-3 w-3 mr-1" />
                  ) : (
                    <XCircle className="h-3 w-3 mr-1" />
                  )}
                  {application.status}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col md:items-end gap-2">
              <div className="text-sm">
                Match Score: <span className="font-semibold">{application.matchScore}%</span>
              </div>

              {application.status === "Verified" && (
                <div className="text-sm text-green-600 dark:text-green-400">
                  Tokens Paid: {application.tokensPaid} MATIC
                </div>
              )}

              <Button variant="outline" size="sm">
                <ExternalLink className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </CardContent>
  )
}
