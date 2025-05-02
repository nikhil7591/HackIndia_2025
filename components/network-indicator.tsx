"use client"

import { useWallet } from "@/components/wallet-provider"
import { Badge } from "@/components/ui/badge"
import { AlertCircle, CheckCircle } from "lucide-react"

export function NetworkIndicator() {
  const { isConnected, chainId, isMumbai } = useWallet()

  if (!isConnected) {
    return null
  }

  return (
    <div className="flex items-center">
      {isMumbai ? (
        <Badge
          variant="outline"
          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center gap-1"
        >
          <CheckCircle className="h-3 w-3" />
          Mumbai Testnet
        </Badge>
      ) : (
        <Badge
          variant="outline"
          className="bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300 flex items-center gap-1"
        >
          <AlertCircle className="h-3 w-3" />
          Wrong Network
        </Badge>
      )}
    </div>
  )
}
