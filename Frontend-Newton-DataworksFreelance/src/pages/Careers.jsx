import { Link } from 'react-router-dom'

const Careers = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Careers at DataWorks</h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Join our team of data experts and help shape the future of data engineering and analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Sample Job Cards */}
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 hover:border-[var(--accent-primary)] transition-colors">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Senior Data Engineer</h3>
            <p className="text-[var(--text-muted)] mb-4">Build scalable data pipelines and infrastructure.</p>
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-primary)] text-sm">Full-time</span>
              <Link to="/jobs" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-sm">
                View Details →
              </Link>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 hover:border-[var(--accent-primary)] transition-colors">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Data Scientist</h3>
            <p className="text-[var(--text-muted)] mb-4">Develop ML models and analytics solutions.</p>
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-primary)] text-sm">Full-time</span>
              <Link to="/jobs" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-sm">
                View Details →
              </Link>
            </div>
          </div>

          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 hover:border-[var(--accent-primary)] transition-colors">
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">Analytics Engineer</h3>
            <p className="text-[var(--text-muted)] mb-4">Transform data into actionable insights.</p>
            <div className="flex items-center justify-between">
              <span className="text-[var(--accent-primary)] text-sm">Full-time</span>
              <Link to="/jobs" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-sm">
                View Details →
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            Don't see the right role? We're always looking for talented individuals.
          </p>
          <Link
            to="/contact"
            className="btn btn-primary"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Careers
