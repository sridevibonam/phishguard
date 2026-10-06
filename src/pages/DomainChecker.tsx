import { useState } from "react";

function DomainChecker() {
  const [domain, setDomain] = useState("");
  const [result, setResult] = useState("");
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [matchedWords, setMatchedWords] = useState<string[]>([]);

  const checkDomain = async () => {
    if (domain.trim() === "") {
      setResult("❌ Please enter a domain.");
      setRecommendation("");
      setRiskScore(null);
      setMatchedWords([]);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://phishguard-backend-p30x.onrender.com/check-domain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            domain: domain,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setResult("❌ Error");
        setRecommendation(data.error || "Something went wrong.");
        return;
      }

      if (data.result === "Suspicious Domain") {
        setResult("🔴 Suspicious Domain");
      } else {
        setResult("🟢 Safe Domain");
      }

      setRecommendation(data.recommendation);
      setRiskScore(data.risk_score);
      setMatchedWords(data.matched_words || []);

    } catch (error) {
      console.error(error);

      setResult("❌ Connection Error");
      setRecommendation("Unable to connect to backend.");
      setRiskScore(null);
      setMatchedWords([]);

    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setDomain("");
    setResult("");
    setRecommendation("");
    setRiskScore(null);
    setMatchedWords([]);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4">

      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-full max-w-2xl">

        {/* Heading */}
        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">
          🌐 Domain Checker
        </h1>

        {/* Domain Input */}
        <input
          type="text"
          placeholder="Enter domain (example.com)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        {/* Check Button */}
        <button
          onClick={checkDomain}
          disabled={loading}
          className="w-full mt-5 bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-bold transition"
        >
          {loading ? "🔍 Checking..." : "🚀 Check Domain"}
        </button>

        {/* Clear Button */}
        <button
          onClick={clearAll}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold transition"
        >
          🗑️ Clear
        </button>

        {/* Loading */}
        {loading && (
          <p className="text-center mt-6 text-yellow-400 animate-pulse">
            🌐 Analyzing domain...
          </p>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="mt-8 bg-slate-800 rounded-xl p-5">

            <h2 className="text-2xl font-bold mb-4">
              {result}
            </h2>

            {/* Risk Score */}
            {riskScore !== null && (
              <div className="mb-5">
                <p className="text-lg">
                  <strong>Risk Score:</strong> {riskScore}%
                </p>

                <div className="w-full bg-slate-700 rounded-full h-4 mt-2">
                  <div
                    className={`h-4 rounded-full ${
                      riskScore >= 60
                        ? "bg-red-500"
                        : riskScore > 0
                        ? "bg-yellow-500"
                        : "bg-green-500"
                    }`}
                    style={{
                      width: `${riskScore}%`,
                    }}
                  ></div>
                </div>
              </div>
            )}

            {/* Suspicious Keywords */}
            {matchedWords.length > 0 && (
              <div className="mb-5">
                <h3 className="text-lg font-bold text-red-400">
                  Suspicious Keywords
                </h3>

                <ul className="list-disc ml-6 mt-2">
                  {matchedWords.map((word, index) => (
                    <li key={index}>{word}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Recommendation */}
            <div className="bg-slate-700 rounded-lg p-4">

              <h3 className="text-lg font-bold text-yellow-400">
                Recommendation
              </h3>

              <p className="mt-2">
                {recommendation}
              </p>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default DomainChecker;