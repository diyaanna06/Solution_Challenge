"use client"

import type React from "react"

import { useState } from "react"
import { getCareerAdvice } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2 } from "lucide-react"

interface Career {
  name: string
  summary: string
  salary: string
  skills: string[]
  ai_risk: string
  growth: string
}

export default function CareerGuidance() {
  const [interests, setInterests] = useState("")
  const [careers, setCareers] = useState<Career[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!interests.trim()) return

    setLoading(true)
    setError("")

    try {
      const data = await getCareerAdvice(interests)
      setCareers(data.careers || [])
    } catch (err) {
      setError("Failed to fetch career advice. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const getGrowthColor = (growth: string) => {
    switch (growth.toLowerCase()) {
      case "high":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "low":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Career Guidance</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Enter your interests and skills to get AI-powered career suggestions tailored for you.
        </p>

        <form onSubmit={handleSubmit} className="mb-10">
          <div className="flex flex-col md:flex-row gap-4">
            <Input
              type="text"
              placeholder="Enter your interests (e.g., programming, design, healthcare)"
              value={interests}
              onChange={(e) => setInterests(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading || !interests.trim()} className="bg-pink-500 hover:bg-pink-600">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                "Get Career Suggestions"
              )}
            </Button>
          </div>
        </form>

        {error && (
          <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-4 rounded-md mb-6">{error}</div>
        )}

        {careers.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-4">Suggested Careers</h2>
            {careers.map((career, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{career.name}</CardTitle>
                  <CardDescription>{career.summary}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Salary Range</p>
                      <p className="text-lg font-semibold">{career.salary}</p>
                    </div>

                    <div>
                      <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Required Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {career.skills.map((skill, i) => (
                          <Badge key={i} variant="secondary">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6">
                      <div>
                        <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">AI Disruption Risk</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(career.ai_risk)}`}
                        >
                          {career.ai_risk}
                        </span>
                      </div>

                      <div>
                        <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-1">Growth Potential</p>
                        <span
                          className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getGrowthColor(career.growth)}`}
                        >
                          {career.growth}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
