"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, CreditCard, Shield } from "lucide-react"

export default function PaymentPage() {
  const router = useRouter()
  const [selectedVault, setSelectedVault] = useState("")
  const [amount, setAmount] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)

  useEffect(() => {
    const vault = localStorage.getItem("amaanah_selected_vault")
    if (vault) {
      setSelectedVault(vault)
    } else {
      router.push("/my-vaults")
    }
  }, [router])

  const getVaultDetails = (type: string) => {
    const vaultMap: { [key: string]: { apy: string; risk: string; riskColor: string } } = {
      "ETH Staking": { apy: "5.2%", risk: "Medium Risk", riskColor: "bg-blue-100 text-blue-800" },
      "Gold-Backed Tokens": { apy: "3.8%", risk: "Low Risk", riskColor: "bg-green-100 text-green-800" },
      "Sukuk Bonds": { apy: "6.5%", risk: "Low Risk", riskColor: "bg-green-100 text-green-800" },
      "Halal DeFi": { apy: "8.1%", risk: "High Risk", riskColor: "bg-orange-100 text-orange-800" },
    }
    return vaultMap[type] || { apy: "0%", risk: "Unknown", riskColor: "bg-gray-100 text-gray-800" }
  }

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      localStorage.setItem("amaanah_pending_payment_amount", amount)
      localStorage.setItem("amaanah_pending_payment_vault", selectedVault)
      localStorage.setItem("amaanah_payment_start_time", Date.now().toString())
      router.push("/payment-pending")
      setIsProcessing(false)
    }, 1000)
  }

  const vaultDetails = getVaultDetails(selectedVault)

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => router.push("/my-vaults")} className="mr-4">
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
      </header>

      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Contribution</h1>
          <p className="text-gray-600">Add funds to your selected investment vault</p>
        </div>

        {/* Selected Vault Info */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">{selectedVault}</CardTitle>
                <CardDescription>Selected investment vault</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-600">{vaultDetails.apy}</div>
                <Badge variant="secondary" className={vaultDetails.riskColor}>
                  {vaultDetails.risk}
                </Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Details
            </CardTitle>
            <CardDescription>Enter your contribution amount and payment information</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePayment} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="amount">Contribution Amount (₹)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="Enter amount (minimum ₹375)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="375"
                  required
                  className="text-lg"
                />
                <p className="text-sm text-gray-500">Minimum contribution: ₹375</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold">Payment Method</h3>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="cursor-pointer hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-blue-600 font-bold text-sm">Bank</span>
                      </div>
                      <h4 className="font-semibold text-sm">Bank Transfer</h4>
                      <p className="text-xs text-gray-500">Direct bank transfer</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-purple-600 font-bold text-sm">JC</span>
                      </div>
                      <h4 className="font-semibold text-sm">JazzCash</h4>
                      <p className="text-xs text-gray-500">Mobile wallet</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-green-600 font-bold text-sm">EP</span>
                      </div>
                      <h4 className="font-semibold text-sm">EasyPaisa</h4>
                      <p className="text-xs text-gray-500">Mobile wallet</p>
                    </CardContent>
                  </Card>

                  <Card className="cursor-pointer hover:border-emerald-200 transition-colors">
                    <CardContent className="p-4 text-center">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                        <span className="text-orange-600 font-bold text-sm">₿</span>
                      </div>
                      <h4 className="font-semibold text-sm">Crypto</h4>
                      <p className="text-xs text-gray-500">Digital currency</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-emerald-50 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Shield className="w-5 h-5 text-emerald-600 mr-2" />
                  <span className="font-semibold text-emerald-800">Secure & Compliant</span>
                </div>
                <p className="text-sm text-emerald-700">
                  Your payment is processed securely and all investments are Shariah-compliant and verified by our
                  Islamic advisory board.
                </p>
              </div>

              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-lg py-6"
                disabled={isProcessing}
              >
                {isProcessing ? "Processing Payment..." : `Contribute ₹${amount || "0"}`}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
