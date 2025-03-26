from flask import Flask,render_template, request, jsonify
from flask_cors import CORS
import pandas as pd
import random
import traceback
import os
import json
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# ========================== GEMINI API FOR CAREER GUIDANCE ==========================

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")
@app.route('/recom')
def recom():
    return render_template('recom.html')

@app.route("/get-career-advice", methods=["POST"])
def career_advice():
    """Fetch career advice based on user interests using Gemini API."""
    try:
        data = request.get_json()
        if not data or "interests" not in data:
            return jsonify({"error": "Missing interests field"}), 400

        prompt = f"""
        Provide 3 career suggestions for someone interested in: {data['interests']} in Indian rupees.
        Return the response in strict JSON format with:
        - name (string)
        - summary (string)
        - salary (string)
        - skills (array)
        - ai_risk (string)
        - growth (string)
        Example:
        {{
            "careers": [
                {{
                    "name": "Data Scientist",
                    "summary": "Analyzes complex data",
                    "salary": "₹90K - ₹140K per month",
                    "skills": ["Python", "Machine Learning", "Statistics"],
                    "ai_risk": "Medium",
                    "growth": "High"
                }}
            ]
        }}
        """

        response = model.generate_content(
            prompt,
            generation_config={
                "response_mime_type": "application/json",
                "temperature": 0.3
            }
        )

        response_text = response.text.strip()
        if response_text.startswith("```json"):
            response_text = response_text[7:-3].strip()

        response_data = json.loads(response_text)

        if "careers" not in response_data:
            raise ValueError("Invalid response format from Gemini")

        return jsonify(response_data)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ========================== MENTORSHIP PROGRAM RECOMMENDATIONS ==========================

# Load mentorship data
file_path = "mentorship.csv"
programs_df = pd.read_csv(file_path)

# Extract unique skills
all_skills = set()
for skills in programs_df["Skills"].dropna():
    cleaned_skills = [skill.strip().title() for skill in skills.split(",")]
    all_skills.update(cleaned_skills)
all_skills = sorted(all_skills)

@app.route("/get_unique_skills", methods=["GET"])
def get_unique_skills():
    """Fetch all unique skills available in the mentorship dataset."""
    return jsonify(all_skills)

@app.route("/get_recommendations", methods=["POST"])
def get_recommendations():
    """Fetch top mentorship program recommendations based on user-selected skills."""
    selected_skills = request.json.get("skills", [])

    if not selected_skills:
        return jsonify({"error": "No skills selected"}), 400

    user_skills_str = ", ".join(selected_skills)
    user_df = pd.DataFrame({"Program Name": ["User Skills"], "Skills": [user_skills_str]})

    temp_df = programs_df.copy()
    combined_df = pd.concat([temp_df, user_df], ignore_index=True)

    # Compute TF-IDF vectors
    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(combined_df["Skills"])

    # Compute similarity (comparing last row with all others)
    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    temp_df["Similarity"] = cosine_sim.flatten()

    # Get top 10 programs
    top_programs = temp_df.sort_values(by="Similarity", ascending=False).head(10)
    top_programs = top_programs[["Program Name", "Skills", "Similarity", "Website"]].to_dict(orient="records")

    return jsonify(top_programs)

#flask for quiz
answers_list = [] 
selected_questions=[]
questions=[]
num_questions=0
df = pd.read_csv("questions.csv")
@app.route('/')
def home():
    return render_template('index.html')
@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@app.route('/main')
def main():
    global num_questions
    num_questions = request.args.get('num', type=int)
    return render_template('main.html', num_questions=num_questions)

@app.route('/get-questions', methods=["GET"])
def get_questions():
    global answers_list
    global num_questions
    global questions
    questions=[]
    n=num_questions
    selected_questions = df.sample(n=n).to_dict(orient='records')
    for i in range(n):
        questions.append(selected_questions[i]['Question'])
    answers = {str(q["ID"]): q["Correct Answer"] for q in selected_questions}
    answers_list = list(answers.values())
    return jsonify(selected_questions)

@app.route("/submit-quiz", methods=["POST"])
def submit_quiz():
    try:
        global answers_list
        global questions
        data = request.json
        user_answers = data.get("answers", {})
        user_answers_values = list(user_answers.values())
        total = len(answers_list)
        score=0
        for i in range(total):
            if (user_answers_values[i]==answers_list[i]):
                score+=1
        return jsonify({
            "score": score,
            "total": total,
            "questions": questions,
            "correct_answers": answers_list ,
            "user_answers": [user_answers[f"q{i}"] for i in range(total)],
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/result')
def result():
    final_score = request.args.get("score", type=int)
    total_questions = request.args.get("total", type=int)
    return render_template("result.html", score=final_score, total=total_questions)
# ========================== RUN FLASK APP ==========================

""" quiz flask running
if __name__ == "__main__":
    app.run(debug=True)
      """
if __name__ == "__main__":
    app.run(debug=True, port=5000)
