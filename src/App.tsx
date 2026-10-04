import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import UrlScanner from "./pages/UrlScanner";
import EmailScanner from "./pages/EmailScanner";
import PasswordChecker from "./pages/PasswordChecker";
import DomainChecker from "./pages/DomainChecker";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/url-scanner" element={<UrlScanner />} />
        <Route path="/email-scanner" element={<EmailScanner />} />
        <Route path="/password-checker" element={<PasswordChecker />} />
        <Route path="/domain-checker" element={<DomainChecker />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}

export default App;