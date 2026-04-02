import { Link } from 'react-router-dom';

const Agriculture = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8">
          ← Back to Services
        </Link>

        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] mb-6">
            Agriculture Data Analytics
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-highlight mb-4">
            Precision Farming & Agricultural Intelligence
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Advanced analytics for crop yield prediction, livestock management, and farm optimization in Zimbabwe
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] text-center mb-8">
            Agricultural Solutions Gallery
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="group">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85" alt="Agricultural Data Analytics Dashboard" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Agro Data Analytics</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Livestock Data Management System" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Livestock Management</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1400&q=85" alt="Zimbabwe Farm Landscape" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Zimbabwe Agriculture</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" alt="Farm Analytics Dashboard" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Farm Analytics</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1602819123385-45e30a0ab73b?w=1000&q=85" alt="Agricultural Data Visualization" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Crop Data Charts</p>
            </div>
            <div className="group">
              <img src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=2000&q=85" alt="Zimbabwe Agricultural Fields" className="w-full h-48 object-cover rounded-lg shadow-lg group-hover:shadow-xl transition-shadow" />
              <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Zimbabwe Farming</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl text-center">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">92% Yield Accuracy</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Machine learning models predicting crop yields with high precision
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl text-center">
            <div className="text-3xl mb-4">🌾</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">+47% Maize Increase</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Optimized farming practices leading to higher yields
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl text-center">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">14 Days Early Warning</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Predictive analytics for weather and pest alerts
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-4 polidhed-dark-green-btn font-semibold rounded-lg">
            View Agriculture Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Agriculture;

