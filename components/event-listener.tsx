"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "@/components/wallet-provider"
import { listenForEvents } from "@/lib/smart-contract"
import { Bell } from "lucide-react"

interface BlockchainEvent {
  type: string
  jobId: number
  timestamp: number
  data: any
}

export function EventListener() {
  const [events, setEvents] = useState<BlockchainEvent[]>([])
  const { provider } = useWallet()

  useEffect(() => {
    if (!provider) return

    const handleEvent = (event: any) => {
      const newEvent: BlockchainEvent = {
        type: event.type,
        jobId: event.jobId,
        timestamp: Date.now(),
        data: event,
      }

      setEvents((prevEvents) => [newEvent, ...prevEvents].slice(0, 10))
    }

    const removeListener = listenForEvents(provider, handleEvent)

    return () => {
      removeListener()
    }
  }, [provider])

  if (events.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-primary" />
          Blockchain Events
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="border rounded-md p-3">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">Job ID: {event.jobId}</span>
                  </div>
                  <p className="text-sm mt-1">
                    {event.type === "JobPosted" && `New job posted by ${formatAddress(event.data.recruiter)}`}
                    {event.type === "ApplicationSubmitted" &&
                      `New application from ${formatAddress(event.data.applicant)}`}
                    {event.type === "QualificationVerified" &&
                      `Applicant ${formatAddress(event.data.applicant)} was ${event.data.qualified ? "qualified" : "not qualified"}`}
                    {event.type === "RewardPaid" &&
                      `${event.data.amount} MATIC paid to ${formatAddress(event.data.applicant)}`}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">{new Date(event.timestamp).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function formatAddress(address: string) {
  return `${address.substring(0, 6)}...${address.substring(38)}`
}
