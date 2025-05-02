"use client"

import { Button } from "@/components/ui/button"
import { useWallet } from "@/components/wallet-provider"
import { Wallet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"

interface ConnectWalletButtonProps {
  fullWidth?: boolean
}

export function ConnectWalletButton({ fullWidth = false }: ConnectWalletButtonProps) {
  const { connectWallet, isConnected, account, isConnecting, switchToMumbai, isMumbai } = useWallet()
  const [showNetworkDialog, setShowNetworkDialog] = useState(false)

  const handleConnect = async () => {
    if (isConnected) {
      if (!isMumbai) {
        setShowNetworkDialog(true)
      }
    } else {
      await connectWallet()
    }
  }

  const handleSwitchNetwork = async () => {
    await switchToMumbai()
    setShowNetworkDialog(false)
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(38)}`
  }

  return (
    <>
      <Button
        onClick={handleConnect}
        disabled={isConnecting}
        className={fullWidth ? "w-full" : ""}
        variant={isConnected && isMumbai ? "outline" : "default"}
      >
        <Wallet className="h-4 w-4 mr-2" />
        {isConnecting
          ? "Connecting..."
          : isConnected
            ? isMumbai
              ? formatAddress(account!)
              : "Switch Network"
            : "Connect Wallet"}
      </Button>

      <Dialog open={showNetworkDialog} onOpenChange={setShowNetworkDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Switch to Mumbai Testnet</DialogTitle>
            <DialogDescription>
              This application requires the Polygon Mumbai Testnet. Would you like to switch networks now?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button variant="outline" onClick={() => setShowNetworkDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleSwitchNetwork}>Switch to Mumbai</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
