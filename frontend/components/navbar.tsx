"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./mode-toggle"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const routes = [
    { name: "Home", path: "/" },
    { name: "Career Guidance", path: "/career-guidance" },
    { name: "Mentorship", path: "/mentorship" },
    { name: "Quiz", path: "/quiz" },
    { name: "Chatbot", path: "/chatbot" },
    { name: "Pay Parity", path: "/pay-parity" },
    { name: "Statistics", path: "/statistics" },
    { name: "About", path: "/about" },
  ]

  return (
    <nav className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-transparent bg-clip-text">
              WomenEmpowerment
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? "default" : "ghost"}
                asChild
                className={pathname === route.path ? "bg-pink-500 hover:bg-pink-600" : ""}
              >
                <Link href={route.path}>{route.name}</Link>
              </Button>
            ))}
            <ModeToggle />
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden">
            <ModeToggle />
            <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)} className="ml-2">
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 space-y-1">
            {routes.map((route) => (
              <Button
                key={route.path}
                variant={pathname === route.path ? "default" : "ghost"}
                asChild
                className={`w-full justify-start ${pathname === route.path ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <Link href={route.path}>{route.name}</Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
