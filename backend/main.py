
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import pandas as pd
import random
import traceback
import joblib
import os
import json
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

model1 = joblib.load('models/PayParity.pkl')
all_columns = joblib.load('models/all_columns.pkl')

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# ========================== GEMINI API FOR CAREER GUIDANCE ==========================

# Configure Gemini API
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
model = genai.GenerativeModel("gemini-2.0-flash")


""" @app.route('/recom')
def recom():
    return render_template('education.html') """

@app.route('/')
def home():
    return 'Backend is working!'

@app.route("/get-career-advice", methods=["POST"])
def career_advice():
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
file_path = "data/mentorship.csv"
programs_df = pd.read_csv(file_path)

# Extract unique skills
all_skills = set()
for skills in programs_df["Skills"].dropna():
    cleaned_skills = [skill.strip().title() for skill in skills.split(",")]
    all_skills.update(cleaned_skills)
all_skills = sorted(all_skills)


@app.route("/get_unique_skills", methods=["GET"])
def get_unique_skills():
    return jsonify(all_skills)


@app.route("/get_recommendations", methods=["POST"])
def get_recommendations():
    selected_skills = request.json.get("skills", [])

    if not selected_skills:
        return jsonify({"error": "No skills selected"}), 400

    user_skills_str = ", ".join(selected_skills)
    user_df = pd.DataFrame({"Program Name": ["User Skills"], "Skills": [user_skills_str]})

    temp_df = programs_df.copy()
    combined_df = pd.concat([temp_df, user_df], ignore_index=True)

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(combined_df["Skills"])

    cosine_sim = cosine_similarity(tfidf_matrix[-1], tfidf_matrix[:-1])
    temp_df["Similarity"] = cosine_sim.flatten()

    top_programs = temp_df.sort_values(by="Similarity", ascending=False).head(10)
    top_programs = top_programs[["Program Name", "Skills", "Similarity", "Website"]].to_dict(orient="records")

    return jsonify(top_programs)




    # Endpoint to fetch scholarships
@app.route('/get-scholarships', methods=["GET"])
def get_scholarships():
    try:
        # Load the CSV file
        df = pd.read_csv('data/scholarships_final.csv')

        # Filter by education level if provided
        education_level = request.args.get('level')
        if education_level:
            df = df[df['Minimum Education Qualification'].str.contains(education_level, na=False, case=False)]

        # Convert to a list of dictionaries
        scholarships = df.to_dict(orient='records')

        return jsonify(scholarships)
    except Exception as e:
        print("Error loading scholarships:", str(e))
        return jsonify({"error": "Failed to load scholarships"}), 500


# ========================== QUIZ FUNCTIONALITY ==========================

answers_list = []
selected_questions = []
questions = []
num_questions = 0
df = pd.read_csv("data/questions.csv")


""" @app.route('/')
def home():
    return render_template('home.html')


@app.route("/chat")
def serve_frontend():
    return render_template("chatbot.html")


@app.route('/welcome')
def welcome():
    return render_template('quiz1.html') """


@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    system_prompt = (
        "You are a legal expert specializing in Female Foeticide Laws. "
        "first ask which coutry are you from so that u can provide accurate information. "
        "Provide accurate, legally sound, and fact-based responses. "
        "Cite relevant sections of the PCPNDT Act and Penal Code when necessary. "
        "Ensure responses are in a simple, understandable format."
    )

    response = model.generate_content(f"{system_prompt}\n\nUser: {user_input}\nBot:")

    return jsonify({"response": response.text})


""" @app.route('/main')
def main():
    global num_questions
    num_questions = request.args.get('num', type=int)
    return render_template('quiz2.html', num_questions=num_questions) """


@app.route('/get-questions', methods=["GET"])
def get_questions():
    global answers_list, questions
    try:
        num_questions = request.args.get('num', type=int)
        if not num_questions or num_questions <= 0 or num_questions > len(df):
            return jsonify({"error": "Invalid number of questions requested"}), 400

        selected_questions = df.sample(n=num_questions).to_dict(orient='records')
        answers_list = [q["Correct Answer"] for q in selected_questions]
        questions = [q["Question"] for q in selected_questions]

        return jsonify(selected_questions)

    except Exception as e:
        print("Error fetching questions:", str(e))
        return jsonify({"error": "Failed to fetch questions"}), 500


@app.route("/submit-quiz", methods=["POST"])
def submit_quiz():
    try:
        global answers_list
        global questions
        data = request.json
        user_answers = data.get("answers", {})
        user_answers_values = list(user_answers.values())
        total = len(answers_list)
        score = 0
        for i in range(total):
            if user_answers_values[i] == answers_list[i]:
                score += 1
        return jsonify({
            "score": score,
            "total": total,
            "questions": questions,
            "correct_answers": answers_list,
            "user_answers": [user_answers[f"q{i}"] for i in range(total)],
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500


""" @app.route('/result')
def result():
    final_score = request.args.get("score", type=int)
    total_questions = request.args.get("total", type=int)
    return render_template("quiz3.html", score=final_score, total=total_questions) """


# ========================== PAY PARITY ==========================

@app.route("/get_salary", methods=['POST'])
def get_salary():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data received"}), 400

        job = str(data.get("job", "")).strip()
        education_level = int(data.get("education_level", 0))
        experience = float(data.get("experience", 0))
        user_salary = float(data.get("user_salary", 0))

        input_dict = {
            'Education Level': [education_level],
            'YearsExperience': [experience],
            'Salary': [user_salary]
        }

        for col in all_columns:
            if col.startswith('Job Role_'):
                input_dict[col] = [1 if col == f'Job Role_{job}' else 0]

        input_df = pd.DataFrame(input_dict)

        for col in all_columns:
            if col not in input_df.columns:
                input_df[col] = 0

        input_df = input_df[all_columns]

        predicted_salary = model1.predict(input_df)[0]

        if user_salary > 0:
            percentage_difference = ((user_salary - predicted_salary) / predicted_salary) * 100
            percentage_difference = round(percentage_difference, 2)
            if percentage_difference > 0:
                comparison_message = f"Your salary is {percentage_difference}% above the estimated salary! 🎉"
            else:
                comparison_message = f"Your salary is {abs(percentage_difference)}% below the estimated salary. Please consider negotiating for fair pay! 💪"
        else:
            comparison_message = "No valid user salary provided."

        return jsonify({
            "salary": round(predicted_salary, 2),
            "comparison": comparison_message
        })

    except Exception as e:
        print("Error:", str(e))
        return jsonify({"error": "Internal Server Error"}), 500

""" @app.route("/services")
def services():
    return render_template("services.html")


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/statistics")
def statistics():
    return render_template("statistics.html")
 """

if __name__ == "__main__":
    app.run(debug=True, port=5000,host='0.0.0.0')

