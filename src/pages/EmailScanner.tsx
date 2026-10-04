import { useState } from "react";

function EmailScanner() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [prediction, setPrediction] = useState("");
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string[]>([]);

  const scanEmail = async () => {
    if (email.trim() === "") {
      alert("Please enter email content.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:5000/scan-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const data = await response.json();

      setPrediction(data.prediction);
      setRiskScore(data.risk_score);
      setConfidence(data.confidence);
      setAnalysis(data.analysis || []);
    } catch (error) {
      alert("Unable to connect to backend.");
      console.error(error);
    }

    setLoading(false);
  };

  const clearAll = () => {
    setEmail("");
    setPrediction("");
    setRiskScore(null);
    setConfidence(null);
    setAnalysis([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4">
      <div className="bg-slate-900 p-8 rounded-2xl shadow-xl w-full max-w-3xl">

        <h1 className="text-4xl font-bold text-cyan-400 text-center mb-6">
          📧 Email Scanner
        </h1>

        <textarea
          rows={8}
          placeholder="Paste the email content here..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={scanEmail}
          disabled={loading}
          className="w-full mt-5 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold"
        >
          {loading ? "🔍 Scanning..." : "🚀 Scan Email"}
        </button>

        <button
          onClick={clearAll}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
        >
          🗑️ Clear
        </button>

        {loading && (
          <p className="text-center mt-5 text-yellow-400 animate-pulse">
            🔍 Checking email for phishing indicators...
          </p>
        )}

        {prediction && (
          <div className="mt-8 bg-slate-800 rounded-xl p-6">

            <h2 className="text-3xl font-bold mb-4">
              {prediction === "Safe"
                ? "🟢 Safe Email"
                : "🔴 Phishing Email"}
            </h2>

            <p className="text-lg">
              <strong>Risk Score:</strong> {riskScore}%
            </p>

            <p className="text-lg mt-2">
              <strong>Confidence:</strong> {confidence}%
            </p>

            <div className="mt-5">
              <h3 className="text-xl font-semibold mb-2">
                Analysis
              </h3>

              {analysis.length === 0 ? (
                <p>No suspicious keywords found.</p>
              ) : (
                <ul className="list-disc pl-6">
                  {analysis.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default EmailScanner;