"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, Shield, Award } from "lucide-react"

export function DashboardStats() {
  // In a real app, these would come from your API
  const stats = {
    appliedJobs: 12,
    verifiedApplications: 8,
    trustScore: 92,
    tokensEarned: 450,
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Applied Jobs</CardTitle>
          <Briefcase className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.appliedJobs}</div>
          <p className="text-xs text-muted-foreground">+2 in the last 30 days</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Verified Applications</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.verifiedApplications}</div>
          <p className="text-xs text-muted-foreground">
            {Math.round((stats.verifiedApplications / stats.appliedJobs) * 100)}% success rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
          <Shield className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.trustScore}%</div>
          <p className="text-xs text-muted-foreground">+5% from previous month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Tokens Earned</CardTitle>
          <Award className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.tokensEarned} MATIC</div>
          <p className="text-xs text-muted-foreground">On Polygon Mumbai Testnet</p>
        </CardContent>
      </Card>
    </div>
  )
}
