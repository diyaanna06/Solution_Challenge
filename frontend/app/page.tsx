"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  BookOpen,
  BriefcaseBusiness,
  Handshake,
  MessageSquare,
  Scale,
  Heart,
  Users,
  Award,
  Sparkles,
  Quote,
  Wand2,
} from "lucide-react"
import "./animations.css"
import AnimatedBackground from "@/components/animated-background"
import ParticleButton from "@/components/particle-button"
import Card3D from "@/components/card-3d"

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)
  const [quoteIndex, setQuoteIndex] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const quoteIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate quotes every 8 seconds
    quoteIntervalRef.current = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % quotes.length)
    }, 8000)

    // Track mouse position for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Create scroll animation observer
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fadeIn")
          }
        })
      },
      { threshold: 0.1 },
    )

    // Observe all sections
    document.querySelectorAll("section").forEach((section) => {
      observer.observe(section)
    })

    return () => {
      if (quoteIntervalRef.current) {
        clearInterval(quoteIntervalRef.current)
      }
      window.removeEventListener("mousemove", handleMouseMove)
      observer.disconnect()
    }
  }, [])

  // Parallax effect for hero section
  useEffect(() => {
    if (!heroRef.current) return

    const handleParallax = () => {
      const elements = heroRef.current?.querySelectorAll(".parallax")
      if (!elements) return

      elements.forEach((el) => {
        const speed = Number.parseFloat(el.getAttribute("data-speed") || "0.05")
        const x = (window.innerWidth / 2 - mousePosition.x) * speed
        const y = (window.innerHeight / 2 - mousePosition.y) * speed
        ;(el as HTMLElement).style.transform = `translateX(${x}px) translateY(${y}px)`
      })
    }

    window.addEventListener("mousemove", handleParallax)

    return () => {
      window.removeEventListener("mousemove", handleParallax)
    }
  }, [mousePosition])

  const features = [
    {
      title: "Career Guidance",
      description: "Get AI-powered career suggestions based on your interests",
      icon: <BriefcaseBusiness className="h-6 w-6 text-pink-600" />,
      link: "/career-guidance",
      color: "from-pink-500 to-purple-600",
    },
    {
      title: "Mentorship Programs",
      description: "Find mentorship programs that match your skills and goals",
      icon: <Handshake className="h-6 w-6 text-teal-600" />,
      link: "/mentorship",
      color: "from-teal-500 to-emerald-600",
    },
    {
      title: "Menstrual Myth Buster Quiz",
      description: "Take this quiz to bust the myths and taboos related to menstruation",
      icon: <BookOpen className="h-6 w-6 text-orange-600" />,
      link: "/quiz",
      color: "from-orange-500 to-amber-600",
    },

  {
    title: "Scholarship Finder", // New Card
    description: "Discover scholarships tailored to your needs and aspirations",
    icon: <Award className="h-6 w-6 text-yellow-600" />,
    link: "/scholarships",
    color: "from-yellow-500 to-orange-600",
  },

    {
      title: "Legal Chatbot",
      description: "Get expert advice on female foeticide laws in India",
      icon: <MessageSquare className="h-6 w-6 text-blue-600" />,
      link: "/chatbot",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Pay Parity Tool",
      description: "Compare your salary with industry averages to ensure fair pay",
      icon: <Scale className="h-6 w-6 text-violet-600" />,
      link: "/pay-parity",
      color: "from-violet-500 to-purple-600",
    },
  ]

 const testimonials = [
  {
    name: "Aisha Verma",
    role: "Software Engineer at Google",
    quote: "This platform gave me the mentorship and confidence to crack top tech interviews.",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Priya Sharma",
    role: "Product Manager at Microsoft",
    quote: "A life-changing experience! I found clarity and amazing mentors here.",
    image: "https://randomuser.me/api/portraits/women/44.jpg"
  },
  {
    name: "Nandita Rao",
    role: "Data Scientist at Meta",
    quote: "I learned so much and connected with inspiring women from all over the world.",
    image: "https://randomuser.me/api/portraits/women/12.jpg"
  }
];


  const quotes = [
    {
      text: "We need to reshape our own perception of how we view ourselves. We have to step up as women and take the lead.",
      author: "Beyoncé",
      role: "Artist & Entrepreneur",
    },
    {
      text: "I raise up my voice—not so that I can shout, but so that those without a voice can be heard.",
      author: "Malala Yousafzai",
      role: "Nobel Peace Prize Laureate",
    },
    {
      text: "We cannot all succeed when half of us are held back.",
      author: "Malala Yousafzai",
      role: "Nobel Peace Prize Laureate",
    },
    {
      text: "A woman with a voice is, by definition, a strong woman.",
      author: "Melinda Gates",
      role: "Philanthropist",
    },
    {
      text: "Women belong in all places where decisions are being made.",
      author: "Ruth Bader Ginsburg",
      role: "Former Supreme Court Justice",
    },
    {
      text: "There's something so special about a woman who dominates in a man's world. It takes a certain grace, strength, intelligence, fearlessness, and the nerve to never take no for an answer.",
      author: "Rihanna",
      role: "Artist & Entrepreneur",
    },
    {
      text: "I've learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.",
      author: "Maya Angelou",
      role: "Poet & Civil Rights Activist",
    },
    {
      text: "The question isn't who's going to let me; it's who's going to stop me.",
      author: "Ayn Rand",
      role: "Writer & Philosopher",
    },
  ]

  const stats = [
    { value: "78%", label: "Women report increased confidence", icon: <Heart className="h-6 w-6 text-pink-600" /> },
    { value: "10K+", label: "Women in our community", icon: <Users className="h-6 w-6 text-teal-600" /> },
    { value: "92%", label: "Success rate in career advancement", icon: <Award className="h-6 w-6 text-orange-600" /> },
  ]

  // Function to create sparkle effect
  const createSparkle = (e: React.MouseEvent<HTMLDivElement>) => {
    const sparkleContainer = e.currentTarget
    const rect = sparkleContainer.getBoundingClientRect()

    const sparkle = document.createElement("div")
    sparkle.className = "absolute pointer-events-none"
    sparkle.style.left = `${e.clientX - rect.left}px`
    sparkle.style.top = `${e.clientY - rect.top}px`

    const size = Math.random() * 20 + 10
    sparkle.style.width = `${size}px`
    sparkle.style.height = `${size}px`

    // Create SVG sparkle
    sparkle.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
        <path d="M12 2L15 9H22L16 14L18 21L12 17L6 21L8 14L2 9H9L12 2Z" fill="#FFD700" />
      </svg>
    `

    // Animate and remove
    sparkle.animate(
      [
        { transform: "scale(0) rotate(0deg)", opacity: 1 },
        { transform: "scale(1) rotate(180deg)", opacity: 0 },
      ],
      {
        duration: 700,
        easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },
    )

    sparkleContainer.appendChild(sparkle)
    setTimeout(() => sparkle.remove(), 700)
  }

  return (
    <div className="container mx-auto px-4 py-12 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />

      {/* Hero Section with Animation */}
      <section ref={heroRef} className="relative mb-24">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-950/20 dark:to-purple-950/20 rounded-3xl -z-10"></div>

        {/* Animated circles with women images */}
        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-16 px-6 md:px-10 rounded-3xl">
          <div className="flex flex-col justify-center">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                For Women, By Women
              </span>
            </div>
            <div className="relative">
              <h1 className="text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500 leading-tight">
                EMPOWER
              </h1>
              <div className="absolute -right-4 -top-4">
                <Sparkles className="h-8 w-8 text-yellow-400" />
              </div>
            </div>
            <p className="text-xl md:text-2xl mt-6 text-gray-600 dark:text-gray-300">
              Tools, guidance, and a supportive community crafted to uplift and inspire women across India.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ParticleButton
                asChild
                size="lg"
                className="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 rounded-full shadow-lg shadow-pink-500/20 hover-scale ripple"
                particleColor="#ff66c4"
              >
                <Link href="/career-guidance">Explore Careers</Link>
              </ParticleButton>
              <ParticleButton
                asChild
                variant="outline"
                size="lg"
                className="rounded-full border-pink-300 dark:border-pink-700 shadow-lg hover:shadow-pink-500/10 hover-lift ripple"
                particleColor="#b14aed"
              >
                <Link href="/about">Join Our Community</Link>
              </ParticleButton>
            </div>
          </div>

          {/* Image Slideshow */}
          <div className="relative hidden md:block h-[400px] w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-2xl z-10"></div>
            <div className="relative w-full h-full overflow-hidden rounded-2xl">
              <div className="slideshow-item">
                <Image
                  src="https://i.pinimg.com/1200x/e1/61/3b/e1613bb93c728cb964ddb1efc642c690.jpg"
                  alt="Empowered woman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>



               <div className="slideshow-item">
                <Image
                  src="https://i.pinimg.com/1200x/49/4f/87/494f87e22e2b75d26383bfbe4ecf8ea9.jpg"
                  alt="Empowered woman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
             
              <div className="slideshow-item">
                <Image
                  src="https://i.pinimg.com/1200x/18/af/e5/18afe5e1071cabb7009a6d38b3c3e8e5.jpg"
                  alt="Empowered woman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="slideshow-item">
                <Image
                  src="https://i.pinimg.com/1200x/0e/f4/d7/0ef4d7e9241eb579b26e1eb4f2a09f01.jpg"
                  alt="Empowered woman"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>


  {/* Services Section with Animation */}
      <section className="mb-24 animate-fadeIn">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 relative inline-block">
            Our Services
            <div
              className="h-1 bg-gradient-to-r from-pink-500 to-purple-600 absolute bottom-0 left-0 w-0 animate-shimmer"
              style={{ width: "100%" }}
            ></div>
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Tailored resources designed to support women at every stage of their personal and professional journey.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card3D key={index} className="h-full">
              <div className={`group animate-slideInBottom delay-${index * 100}`}>
                <Card className="h-full border-none bg-white dark:bg-zinc-900 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-xl`}
                  ></div>
                  <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/10 dark:to-purple-900/10 opacity-30"></div>

                  <CardHeader>
                    <div className="flex items-center space-x-4 relative z-10">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-br ${feature.color} bg-opacity-10 dark:bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}
                      >
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-xl">{feature.title}</CardTitle>
                        <CardDescription className="text-gray-600 dark:text-gray-400">
                          {feature.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="justify-end relative z-10">
                    <Link href={feature.link}>
                      <Button
                        variant="link"
                        className={`bg-gradient-to-r ${feature.color} bg-clip-text text-transparent group-hover:translate-x-1 transition-transform duration-300`}
                      >
                        Explore{" "}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              </div>
            </Card3D>
          ))}
        </div>
      </section>



      {/* Inspirational Quote Section */}
      <section className="mb-20 relative overflow-hidden animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/10 dark:to-pink-950/10 rounded-3xl -z-10"></div>
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300 dark:bg-pink-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.05"
        ></div>
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-300 dark:bg-purple-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.03"
        ></div>

        <div className="py-16 px-6 md:px-10 rounded-3xl">
          <div className="flex justify-center mb-8 animate-pulse">
            <Quote className="h-16 w-16 text-pink-500/20 animate-float" />
          </div>

          <div className="relative h-[180px]">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === quoteIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                <blockquote className="text-center">
                  <p className="text-2xl md:text-3xl font-medium text-gray-700 dark:text-gray-200 mb-6 max-w-4xl mx-auto">
                    "{quote.text}"
                  </p>
                  <footer className="text-lg">
                    <span className="font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                      {quote.author}
                    </span>
                    <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">{quote.role}</span>
                  </footer>
                </blockquote>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setQuoteIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === quoteIndex
                    ? "w-6 bg-gradient-to-r from-pink-500 to-purple-600"
                    : "bg-gray-300 dark:bg-gray-700"
                }`}
                aria-label={`View quote ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>







      {/* Stats Section */}
      <section className="mb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card3D key={index} className="w-full">
              <div
                className="bg-white dark:bg-zinc-900 rounded-xl p-6 shadow-xl border border-pink-100 dark:border-pink-900/20 flex items-center space-x-4 relative overflow-hidden hover-lift"
                onMouseMove={createSparkle}
              >
                <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/10 dark:to-purple-900/10 opacity-50"></div>
                <div className="p-3 rounded-full bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 z-10">
                  {stat.icon}
                </div>
                <div className="z-10">
                  <p className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                    {stat.value}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
            </Card3D>
          ))}
        </div>
      </section>

    

      {/* Testimonials Section */}
      <section className="mb-24 relative animate-fadeIn">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/10 dark:to-purple-950/10 rounded-3xl -z-10"></div>
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-teal-300 dark:bg-teal-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.04"
        ></div>
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-300 dark:bg-orange-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.02"
        ></div>

        <div className="py-16 px-6 md:px-10 rounded-3xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 relative inline-block">
              Success Stories
              <div className="h-1 bg-gradient-to-r from-teal-500 to-emerald-600 w-full absolute bottom-0 left-0"></div>
            </h2>
            <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Hear from women who have transformed their lives through our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card3D key={index} className="h-full">
                <div className={`hover-lift animate-slideInBottom delay-${index * 200}`}>
                  <Card className="h-full border-none bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-pink-200 dark:border-pink-800 shadow-md">
                         <Image
  src={testimonial.image}
  alt={testimonial.name}
  fill
  className="object-cover"
/>

                        </div>
                        <div>
                          <CardTitle className="text-lg bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
                            {testimonial.name}
                          </CardTitle>
                          <CardDescription>{testimonial.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardFooter className="pt-2 flex flex-col items-start">
                      <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.quote}"</p>
                    </CardFooter>
                  </Card>
                </div>
              </Card3D>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mb-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950/10 dark:to-purple-950/10 rounded-3xl -z-10"></div>
        <div
          className="absolute -top-10 -right-10 w-40 h-40 bg-orange-300 dark:bg-orange-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.03"
        ></div>
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-300 dark:bg-teal-800 rounded-full opacity-10 blur-2xl parallax"
          data-speed="0.05"
        ></div>

        <div className="max-w-3xl mx-auto py-16" onMouseMove={createSparkle}>
          <div className="mb-6">
            <Wand2 className="h-12 w-12 text-yellow-400 mx-auto" />
          </div>
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500 text-transparent bg-clip-text">
            Join Our Sisterhood
          </h2>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 dark:text-gray-300 mb-8">
            Connect with like-minded women, share experiences, and grow together in a safe, uplifting space designed for
            women, by women.
          </p>
          <div className="inline-block">
            <ParticleButton
              asChild
              size="lg"
              className="bg-gradient-to-r from-pink-500 via-purple-600 to-teal-500 hover:from-pink-600 hover:via-purple-700 hover:to-teal-600 rounded-full px-8 shadow-lg shadow-pink-500/20 hover-scale ripple"
              particleColor="#ff66c4"
            >
              <Link href="/community">Join Our Community</Link>
            </ParticleButton>
          </div>

  {/* New Join Button */}
    <div className="mt-6">
      <Link href={"/about"}>
      <Button
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-teal-500 hover:from-purple-700 hover:to-teal-600 text-white px-6 py-3 rounded-full shadow-lg shadow-purple-500/20"
      >
        Join
      </Button>
      </Link>
    </div>

        </div>
      </section>
    </div>
  )
}
