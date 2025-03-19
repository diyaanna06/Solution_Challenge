from flask import Flask, render_template, request, jsonify,redirect,url_for,session
from flask_cors import CORS
import pandas as pd
import random
import json
import traceback
app = Flask(__name__)
CORS(app)
answers_list = [] 
selected_questions=[]
questions=[]
num_questions=0
df = pd.read_csv("questions.csv")
@app.route('/')
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
            "correct_answers": answers_list 
        })
    except Exception as e:
        print(traceback.format_exc())
        return jsonify({"error": str(e)}), 500

@app.route('/result')
def result():
    final_score = request.args.get("score", type=int)
    total_questions = request.args.get("total", type=int)
    return render_template("result.html", score=final_score, total=total_questions)

if __name__ == "__main__":
    app.run(debug=True)