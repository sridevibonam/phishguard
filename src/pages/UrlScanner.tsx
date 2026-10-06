import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

function UrlScanner() {
  const location = useLocation();

  const [url, setUrl] = useState("");
  const [result, setResult] = useState("");
  const [riskScore, setRiskScore] = useState<number | null>(null);
  const [analysis, setAnalysis] = useState<string[]>([]);
  const [recommendation, setRecommendation] = useState("");
  const [loading, setLoading] = useState(false);
  const [scanTime, setScanTime] = useState("");
  const [confidence, setConfidence] = useState<number | null>(null);
  const [modelStatus, setModelStatus] = useState("");

  useEffect(() => {
    if (location.state?.url) {
      setUrl(location.state.url);
    }
  }, [location]);

  const scanUrl = async () => {
    setResult("");
    setRiskScore(null);
    setAnalysis([]);
    setRecommendation("");
    setConfidence(null);
    setScanTime("");
    setModelStatus("");

    if (!url.trim()) {
      setResult("❌ Please enter a URL.");
      return;
    }

    try {
      new URL(url);
    } catch {
      setResult("❌ Please enter a valid URL (Example: https://google.com)");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("https://phishguard-backend-p30x.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Backend Error");
      }

      setRiskScore(data.risk_score);
      setConfidence(data.confidence);
      setModelStatus(data.ai_model);
      setScanTime(`${data.scan_time} ms`);

      switch (data.prediction) {
        case "Phishing":
          setResult("🔴 Phishing Website");
          setRecommendation(
            "Do not visit this website. Never enter passwords, banking details or personal information."
          );
          break;

        case "Suspicious":
          setResult("🟡 Suspicious Website");
          setRecommendation(
            "Proceed carefully. Verify the website before entering sensitive information."
          );
          break;

        default:
          setResult("🟢 Safe Website");
          setRecommendation(
            "This website appears safe, but always verify the URL before entering personal information."
          );
      }

      if (Array.isArray(data.analysis)) {
        setAnalysis(data.analysis);
      } else {
        setAnalysis([
          `Prediction: ${data.prediction}`,
          `Risk Score: ${data.risk_score}%`,
          `Confidence: ${data.confidence}%`,
          `URL: ${data.url}`,
          `Scan Time: ${data.scan_time} ms`,
        ]);
      }
    } catch (err: any) {
      console.error(err);

      setResult("❌ Scan Failed");

      setRecommendation(
        err.message || "Unable to connect to backend."
      );

      setAnalysis([
        "Flask server is running",
        "Backend URL is correct",
        "Check browser console",
      ]);
    } finally {
      setLoading(false);
    }
  };

  const clearAll = () => {
    setUrl("");
    setResult("");
    setRiskScore(null);
    setAnalysis([]);
    setRecommendation("");
    setConfidence(null);
    setScanTime("");
    setModelStatus("");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white flex justify-center items-center px-4">
      <div className="bg-slate-900 rounded-2xl shadow-xl p-8 w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-center text-cyan-400 mb-6">
          🛡️ PhishGuard AI Scanner
        </h1>

        <input
          type="text"
          value={url}
          placeholder="Enter Website URL..."
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") scanUrl();
          }}
          className="w-full p-4 rounded-lg bg-slate-800 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={scanUrl}
          disabled={loading}
          className={`w-full mt-5 py-3 rounded-lg font-bold ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600"
          }`}
        >
          {loading ? "🔍 Scanning..." : "🚀 Scan URL"}
        </button>

        <button
          onClick={clearAll}
          className="w-full mt-3 bg-red-600 hover:bg-red-700 py-3 rounded-lg font-bold"
        >
          🗑️ Clear
        </button>

        {result && (
          <div className="mt-8 bg-slate-800 rounded-xl p-5">

            <h2
              className={`text-2xl font-bold mb-3 ${
                result.includes("Safe")
                  ? "text-green-400"
                  : result.includes("Phishing")
                  ? "text-red-500"
                  : result.includes("Suspicious")
                  ? "text-yellow-400"
                  : "text-white"
              }`}
            >
              {result}
            </h2>

            <p className="break-all text-gray-300">
              <strong>Scanned URL:</strong> {url}
            </p>

            {riskScore !== null && (
              <>
                <div className="flex justify-between mt-5">
                  <span>Risk Score</span>
                  <span>{riskScore}%</span>
                </div>

                <div className="w-full bg-slate-700 h-4 rounded-full mt-2">
                  <div
                    className={`h-4 rounded-full ${
                      riskScore <= 30
                        ? "bg-green-500"
                        : riskScore <= 70
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${riskScore}%` }}
                  />
                </div>
              </>
            )}

            {confidence !== null && (
              <p className="mt-4 text-green-400">
                <strong>Confidence:</strong> {confidence}%
              </p>
            )}

            {modelStatus && (
              <p className="text-cyan-400">
                <strong>AI Model:</strong> {modelStatus}
              </p>
            )}

            {scanTime && (
              <p className="text-cyan-400">
                <strong>Scan Time:</strong> {scanTime}
              </p>
            )}

            <h3 className="text-xl font-bold text-cyan-400 mt-6">
              Analysis
            </h3>

            <ul className="list-disc ml-6 mt-3 space-y-2">
              {analysis.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <div className="bg-slate-700 rounded-lg p-4 mt-6">
              <h3 className="text-lg font-bold text-yellow-400">
                Recommendation
              </h3>

              <p className="mt-2">{recommendation}</p>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}

export default UrlScanner;