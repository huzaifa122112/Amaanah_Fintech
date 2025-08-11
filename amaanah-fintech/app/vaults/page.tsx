"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calculator, CheckCircle } from "lucide-react"

export default function VaultsPage() {
  const router = useRouter()

  const handleInvestNow = (vaultType: string) => {
    // Get existing vaults from localStorage
    const existingVaults = JSON.parse(localStorage.getItem("amaanah_user_vaults") || "[]")

    // Add new vault if not already present
    if (!existingVaults.some((vault: any) => vault.type === vaultType)) {
      const newVault = {
        type: vaultType,
        progress: 0,
        status: "Active",
        dateAdded: new Date().toISOString(),
      }
      existingVaults.push(newVault)
      localStorage.setItem("amaanah_user_vaults", JSON.stringify(existingVaults))
    }

    router.push("/my-vaults")
  }

  const vaults = [
    {
      type: "ETH Staking",
      apy: "5.2%",
      risk: "Medium Risk",
      riskColor: "bg-blue-100 text-blue-800",
      features: ["Shariah Compliant", "Liquid Staking", "Auto-compounding"],
      minInvestment: "₹375",
      description: "Earn rewards through Ethereum staking with full liquidity",
    },
    {
      type: "Gold-Backed Tokens",
      apy: "3.8%",
      risk: "Low Risk",
      riskColor: "bg-green-100 text-green-800",
      features: ["Physical Backing", "Sharia Approved", "Stable Value"],
      minInvestment: "₹375",
      description: "Invest in tokenized gold backed by physical reserves",
    },
    {
      type: "Sukuk Bonds",
      apy: "6.5%",
      risk: "Low Risk",
      riskColor: "bg-green-100 text-green-800",
      features: ["Asset-Backed", "Fixed Returns", "Fully Compliant"],
      minInvestment: "₹375",
      description: "Islamic bonds backed by tangible assets with fixed returns",
    },
    {
      type: "Halal DeFi",
      apy: "8.1%",
      risk: "High Risk",
      riskColor: "bg-orange-100 text-orange-800",
      features: ["Vetted Protocols", "Higher Yields", "Innovative"],
      minInvestment: "₹375",
      description: "Access vetted DeFi protocols that comply with Islamic principles",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.push("/auth")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-emerald-800">Amaanah</span>
            </div>
          </div>
          <Button
            variant="outline"
            onClick={() => router.push("/zakat-calculator")}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Calculator className="w-4 h-4 mr-2" />
            Zakat Calculator
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Investment Vaults</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select from our range of Shariah-compliant investment options. You can choose multiple vaults to diversify
            your portfolio.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {vaults.map((vault) => (
            <Card key={vault.type} className="hover:shadow-lg transition-shadow border-2 hover:border-emerald-200">
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary" className={vault.riskColor}>
                    {vault.risk}
                  </Badge>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-emerald-600">{vault.apy}</div>
                    <div className="text-sm text-gray-500">APY</div>
                  </div>
                </div>
                <CardTitle className="text-xl">{vault.type}</CardTitle>
                <CardDescription className="text-base">{vault.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-sm text-gray-700">Features:</h4>
                    {vault.features.map((feature) => (
                      <div key={feature} className="flex items-center text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500 mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-600">Minimum Investment</span>
                      <span className="font-semibold">{vault.minInvestment}</span>
                    </div>
                    <Button
                      onClick={() => handleInvestNow(vault.type)}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      Invest Now
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
