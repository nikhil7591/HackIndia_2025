"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Shield, Menu, X, Code, Droplets } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"
import { ConnectWalletButton } from "@/components/connect-wallet-button"
import { NetworkIndicator } from "@/components/network-indicator"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isConnected } = useWallet()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Job Shield</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/jobs" className="text-sm font-medium hover:text-primary">
            Find Jobs
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium hover:text-primary">
            How It Works
          </Link>
          <Link href="/testnet" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Droplets className="h-4 w-4" />
            Testnet
          </Link>
          <Link href="/setup" className="text-sm font-medium hover:text-primary flex items-center gap-1">
            <Code className="h-4 w-4" />
            Setup
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <NetworkIndicator />

          {isConnected ? (
            <Link href="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
          )}

          <ConnectWalletButton />
        </div>

        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t p-4 bg-background">
          <nav className="flex flex-col space-y-4">
            <Link href="/jobs" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              Find Jobs
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              About
            </Link>
            <Link
              href="/how-it-works"
              className="text-sm font-medium hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/testnet"
              className="text-sm font-medium hover:text-primary flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Droplets className="h-4 w-4" />
              Testnet
            </Link>
            <Link
              href="/setup"
              className="text-sm font-medium hover:text-primary flex items-center gap-1"
              onClick={() => setIsMenuOpen(false)}
            >
              <Code className="h-4 w-4" />
              Setup
            </Link>

            <div className="pt-2 flex flex-col gap-2">
              <NetworkIndicator />

              {isConnected ? (
                <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
              )}

              <ConnectWalletButton fullWidth />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
