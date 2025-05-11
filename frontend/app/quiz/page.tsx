"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getQuizQuestions, submitQuiz } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import ParticleButton from "@/components/particle-button"
import AnimatedBackground from "@/components/animated-background"
import "@/app/animations.css"

interface Question {
  ID: number
  Question: string
  "Option A": string
  "Option B": string
  "Option C": string
  "Option D": string
  "Correct Answer": string
}

const getAnswerText = (question: Question, optionLetter: string): string => {
  const value = question[`Option ${optionLetter}` as keyof Question];
  return typeof value === "string" ? value : String(value ?? optionLetter);
}

function calculateScore(quizResult: any) {
  let score = 0;
  quizResult.user_answers.forEach((answer: string, index: number) => {
    const question = quizResult.original_questions[index];
    if (
      getAnswerText(question, answer) ===
      getAnswerText(question, quizResult.correct_answers[index])
    ) {
      score++;
    }
  });
  return score;
}

export default function QuizPage() {
  const router = useRouter()
  const [step, setStep] = useState<"welcome" | "setup" | "quiz" | "result">("welcome")
  const [numQuestions, setNumQuestions] = useState(5)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [quizResult, setQuizResult] = useState<any>(null)

  const handleStartQuiz = () => setStep("setup")

  const handleSetupQuiz = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getQuizQuestions(numQuestions)
      setQuestions(data)
      setStep("quiz")
    } catch {
      setError("Failed to load quiz questions. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (index: number, value: string) => {
    setAnswers((prev) => ({ ...prev, [`q${index}`]: value }))
  }

  const handleSubmitQuiz = async () => {
    if (Object.keys(answers).length !== questions.length) {
      setError("Please answer all questions before submitting.")
      return
    }
    setLoading(true)
    setError("")
    try {
      const result = await submitQuiz(answers)
      setQuizResult({ ...result, original_questions: questions })
      setStep("result")
    } catch {
      setError("Failed to submit quiz. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const wrapperClass =
    "relative px-4 py-16 max-w-4xl mx-auto animate-fadeIn"
  const cardClass =
    "rounded-3xl border border-pink-200 dark:border-pink-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-lg shadow-xl"

  return (
    <div className="relative min-h-screen overflow-hidden">
      <AnimatedBackground />
      <div className={wrapperClass}>
        {step === "welcome" && (
          <Card className={`${cardClass} text-center animate-slideInBottom`}>
            <CardHeader>
              <CardTitle className="text-3xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Menstrual Health Awareness Quiz
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Bust the myths, embrace the truth.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>Menstruation is natural, yet shrouded in stigma. Let’s break that together.</p>
              <p>This quiz is your first step toward becoming a menstrual health advocate.</p>
              <p>Answer a few engaging questions and discover the facts that matter.</p>
            </CardContent>
            <CardFooter className="justify-center">
              <ParticleButton onClick={handleStartQuiz} className="px-6 py-2 rounded-full">
                Begin
              </ParticleButton>
            </CardFooter>
          </Card>
        )}

        {step === "setup" && (
          <Card className={`${cardClass} text-center animate-slideInBottom`}>
            <CardHeader>
              <CardTitle className="text-2xl bg-gradient-to-r from-teal-500 to-purple-600 bg-clip-text text-transparent">
                Set Your Quiz Preferences
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                Choose how many questions you'd like to answer.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Each question helps unravel common myths. Even 5 questions can make a difference!
              </p>
              <Input
                type="number"
                min="1"
                max="20"
                value={numQuestions}
                onChange={(e) => setNumQuestions(Number(e.target.value))}
              />
            </CardContent>
            <CardFooter className="justify-center">
              <ParticleButton onClick={handleSetupQuiz} disabled={loading}>
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Loading...</>
                ) : (
                  "Start Quiz"
                )}
              </ParticleButton>
            </CardFooter>
          </Card>
        )}

        {step === "quiz" && (
          <div className="space-y-8 animate-slideInBottom">
            <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Quiz Questions
            </h2>
            {error && <p className="text-red-500 text-center">{error}</p>}
            {questions.map((q, idx) => (
              <Card key={idx} className={cardClass}>
                <CardHeader>
                  <CardTitle className="text-lg">{`Q${idx + 1}: ${q.Question}`}</CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[`q${idx}`] || ""}
                    onValueChange={(val) => handleAnswerChange(idx, val)}
                  >
                    {['A', 'B', 'C', 'D'].map((opt) => (
                      <div key={opt} className="flex items-center space-x-2 mb-2">
                        <RadioGroupItem value={opt} id={`q${idx}-${opt}`} />
                        <Label htmlFor={`q${idx}-${opt}`}>{getAnswerText(q, opt)}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>
            ))}
            <div className="text-center">
              <ParticleButton
                onClick={handleSubmitQuiz}
                disabled={loading || Object.keys(answers).length !== questions.length}
              >
                {loading ? <Loader2 className="animate-spin" /> : "Submit Quiz"}
              </ParticleButton>
            </div>
          </div>
        )}

        {step === "result" && quizResult && (
          <Card className={`${cardClass} animate-fadeIn`}>
            <CardHeader className="text-center">
              <CardTitle className="text-3xl bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Your Results
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                See how well you did and share the knowledge!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-5xl font-bold text-pink-600">
                  {calculateScore(quizResult)} / {quizResult.total}
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                  {calculateScore(quizResult) === quizResult.total
                    ? "Perfect! You're a myth-busting queen."
                    : calculateScore(quizResult) >= quizResult.total * 0.7
                      ? "Great job! You're well informed."
                      : "Keep learning and continue the journey."}
                </p>
              </div>
              <div className="space-y-4">
                {quizResult.questions.map((text: string, i: number) => {
                  const q = quizResult.original_questions.find((q: Question) => q.Question === text)
                  return (
                    <div key={i} className="p-4 border rounded-lg bg-white dark:bg-zinc-800">
                      <p className="font-medium mb-2">Q{i + 1}: {text}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Your Answer: </span>
                          {getAnswerText(q, quizResult.user_answers[i])}
                        </div>
                        <div>
                          <span className="text-muted-foreground">Correct Answer: </span>
                          {getAnswerText(q, quizResult.correct_answers[i])}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
            <CardFooter className="justify-center">
              <ParticleButton
                onClick={() => {
                  setStep("welcome")
                  setAnswers({})
                  setQuizResult(null)
                }}
              >
                Retake Quiz
              </ParticleButton>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
