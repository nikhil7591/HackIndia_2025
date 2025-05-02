"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Code, FileCode, Terminal, Server, Settings, AlertCircle } from "lucide-react"

export function SetupInstructions() {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Job Shield Setup Guide
        </CardTitle>
        <CardDescription>
          Follow these instructions to set up the Job Shield application for development or testing
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="installation">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="installation">Installation</TabsTrigger>
            <TabsTrigger value="env">Environment Setup</TabsTrigger>
            <TabsTrigger value="contract">Smart Contract</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="installation" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Terminal className="h-5 w-5" />
                Installation Steps
              </h3>

              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <p className="font-medium">Clone the repository:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>git clone https://github.com/yourusername/job-shield.git</code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Navigate to the project directory:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>cd job-shield</code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Install dependencies:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>npm install</code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Set up environment variables:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>cp .env.example .env.local</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Then edit .env.local with your specific configuration (see Environment Setup tab)
                  </p>
                </li>

                <li>
                  <p className="font-medium">Run the development server:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>npm run dev</code>
                  </div>
                </li>
              </ol>
            </div>

            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Node.js Requirements</AlertTitle>
              <AlertDescription>
                This project requires Node.js version 16.x or higher and npm version 8.x or higher.
              </AlertDescription>
            </Alert>
          </TabsContent>

          <TabsContent value="env" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <FileCode className="h-5 w-5" />
                Environment Variables
              </h3>

              <p>
                Create a <code>.env.local</code> file in the root directory with the following variables:
              </p>

              <div className="bg-muted p-3 rounded-md mt-2 overflow-x-auto">
                <pre className="text-sm">
                  <code>
                    {`# Smart Contract
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000

# RPC Provider (Mumbai Testnet)
NEXT_PUBLIC_RPC_URL=https://rpc-mumbai.maticvigil.com

# Optional: Analytics
NEXT_PUBLIC_ANALYTICS_ID=your-analytics-id

# Optional: API Keys for enhanced AI features
AI_API_KEY=your-ai-api-key`}
                  </code>
                </pre>
              </div>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Security Note</AlertTitle>
                <AlertDescription>
                  Never commit your .env.local file to version control. It contains sensitive information that should be
                  kept private.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>

          <TabsContent value="contract" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Code className="h-5 w-5" />
                Smart Contract Deployment
              </h3>

              <p>To deploy the JobShield smart contract to the Polygon Mumbai testnet:</p>

              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <p className="font-medium">Install Hardhat dependencies:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>
                      npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle
                    </code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Set up your Hardhat configuration:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <pre className="text-sm">
                      <code>
                        {`// hardhat.config.js
require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: "0.8.19",
  networks: {
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80001,
    },
  },
};`}
                      </code>
                    </pre>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Create a .env file for Hardhat with your private key:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>PRIVATE_KEY=your-wallet-private-key</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Make sure your wallet has some Mumbai MATIC for gas fees
                  </p>
                </li>

                <li>
                  <p className="font-medium">Deploy the contract:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>npx hardhat run scripts/deploy.ts --network mumbai</code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Update your .env.local with the deployed contract address:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>NEXT_PUBLIC_CONTRACT_ADDRESS=your-deployed-contract-address</code>
                  </div>
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="testing" className="space-y-4 pt-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Server className="h-5 w-5" />
                Testing the Application
              </h3>

              <p>To test the Job Shield application:</p>

              <ol className="list-decimal pl-5 space-y-3">
                <li>
                  <p className="font-medium">Generate mock data:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>npx hardhat run scripts/generate-mock-data.ts --network mumbai</code>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    This will create sample jobs and applications on the blockchain
                  </p>
                </li>

                <li>
                  <p className="font-medium">Run the test suite:</p>
                  <div className="bg-muted p-3 rounded-md mt-1 overflow-x-auto">
                    <code>npm test</code>
                  </div>
                </li>

                <li>
                  <p className="font-medium">Manual testing:</p>
                  <ul className="list-disc pl-5 mt-1">
                    <li>Connect your MetaMask wallet to the Mumbai testnet</li>
                    <li>Get testnet MATIC from the faucet (see Testnet Resources page)</li>
                    <li>Post a job and set a reward amount</li>
                    <li>Use a different wallet to apply for the job</li>
                    <li>Verify that the smart contract correctly validates qualifications</li>
                    <li>Check that token transfers occur for qualified applicants</li>
                  </ul>
                </li>
              </ol>

              <Alert className="mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Testing Note</AlertTitle>
                <AlertDescription>
                  For comprehensive testing, you'll need multiple MetaMask accounts with testnet MATIC. Use the Mumbai
                  faucet to get testnet tokens for each account.
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
