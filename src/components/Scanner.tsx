import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Scanner() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleScan = () => {
    if (!input.trim()) {
      alert("Please enter a URL or Email.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      // Email Detection
      if (input.includes("@")) {
        navigate("/email-scanner", {
          state: {
            email: input,
          },
        });
      }

      // URL Detection
      else {
        navigate("/url-scanner", {
          state: {
            url: input,
          },
        });
      }
    }, 1800);
  };

  return (
    <section className="py-20 px-6 bg-slate-900 text-white">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <h2 className="text-5xl font-bold text-cyan-400">
          🛡️ Security Analysis
        </h2>

        <p className="text-gray-400 text-lg mt-5 max-w-3xl mx-auto leading-8">
          Analyze suspicious URLs and emails using Machine Learning and
          rule-based security checks with risk scores, confidence levels,
          and security recommendations.
        </p>

        {/* Input */}
        <div className="relative mt-10">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleScan();
              }
            }}
            placeholder="Paste a suspicious URL or Email..."
            className="w-full pl-14 pr-5 py-4 rounded-xl bg-slate-800 border border-slate-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 outline-none transition"
          />
        </div>

        {/* Status */}
        <div className="mt-6 flex justify-center">
          <div className="bg-green-600 px-6 py-3 rounded-full shadow-lg">
            <p className="font-semibold">
              🟢 PhishGuard Ready
            </p>

            <p className="text-xs text-green-100">
              Security Analysis System Active
            </p>
          </div>
        </div>

        {/* Scan Button */}
        <button
          onClick={handleScan}
          disabled={loading}
          className={`mt-8 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg ${
            loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-500 hover:bg-cyan-600 hover:scale-105"
          }`}
        >
          {loading
            ? "🔍 Analyzing..."
            : "🚀 Start Security Scan"}
        </button>

        {/* Loading */}
        {loading && (
          <div className="mt-10 bg-slate-800 rounded-xl p-6 max-w-2xl mx-auto">

            <h3 className="text-yellow-400 text-xl font-bold animate-pulse">
              🔍 Checking security indicators...
            </h3>

            <div className="w-full bg-slate-700 rounded-full h-3 mt-5">
              <div className="bg-cyan-400 h-3 rounded-full w-3/4 animate-pulse"></div>
            </div>

            <div className="mt-5 space-y-2 text-left text-gray-300">
              <p>✔ Checking security indicators...</p>
              <p>✔ Analyzing suspicious patterns...</p>
              <p>✔ Calculating risk score...</p>
              <p>✔ Generating security result...</p>
            </div>

          </div>
        )}

        {/* Project Information */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">

          <div className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-cyan-400 text-xl font-bold">
              🔍 Detection Methods
            </h3>

            <p className="text-3xl font-bold mt-4">
              ML + Rules
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Multiple security analysis methods
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-cyan-400 text-xl font-bold">
              🛡️ Security Checks
            </h3>

            <p className="text-5xl font-bold mt-4">
              4
            </p>

            <p className="text-gray-400 text-sm mt-2">
              URL, Email, Password & Domain
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 hover:scale-105 transition">
            <h3 className="text-cyan-400 text-xl font-bold">
              💾 Scan History
            </h3>

            <p className="text-3xl font-bold mt-4">
              SQLite
            </p>

            <p className="text-gray-400 text-sm mt-2">
              Persistent scan history
            </p>
          </div>

        </div>

        {/* Supported Checks */}
        <div className="mt-16">

          <h3 className="text-3xl font-bold text-cyan-400 mb-8">
            Supported Security Checks
          </h3>

          <div className="flex flex-wrap justify-center gap-4">

            <span className="bg-slate-800 px-5 py-3 rounded-full hover:bg-cyan-600 transition">
              🌐 URL Scanner
            </span>

            <span className="bg-slate-800 px-5 py-3 rounded-full hover:bg-cyan-600 transition">
              📧 Email Scanner
            </span>

            <span className="bg-slate-800 px-5 py-3 rounded-full hover:bg-cyan-600 transition">
              🔐 Password Checker
            </span>

            <span className="bg-slate-800 px-5 py-3 rounded-full hover:bg-cyan-600 transition">
              🌍 Domain Checker
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Scanner;