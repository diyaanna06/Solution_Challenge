// Base URL for the Flask backend
const API_BASE_URL = "https://solution-backend-43qy.onrender.com"

// Career Guidance API
export async function getCareerAdvice(interests: string) {
  const response = await fetch(`${API_BASE_URL}/get-career-advice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ interests }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch career advice")
  }

  return response.json()
}

// Mentorship Program APIs
export async function getUniqueSkills() {
  const response = await fetch(`${API_BASE_URL}/get_unique_skills`)

  if (!response.ok) {
    throw new Error("Failed to fetch skills")
  }

  return response.json()
}

export async function getMentorshipRecommendations(skills: string[]) {
  const response = await fetch(`${API_BASE_URL}/get_recommendations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ skills }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch mentorship recommendations")
  }

  return response.json()
}

// Quiz APIs
export const getQuizQuestions = async (numQuestions: number) => {
  const apiUrl = `${API_BASE_URL}/get-questions?num=${numQuestions}`;
  console.log(`Fetching questions from: ${apiUrl}`);

  const response = await fetch(apiUrl, {
    method: "GET",
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("API Error Response:", errorText);
    throw new Error("Failed to fetch quiz questions");
  }

  return response.json();
};

export async function getQuizResult(answers: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/get-quiz-result`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  })

  if (!response.ok) {
    throw new Error("Failed to fetch quiz result")
  }

  return response.json()
}



export async function submitQuiz(answers: Record<string, string>) {
  const response = await fetch(`${API_BASE_URL}/submit-quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ answers }),
  })

  if (!response.ok) {
    throw new Error("Failed to submit quiz")
  }

  return response.json()
}

// Chatbot API
export async function sendChatMessage(message: string) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  })

  if (!response.ok) {
    throw new Error("Failed to send message")
  }

  return response.json()
}

// Pay Parity API
export async function getSalaryComparison(data: {
  job: string
  education_level: number
  experience: number
  user_salary: number
}) {
  const response = await fetch(`${API_BASE_URL}/get_salary`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to get salary comparison")
  }

  return response.json()
}
