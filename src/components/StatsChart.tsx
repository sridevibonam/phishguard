import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Props {
  safe: number;
  phishing: number;
  suspicious: number;
}

function StatsChart({
  safe,
  phishing,
  suspicious,
}: Props) {
  const data = {
    labels: ["Safe", "Phishing", "Suspicious"],
    datasets: [
      {
        data: [safe, phishing, suspicious],
        backgroundColor: [
          "#22c55e",
          "#ef4444",
          "#eab308",
        ],
        borderColor: "#0f172a",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="bg-slate-900 rounded-2xl p-6 shadow-xl mt-10">
      <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
        📊 Scan Statistics
      </h2>

      <div className="max-w-sm mx-auto">
        <Pie data={data} />
      </div>
    </div>
  );
}

export default StatsChart;