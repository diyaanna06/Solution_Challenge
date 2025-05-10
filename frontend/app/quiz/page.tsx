"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getQuizQuestions, submitQuiz } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
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

export default function QuizPage() {
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
  } | null>(null)

  const handleStartQuiz = () => {
    setStep("setup")
  }

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
      [`q${questionIndex}`]: answer,
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
      setQuizResult(result)
      setStep("result")
    } catch (err) {
      setError("Failed to submit quiz. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const renderWelcome = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Legal Knowledge Quiz</CardTitle>
        <CardDescription className="text-center">
          Test your knowledge about women's legal rights and protections in India
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="mb-6">
          This quiz will test your understanding of laws related to women's rights, with a focus on female foeticide
          laws in India.
        </p>
        <p className="mb-6">
          You'll be presented with multiple-choice questions. Select the best answer for each question.
        </p>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleStartQuiz} className="bg-pink-500 hover:bg-pink-600">
          Start Quiz
        </Button>
      </CardFooter>
    </Card>
  )

  const renderSetup = () => (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Quiz Setup</CardTitle>
        <CardDescription className="text-center">Choose the number of questions for your quiz</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="num-questions">Number of Questions</Label>
            <Input
              id="num-questions"
              type="number"
              min="1"
              max="10"
              value={numQuestions}
              onChange={(e) => setNumQuestions(Number.parseInt(e.target.value) || 5)}
              className="mt-1"
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button onClick={handleSetupQuiz} disabled={loading} className="bg-pink-500 hover:bg-pink-600">
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
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Legal Knowledge Quiz</h1>

      {error && (
        <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 p-4 rounded-md mb-6">{error}</div>
      )}

      <div className="space-y-8">
        {questions.map((question, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-xl">
                Question {index + 1}: {question.Question}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup
                value={answers[`q${index}`] || ""}
                onValueChange={(value) => handleAnswerChange(index, value)}
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="A" id={`q${index}-A`} />
                    <Label htmlFor={`q${index}-A`}>{question["Option A"]}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="B" id={`q${index}-B`} />
                    <Label htmlFor={`q${index}-B`}>{question["Option B"]}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="C" id={`q${index}-C`} />
                    <Label htmlFor={`q${index}-C`}>{question["Option C"]}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="D" id={`q${index}-D`} />
                    <Label htmlFor={`q${index}-D`}>{question["Option D"]}</Label>
                  </div>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Button
          onClick={handleSubmitQuiz}
          disabled={loading || Object.keys(answers).length !== questions.length}
          className="bg-pink-500 hover:bg-pink-600"
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

    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Quiz Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-8">
            <div className="text-5xl font-bold mb-2">
              {quizResult.score} / {quizResult.total}
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {quizResult.score === quizResult.total
                ? "Perfect score! Excellent knowledge!"
                : quizResult.score >= quizResult.total * 0.7
                  ? "Great job! You have good knowledge of women's legal rights."
                  : "Keep learning about women's legal rights and protections."}
            </p>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Question Review</h3>
            {quizResult.questions.map((question, index) => (
              <div key={index} className="border rounded-lg p-4">
                <p className="font-medium mb-2">
                  Question {index + 1}: {question}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your Answer</p>
                    <p
                      className={`font-medium ${quizResult.user_answers[index] === quizResult.correct_answers[index] ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
                    >
                      {quizResult.user_answers[index]}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Correct Answer</p>
                    <p className="font-medium text-green-600 dark:text-green-400">
                      {quizResult.correct_answers[index]}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={() => {
              setStep("welcome")
              setAnswers({})
              setQuizResult(null)
            }}
            className="bg-pink-500 hover:bg-pink-600"
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
