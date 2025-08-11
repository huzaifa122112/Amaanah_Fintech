"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calculator, Info } from "lucide-react"

export default function ZakatCalculatorPage() {
  const router = useRouter()
  const [assets, setAssets] = useState({
    cash: "",
    bankBalance: "",
    gold: "",
    silver: "",
    investments: "",
    businessAssets: "",
    debts: "",
  })
  const [zakatAmount, setZakatAmount] = useState<number | null>(null)

  const calculateZakat = () => {
    const totalAssets =
      Number.parseFloat(assets.cash || "0") +
      Number.parseFloat(assets.bankBalance || "0") +
      Number.parseFloat(assets.gold || "0") +
      Number.parseFloat(assets.silver || "0") +
      Number.parseFloat(assets.investments || "0") +
      Number.parseFloat(assets.businessAssets || "0")

    const totalDebts = Number.parseFloat(assets.debts || "0")
    const netAssets = totalAssets - totalDebts

    // Nisab threshold (approximately ₹45,000 as of 2024)
    const nisabThreshold = 45000

    if (netAssets >= nisabThreshold) {
      const zakat = netAssets * 0.025 // 2.5% of net assets
      setZakatAmount(zakat)
    } else {
      setZakatAmount(0)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setAssets((prev) => ({ ...prev, [field]: value }))
    setZakatAmount(null) // Reset calculation when inputs change
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => router.back()} className="mr-4">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Calculator className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Zakat Calculator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Calculate your annual Zakat obligation based on your assets and wealth. Zakat is one of the five pillars of
            Islam.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <Card>
            <CardHeader>
              <CardTitle>Enter Your Assets</CardTitle>
              <CardDescription>
                Provide details of your wealth and assets for accurate Zakat calculation
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="cash">Cash in Hand (₹)</Label>
                <Input
                  id="cash"
                  type="number"
                  placeholder="0"
                  value={assets.cash}
                  onChange={(e) => handleInputChange("cash", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bank">Bank Balance (₹)</Label>
                <Input
                  id="bank"
                  type="number"
                  placeholder="0"
                  value={assets.bankBalance}
                  onChange={(e) => handleInputChange("bankBalance", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gold">Gold Value (₹)</Label>
                <Input
                  id="gold"
                  type="number"
                  placeholder="0"
                  value={assets.gold}
                  onChange={(e) => handleInputChange("gold", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="silver">Silver Value (₹)</Label>
                <Input
                  id="silver"
                  type="number"
                  placeholder="0"
                  value={assets.silver}
                  onChange={(e) => handleInputChange("silver", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="investments">Investments & Stocks (₹)</Label>
                <Input
                  id="investments"
                  type="number"
                  placeholder="0"
                  value={assets.investments}
                  onChange={(e) => handleInputChange("investments", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="business">Business Assets (₹)</Label>
                <Input
                  id="business"
                  type="number"
                  placeholder="0"
                  value={assets.businessAssets}
                  onChange={(e) => handleInputChange("businessAssets", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="debts">Outstanding Debts (₹)</Label>
                <Input
                  id="debts"
                  type="number"
                  placeholder="0"
                  value={assets.debts}
                  onChange={(e) => handleInputChange("debts", e.target.value)}
                />
              </div>

              <Button onClick={calculateZakat} className="w-full bg-emerald-600 hover:bg-emerald-700">
                Calculate Zakat
              </Button>
            </CardContent>
          </Card>

          {/* Results and Information */}
          <div className="space-y-6">
            {/* Zakat Result */}
            {zakatAmount !== null && (
              <Card>
                <CardHeader>
                  <CardTitle>Your Zakat Calculation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-emerald-600 mb-2">₹{zakatAmount.toLocaleString()}</div>
                    <p className="text-gray-600">
                      {zakatAmount > 0
                        ? "Annual Zakat due based on your assets"
                        : "No Zakat due - assets below Nisab threshold"}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Information Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Info className="w-5 h-5 mr-2" />
                  About Zakat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">What is Zakat?</h4>
                  <p className="text-sm text-gray-600">
                    Zakat is the third pillar of Islam and a mandatory charitable contribution for eligible Muslims. It
                    purifies wealth and helps support those in need.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Nisab Threshold</h4>
                  <p className="text-sm text-gray-600">
                    The current Nisab threshold is approximately ₹45,000. Zakat is only due if your net assets exceed
                    this amount for a full lunar year.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Zakat Rate</h4>
                  <p className="text-sm text-gray-600">
                    The standard Zakat rate is 2.5% of your net zakatable assets. This calculation is based on assets
                    held for one full lunar year.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Important Note</h4>
                  <p className="text-sm text-gray-600">
                    This calculator provides an estimate. For precise calculations and religious guidance, please
                    consult with a qualified Islamic scholar.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Zakat Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Calculate Zakat annually on the same date</li>
                  <li>• Include all forms of wealth: cash, gold, silver, investments</li>
                  <li>• Deduct outstanding debts from total assets</li>
                  <li>• Pay Zakat promptly once calculated</li>
                  <li>• Keep records of your Zakat payments</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
