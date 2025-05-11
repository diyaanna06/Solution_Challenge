"use client"

import { useState } from "react"
import AnimatedBackground from "@/components/animated-background";

import { useRouter } from "next/navigation"
import { getQuizQuestions, submitQuiz } from "@/lib/api"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Loader2 } from "lucide-react"

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
  <AnimatedBackground />
  const router = useRouter()
  const [step, setStep] = useState<"welcome" | "setup" | "quiz" | "result">("welcome")
  const [numQuestions, setNumQuestions] = useState(5)
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [quizResult, setQuizResult] = useState<{
    score: number
    total: number
    questions: string[]
    correct_answers: string[]
    user_answers: string[]
    original_questions?: Question[]
  } | null>(null)

  const handleStartQuiz = () => setStep("setup")

  const handleSetupQuiz = async () => {
    setLoading(true)
    setError("")
    try {
      const data = await getQuizQuestions(numQuestions)
      setQuestions(data)
      setStep("quiz")
    } catch (err) {
      setError("Failed to load quiz questions. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionIndex: number, answer: string) => {
    setAnswers((prev) => ({
      ...prev,
      [`q${questionIndex}`]: answer
    }))
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
    } catch (err) {
      setError("Failed to submit quiz. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const cardStyle = "rounded-2xl shadow-lg border border-pink-200"

  const renderWelcome = () => (
    <Card className={`max-w-2xl mx-auto ${cardStyle}`}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Menstrual Health Awareness Quiz</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Challenge common myths and misconceptions about menstruation
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p>
          This quiz is designed to bust taboos and raise awareness around menstruation and menstrual health.
        </p>
        <p>
          You'll be presented with multiple-choice questions. Select the most accurate answer for each question.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleStartQuiz} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2">
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  )

  const renderSetup = () => (
    <Card className={`max-w-2xl mx-auto ${cardStyle}`}>
      <CardHeader>
        <CardTitle className="text-center text-2xl">Quiz Setup</CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Choose how many questions you want to answer
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="num-questions">Number of Questions</Label>
            <Input
              id="num-questions"
              type="number"
              min="1"
              max="40"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number.parseInt(e.target.value) || 5)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSetupQuiz} disabled={loading} className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading Quiz
            </>
          ) : (
            "Start Quiz"
          )}
        </Button>
      </CardFooter>
    </Card>
  )

  const renderQuiz = () => (
    <div className="max-w-3xl mx-auto space-y-8">
      <h1 className="text-3xl font-bold text-center text-pink-600">Menstrual Health Awareness Quiz</h1>

      {error && (
        <div className="bg-red-100 text-red-800 p-4 rounded-md">{error}</div>
      )}

      {questions.map((question, index) => (
        <Card key={index} className={cardStyle}>
          <CardHeader>
            <CardTitle className="text-xl">Question {index + 1}: {question.Question}</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={answers[`q${index}`] || ""}
              onValueChange={(value) => handleAnswerChange(index, value)}
              className="space-y-3"
            >
              {["A", "B", "C", "D"].map((letter) => (
                <div className="flex items-center space-x-2" key={letter}>
                  <RadioGroupItem value={letter} id={`q${index}-${letter}`} />
                  <Label htmlFor={`q${index}-${letter}`}>{getAnswerText(question, letter)}</Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Button
          onClick={handleSubmitQuiz}
          disabled={loading || Object.keys(answers).length !== questions.length}
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting
            </>
          ) : (
            "Submit Quiz"
          )}
        </Button>
      </div>
    </div>
  )

  const renderResult = () => {
    if (!quizResult) return null
    const score = calculateScore(quizResult)

    return (
      <Card className={`max-w-3xl mx-auto ${cardStyle}`}>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="text-5xl font-bold text-pink-600 mb-2">
              {score} / {quizResult.total}
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {score === quizResult.total
                ? "Excellent! You've got all the answers right!"
                : score >= quizResult.total * 0.7
                  ? "Well done! You're well-informed about menstruation."
                  : "Keep learning and help break the myths around menstruation."}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Question Review</h3>
            {quizResult.questions.map((questionText, index) => {
              const originalQuestion = quizResult.original_questions?.find(q => q.Question === questionText)
              return (
                <div key={index} className="border rounded-lg p-4 bg-gray-50 dark:bg-gray-900">
                  <p className="font-medium mb-2">
                    Question {index + 1}: {questionText}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Answer</p>
                      <p>
                        {originalQuestion
                          ? getAnswerText(originalQuestion, quizResult.user_answers[index])
                          : quizResult.user_answers[index]}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Correct Answer</p>
                      <p>
                        {originalQuestion
                          ? getAnswerText(originalQuestion, quizResult.correct_answers[index])
                          : quizResult.correct_answers[index]}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setStep("welcome")
              setAnswers({})
              setQuizResult(null)
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2"
          >
            Take Another Quiz
          </Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {step === "welcome" && renderWelcome()}
      {step === "setup" && renderSetup()}
      {step === "quiz" && renderQuiz()}
      {step === "result" && renderResult()}
    </div>
  )
}
