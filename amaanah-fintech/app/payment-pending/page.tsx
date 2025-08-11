"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Clock, Upload, CheckCircle, AlertCircle } from "lucide-react"

export default function PaymentPendingPage() {
  const router = useRouter()
  const [timeLeft, setTimeLeft] = useState("")
  const [paymentDetails, setPaymentDetails] = useState({ amount: "", vault: "" })
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)

  useEffect(() => {
    const amount = localStorage.getItem("amaanah_pending_payment_amount")
    const vault = localStorage.getItem("amaanah_pending_payment_vault")
    const startTime = localStorage.getItem("amaanah_payment_start_time")

    if (amount && vault && startTime) {
      setPaymentDetails({ amount, vault })

      // Calculate time remaining (18 hours = 64800000 ms)
      const updateTimer = () => {
        const now = Date.now()
        const elapsed = now - Number.parseInt(startTime)
        const remaining = 64800000 - elapsed // 18 hours in milliseconds

        if (remaining <= 0) {
          setTimeLeft("Expired")
          return
        }

        const hours = Math.floor(remaining / (1000 * 60 * 60))
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000)

        setTimeLeft(
          `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`,
        )
      }

      updateTimer()
      const interval = setInterval(updateTimer, 1000)

      return () => clearInterval(interval)
    } else {
      router.push("/my-vaults")
    }
  }, [router])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setScreenshot(e.target.files[0])
    }
  }

  const handleUploadScreenshot = async () => {
    if (!screenshot) return

    setIsUploading(true)

    // Simulate upload
    setTimeout(() => {
      setUploadSuccess(true)
      setIsUploading(false)

      // After successful upload, redirect to confirmation
      setTimeout(() => {
        // Clear pending payment data
        localStorage.removeItem("amaanah_pending_payment_amount")
        localStorage.removeItem("amaanah_pending_payment_vault")
        localStorage.removeItem("amaanah_payment_start_time")

        // Set confirmation data
        localStorage.setItem("amaanah_last_payment_amount", paymentDetails.amount)
        localStorage.setItem("amaanah_last_payment_vault", paymentDetails.vault)

        router.push("/payment-confirmation")
      }, 2000)
    }, 2000)
  }

  const bankDetails = {
    bankName: "Meezan Bank",
    accountTitle: "Amaanah Investment Platform",
    accountNumber: "0123456789012345",
    iban: "PK36MEZN0000000123456789",
  }

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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Payment Pending</h1>
          <p className="text-gray-600">Complete your payment and upload the screenshot</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Payment Instructions */}
          <div className="space-y-6">
            {/* Timer */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <Clock className="w-5 h-5 mr-2" />
                  Time Remaining
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-600 mb-2">{timeLeft}</div>
                  <p className="text-sm text-gray-600">Complete payment within this time</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Investment Vault</span>
                  <span className="font-semibold">{paymentDetails.vault}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b">
                  <span className="text-gray-600">Amount</span>
                  <span className="font-semibold text-emerald-600">₹{paymentDetails.amount}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline" className="text-orange-700 border-orange-200">
                    Pending Payment
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Bank Details */}
            <Card>
              <CardHeader>
                <CardTitle>Bank Transfer Details</CardTitle>
                <CardDescription>Use these details to make your payment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Bank Name:</span>
                      <p className="font-semibold">{bankDetails.bankName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account Title:</span>
                      <p className="font-semibold">{bankDetails.accountTitle}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Account Number:</span>
                      <p className="font-semibold">{bankDetails.accountNumber}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">IBAN:</span>
                      <p className="font-semibold">{bankDetails.iban}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-3 rounded-lg">
                  <h4 className="font-semibold text-emerald-800 mb-2">Payment Instructions:</h4>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• Transfer exactly ₹{paymentDetails.amount}</li>
                    <li>• Use the reference: "AMAANAH-{Date.now().toString().slice(-6)}"</li>
                    <li>• Take a screenshot of the successful transaction</li>
                    <li>• Upload the screenshot using the form on the right</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Screenshot Upload */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Upload className="w-5 h-5 mr-2" />
                  Upload Payment Screenshot
                </CardTitle>
                <CardDescription>Upload a clear screenshot of your successful payment transaction</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!uploadSuccess ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="screenshot">Payment Screenshot</Label>
                      <Input
                        id="screenshot"
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="cursor-pointer"
                      />
                      <p className="text-xs text-gray-500">Accepted formats: JPG, PNG, GIF (Max size: 5MB)</p>
                    </div>

                    {screenshot && (
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm font-semibold">Selected file:</p>
                        <p className="text-sm text-gray-600">{screenshot.name}</p>
                        <p className="text-xs text-gray-500">Size: {(screenshot.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    )}

                    <Button
                      onClick={handleUploadScreenshot}
                      disabled={!screenshot || isUploading}
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                    >
                      {isUploading ? "Uploading..." : "Upload Screenshot"}
                    </Button>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-emerald-800 mb-2">Screenshot Uploaded!</h3>
                    <p className="text-sm text-emerald-600 mb-4">
                      Your payment screenshot has been received and is being verified.
                    </p>
                    <p className="text-xs text-gray-500">Redirecting to confirmation page...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  Need Help?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <strong>Payment not going through?</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>• Check your account balance</li>
                    <li>• Verify bank details are correct</li>
                    <li>• Try using a different payment method</li>
                  </ul>

                  <p>
                    <strong>Screenshot requirements:</strong>
                  </p>
                  <ul className="space-y-1 ml-4">
                    <li>• Must show successful transaction</li>
                    <li>• Amount should be clearly visible</li>
                    <li>• Include transaction reference/ID</li>
                  </ul>

                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-800 font-semibold">Contact Support:</p>
                    <p className="text-blue-700">WhatsApp: +92-300-1234567</p>
                    <p className="text-blue-700">Email: support@amaanah.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
