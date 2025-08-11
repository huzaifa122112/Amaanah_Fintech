"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight, Home } from "lucide-react"

export default function PaymentConfirmationPage() {
  const router = useRouter()
  const [paymentDetails, setPaymentDetails] = useState({ amount: "", vault: "" })

  useEffect(() => {
    const amount = localStorage.getItem("amaanah_last_payment_amount")
    const vault = localStorage.getItem("amaanah_last_payment_vault")

    if (amount && vault) {
      setPaymentDetails({ amount, vault })

      // Clear the temporary payment data
      localStorage.removeItem("amaanah_last_payment_amount")
      localStorage.removeItem("amaanah_last_payment_vault")
      localStorage.removeItem("amaanah_selected_vault")
    } else {
      router.push("/my-vaults")
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-bold text-emerald-800">Amaanah</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16 max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
          <p className="text-gray-600">Your contribution has been processed successfully</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Transaction Details</CardTitle>
            <CardDescription>Your investment contribution summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Investment Vault</span>
              <span className="font-semibold">{paymentDetails.vault}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Contribution Amount</span>
              <span className="font-semibold text-emerald-600">₹{paymentDetails.amount}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">Transaction Date</span>
              <span className="font-semibold">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Status</span>
              <span className="font-semibold text-emerald-600">Confirmed</span>
            </div>
          </CardContent>
        </Card>

        <div className="bg-emerald-50 p-6 rounded-lg mb-8">
          <h3 className="font-semibold text-emerald-800 mb-2">What happens next?</h3>
          <ul className="space-y-2 text-sm text-emerald-700">
            <li>• Your funds will be allocated to the selected vault within 24 hours</li>
            <li>• You'll start earning returns based on the vault's APY</li>
            <li>• Track your progress in the "My Vaults" section</li>
            <li>• Receive monthly statements via email</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button onClick={() => router.push("/my-vaults")} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
            <ArrowRight className="w-4 h-4 mr-2" />
            View My Vaults
          </Button>
          <Button
            variant="outline"
            onClick={() => router.push("/")}
            className="flex-1 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          >
            <Home className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  )
}
