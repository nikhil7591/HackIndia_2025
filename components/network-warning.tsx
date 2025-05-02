"use client"

import { useWallet } from "@/components/wallet-provider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

export function NetworkWarning() {
  const { isConnected, isMumbai, switchToMumbai } = useWallet()

  if (!isConnected || isMumbai) {
    return null
  }

  return (
    <Alert variant="warning" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Wrong Network</AlertTitle>
      <AlertDescription className="flex flex-col sm:flex-row sm:items-center gap-2">
        <span>This application requires the Polygon Mumbai Testnet.</span>
        <Button size="sm" onClick={switchToMumbai}>
          Switch to Mumbai
        </Button>
      </AlertDescription>
    </Alert>
  )
}
