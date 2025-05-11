"use client"

import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  className?: string
  speed?: number
  delay?: number
}

export default function TypingText({ text, className = "", speed = 100, delay = 0 }: TypingTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    let timeout: NodeJS.Timeout
    let currentIndex = 0
    
    // Delay before starting typing
    timeout = setTimeout(() => {
      setIsTyping(true)
      
      const intervalId = setInterval(() => {
        if (currentIndex < text.length) {
          setDisplayText(text.substring(0, currentIndex + 1))
          currentIndex++
        } else {
          clearInterval(intervalId)
          setIsTyping(false)
        }
      }, speed)
      
      return () => clearInterval(intervalId)
    }, delay)
    
    return () => clearTimeout(timeout)
  }, [text, speed, delay])

  return (
    <span className={`${isTyping ? "typing-effect" : ""} ${className}`}>
      {displayText}
    </span>
  )
}
