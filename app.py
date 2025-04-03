import google.generativeai as genai
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import os
from config import API_KEY

app = Flask(__name__)
CORS(app)

# Configure Gemini API
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel("gemini-2.0-flash")

@app.route("/")
def serve_frontend():
    return render_template("merin.html")

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    user_input = data.get("message", "").strip()

    if not user_input:
        return jsonify({"error": "Empty message"}), 400

    system_prompt = (
        "You are a legal expert specializing in Female Foeticide Laws in India. "
        "Provide accurate, legally sound, and fact-based responses. "
        "Cite relevant sections of the PCPNDT Act and Indian Penal Code when necessary. "
        "Ensure responses are in a simple, understandable format."
    )

    response = model.generate_content(f"{system_prompt}\n\nUser: {user_input}\nBot:")

    return jsonify({"response": response.text})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
