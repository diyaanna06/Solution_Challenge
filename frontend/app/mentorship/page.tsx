"use client"

import { useState, useEffect } from "react"
import { getUniqueSkills, getMentorshipRecommendations } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Loader2 } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface MentorshipProgram {
  "Program Name": string
  Skills: string
  Similarity: number
  Website: string
}

export default function MentorshipPage() {
  const [skills, setSkills] = useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [programs, setPrograms] = useState<MentorshipProgram[]>([])
  const [loading, setLoading] = useState(false)
  const [skillsLoading, setSkillsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchSkills() {
      try {
        const data = await getUniqueSkills()
        setSkills(data)
      } catch (err) {
        setError("Failed to load skills. Please refresh the page.")
        console.error(err)
      } finally {
        setSkillsLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const handleSkillToggle = (skill: string) => {
    setSelectedSkills((prev) => (prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]))
  }

  const handleSubmit = async () => {
    if (selectedSkills.length === 0) return

    setLoading(true)
    setError("")

    try {
      const data = await getMentorshipRecommendations(selectedSkills)
      setPrograms(data)
    } catch (err) {
      setError("Failed to fetch mentorship recommendations. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Find Mentorship Programs</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Select your skills to find mentorship programs that match your interests and career goals.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Your Skills</CardTitle>
                <CardDescription>Choose the skills you want to develop or already possess</CardDescription>
              </CardHeader>
              <CardContent>
                {skillsLoading ? (
                  <div className="flex justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                  </div>
                ) : (
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      {skills.map((skill) => (
                        <div key={skill} className="flex items-center space-x-2">
                          <Checkbox
                            id={`skill-${skill}`}
                            checked={selectedSkills.includes(skill)}
                            onCheckedChange={() => handleSkillToggle(skill)}
                          />
                          <Label htmlFor={`skill-${skill}`} className="cursor-pointer">
                            {skill}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handleSubmit}
                  disabled={loading || selectedSkills.length === 0}
                  className="w-full bg-pink-500 hover:bg-pink-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Programs
                    </>
                  ) : (
                    "Find Mentorship Programs"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="md:col-span-2">
            {error && (
              <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-4 rounded-md mb-6">
                {error}
              </div>
            )}

            {selectedSkills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-medium mb-2">Selected Skills:</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedSkills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {programs.length > 0 ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Recommended Programs</h2>
                {programs.map((program, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle>{program["Program Name"]}</CardTitle>
                      <CardDescription>Match Score: {Math.round(program.Similarity * 100)}%</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">Skills Covered</p>
                        <div className="flex flex-wrap gap-2">
                          {program.Skills.split(",").map((skill, i) => (
                            <Badge key={i} variant="outline">
                              {skill.trim()}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline" className="w-full">
                        <a href={program.Website} target="_blank" rel="noopener noreferrer">
                          Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              !loading && (
                <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Select your skills and click "Find Mentorship Programs" to see recommendations.
                  </p>
                </div>
              )
            )}

            {loading && (
              <div className="flex justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
