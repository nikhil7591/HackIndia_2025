"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code } from "lucide-react"

export function TestnetInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Code className="h-5 w-5 text-purple-500" />
          Polygon Mumbai Testnet
        </CardTitle>
        <CardDescription>Information and resources for the Mumbai testnet</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert>
          <AlertTitle>Network Information</AlertTitle>
          <AlertDescription>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Network Name: Polygon Mumbai</li>
              <li>RPC URL: https://rpc-mumbai.maticvigil.com</li>
              <li>Chain ID: 80001</li>
              <li>Currency Symbol: MATIC</li>
              <li>Block Explorer: https://mumbai.polygonscan.com</li>
            </ul>
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="metamask">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="metamask">MetaMask Setup</TabsTrigger>
            <TabsTrigger value="contract">Contract Info</TabsTrigger>
          </TabsList>

          <TabsContent value="metamask" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Add Mumbai to MetaMask:</h3>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Open MetaMask and click on the network dropdown at the top</li>
                <li>Click "Add Network"</li>
                <li>
                  Enter the following details:
                  <ul className="list-disc pl-5 mt-1">
                    <li>Network Name: Polygon Mumbai</li>
                    <li>New RPC URL: https://rpc-mumbai.maticvigil.com</li>
                    <li>Chain ID: 80001</li>
                    <li>Currency Symbol: MATIC</li>
                    <li>Block Explorer URL: https://mumbai.polygonscan.com</li>
                  </ul>
                </li>
                <li>Click "Save"</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="contract" className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">JobShield Contract:</h3>
              <p className="text-sm text-muted-foreground">
                The JobShield smart contract is deployed at the following address on the Mumbai testnet:
              </p>
              <div className="bg-muted p-2 rounded-md overflow-x-auto">
                <code className="text-xs">0x0000000000000000000000000000000000000000</code>
              </div>
              <p className="text-sm text-muted-foreground mt-2">You can view the contract on the Mumbai Polygonscan:</p>
              <a
                href="https://mumbai.polygonscan.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 hover:underline"
              >
                View on Polygonscan
              </a>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
