import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FaucetIntegration } from "@/components/faucet-integration"
import { TestnetInfo } from "@/components/testnet-info"

export default function TestnetPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Testnet Resources</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FaucetIntegration />
          <TestnetInfo />
        </div>
      </main>
      <Footer />
    </div>
  )
}
