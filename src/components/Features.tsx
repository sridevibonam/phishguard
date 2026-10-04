function Features() {
  const features = [
    {
      title: "URL Scanner",
      description: "Detect malicious and phishing URLs instantly.",
    },
    {
      title: "Email Scanner",
      description: "Analyze suspicious emails for phishing threats.",
    },
    {
      title: "Password Checker",
      description: "Check password strength and security.",
    },
    {
      title: "Domain Checker",
      description: "Verify domain reputation and trust score.",
    },
  ];

  return (
    <section className="bg-slate-900 text-white py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-12 text-cyan-400">
        Security Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-slate-800 p-6 rounded-xl shadow-lg hover:scale-105 transition"
          >
            <h3 className="text-2xl font-semibold mb-4">
              {feature.title}
            </h3>

            <p className="text-gray-400">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;