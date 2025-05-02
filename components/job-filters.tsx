"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Filter, RotateCcw } from "lucide-react"

export function JobFilters() {
  const [minTrustScore, setMinTrustScore] = useState(50)

  return (
    <Card className="sticky top-20">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input id="search" placeholder="Job title or keyword" className="pl-8" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Job Type</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="fulltime" />
                <label
                  htmlFor="fulltime"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Full-time
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="parttime" />
                <label
                  htmlFor="parttime"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Part-time
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="contract" />
                <label
                  htmlFor="contract"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Contract
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="remote" />
                <label
                  htmlFor="remote"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remote
                </label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Minimum Trust Score</Label>
              <span className="text-sm text-muted-foreground">{minTrustScore}%</span>
            </div>
            <Slider defaultValue={[50]} max={100} step={5} onValueChange={(value) => setMinTrustScore(value[0])} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Experience Level</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="entry" />
                <label
                  htmlFor="entry"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Entry Level
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="mid" />
                <label
                  htmlFor="mid"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Mid Level
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="senior" />
                <label
                  htmlFor="senior"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Senior Level
                </label>
              </div>
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <Button>
              <Filter className="h-4 w-4 mr-2" />
              Apply Filters
            </Button>
            <Button variant="outline">
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
