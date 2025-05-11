"use client"

import Link from "next/link"
import AnimatedBackground from "@/components/animated-background"
import ParticleButton from "@/components/particle-button"
import "@/app/animations.css"

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className="relative z-10 container mx-auto px-4 py-20 max-w-4xl animate-fadeIn">
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg rounded-3xl shadow-xl border border-pink-200 dark:border-pink-800 p-8 md:p-12 space-y-8 text-center">

          <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500">
            About Us
          </h1>

          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            <em>Bridging the Gender Gap – Empowering the Girl Child</em>
          </p>

          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            Educating and empowering women isn't just about equality—it's about progress. Together, we’re building a world where every girl has the opportunity to thrive, break barriers, and rise.
          </p>

          <p className="text-gray-700 dark:text-gray-400 leading-relaxed">
            This platform is a heartfelt initiative by four passionate women committed to change. Across the globe, girls and women face obstacles in education, employment, healthcare, and rights. We're here to be part of the solution—one tool, quiz, and resource at a time.
          </p>

          <div>
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600 mb-2">
              Our Team
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Created with purpose and pride by{" "}
              <strong>Arushi Waddepalli, Diya Anna Varghese, Merin Theres Jose</strong>, and{" "}
              <strong>Sanjana Chennupati</strong>.
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <ParticleButton asChild size="lg" className="rounded-full px-6">
              <Link href="/">← Back to Home</Link>
            </ParticleButton>
          </div>
        </div>
      </div>
    </div>
  )
}




