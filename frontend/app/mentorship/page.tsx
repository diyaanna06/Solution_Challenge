"use client"

import { useState, useEffect } from "react"
import { getUniqueSkills, getMentorshipRecommendations } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

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

        <Card className="mb-10">
          <CardHeader className="text-center">
            <CardTitle>Select Your Skills</CardTitle>
            <CardDescription>Choose the skills you want to develop or already possess</CardDescription>
          </CardHeader>
          <CardContent>
            {skillsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
              </div>
            ) : (
              <div className="flex flex-wrap justify-center gap-4 text-center">
                {skills.map((skill) => (
                  <Button
                    key={skill}
                    onClick={() => handleSkillToggle(skill)}
                    className={`px-4 py-2 rounded-full text-white font-medium shadow-md transition-all ${
                      selectedSkills.includes(skill)
                        ? "bg-gradient-to-r from-pink-500 to-purple-600"
                        : "bg-gradient-to-r from-gray-300 to-gray-400 hover:from-pink-500 hover:to-purple-600"
                    }`}
                  >
                    {skill}
                  </Button>
                ))}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={handleSubmit}
              disabled={loading || selectedSkills.length === 0}
              className="bg-pink-500 hover:bg-pink-600"
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

        <div>
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

          <AnimatePresence>
            {programs.length > 0 && !loading && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h2 className="text-2xl font-semibold">Recommended Programs</h2>
                {programs.map((program, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    whileHover={{ scale: 1.02, y: -3 }}
                    className="relative group transition-transform duration-300 ease-in-out"
                  >
                    <div className="absolute -inset-1 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-sm opacity-0 group-hover:opacity-30 transition-all duration-500 z-0 pointer-events-none" />

                    <Card
                      className={`relative z-10 shadow-md rounded-lg border border-transparent hover:border-pink-300 group-hover:shadow-xl transition-all duration-300 ease-in-out ${
                        index % 2 === 0
                          ? "bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800"
                          : "bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800"
                      }`}
                    >
                      <CardHeader>
                        <CardTitle className="text-lg font-bold text-gray-800 dark:text-gray-100">
                          {program["Program Name"]}
                        </CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-300">
                          Match Score: {Math.round(program.Similarity * 100)}%
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div>
                          <p className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Skills Covered
                          </p>
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
                        <Button
                          asChild
                          variant="outline"
                          className="w-full transition-all duration-300 ease-in-out hover:bg-pink-500 hover:text-white hover:border-transparent"
                        >
                          <a
                            href={program.Website}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {!loading && programs.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                Select your skills and click "Find Mentorship Programs" to see recommendations.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-pink-500" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
