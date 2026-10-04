function About() {
  return (
    <div className="min-h-screen bg-slate-950 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Page Heading */}
        <h1 className="text-5xl font-bold text-cyan-400 text-center mb-10">
          🛡️ About PhishGuard Sentinel
        </h1>

        {/* Project Overview */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-5">
            🛡️ Project Overview
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            <strong className="text-white">
              PhishGuard Sentinel
            </strong>{" "}
            is a cybersecurity web application designed to help users
            identify potentially harmful websites, suspicious emails,
            and weak passwords before sensitive information is shared.

            <br />
            <br />

            The system combines{" "}
            <strong className="text-cyan-400">
              Machine Learning
            </strong>{" "}
            for URL analysis with{" "}
            <strong className="text-cyan-400">
              Rule-Based Detection
            </strong>{" "}
            for email, domain, and password analysis.

            <br />
            <br />

            It provides users with risk scores, confidence levels,
            detection results, recommendations, and scan history through
            a simple and user-friendly interface.
          </p>
        </div>

        {/* Features */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
            🚀 Key Features
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              🔍 <strong>URL Scanner</strong>
              <p className="text-gray-400 mt-2">
                Analyzes URLs and provides a phishing prediction,
                risk score, and confidence level.
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              📧 <strong>Email Scanner</strong>
              <p className="text-gray-400 mt-2">
                Detects suspicious words and phishing indicators
                in email content.
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              🔐 <strong>Password Checker</strong>
              <p className="text-gray-400 mt-2">
                Checks password length, uppercase, lowercase,
                numbers, and special characters.
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              🌐 <strong>Domain Checker</strong>
              <p className="text-gray-400 mt-2">
                Checks domains for commonly suspicious keywords
                and provides safety recommendations.
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              📊 <strong>Security Dashboard</strong>
              <p className="text-gray-400 mt-2">
                Displays scan statistics and security analysis
                in an interactive dashboard.
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl hover:bg-slate-700 transition">
              📜 <strong>Scan History</strong>
              <p className="text-gray-400 mt-2">
  Keeps scan history permanently using SQLite database.
</p>
            </div>

          </div>
        </div>

        {/* Technologies */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
            💻 Technologies Used
          </h2>

          <div className="flex flex-wrap gap-3">

            <span className="bg-cyan-600 px-5 py-2 rounded-lg font-semibold">
              React
            </span>

            <span className="bg-cyan-600 px-5 py-2 rounded-lg font-semibold">
              TypeScript
            </span>

            <span className="bg-cyan-600 px-5 py-2 rounded-lg font-semibold">
              Tailwind CSS
            </span>

            <span className="bg-green-600 px-5 py-2 rounded-lg font-semibold">
              Python
            </span>

            <span className="bg-green-600 px-5 py-2 rounded-lg font-semibold">
              Flask
            </span>

            <span className="bg-yellow-600 px-5 py-2 rounded-lg font-semibold">
              Scikit-learn
            </span>

            <span className="bg-yellow-600 px-5 py-2 rounded-lg font-semibold">
              Joblib
            </span>

            <span className="bg-purple-600 px-5 py-2 rounded-lg font-semibold">
              Chart.js
            </span>

          </div>
        </div>

        {/* Architecture */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl mb-8">
          <h2 className="text-3xl font-bold text-cyan-300 mb-6">
            ⚙️ System Architecture
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-center">

            <div className="bg-slate-800 p-5 rounded-xl">
              <div className="text-4xl mb-3">🖥️</div>
              <h3 className="text-xl font-bold text-cyan-400">
                Frontend
              </h3>
              <p className="text-gray-400 mt-2">
                React + TypeScript + Tailwind CSS
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl">
              <div className="text-4xl mb-3">🐍</div>
              <h3 className="text-xl font-bold text-green-400">
                Backend
              </h3>
              <p className="text-gray-400 mt-2">
                Python + Flask + Flask-CORS
              </p>
            </div>

            <div className="bg-slate-800 p-5 rounded-xl">
              <div className="text-4xl mb-3">🤖</div>
              <h3 className="text-xl font-bold text-yellow-400">
                Detection
              </h3>
              <p className="text-gray-400 mt-2">
                Machine Learning + Rule-Based Analysis
              </p>
            </div>

          </div>
        </div>

        {/* Goal */}
        <div className="bg-slate-900 rounded-2xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold text-cyan-300 mb-5">
            🎯 Project Goal
          </h2>

          <p className="text-gray-300 leading-8 text-lg">
            The main goal of PhishGuard Sentinel is to improve
            cybersecurity awareness and help users identify potential
            phishing threats before interacting with suspicious content.

            <br />
            <br />

            The application provides simple and understandable security
            results so that users can make safer decisions when browsing
            websites, reading emails, and creating passwords.
          </p>
        </div>

        {/* Footer */}
        <div className="text-center mt-10 text-gray-500">
          <p>
            🛡️ PhishGuard Sentinel — Cybersecurity Awareness & Protection
          </p>
        </div>

      </div>
    </div>
  );
}

export default About;