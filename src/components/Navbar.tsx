import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        
        <h1 className="text-2xl font-bold text-cyan-400">
          🛡️ PhishGuard Sentinel
        </h1>
          <ul className="flex gap-8 font-medium">
  <li>
    <Link to="/" className="hover:text-cyan-400">
      Home
    </Link>
  </li>

  <li>
    <Link to="/url-scanner" className="hover:text-cyan-400">
      URL Scanner
    </Link>
  </li>

  <li>
    <Link to="/email-scanner" className="hover:text-cyan-400">
      Email Scanner
    </Link>
  </li>

  <li>
    <Link to="/password-checker" className="hover:text-cyan-400">
      Password Checker
    </Link>
  </li>

  <li>
    <Link to="/domain-checker" className="hover:text-cyan-400">
      Domain Checker
    </Link>
  </li>

  <li>
    <Link to="/dashboard" className="hover:text-cyan-400">
      Dashboard
    </Link>
  </li>

  <li>
    <Link to="/about" className="hover:text-cyan-400">
      About
    </Link>
  </li>
</ul>
      </div>
    </nav>
  );
}

export default Navbar;