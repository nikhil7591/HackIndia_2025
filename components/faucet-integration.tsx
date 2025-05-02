"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { useWallet } from "@/components/wallet-provider"
import { ExternalLink, AlertCircle, Droplets } from "lucide-react"

export function FaucetIntegration() {
  const [isRequesting, setIsRequesting] = useState(false)
  const { toast } = useToast()
  const { account } = useWallet()

  const faucets = [
    {
      name: "Polygon Mumbai Faucet",
      url: "https://faucet.polygon.technology/",
      description: "Official Polygon faucet for Mumbai testnet MATIC",
    },
    {
      name: "Alchemy Mumbai Faucet",
      url: "https://mumbaifaucet.com/",
      description: "Alchemy's faucet for Mumbai testnet MATIC",
    },
    {
      name: "QuickNode Mumbai Faucet",
      url: "https://faucet.quicknode.com/polygon/mumbai",
      description: "QuickNode's faucet for Mumbai testnet MATIC",
    },
  ]

  const handleRequestFunds = async () => {
    if (!account) {
      toast({
        title: "Wallet not connected",
        description: "Please connect your wallet to request testnet funds",
        variant: "destructive",
      })
      return
    }

    setIsRequesting(true)

    // This is a mock implementation - in a real app, you might integrate with a faucet API
    // For the hackathon, we'll just simulate a successful request
    setTimeout(() => {
      toast({
        title: "Request submitted",
        description: "Please check the faucet website to complete your request for testnet MATIC",
      })
      setIsRequesting(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Droplets className="h-5 w-5 text-blue-500" />
          Testnet Faucets
        </CardTitle>
        <CardDescription>Get testnet MATIC tokens for testing the application</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Testnet Only</AlertTitle>
          <AlertDescription>
            This application uses the Polygon Mumbai testnet. Do not send real MATIC to these addresses.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Your wallet address:</h3>
          <Input value={account || "Connect your wallet first"} readOnly />
        </div>

        <div className="space-y-2">
          <h3 className="text-sm font-medium">Available Faucets:</h3>
          <div className="space-y-2">
            {faucets.map((faucet, index) => (
              <div key={index} className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium">{faucet.name}</h4>
                    <p className="text-sm text-muted-foreground">{faucet.description}</p>
                  </div>
                  <a href={faucet.url} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" size="sm">
                      <ExternalLink className="h-3 w-3 mr-1" />
                      Visit
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleRequestFunds} disabled={isRequesting || !account} className="w-full">
          {isRequesting ? "Requesting..." : "Request Testnet MATIC"}
        </Button>
      </CardFooter>
    </Card>
  )
}
