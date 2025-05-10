"use client"

import type React from "react"
import { useState, useRef } from "react"
import { sendChatMessage } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Loader2, Send } from "lucide-react"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "Hello! I'm a legal expert specializing in Female Foeticide Laws in India. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async (e?: React.FormEvent, prefill?: string) => {
    if (e) e.preventDefault()
    if ((!input.trim() && !prefill) || loading) return

    const userInput = prefill || input
    const userMessage: Message = {
      id: Date.now().toString(),
      text: userInput,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      const response = await sendChatMessage(userInput)

      // Typing animation
      let index = 0
      const typingText = response.response
      let currentText = ""
      const botId = (Date.now() + 1).toString()

      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          text: "",
          sender: "bot",
          timestamp: new Date(),
        },
      ])
      // Scroll to bottom only after setting bot message
      scrollToBottom()

      const interval = setInterval(() => {
        index++
        currentText = typingText.slice(0, index)
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botId ? { ...msg, text: currentText } : msg
          )
        )
        if (index >= typingText.length) {
          clearInterval(interval)
        }
      }, 20)
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I encountered an error. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const faqList = [
    "What is the punishment for female foeticide?",
    "What laws protect unborn girls in India?",
    "What is the PCPNDT Act?",
    "How can I report a case of female foeticide?",
    "Can a woman be punished for female foeticide?",
    "What are the signs of female foeticide in India?",
    "Is sex determination legal in India?",
  ]

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex gap-6">
        {/* Sidebar FAQ */}
        <div className="w-1/3">
          <Card>
            <CardHeader>
              <CardTitle>FAQs</CardTitle>
              <CardDescription>Click a question to get an answer</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {faqList.map((faq, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left"
                  onClick={() => handleSendMessage(undefined, faq)}
                >
                  {faq}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Chatbot */}
        <div className="w-2/3">
          <Card className="h-[450px] flex flex-col">
            <CardHeader>
              <CardTitle>Legal Expert Chatbot</CardTitle>
              <CardDescription>
                Ask questions about female foeticide laws and women's legal rights
                in India
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col overflow-hidden">
              <div className="flex-grow overflow-y-auto mb-4 space-y-4 pr-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div className="flex items-start max-w-[80%] break-words">
                      {message.sender === "bot" && (
                        <Avatar className="mr-2 mt-0.5">
                          <AvatarFallback className="bg-pink-100 text-pink-800">
                            AI
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`rounded-lg px-4 py-2 break-words ${
                          message.sender === "user"
                            ? "bg-pink-500 text-white"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "user"
                              ? "text-pink-100"
                              : "text-gray-500 dark:text-gray-400"
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                      {message.sender === "user" && (
                        <Avatar className="ml-2 mt-0.5">
                          <AvatarFallback className="bg-purple-100 text-purple-800">
                            You
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="flex items-center rounded-lg px-4 py-2 bg-gray-100 dark:bg-gray-800">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      <p>Thinking...</p>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input form */}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  placeholder="Type your question here..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={loading}
                  className="flex-grow"
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={loading || !input.trim()}
                  className="bg-pink-500 hover:bg-pink-600"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}