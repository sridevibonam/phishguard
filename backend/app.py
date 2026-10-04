from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import time
import sqlite3

app = Flask(__name__)
CORS(app)

# -------------------------------
# Database
# -------------------------------
DATABASE = "phishguard.db"


def init_database():
    connection = sqlite3.connect(DATABASE)

    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS scan_history (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL,
            input TEXT NOT NULL,
            prediction TEXT NOT NULL,
            risk_score INTEGER,
            confidence INTEGER,
            scan_time INTEGER
        )
    """)

    connection.commit()
    connection.close()

    print("✅ SQLite Database Ready")


def save_scan(scan):
    connection = sqlite3.connect(DATABASE)

    cursor = connection.cursor()

    cursor.execute("""
        INSERT INTO scan_history
        (type, input, prediction, risk_score, confidence, scan_time)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        scan["type"],
        scan["input"],
        scan["prediction"],
        scan["risk_score"],
        scan["confidence"],
        scan["scan_time"]
    ))

    connection.commit()
    connection.close()


def get_scan_history():
    connection = sqlite3.connect(DATABASE)

    connection.row_factory = sqlite3.Row

    cursor = connection.cursor()

    cursor.execute("""
        SELECT
            type,
            input,
            prediction,
            risk_score,
            confidence,
            scan_time
        FROM scan_history
        ORDER BY id DESC
    """)

    rows = cursor.fetchall()

    connection.close()

    history = []

    for row in rows:
        history.append({
            "type": row["type"],
            "input": row["input"],
            "prediction": row["prediction"],
            "risk_score": row["risk_score"],
            "confidence": row["confidence"],
            "scan_time": row["scan_time"]
        })

    return history


# Create database when application starts
init_database()


# -------------------------------
# Load AI Model
# -------------------------------
model = None

if os.path.exists("model.pkl"):
    model = joblib.load("model.pkl")
    print("✅ AI Model Loaded Successfully")
else:
    print("⚠️ model.pkl not found. Running in demo mode.")


# -------------------------------
# Feature Extraction
# -------------------------------
def extract_features(url):

    features = [
        -1 if "@" in url else 1,
        -1 if len(url) > 75 else 1,
        -1 if "//" in url[8:] else 1,
        -1 if "-" in url else 1,
        1 if url.startswith("https") else -1,
    ]

    while len(features) < 30:
        features.append(1)

    return features


# -------------------------------
# Home
# -------------------------------
@app.route("/")
def home():

    return jsonify({
        "status": "success",
        "message": "PhishGuard Backend is Running 🚀"
    })


# -------------------------------
# URL Scanner
# -------------------------------
@app.route("/predict", methods=["POST"])
def predict():

    start = time.time()

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    url = data.get("url", "").strip()

    if url == "":
        return jsonify({
            "error": "No URL provided"
        }), 400

    lower_url = url.lower()

    suspicious_words = [
        "login",
        "verify",
        "bank",
        "paypal",
        "secure",
        "update",
        "signin",
        "account",
        "gift",
        "free",
        "winner",
        "confirm",
        "password"
    ]

    matched_keywords = []

    for word in suspicious_words:

        if word in lower_url:
            matched_keywords.append(word)

    print("Scanned URL:", lower_url)
    print("Matched Keywords:", matched_keywords)

    # -------------------------------
    # Keyword Detection
    # -------------------------------
    if matched_keywords:

        prediction = "Phishing"

        risk_score = min(
            60 + len(matched_keywords) * 5,
            95
        )

        confidence = 95

        analysis = [
            f"Contains '{word}'"
            for word in matched_keywords
        ]

    # -------------------------------
    # AI Model
    # -------------------------------
    elif model:

        features = extract_features(url)

        prediction_value = model.predict([features])[0]

        if prediction_value == -1:

            prediction = "Phishing"
            risk_score = 92
            confidence = 96

        else:

            prediction = "Safe"
            risk_score = 12
            confidence = 94

        analysis = [
            f"AI Model Prediction: {prediction}"
        ]

    # -------------------------------
    # Model Not Loaded
    # -------------------------------
    else:

        prediction = "Unknown"
        risk_score = 0
        confidence = 0

        analysis = [
            "AI Model Not Loaded"
        ]

    scan_time = round(
        (time.time() - start) * 1000
    )

    scan = {
        "type": "URL",
        "input": url,
        "prediction": prediction,
        "risk_score": risk_score,
        "confidence": confidence,
        "scan_time": scan_time
    }

    # Save to SQLite
    save_scan(scan)

    return jsonify({
        "url": url,
        "prediction": prediction,
        "risk_score": risk_score,
        "confidence": confidence,
        "scan_time": scan_time,
        "analysis": analysis,
        "ai_model": "Loaded" if model else "Not Loaded"
    })


# -------------------------------
# Email Scanner
# -------------------------------
@app.route("/scan-email", methods=["POST"])
def scan_email():

    data = request.get_json()

    if not data:
        return jsonify({
            "error": "No data received"
        }), 400

    email = data.get("email", "").strip().lower()

    if email == "":
        return jsonify({
            "error": "No email content provided"
        }), 400

    suspicious_words = [
        "verify",
        "urgent",
        "password",
        "click here",
        "bank",
        "paypal",
        "login",
        "confirm",
        "account suspended",
        "winner",
        "claim",
        "gift",
        "limited time",
        "update account"
    ]

    score = 0
    reasons = []

    for word in suspicious_words:

        if word in email:

            score += 10

            reasons.append(
                f"Contains '{word}'"
            )

    if score >= 40:

        prediction = "Phishing"
        confidence = 95

    else:

        prediction = "Safe"
        confidence = 90

    risk_score = min(score, 100)

    scan = {
        "type": "Email",
        "input": email[:60] + (
            "..." if len(email) > 60 else ""
        ),
        "prediction": prediction,
        "risk_score": risk_score,
        "confidence": confidence,
        "scan_time": 0
    }

    # Save to SQLite
    save_scan(scan)

    return jsonify({
        "prediction": prediction,
        "risk_score": risk_score,
        "confidence": confidence,
        "analysis": reasons
    })


# -------------------------------
# Password Checker
# -------------------------------
@app.route("/check-password", methods=["POST"])
def check_password():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No data received"
        }), 400

    password = data.get("password", "")

    if password == "":

        return jsonify({
            "error": "No password provided"
        }), 400

    score = 0

    suggestions = []

    # Length
    if len(password) >= 8:

        score += 1

    else:

        suggestions.append(
            "Use at least 8 characters."
        )

    # Uppercase
    if any(c.isupper() for c in password):

        score += 1

    else:

        suggestions.append(
            "Add an uppercase letter."
        )

    # Lowercase
    if any(c.islower() for c in password):

        score += 1

    else:

        suggestions.append(
            "Add a lowercase letter."
        )

    # Number
    if any(c.isdigit() for c in password):

        score += 1

    else:

        suggestions.append(
            "Include a number."
        )

    # Special character
    if any(not c.isalnum() for c in password):

        score += 1

    else:

        suggestions.append(
            "Add a special character (!@#$%)."
        )

    if score <= 2:

        strength = "Weak"

    elif score <= 4:

        strength = "Medium"

    else:

        strength = "Strong"

    # Password is NOT saved for privacy.

    return jsonify({
        "strength": strength,
        "score": score,
        "suggestions": suggestions
    })


# -------------------------------
# Domain Checker
# -------------------------------
@app.route("/check-domain", methods=["POST"])
def check_domain():

    data = request.get_json()

    if not data:

        return jsonify({
            "error": "No data received"
        }), 400

    domain = data.get(
        "domain",
        ""
    ).strip().lower()

    if domain == "":

        return jsonify({
            "error": "No domain provided"
        }), 400

    suspicious_words = [
        "login",
        "secure",
        "verify",
        "update",
        "bank",
        "paypal",
        "free",
        "gift",
        "account",
        "confirm"
    ]

    matched_words = []

    for word in suspicious_words:

        if word in domain:

            matched_words.append(word)

    if matched_words:

        result = "Suspicious Domain"

        recommendation = (
            "This domain looks suspicious. "
            "Verify the URL before visiting."
        )

    else:

        result = "Safe Domain"

        recommendation = (
            "No obvious suspicious keywords were found. "
            "Still verify the website before sharing "
            "personal information."
        )

    risk_score = min(
        len(matched_words) * 20,
        100
    )

    scan = {
        "type": "Domain",
        "input": domain,
        "prediction": result,
        "risk_score": risk_score,
        "confidence": 90,
        "scan_time": 0
    }

    # Save to SQLite
    save_scan(scan)

    return jsonify({
        "result": result,
        "recommendation": recommendation,
        "matched_words": matched_words,
        "risk_score": risk_score
    })


# -------------------------------
# Dashboard
# -------------------------------
@app.route("/dashboard", methods=["GET"])
def dashboard():

    history = get_scan_history()

    total_scans = len(history)

    safe = sum(
        1 for scan in history
        if scan["prediction"] in ["Safe", "Safe Domain"]
    )

    phishing = sum(
        1 for scan in history
        if scan["prediction"] == "Phishing"
    )

    suspicious = sum(
        1 for scan in history
        if scan["prediction"] == "Suspicious Domain"
    )

    return jsonify({
        "total_scans": total_scans,
        "safe": safe,
        "phishing": phishing,
        "suspicious": suspicious,
        "history": history
    })

# -------------------------------
# Run Server
# -------------------------------
if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )