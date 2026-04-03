import { Link } from 'react-router-dom';

const DataEngineering = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 px-4 mobile-compact">
      <div className="max-w-6xl mx-auto">
        <Link to="/services" className="inline-flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)] mb-8">
          ← Back to Services
        </Link>
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] mb-6">
            Data Engineering Services
          </div>
          <h1 className="text-xl lg:text-2xl font-bold text-highlight mb-4">
            Robust Data Engineering Solutions
          </h1>
          <p className="text-xl text-[var(--text-muted)] max-w-3xl mx-auto">
            Build scalable data pipelines, clean messy data, connect APIs, and create PowerBI dashboards for Zimbabwe businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
              Complete Data Engineering
            </h2>
            <div className="space-y-6">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Data Pipelines</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Apache Airflow orchestration for ETL/ELT workflows from POS systems, ERP, and custom APIs
                </p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">Data Cleaning</h3>
                <p className="text-sm text-[var(--text-secondary)]">
                  Automated data quality pipelines handling missing values, duplicates, and Zimbabwe-specific data formats
                </p>
              </div>
            </div>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85" 
              alt="Data Engineering Pipeline Visualization"
              className="w-full h-80 object-cover rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* Data Engineering Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div className="group">
            <img 
              src="https://images.unsplash.com/photo-1609921141835-710b7fa6e438?w=1000&q=85" 
              alt="ETL Data Pipeline"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">ETL Pipeline Architecture</p>
          </div>
          <div className="group">
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1000&q=85" 
              alt="Database Connections"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Database Integration</p>
          </div>
          <div className="group">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85" 
              alt="PowerBI Dashboard"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Business Intelligence Dashboard</p>
          </div>
          <div className="group">
            <img 
              src="https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1000&q=85" 
              alt="API Integration"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">API Data Connections</p>
          </div>
          <div className="group">
            <img 
              src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=1000&q=85" 
              alt="Data Cleaning Process"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Data Quality Processing</p>
          </div>
          <div className="group md:col-span-2 lg:col-span-1">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1000&q=85" 
              alt="Data Warehouse"
              className="w-full h-64 object-cover rounded-xl shadow-xl group-hover:shadow-2xl transition-all"
            />
            <p className="text-sm text-[var(--text-secondary)] mt-2 text-center">Data Warehouse Architecture</p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">🔌</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">API Integration</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Connect Zimbabwe payment gateways (EcoCash, OneMoney), ERP systems, and third-party APIs
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">🧹</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Data Cleaning</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Handle messy POS data, duplicate records, and inconsistent formats from multiple sources
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-xl">
            <div className="text-3xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">PowerBI Dashboards</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Interactive PowerBI dashboards with mobile access for business owners and managers
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link to="/jobs" className="inline-flex items-center gap-2 px-8 py-4 polidhed-dark-green-btn font-semibold rounded-lg">
            View Data Engineering Jobs
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataEngineering;

