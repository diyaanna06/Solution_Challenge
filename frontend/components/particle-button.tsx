"use client"

import { useState, useRef, ReactNode } from "react"
import { Button, ButtonProps } from "@/components/ui/button"

interface ParticleButtonProps extends ButtonProps {
  children: ReactNode
  particleColor?: string
}

export default function ParticleButton({
  children,
  particleColor = "#ff66c4",
  ...props
}: ParticleButtonProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; color: string }>>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  const nextId = useRef(0)

  const handleClick = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    // Get button position
    const rect = buttonRef.current.getBoundingClientRect()
    
    // Create particles
    const newParticles: Array<{ id: number; x: number; y: number; size: number; color: string }> = []
    for (let i = 0; i < 15; i++) {
      const size = Math.random() * 8 + 2
      newParticles.push({
        id: nextId.current++,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        size,
        color: particleColor
      })
    }
    
    setParticles(prev => [...prev, ...newParticles])
    
    // Remove particles after animation
    setTimeout(() => {
      setParticles(prev => prev.filter(p => !newParticles.some(np => np.id === p.id)))
    }, 3000)
  }

  return (
    <Button 
      ref={buttonRef} 
      onClick={handleClick} 
      className="relative overflow-hidden"
      {...props}
    >
      {particles.map(particle => (
        <span
          key={particle.id}
          className="particle"
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            transform: `translate(${(Math.random() - 0.5) * 100}px, ${(Math.random() - 0.5) * 100}px)`,
          }}
        />
      ))}
      {children}
    </Button>
  )
}
