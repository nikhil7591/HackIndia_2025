import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/5 dark:to-background z-0" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-4">
            <Shield className="h-6 w-6 text-primary" />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
            Protect Your Career With <span className="text-primary">Job Shield</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl">
            A blockchain-powered platform that helps detect fake job postings and protects job seekers with smart
            contract verification and AI-based Trust Scores.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/register">
              <Button size="lg" className="min-w-[150px]">
                Get Started
              </Button>
            </Link>
            <Link href="/jobs">
              <Button size="lg" variant="outline" className="min-w-[150px]">
                Browse Jobs
              </Button>
            </Link>
          </div>

          <div className="mt-12 p-4 bg-muted rounded-lg border border-border">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Hackathon Project:</span> Built with Next.js, Tailwind CSS, Polygon Mumbai
              testnet, and AI-powered verification
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
