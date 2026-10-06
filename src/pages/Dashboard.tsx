import { useEffect, useState } from "react";
import StatsChart from "../components/StatsChart";

interface ScanHistory {
  type: string;
  input: string;
  prediction: string;
  risk_score: number;
  confidence: number;
  scan_time: number;
}

interface DashboardData {
  total_scans: number;
  safe: number;
  phishing: number;
  suspicious: number;
  history: ScanHistory[];
}

function Dashboard() {
  const [dashboard, setDashboard] = useState<DashboardData>({
    total_scans: 0,
    safe: 0,
    phishing: 0,
    suspicious: 0,
    history: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Get dashboard data from Flask backend
  const fetchDashboard = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        "https://phishguard-backend-p30x.onrender.com/dashboard"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
      }

      const data = await response.json();

      setDashboard({
        total_scans: data.total_scans ?? 0,
        safe: data.safe ?? 0,
        phishing: data.phishing ?? 0,
        suspicious: data.suspicious ?? 0,
        history: data.history ?? [],
      });

    } catch (error) {
      console.error("Dashboard error:", error);
      setError("Unable to connect to backend.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">

      {/* ================= HEADING ================= */}

      <h1 className="text-4xl font-bold text-cyan-400 text-center mb-10">
        📊 PhishGuard AI Dashboard
      </h1>

      {/* ================= LOADING ================= */}

      {loading && (
        <p className="text-center text-yellow-400 mb-6">
          🔄 Loading dashboard...
        </p>
      )}

      {/* ================= ERROR ================= */}

      {error && !loading && (
        <div className="max-w-4xl mx-auto mb-6 bg-red-900/40 border border-red-500 text-red-300 p-4 rounded-lg text-center">
          ❌ {error}
        </div>
      )}

      {/* ================= STATISTICS CARDS ================= */}

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {/* TOTAL SCANS */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-center hover:scale-105 transition-all">

          <h2 className="text-lg font-semibold text-gray-300">
            Total Scans
          </h2>

          <p className="text-4xl font-bold text-cyan-400 mt-3">
            {dashboard.total_scans}
          </p>

        </div>

        {/* SAFE */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-center hover:scale-105 transition-all">

          <h2 className="text-lg font-semibold text-gray-300">
            Safe
          </h2>

          <p className="text-4xl font-bold text-green-400 mt-3">
            {dashboard.safe}
          </p>

        </div>

        {/* PHISHING */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-center hover:scale-105 transition-all">

          <h2 className="text-lg font-semibold text-gray-300">
            Phishing
          </h2>

          <p className="text-4xl font-bold text-red-400 mt-3">
            {dashboard.phishing}
          </p>

        </div>

        {/* SUSPICIOUS */}

        <div className="bg-slate-900 rounded-2xl p-6 shadow-xl text-center hover:scale-105 transition-all">

          <h2 className="text-lg font-semibold text-gray-300">
            Suspicious
          </h2>

          <p className="text-4xl font-bold text-yellow-400 mt-3">
            {dashboard.suspicious}
          </p>

        </div>

      </div>

      {/* ================= CHART ================= */}

      <div className="mt-10 bg-slate-900 rounded-2xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          📊 Security Analysis
        </h2>

        <StatsChart
          safe={dashboard.safe}
          phishing={dashboard.phishing}
          suspicious={dashboard.suspicious}
        />

      </div>

      {/* ================= SCAN HISTORY ================= */}

      <div className="mt-10 bg-slate-900 rounded-2xl p-6 shadow-xl">

        <h2 className="text-2xl font-bold text-cyan-400 mb-6">
          📜 Scan History
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full table-auto border-collapse">

            {/* TABLE HEADER */}

            <thead>

              <tr className="border-b border-slate-700">

                <th className="py-3 px-4 text-left">
                  Type
                </th>

                <th className="py-3 px-4 text-left">
                  Input
                </th>

                <th className="py-3 px-4 text-left">
                  Prediction
                </th>

                <th className="py-3 px-4 text-left">
                  Risk
                </th>

                <th className="py-3 px-4 text-left">
                  Confidence
                </th>

                <th className="py-3 px-4 text-left">
                  Scan Time
                </th>

              </tr>

            </thead>

            {/* TABLE BODY */}

            <tbody>

              {dashboard.history.length === 0 ? (

                <tr>

                  <td
                    colSpan={6}
                    className="text-center py-8 text-gray-400"
                  >
                    No scans available.
                  </td>

                </tr>

              ) : (

                dashboard.history.map((scan, index) => {

                  // Decide prediction color
                  let predictionColor = "text-yellow-400";

                  if (scan.prediction.includes("Safe")) {
                    predictionColor = "text-green-400";
                  } else if (
                    scan.prediction.includes("Phishing")
                  ) {
                    predictionColor = "text-red-400";
                  }

                  return (
                    <tr
                      key={index}
                      className="border-b border-slate-800 hover:bg-slate-800 transition"
                    >

                      {/* TYPE */}

                      <td className="py-4 px-4">
                        {scan.type}
                      </td>

                      {/* INPUT */}

                      <td className="py-4 px-4 break-all max-w-sm">
                        {scan.input}
                      </td>

                      {/* PREDICTION */}

                      <td
                        className={`py-4 px-4 font-bold ${predictionColor}`}
                      >
                        {scan.prediction}
                      </td>

                      {/* RISK */}

                      <td className="py-4 px-4">
                        {scan.risk_score}%
                      </td>

                      {/* CONFIDENCE */}

                      <td className="py-4 px-4">
                        {scan.confidence}%
                      </td>

                      {/* SCAN TIME */}

                      <td className="py-4 px-4">
                        {scan.scan_time} ms
                      </td>

                    </tr>
                  );
                })

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;