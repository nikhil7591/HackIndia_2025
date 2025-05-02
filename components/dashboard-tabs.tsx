"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { JobApplications } from "@/components/job-applications"
import { PostedJobs } from "@/components/posted-jobs"
import { SavedJobs } from "@/components/saved-jobs"

export function DashboardTabs() {
  const [activeTab, setActiveTab] = useState("applications")

  return (
    <Tabs defaultValue="applications" onValueChange={setActiveTab} value={activeTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="applications">My Applications</TabsTrigger>
        <TabsTrigger value="posted">Posted Jobs</TabsTrigger>
        <TabsTrigger value="saved">Saved Jobs</TabsTrigger>
      </TabsList>

      <TabsContent value="applications">
        <Card>
          <JobApplications />
        </Card>
      </TabsContent>

      <TabsContent value="posted">
        <Card>
          <PostedJobs />
        </Card>
      </TabsContent>

      <TabsContent value="saved">
        <Card>
          <SavedJobs />
        </Card>
      </TabsContent>
    </Tabs>
  )
}
