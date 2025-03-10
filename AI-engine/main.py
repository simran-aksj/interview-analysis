from flask import Flask, request, jsonify
import openai
from textblob import TextBlob
from vaderSentiment.vaderSentiment import SentimentIntensityAnalyzer
import spacy
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

# Initialize Flask
app = Flask(__name__)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Sentiment Analysis Function
def analyze_sentiment(text):
    analyzer = SentimentIntensityAnalyzer()
    score = analyzer.polarity_scores(text)["compound"]
    return "Positive" if score > 0.05 else "Negative" if score < -0.05 else "Neutral"

# Keyword Extraction
def extract_keywords(text):
    doc = nlp(text)
    return [token.text for token in doc if token.is_alpha and not token.is_stop]

# AI Analysis Route
@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    question = data.get("question")
    response = data.get("response")

    if not question or not response:
        return jsonify({"error": "Question and response are required"}), 400

    # OpenAI Correctness Score
    prompt = f"Evaluate the correctness of this response (0-100%):\n\nQuestion: {question}\nResponse: {response}"
    gpt_response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "system", "content": prompt}]
    )
    correctness = int(gpt_response['choices'][0]['message']['content'].strip())

    sentiment = analyze_sentiment(response)
    keywords = extract_keywords(response)

    return jsonify({
        "correctness": correctness,
        "sentiment": sentiment,
        "keywords": keywords
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
