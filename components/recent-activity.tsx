"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, Briefcase, Shield, Award } from "lucide-react"

// Mock data for recent activity
const MOCK_ACTIVITY = [
  {
    id: 1,
    type: "application",
    title: "Applied for Senior Frontend Developer",
    company: "TechCorp Inc.",
    date: "2023-05-10T14:30:00",
    status: "Verified",
  },
  {
    id: 2,
    type: "token",
    title: "Received 100 MATIC tokens",
    description: "Qualification verification reward",
    date: "2023-05-10T14:35:00",
  },
  {
    id: 3,
    type: "application",
    title: "Applied for Blockchain Engineer",
    company: "CryptoFuture",
    date: "2023-05-08T10:15:00",
    status: "Pending",
  },
  {
    id: 4,
    type: "job",
    title: "Posted new job: Data Scientist",
    date: "2023-05-05T09:00:00",
  },
  {
    id: 5,
    type: "application",
    title: "Applied for UX Designer",
    company: "DesignHub",
    date: "2023-05-01T16:45:00",
    status: "Rejected",
  },
]

export function RecentActivity() {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-4">
          {MOCK_ACTIVITY.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <div className="mt-0.5">
                {activity.type === "application" ? (
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <Briefcase className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                ) : activity.type === "token" ? (
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <Award className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                ) : (
                  <div className="bg-purple-100 dark:bg-purple-900 p-2 rounded-full">
                    <Shield className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">{activity.title}</h4>
                  <time className="text-xs text-muted-foreground">{new Date(activity.date).toLocaleString()}</time>
                </div>

                {activity.company && <p className="text-sm text-muted-foreground">{activity.company}</p>}

                {activity.description && <p className="text-sm text-muted-foreground">{activity.description}</p>}

                {activity.status && (
                  <div className="mt-1">
                    <Badge
                      variant={
                        activity.status === "Verified"
                          ? "success"
                          : activity.status === "Pending"
                            ? "outline"
                            : "destructive"
                      }
                    >
                      {activity.status === "Verified" ? (
                        <CheckCircle className="h-3 w-3 mr-1" />
                      ) : activity.status === "Pending" ? (
                        <Clock className="h-3 w-3 mr-1" />
                      ) : (
                        <XCircle className="h-3 w-3 mr-1" />
                      )}
                      {activity.status}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
