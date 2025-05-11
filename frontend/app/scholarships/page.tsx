"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Loader2, GraduationCap, ExternalLink, BookOpen, Award, Sparkles } from 'lucide-react'
import AnimatedBackground from "@/components/animated-background"
import ParticleButton from "@/components/particle-button"
import Card3D from "@/components/card-3d"
import "../animations.css"

interface Scholarship {
  "Scholarship Name": string
  Link: string
  "Minimum Education Qualification": string
  Description?: string
  Amount?: string
  Deadline?: string
}

// Fallback scholarships data
const fallbackScholarships: Record<string, Scholarship[]> = {
  "Primary Education": [
    {
      "Scholarship Name": "National Means-cum-Merit Scholarship",
      Link: "https://scholarships.gov.in/",
      "Minimum Education Qualification": "Primary Education",
      Description: "For students of class 8th with financial constraints",
      Amount: "₹12,000 per annum",
    },
    {
      "Scholarship Name": "Pragati Scholarship for Girls",
      Link: "https://www.aicte-pragati-saksham-gov.in/",
      "Minimum Education Qualification": "Primary Education",
      Description: "For girl students in primary education",
      Amount: "₹10,000 per annum",
    },
  ],
  "Secondary Education": [
    {
      "Scholarship Name": "CBSE Merit Scholarship for Single Girl Child",
      Link: "https://www.cbse.gov.in/",
      "Minimum Education Qualification": "Secondary Education",
      Description: "For girl students who are the only child of their parents",
      Amount: "₹6,000 per annum",
    },
    {
      "Scholarship Name": "PM Young Achievers Scholarship",
      Link: "https://scholarships.gov.in/",
      "Minimum Education Qualification": "Secondary Education",
      Description: "For talented students in secondary education",
      Amount: "₹15,000 per annum",
    },
  ],
  "Higher Secondary": [
    {
      "Scholarship Name": "INSPIRE Scholarship",
      Link: "https://online-inspire.gov.in/",
      "Minimum Education Qualification": "Higher Secondary",
      Description: "For students pursuing science in higher secondary",
      Amount: "₹80,000 per annum",
    },
    {
      "Scholarship Name": "Kishore Vaigyanik Protsahan Yojana (KVPY)",
      Link: "https://kvpy.iisc.ac.in/",
      "Minimum Education Qualification": "Higher Secondary",
      Description: "For students with aptitude for scientific research",
      Amount: "₹5,000-7,000 per month",
    },
  ],
  "Undergraduate": [
    {
      "Scholarship Name": "Prime Minister's Scholarship Scheme for Central Armed Police Forces",
      Link: "https://scholarships.gov.in/",
      "Minimum Education Qualification": "Undergraduate",
      Description: "For wards of CAPF personnel",
      Amount: "₹3,000 per month",
    },
    {
      "Scholarship Name": "AICTE Pragati Scholarship for Girls",
      Link: "https://www.aicte-india.org/",
      "Minimum Education Qualification": "Undergraduate",
      Description: "For girl students in technical education",
      Amount: "₹50,000 per annum",
    },
  ],
  "Postgraduate": [
    {
      "Scholarship Name": "Maulana Azad National Fellowship",
      Link: "https://www.ugc.ac.in/",
      "Minimum Education Qualification": "Postgraduate",
      Description: "For minority students pursuing higher education",
      Amount: "₹31,000 per month",
    },
    {
      "Scholarship Name": "Women Scientist Scheme",
      Link: "https://dst.gov.in/",
      "Minimum Education Qualification": "Postgraduate",
      Description: "For women scientists who had a break in their career",
      Amount: "₹55,000 per month",
    },
  ],
}

export default function ScholarshipsPage() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null)
  const [scholarships, setScholarships] = useState<Scholarship[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

const fetchScholarships = async (level: string) => {
  setSelectedLevel(level);
  setLoading(true);
  setError("");

  try {
    const response = await fetch(`http://localhost:5000/get-scholarships?level=${encodeURIComponent(level)}`);
    if (!response.ok) {
      throw new Error("Failed to fetch scholarships");
    }

    const data = await response.json();
    if (data.error) {
      throw new Error(data.error);
    }

    setScholarships(data);
  } catch (err) {
    console.error("Error fetching scholarships:", err);
    setError("Failed to load scholarships. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // Education levels with their corresponding icons
  const educationLevels = [
    { name: "Primary Education", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Secondary Education", icon: <BookOpen className="h-5 w-5" /> },
    { name: "Higher Secondary", icon: <GraduationCap className="h-5 w-5" /> },
    { name: "Undergraduate", icon: <GraduationCap className="h-5 w-5" /> },
    { name: "Postgraduate", icon: <Award className="h-5 w-5" /> },
  ]

  return (
   <main className="min-h-screen bg-white dark:bg-zinc-900 text-gray-900 dark:text-white">
  <AnimatedBackground />

  <div className="container mx-auto px-4 py-12">
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-block mb-4">
          <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Financial Support
          </span>
        </div>
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
          Find Scholarships
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
          Discover scholarships tailored to your educational level and unlock opportunities for your academic journey.
        </p>
      </div>

      {/* Education Level Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {educationLevels.map((level) => (
          <ParticleButton
            key={level.name}
            onClick={() => fetchScholarships(level.name)}
            className={`px-6 py-3 rounded-full flex items-center gap-2 transition-all ${
              selectedLevel === level.name
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/20"
                : "bg-gray-200 dark:bg-zinc-800 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-zinc-700"
            }`}
            particleColor="#ff66c4"
          >
            {level.icon}
            {level.name}
          </ParticleButton>
        ))}
      </div>

      {/* Scholarships Display */}
      <div className="relative min-h-[300px]">
        {loading ? (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <Loader2 className="h-12 w-12 animate-spin text-pink-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">Loading scholarships...</p>
            </div>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-xl text-center">
            {error}
          </div>
        ) : selectedLevel ? (
          <>
            <h2 className="text-2xl font-semibold mb-6 flex items-center justify-center">
              <Sparkles className="h-6 w-6 mr-2 text-pink-500" />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                Scholarships for {selectedLevel}
              </span>
            </h2>

            {scholarships.length === 0 ? (
              <div className="text-center py-8 bg-gray-200 dark:bg-zinc-800/50 rounded-xl">
                <GraduationCap className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-300">No scholarships available for this level.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {scholarships.map((scholarship, index) => (
                  <Card3D key={index} className="w-full">
                    <Card
                      className={`border-none bg-gray-100 dark:bg-zinc-800/80 backdrop-blur-sm shadow-xl animate-slideInBottom delay-${
                        index * 100
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {scholarship["Scholarship Name"]}
                          </h3>
                          <div className="p-2 rounded-full bg-pink-500/20">
                            <GraduationCap className="h-5 w-5 text-pink-500" />
                          </div>
                        </div>

                        {scholarship.Description && (
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{scholarship.Description}</p>
                        )}

                        <div className="flex flex-wrap gap-4 mb-4">
                          {scholarship.Amount && (
                            <div className="bg-gray-200 dark:bg-zinc-700/50 px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-200">
                              Amount: {scholarship.Amount}
                            </div>
                          )}
                          {scholarship.Deadline && (
                            <div className="bg-gray-200 dark:bg-zinc-700/50 px-3 py-1 rounded-full text-sm text-gray-900 dark:text-gray-200">
                              Deadline: {scholarship.Deadline}
                            </div>
                          )}
                        </div>

                        <ParticleButton
                          asChild
                          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-full shadow-lg shadow-pink-500/20 hover-scale ripple"
                          particleColor="#ff66c4"
                        >
                          <a href={scholarship.Link} target="_blank" rel="noopener noreferrer">
                            Apply Now <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </ParticleButton>
                      </CardContent>
                    </Card>
                  </Card3D>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-gray-200 dark:bg-zinc-800/50 rounded-xl">
            <GraduationCap className="h-16 w-16 text-pink-500 mx-auto mb-4 animate-float" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
              Select an Education Level
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              Choose your education level from the options above to discover available scholarships.
            </p>
          </div>
        )}
      </div>
    </div>
  </div>
</main>)
}
