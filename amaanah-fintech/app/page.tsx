"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, TrendingUp, Star, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function LandingPage() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem("amaanah_user_logged_in") === "true"
    setIsLoggedIn(loggedIn)
  }, [])

  const handleGetStarted = () => {
    if (isLoggedIn) {
      router.push("/my-vaults")
    } else {
      router.push("/auth")
    }
  }

  const handleGoToPortfolio = () => {
    router.push("/my-vaults")
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-emerald-800">Amaanah</span>
          </div>
          <div className="flex items-center space-x-2">
            {isLoggedIn && (
              <Button
                variant="outline"
                onClick={handleGoToPortfolio}
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent"
              >
                My Portfolio
              </Button>
            )}
            <Button onClick={handleGetStarted} className="bg-emerald-600 hover:bg-emerald-700">
              {isLoggedIn ? "Go to Vaults" : "Get Started"}
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            <Shield className="w-4 h-4 mr-2" />
            100% Shariah Compliant
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Invest with <span className="text-emerald-600">Faith</span> &{" "}
            <span className="text-emerald-600">Purpose</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Build wealth through Islamic-compliant investments. Start your journey towards financial freedom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              size="lg"
              className="bg-emerald-600 hover:bg-emerald-700 text-lg px-8 py-6"
            >
              {isLoggedIn ? "Go to My Vaults" : "Start Investing Today"}
            </Button>
            {isLoggedIn && (
              <Button
                variant="outline"
                onClick={handleGoToPortfolio}
                size="lg"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 text-lg px-8 py-6 bg-transparent"
              >
                View Portfolio
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Savings Goals Component */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Islamic Savings Goals</h2>
            <p className="text-gray-600">Choose your path to financial success with Shariah-compliant options</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Wealth Building</CardTitle>
                <CardDescription>Long-term growth through diversified Islamic investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="font-semibold">₹100,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timeline</span>
                    <span className="font-semibold">2-5 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Emergency Fund</CardTitle>
                <CardDescription>Secure your future with liquid, low-risk investments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="font-semibold">₹50,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timeline</span>
                    <span className="font-semibold">6-12 months</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-emerald-200 transition-colors">
              <CardHeader>
                <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-emerald-600" />
                </div>
                <CardTitle>Hajj Fund</CardTitle>
                <CardDescription>Save for your spiritual journey with dedicated planning</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Target</span>
                    <span className="font-semibold">₹300,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Timeline</span>
                    <span className="font-semibold">3-7 years</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Investment Options Component */}
      <section className="py-16 px-4 bg-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shariah-Compliant Investment Options</h2>
            <p className="text-gray-600">Diversify your portfolio with vetted Islamic investment vehicles</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Medium Risk
                  </Badge>
                  <span className="text-2xl font-bold text-emerald-600">5.2%</span>
                </div>
                <CardTitle className="text-lg">ETH Staking</CardTitle>
                <CardDescription>Liquid staking with auto-compounding returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Shariah Compliant</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Liquid Staking</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Auto-compounding</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Low Risk
                  </Badge>
                  <span className="text-2xl font-bold text-emerald-600">3.8%</span>
                </div>
                <CardTitle className="text-lg">Gold-Backed Tokens</CardTitle>
                <CardDescription>Physical gold backing with stable value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Physical Backing</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Sharia Approved</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Stable Value</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Low Risk
                  </Badge>
                  <span className="text-2xl font-bold text-emerald-600">6.5%</span>
                </div>
                <CardTitle className="text-lg">Sukuk Bonds</CardTitle>
                <CardDescription>Asset-backed with fixed returns</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Asset-Backed</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Fixed Returns</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Fully Compliant</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                    High Risk
                  </Badge>
                  <span className="text-2xl font-bold text-emerald-600">8.1%</span>
                </div>
                <CardTitle className="text-lg">Halal DeFi</CardTitle>
                <CardDescription>Vetted protocols with higher yields</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Vetted Protocols</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Higher Yields</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-emerald-500 mr-2" />
                    <span>Innovative</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Section Component */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Amaanah</h2>
            <p className="text-gray-600">Our commitment to Islamic principles and financial excellence</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">100% Shariah Compliant</h3>
              <p className="text-sm text-gray-600">All investments follow strict Islamic financial principles</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="font-semibold mb-2">Transparent Returns</h3>
              <p className="text-sm text-gray-600">Clear, honest reporting on all investment performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center mb-8">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold">Amaanah</span>
          </div>
          <div className="text-center text-gray-400">
            <p>&copy; 2024 Amaanah. All rights reserved. Investing in accordance with Islamic principles.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
