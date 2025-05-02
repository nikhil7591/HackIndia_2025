import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { SetupInstructions } from "@/components/setup-instructions"

export default function SetupPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8">
        <h1 className="text-3xl font-bold mb-6">Setup Instructions</h1>
        <SetupInstructions />
      </main>
      <Footer />
    </div>
  )
}
