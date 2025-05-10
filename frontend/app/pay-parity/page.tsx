"use client"

import type React from "react"

import { useState } from "react"
import { getSalaryComparison } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

interface SalaryResult {
  salary: number
  comparison: string
}

export default function PayParityPage() {
  const [formData, setFormData] = useState({
    job: "",
    location: "",
    experience: 0,
    user_salary: 0,
  })
  const [result, setResult] = useState<SalaryResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "experience" || name === "user_salary" ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.job || !formData.location) {
      setError("Please fill in all required fields.")
      return
    }

    setLoading(true)
    setError("")

    try {
      const data = await getSalaryComparison(formData)
      setResult(data)
    } catch (err) {
      setError("Failed to fetch salary comparison. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Pay Parity Tool</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Compare your salary with industry averages to ensure you're being paid fairly.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Salary Information</CardTitle>
              <CardDescription>Enter your job details to compare your salary with the industry average</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="job">
                    Job Title <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="job"
                    name="job"
                    placeholder="e.g., Software Engineer"
                    value={formData.job}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">
                    Location <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g., Bangalore"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">Years of Experience</Label>
                  <Input
                    id="experience"
                    name="experience"
                    type="number"
                    min="0"
                    placeholder="e.g., 5"
                    value={formData.experience || ""}
                    onChange={handleChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="user_salary">Your Current Salary (₹)</Label>
                  <Input
                    id="user_salary"
                    name="user_salary"
                    type="number"
                    min="0"
                    placeholder="e.g., 1200000"
                    value={formData.user_salary || ""}
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={loading || !formData.job || !formData.location}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Calculating
                    </>
                  ) : (
                    "Compare Salary"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div>
            {error && (
              <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-4 rounded-md mb-6">
                {error}
              </div>
            )}

            {result && (
              <Card>
                <CardHeader>
                  <CardTitle>Salary Comparison Results</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                      Average Salary for {formData.job} in {formData.location}
                    </p>
                    <p className="text-3xl font-bold">₹{result.salary.toLocaleString()}</p>
                  </div>

                  {formData.user_salary > 0 && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your Salary</p>
                      <p className="text-3xl font-bold">₹{formData.user_salary.toLocaleString()}</p>
                    </div>
                  )}

                  {formData.user_salary > 0 && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                      <p className="font-medium">{result.comparison}</p>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Data based on industry averages for your location and job title.
                  </p>
                </CardFooter>
              </Card>
            )}

            {!result && !error && !loading && (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Enter your job details and click "Compare Salary" to see how your compensation compares to industry
                  standards.
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  This tool helps identify potential gender pay gaps and ensures fair compensation.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
