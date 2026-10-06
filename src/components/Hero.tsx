import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="text-center py-24 px-6 bg-slate-950 text-white">
      <h1 className="text-6xl font-bold mb-6">
        Protect Yourself from
        <span className="text-cyan-400"> Phishing Attacks</span>
      </h1>

      <p className="text-gray-400 text-xl max-w-3xl mx-auto mb-10">
        Scan suspicious URLs, emails, domains, and passwords using
        AI-powered cybersecurity analysis.
      </p>

      <Link
        to="/url-scanner"
        className="inline-block bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-lg text-lg font-semibold transition"
      >
        Start Scanning
      </Link>
    </section>
  );
}

export default Hero;