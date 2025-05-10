import pandas as pd

# Main features of the application:
features = {
    "Career Guidance": {
        "technology": "Google Gemini AI",
        "endpoint": "/get-career-advice",
        "description": "Provides career suggestions based on user interests with salary in INR"
    },
    "Mentorship Program": {
        "technology": "TF-IDF & Cosine Similarity",
        "endpoints": ["/get_unique_skills", "/get_recommendations"],
        "description": "Recommends mentorship programs based on selected skills"
    },
    "Legal Quiz": {
        "endpoints": ["/welcome", "/main", "/get-questions", "/submit-quiz", "/result"],
        "description": "Interactive quiz on legal topics (possibly female foeticide laws)"
    },
    "Legal Chatbot": {
        "technology": "Google Gemini AI",
        "endpoint": "/chat",
        "description": "Provides legal expertise on female foeticide laws in India"
    },
    "Pay Parity Tool": {
        "endpoint": "/get_salary",
        "description": "Compares user's salary with average for similar job/location"
    }
}

# Print application structure
print("Women's Empowerment Platform - Backend Analysis")
print("=" * 50)
for feature, details in features.items():
    print(f"\n## {feature}")
    for key, value in details.items():
        print(f"- {key}: {value}")

# Data sources
data_files = [
    "mentorship.csv - Contains mentorship program data with skills",
    "questions.csv - Contains quiz questions and answers",
    "salary1.csv & salary2.csv - Contains salary data for pay parity analysis"
]

print("\n## Data Sources")
for file in data_files:
    print(f"- {file}")

# Environment variables
env_vars = [
    "GOOGLE_API_KEY - Required for Gemini AI integration"
]

print("\n## Required Environment Variables")
for var in env_vars:
    print(f"- {var}")
