"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Target, TrendingUp, Calendar, DollarSign } from "lucide-react"

export default function GoalsPage() {
  const router = useRouter()
  const [goalAmount, setGoalAmount] = useState("")
  const [goalTimeline, setGoalTimeline] = useState("")
  const [goalPurpose, setGoalPurpose] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load existing goal data
    const savedGoal = localStorage.getItem("amaanah_investment_goal")
    const savedTimeline = localStorage.getItem("amaanah_goal_timeline")
    const savedPurpose = localStorage.getItem("amaanah_goal_purpose")

    if (savedGoal) setGoalAmount(savedGoal)
    if (savedTimeline) setGoalTimeline(savedTimeline)
    if (savedPurpose) setGoalPurpose(savedPurpose)
  }, [])

  const handleSaveGoal = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate saving
    setTimeout(() => {
      localStorage.setItem("amaanah_investment_goal", goalAmount)
      localStorage.setItem("amaanah_goal_timeline", goalTimeline)
      localStorage.setItem("amaanah_goal_purpose", goalPurpose)

      setIsLoading(false)
      router.push("/my-vaults")
    }, 1000)
  }

  const predefinedGoals = [
    {
      amount: "50000",
      purpose: "Emergency Fund",
      timeline: "12",
      description: "Build a safety net for unexpected expenses",
    },
    { amount: "100000", purpose: "Wealth Building", timeline: "24", description: "Long-term wealth accumulation" },
    { amount: "300000", purpose: "Hajj Fund", timeline: "60", description: "Save for the sacred pilgrimage" },
    { amount: "500000", purpose: "House Down Payment", timeline: "36", description: "Save for your dream home" },
    { amount: "200000", purpose: "Education Fund", timeline: "48", description: "Invest in knowledge and skills" },
  ]

  const selectPredefinedGoal = (goal: (typeof predefinedGoals)[0]) => {
    setGoalAmount(goal.amount)
    setGoalPurpose(goal.purpose)
    setGoalTimeline(goal.timeline)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center">
          <Button variant="ghost" onClick={() => router.push("/my-vaults")} className="mr-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
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
            <Target className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Set Your Investment Goal</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Define your financial objectives to stay motivated and track your progress effectively
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Goal Setting Form */}
          <Card>
            <CardHeader>
              <CardTitle>Custom Goal</CardTitle>
              <CardDescription>Set your personalized investment target</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveGoal} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="amount">Target Amount (₹)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter your goal amount"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    required
                    min="1000"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purpose">Goal Purpose</Label>
                  <Input
                    id="purpose"
                    type="text"
                    placeholder="e.g., Emergency Fund, Hajj, House"
                    value={goalPurpose}
                    onChange={(e) => setGoalPurpose(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Timeline (months)</Label>
                  <Input
                    id="timeline"
                    type="number"
                    placeholder="How many months to achieve this goal?"
                    value={goalTimeline}
                    onChange={(e) => setGoalTimeline(e.target.value)}
                    required
                    min="1"
                    max="120"
                  />
                </div>

                {goalAmount && goalTimeline && (
                  <div className="bg-emerald-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-emerald-800 mb-2">Goal Summary</h4>
                    <div className="space-y-1 text-sm text-emerald-700">
                      <p>
                        Monthly target: ₹
                        {Math.ceil(Number.parseInt(goalAmount) / Number.parseInt(goalTimeline)).toLocaleString()}
                      </p>
                      <p>Timeline: {goalTimeline} months</p>
                      <p>Total target: ₹{Number.parseInt(goalAmount).toLocaleString()}</p>
                    </div>
                  </div>
                )}

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isLoading}>
                  {isLoading ? "Saving Goal..." : "Save Goal"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Predefined Goals */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Goals</CardTitle>
                <CardDescription>Choose from common Islamic investment objectives</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {predefinedGoals.map((goal) => (
                  <div
                    key={goal.purpose}
                    className="border rounded-lg p-4 hover:border-emerald-200 cursor-pointer transition-colors"
                    onClick={() => selectPredefinedGoal(goal)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{goal.purpose}</h4>
                      <Badge variant="outline" className="text-emerald-700 border-emerald-200">
                        ₹{Number.parseInt(goal.amount).toLocaleString()}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{goal.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {goal.timeline} months
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />₹
                        {Math.ceil(Number.parseInt(goal.amount) / Number.parseInt(goal.timeline)).toLocaleString()}
                        /month
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Goal Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Goal Setting Tips
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Set realistic and achievable targets</li>
                  <li>• Consider your monthly income and expenses</li>
                  <li>• Start with smaller goals to build momentum</li>
                  <li>• Review and adjust your goals regularly</li>
                  <li>• Diversify across multiple investment vaults</li>
                  <li>• Remember to factor in Zakat obligations</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
