import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score
import joblib

# Load dataset
df = pd.read_csv("PhishingData.csv")

# Remove extra spaces from column names
df.columns = df.columns.str.strip()

# Drop the index column
df = df.drop(columns=["index"])

# Features and target
X = df.drop(columns=["Result"])
y = df["Result"]

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42
)

# Train model
model = RandomForestClassifier(
    n_estimators=100,
    random_state=42
)

model.fit(X_train, y_train)

# Predictions
y_pred = model.predict(X_test)

# Accuracy
accuracy = accuracy_score(y_test, y_pred)

print(f"Model Accuracy: {accuracy*100:.2f}%")

# Save model
joblib.dump(model, "model.pkl")

print("✅ model.pkl created successfully!")