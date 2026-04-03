import { Link } from 'react-router-dom';

const SecurityAI = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 px-4 mobile-compact">
      <div className="max-w-6xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8">
          ← Back to Services
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] mb-6">
            Security AI & Machine Learning
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-highlight mb-4">
            Predictive Security & AI Systems
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Advanced prediction systems for sales forecasting, demand planning, risk assessment, and personalized recommendations
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              AI/ML Prediction Systems
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Sales Prediction</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  ML models predicting sales with 95% accuracy using historical data, seasonality, and economic indicators for Zimbabwe market
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Demand Forecasting</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Time series models optimizing inventory and supply chain for retail and manufacturing sectors
                </p>
              </div>
            </div>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="AI Cybersecurity Dashboard" className="w-full rounded-xl shadow-2xl" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Risk Assessment</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Credit risk scoring and fraud detection systems for financial institutions and SMEs
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Recommendation Engine</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Personalized product/service recommendations increasing conversion rates by 35%
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Anomaly Detection</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Real-time anomaly detection for cybersecurity and operational monitoring
            </p>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            AI Security Solutions Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Machine Learning Security Algorithms" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">ML Security Algorithms</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Cybersecurity Threat Detection" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Threat Detection Systems</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="AI Anomaly Detection Dashboard" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Anomaly Detection</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Predictive Analytics for Security" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Predictive Analytics</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Neural Networks for Cybersecurity" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Neural Networks</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Risk Assessment AI Models" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Risk Assessment Models</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-4 polidhed-dark-green-btn font-semibold rounded-lg">
            View AI/ML Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SecurityAI;

