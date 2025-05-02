"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { ethers } from "ethers"
import { useToast } from "@/components/ui/use-toast"

interface WalletContextType {
  account: string | null
  connectWallet: () => Promise<void>
  provider: ethers.BrowserProvider | null
  signer: ethers.JsonRpcSigner | null
  isConnecting: boolean
  isConnected: boolean
  chainId: number | null
  switchToMumbai: () => Promise<void>
  isMumbai: boolean
}

const WalletContext = createContext<WalletContextType>({
  account: null,
  connectWallet: async () => {},
  provider: null,
  signer: null,
  isConnecting: false,
  isConnected: false,
  chainId: null,
  switchToMumbai: async () => {},
  isMumbai: false,
})

export const useWallet = () => useContext(WalletContext)

export const WalletProvider = ({ children }: { children: ReactNode }) => {
  const [account, setAccount] = useState<string | null>(null)
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null)
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [isConnected, setIsConnected] = useState(false)
  const [chainId, setChainId] = useState<number | null>(null)
  const { toast } = useToast()

  // Mumbai testnet configuration
  const MUMBAI_CHAIN_ID = "0x13881"
  const MUMBAI_CONFIG = {
    chainId: MUMBAI_CHAIN_ID,
    chainName: "Polygon Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  }

  // Check if current network is Mumbai
  const isMumbai = chainId === 80001

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not found",
        description: "Please install MetaMask to use this feature",
        variant: "destructive",
      })
      return
    }

    try {
      setIsConnecting(true)
      const ethersProvider = new ethers.BrowserProvider(window.ethereum)
      const accounts = await ethersProvider.send("eth_requestAccounts", [])

      if (accounts.length > 0) {
        const ethersSigner = await ethersProvider.getSigner()
        const network = await ethersProvider.getNetwork()

        setAccount(accounts[0])
        setProvider(ethersProvider)
        setSigner(ethersSigner)
        setChainId(Number(network.chainId))
        setIsConnected(true)

        toast({
          title: "Wallet connected",
          description: `Connected to ${accounts[0].substring(0, 6)}...${accounts[0].substring(38)}`,
        })
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const switchToMumbai = async () => {
    if (!window.ethereum) return

    try {
      // First try to switch to the Mumbai network
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: MUMBAI_CHAIN_ID }],
      })

      // Update chainId after successful switch
      if (provider) {
        const network = await provider.getNetwork()
        setChainId(Number(network.chainId))
      }

      toast({
        title: "Network switched",
        description: "Successfully switched to Polygon Mumbai Testnet",
      })
    } catch (switchError: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [MUMBAI_CONFIG],
          })

          // Update chainId after successful addition
          if (provider) {
            const network = await provider.getNetwork()
            setChainId(Number(network.chainId))
          }

          toast({
            title: "Network added",
            description: "Successfully added Polygon Mumbai Testnet",
          })
        } catch (addError: any) {
          console.error("Error adding Mumbai network:", addError)

          // Handle user rejection specifically
          if (addError.code === 4001) {
            toast({
              title: "Network addition cancelled",
              description: "You declined to add the Mumbai network. Some features may not work correctly.",
              variant: "warning",
            })
          } else {
            toast({
              title: "Network error",
              description: "Failed to add Mumbai network. Please try adding it manually in MetaMask.",
              variant: "destructive",
            })
          }
        }
      } else if (switchError.code === 4001) {
        // User rejected the request
        toast({
          title: "Network switch cancelled",
          description: "You declined to switch to the Mumbai network. Some features may not work correctly.",
          variant: "warning",
        })
      } else {
        toast({
          title: "Network error",
          description: "Failed to switch to Mumbai network. Please try switching manually in MetaMask.",
          variant: "destructive",
        })
      }
    }
  }

  useEffect(() => {
    // Check if already connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const ethersProvider = new ethers.BrowserProvider(window.ethereum)
          const accounts = await ethersProvider.listAccounts()

          if (accounts.length > 0) {
            const ethersSigner = await ethersProvider.getSigner()
            const network = await ethersProvider.getNetwork()

            setAccount(accounts[0].address)
            setProvider(ethersProvider)
            setSigner(ethersSigner)
            setChainId(Number(network.chainId))
            setIsConnected(true)
          }
        } catch (error) {
          console.error("Error checking connection:", error)
        }
      }
    }

    checkConnection()

    // Setup event listeners
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0])
        } else {
          setAccount(null)
          setIsConnected(false)
        }
      })

      window.ethereum.on("chainChanged", (chainId: string) => {
        setChainId(Number.parseInt(chainId, 16))
      })
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeAllListeners()
      }
    }
  }, [])

  return (
    <WalletContext.Provider
      value={{
        account,
        connectWallet,
        provider,
        signer,
        isConnecting,
        isConnected,
        chainId,
        switchToMumbai,
        isMumbai,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
