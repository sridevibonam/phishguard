import { useState } from "react";

function PasswordChecker() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("");
  const [color, setColor] = useState("");
  const [tips, setTips] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const checkPassword = async () => {
    if (password.trim() === "") {
      alert("Please enter a password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://phishguard-backend-p30x.onrender.com/check-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Something went wrong.");
        return;
      }

      setScore(data.score);
      setTips(data.suggestions || []);

      if (data.strength === "Weak") {
        setStrength("🔴 Weak Password");
        setColor("bg-red-500");
      } else if (data.strength === "Medium") {
        setStrength("🟡 Medium Password");
        setColor("bg-yellow-500");
      } else {
        setStrength("🟢 Strong Password");
        setColor("bg-green-500");
      }

    } catch (error) {
      alert("Unable to connect to backend.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setPassword("");
    setStrength("");
    setColor("");
    setTips([]);
    setScore(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4">
      
      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">
          🔐 Password Strength Checker
        </h1>

        <input
          type="password"
          placeholder="Enter your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={checkPassword}
          disabled={loading}
          className="w-full mt-5 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold transition"
        >
          {loading ? "🔍 Checking..." : "🔍 Check Password"}
        </button>

        <button
          onClick={clearAll}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition"
        >
          🗑️ Clear
        </button>

        {loading && (
          <p className="text-center mt-5 text-yellow-400 animate-pulse">
            🔐 Checking password strength...
          </p>
        )}

        {strength && (
          <div className="mt-8 bg-slate-800 rounded-xl p-5">

            <h2 className="text-2xl font-bold mb-4">
              {strength}
            </h2>

            {score !== null && (
              <p className="text-lg mb-4">
                <strong>Security Score:</strong> {score}/5
              </p>
            )}

            {/* Progress Bar */}
            <div className="w-full bg-slate-700 rounded-full h-4 mb-5">
              <div
                className={`${color} h-4 rounded-full transition-all duration-500`}
                style={{
                  width:
                    score === 1
                      ? "20%"
                      : score === 2
                      ? "40%"
                      : score === 3
                      ? "60%"
                      : score === 4
                      ? "80%"
                      : "100%",
                }}
              ></div>
            </div>

            <h3 className="text-xl font-semibold text-cyan-400 mb-2">
              Suggestions
            </h3>

            {tips.length > 0 ? (
              <ul className="list-disc ml-6 space-y-2">
                {tips.map((tip, index) => (
                  <li key={index}>{tip}</li>
                ))}
              </ul>
            ) : (
              <p className="text-green-400">
                ✅ Excellent! Your password is strong.
              </p>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

export default PasswordChecker;