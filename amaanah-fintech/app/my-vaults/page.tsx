"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Calculator, Plus, TrendingUp } from "lucide-react"

interface Vault {
  type: string
  progress: number
  status: string
  dateAdded: string
}

export default function MyVaultsPage() {
  const router = useRouter()
  const [vaults, setVaults] = useState<Vault[]>([])
  const [targetGoal, setTargetGoal] = useState(100000)
  const [goalPurpose, setGoalPurpose] = useState("Investment Goal")

  useEffect(() => {
    const userVaults = JSON.parse(localStorage.getItem("amaanah_user_vaults") || "[]")
    setVaults(userVaults)

    // Load goal data
    const savedGoal = localStorage.getItem("amaanah_investment_goal")
    const savedPurpose = localStorage.getItem("amaanah_goal_purpose")
    if (savedGoal) {
      setTargetGoal(Number.parseInt(savedGoal))
    }
    if (savedPurpose) {
      setGoalPurpose(savedPurpose)
    }
  }, [])

  const handleContribute = (vaultType: string) => {
    localStorage.setItem("amaanah_selected_vault", vaultType)
    router.push("/payment")
  }

  const getVaultDetails = (type: string) => {
    const vaultMap: { [key: string]: { apy: string; risk: string; riskColor: string } } = {
      "ETH Staking": { apy: "5.2%", risk: "Medium Risk", riskColor: "bg-blue-100 text-blue-800" },
      "Gold-Backed Tokens": { apy: "3.8%", risk: "Low Risk", riskColor: "bg-green-100 text-green-800" },
      "Sukuk Bonds": { apy: "6.5%", risk: "Low Risk", riskColor: "bg-green-100 text-green-800" },
      "Halal DeFi": { apy: "8.1%", risk: "High Risk", riskColor: "bg-orange-100 text-orange-800" },
    }
    return vaultMap[type] || { apy: "0%", risk: "Unknown", riskColor: "bg-gray-100 text-gray-800" }
  }

  const totalInvested = 0 // Since we start with ₹0
  const progressPercentage = (totalInvested / targetGoal) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => router.push("/vaults")} className="mr-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Vaults
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-bold text-emerald-800">Amaanah</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              onClick={() => router.push("/zakat-calculator")}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Calculator className="w-4 h-4 mr-2" />
              Zakat Calculator
            </Button>
            <Button onClick={() => router.push("/vaults")} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Vault
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Investment Portfolio</h1>
          <p className="text-gray-600">Track your Islamic investment journey</p>
        </div>

        {/* Investment Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Invested</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₹{totalInvested.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mt-1">
                Across {vaults.length} vault{vaults.length !== 1 ? "s" : ""}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Total Returns</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-emerald-600">₹0</div>
              <div className="text-sm text-gray-500 mt-1">0% progress</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Goal Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">₹{targetGoal.toLocaleString()}</div>
              <div className="text-sm text-gray-500 mb-2">{goalPurpose}</div>
              <div className="mt-2">
                <Progress value={progressPercentage} className="h-2" />
                <div className="text-sm text-gray-500 mt-1">{progressPercentage.toFixed(1)}% complete</div>
              </div>
              <Button variant="outline" size="sm" onClick={() => router.push("/goals")} className="mt-3 text-xs w-full">
                Edit Goal
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Vaults Display */}
        {vaults.length === 0 ? (
          // Empty State
          <Card className="text-center py-12">
            <CardContent>
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Start Your Investment Journey</h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                You haven't selected any investment vaults yet. Choose from our Shariah-compliant options to begin
                building wealth.
              </p>
              <Button onClick={() => router.push("/vaults")} className="bg-emerald-600 hover:bg-emerald-700">
                Add Your First Vault
              </Button>
            </CardContent>
          </Card>
        ) : (
          // Active Vaults
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Vaults</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {vaults.map((vault) => {
                const details = getVaultDetails(vault.type)
                return (
                  <Card key={vault.type} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="secondary" className={details.riskColor}>
                          {details.risk}
                        </Badge>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-emerald-600">{details.apy}</div>
                          <div className="text-sm text-gray-500">APY</div>
                        </div>
                      </div>
                      <CardTitle className="text-lg">{vault.type}</CardTitle>
                      <CardDescription>
                        <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                          {vault.status}
                        </Badge>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-600">Progress</span>
                            <span className="font-semibold">₹{vault.progress}</span>
                          </div>
                          <Progress value={0} className="h-2" />
                          <div className="text-sm text-gray-500 mt-1">0% of goal</div>
                        </div>

                        <Button
                          onClick={() => handleContribute(vault.type)}
                          className="w-full bg-emerald-600 hover:bg-emerald-700"
                        >
                          Contribute
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
