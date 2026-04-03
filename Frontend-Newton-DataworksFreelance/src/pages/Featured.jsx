const Featured = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] mobile-compact">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"></div>

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-[var(--accent-primary)] mr-2 animate-pulse"></span>
            Featured
          </div>
          <h1 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Featured Projects & Showcases
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Explore our latest success stories and featured data solutions. Discover how DataWorks helps organizations transform their data infrastructure and unlock actionable insights.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Featured;