import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] mobile-compact">

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-bg-primary via-bg-secondary to-bg-primary fade-in">

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-medium">
                <span className="w-2 h-2 bg-[var(--accent-primary)] mr-2 animate-pulse"></span>
                About DataWorks
              </div>
              <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                About Newton DataWorks
              </h1>
              <p className="text-sm lg:text-base text-[var(--text-secondary)] max-w-lg leading-relaxed">
                We're building the bridge between raw data chaos and production-ready intelligence. DataWorks is a specialized ecosystem designed to solve the data engineering crisis through expert talent and cutting-edge infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => navigate('/signup')}
                  className="px-6 py-3 bg-[rgba(59,130,246,0.1)] text-[var(--accent-primary)] font-semibold border border-[var(--accent-primary)]/20 backdrop-blur-md hover:bg-[rgba(59,130,246,0.15)] transition-all duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
                >
                  Join Our Team
                </button>
                <button
                  onClick={() => navigate('/team')}
                  className="px-6 py-3 bg-[rgba(168,85,247,0.08)] text-[var(--text-primary)] font-semibold border border-[var(--text-primary)]/10 backdrop-blur-md hover:bg-[rgba(168,85,247,0.12)] transition-all duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
                >
                  Meet the Team
                </button>
                <button
                  onClick={() => navigate('/featured')}
                  className="px-6 py-3 bg-[rgba(34,197,94,0.08)] text-green-400 font-semibold border border-green-400/10 backdrop-blur-md hover:bg-[rgba(34,197,94,0.12)] transition-all duration-200 shadow-[0_20px_60px_rgba(0,0,0,0.8)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.9)]"
                >
                  Featured Work
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-[var(--bg-primary)] space-y-16">
        
        {/* Vision Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">The Vision</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                DataWorks was founded on a single premise: Data infrastructure should be invisible. In an era where AI and Big Data move at light-speed, many organizations are still stuck in "Excel-hell" or struggling with manual pipelines.
              </p>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                We are building the bridge between raw chaos and production-ready intelligence. Our mission is to transform how enterprises approach data engineering and how talent enters the industry.
              </p>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-8 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/30">
                    <span className="text-lg font-bold text-[var(--accent-primary)]">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">Data Infrastructure</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Invisible, robust, and production-grade</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/30">
                    <span className="text-lg font-bold text-[var(--accent-primary)]">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">Talent Pipeline</h4>
                    <p className="text-sm text-[var(--text-secondary)]">From university to industry experience</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)]/10 flex items-center justify-center flex-shrink-0 border border-[var(--accent-primary)]/30">
                    <span className="text-lg font-bold text-[var(--accent-primary)]">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--text-primary)] mb-1">AI Integration</h4>
                    <p className="text-sm text-[var(--text-secondary)]">Models from notebooks to production</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* What is this Platform */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-8 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)] order-2 lg:order-1">
              <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-6">For Businesses</h3>
              <p className="text-[var(--text-secondary)] mb-4">A gateway to high-end Data Engineering, AI/ML deployment, and niche analytics across Agriculture, FinTech, and Security sectors.</p>
              <ul className="space-y-2">
                <li className="flex gap-2 text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-primary)]">•</span>
                  <span>Enterprise data pipelines</span>
                </li>
                <li className="flex gap-2 text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-primary)]">•</span>
                  <span>AI/ML model deployment</span>
                </li>
                <li className="flex gap-2 text-[var(--text-secondary)]">
                  <span className="text-[var(--accent-primary)]">•</span>
                  <span>Domain-specific solutions</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6 order-1 lg:order-2">
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">What is DataWorks?</h2>
              <p className="text-[var(--text-secondary)] leading-relaxed">
                DataWorks is a specialized ecosystem in its development phase, designed to solve two major problems in the tech industry.
              </p>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-6 backdrop-blur-sm">
                <h4 className="font-semibold text-[var(--text-primary)] mb-3">For Talent</h4>
                <p className="text-[var(--text-secondary)] text-sm">A dedicated marketplace and academy where the next generation of Data Engineers and ML experts can move from theory to production-grade experience.</p>
              </div>
            </div>
          </div>

          {/* Honest Status */}
          <div className="bg-gradient-to-r from-[var(--accent-primary)]/5 to-purple-500/5 border border-[var(--accent-primary)]/20 p-8 backdrop-blur-sm shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Our Honest Status</h2>
            <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
              We believe in the same transparency we bring to our data. Newton DataWorks is in v1.0 Prototyping Phase. Every dashboard, real-time pipeline, and AI agent you see here is a living blueprint of our future service model.
            </p>
            <div className="bg-[var(--bg-secondary)]/50 border-l-2 border-[var(--accent-primary)]/40 px-6 py-4">
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                We are currently refining our MERN-stack architecture and Socket.io communication layers to ensure that when we go fully live, the infrastructure is as robust as the data it carries.
              </p>
            </div>
          </div>

          {/* What We Do */}
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">What We Do</h2>
              <p className="text-[var(--text-secondary)]">The Pillars of Our Service</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-6 backdrop-blur-sm hover:border-[var(--accent-primary)]/50 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[var(--accent-primary)]">01</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Production Data Engineering</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Building billion-row pipelines and ETL orchestrations that don't break. Enterprise-grade infrastructure designed for scale.
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-6 backdrop-blur-sm hover:border-[var(--accent-primary)]/50 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[var(--accent-primary)]">02</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">AI/ML Deployment</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Moving models out of notebooks and into the real world with LangChain and Vector DBs. Production-ready machine learning.
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]/30 p-6 backdrop-blur-sm hover:border-[var(--accent-primary)]/50 transition-all duration-300 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                <div className="w-12 h-12 bg-[var(--accent-primary)]/10 border border-[var(--accent-primary)]/30 flex items-center justify-center mb-4">
                  <span className="text-xl font-bold text-[var(--accent-primary)]">03</span>
                </div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">Talent Fellowship</h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                  Bridging university computer science and industry DevOps through intensive, project-based internships.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-[var(--text-primary)] mb-6">
            Ready to Join the Data Revolution?
          </h2>
          <p className="text-base text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto leading-relaxed">
            Whether you're a data professional looking for opportunities or a company seeking world-class talent, Newton DataWorks is your partner in building the future of data engineering.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/jobs')}
              className="px-8 py-3 bg-[rgba(59,130,246,0.12)] text-[var(--accent-primary)] font-semibold border border-[var(--accent-primary)]/30 backdrop-blur-md hover:bg-[rgba(59,130,246,0.18)] transition-all duration-200 shadow-[0_25px_70px_rgba(0,0,0,0.85)] hover:shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
            >
              Browse Jobs
            </button>
            <button
              onClick={() => navigate('/signup')}
              className="px-8 py-3 bg-[rgba(168,85,247,0.1)] text-[var(--text-primary)] font-semibold border border-[var(--text-primary)]/15 backdrop-blur-md hover:bg-[rgba(168,85,247,0.15)] transition-all duration-200 shadow-[0_25px_70px_rgba(0,0,0,0.85)] hover:shadow-[0_35px_100px_rgba(0,0,0,0.95)]"
            >
              Create Account
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
