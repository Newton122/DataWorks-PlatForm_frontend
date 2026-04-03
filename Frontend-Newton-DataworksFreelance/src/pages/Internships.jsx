import { Link } from 'react-router-dom'

const Internships = () => {
  const internships = [
    {
      id: 1,
      title: "Data Engineering Intern",
      duration: "6 months",
      location: "Remote",
      description: "Work on real-world data pipelines and learn industry best practices from experienced engineers.",
      requirements: ["Currently pursuing CS or related field", "Basic knowledge of Python and SQL", "Strong problem-solving skills"],
      responsibilities: ["Assist in building ETL pipelines", "Write data quality tests", "Document processes and procedures"]
    },
    {
      id: 2,
      title: "Data Science Intern",
      duration: "6 months",
      location: "Remote",
      description: "Apply machine learning techniques to solve business problems and gain hands-on experience.",
      requirements: ["Currently pursuing CS, Statistics, or related field", "Experience with Python and ML libraries", "Strong analytical skills"],
      responsibilities: ["Develop predictive models", "Perform exploratory data analysis", "Create data visualizations"]
    },
    {
      id: 3,
      title: "Data Analytics Intern",
      duration: "6 months",
      location: "Remote",
      description: "Learn to transform data into actionable insights and create impactful dashboards.",
      requirements: ["Currently pursuing Business, CS, or related field", "Experience with SQL and Excel", "Strong communication skills"],
      responsibilities: ["Build interactive dashboards", "Perform ad-hoc analysis", "Present findings to stakeholders"]
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Internship Programs</h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Launch your data career with our intensive 6-month internship program. Work on real projects and learn from industry experts.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {internships.map((internship) => (
            <div
              key={internship.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6 hover:border-[var(--accent-primary)] transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-[var(--accent-primary)] text-sm font-medium">{internship.duration}</span>
                <span className="text-[var(--text-muted)] text-sm">{internship.location}</span>
              </div>

              <h2 className="text-xl font-bold text-[var(--text-primary)] mb-3">{internship.title}</h2>
              <p className="text-[var(--text-muted)] mb-6">{internship.description}</p>

              <div className="mb-6">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Requirements</h3>
                <ul className="space-y-1">
                  {internship.requirements.map((req, index) => (
                    <li key={index} className="text-[var(--text-muted)] text-sm flex items-start">
                      <span className="text-[var(--accent-primary)] mr-2">•</span>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Responsibilities</h3>
                <ul className="space-y-1">
                  {internship.responsibilities.map((resp, index) => (
                    <li key={index} className="text-[var(--text-muted)] text-sm flex items-start">
                      <span className="text-[var(--accent-primary)] mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              <button className="w-full relative overflow-hidden text-white py-2 rounded-lg font-medium transition-all duration-300 polidhed-dark-green-btn" >
                <span className="block relative z-10">Apply Now</span>
                <span className="absolute inset-x-2 bottom-2 h-2 bg-[rgba(4,84,30,0.4)] rounded-full blur-sm"></span>
              </button>
            </div>
          ))}
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Why Join Our Internship Program?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">Real Projects</h3>
              <p className="text-[var(--text-muted)] text-sm">Work on actual client projects and build your portfolio with real-world experience.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">Mentorship</h3>
              <p className="text-[var(--text-muted)] text-sm">Get guidance from experienced data professionals who will help you grow.</p>
            </div>

            <div>
              <div className="w-12 h-12 bg-[var(--accent-primary)]/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-[var(--text-primary)] font-semibold mb-2">Career Path</h3>
              <p className="text-[var(--text-muted)] text-sm">Top performers may receive full-time offers to join our team.</p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            Have questions about our internship program?
          </p>
          <Link
            to="/contact"
            className="inline-block relative overflow-hidden text-white px-6 py-3 rounded-lg font-medium transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(16,127,58,0.95), rgba(16,113,55,0.85) 45%, rgba(22,102,52,0.75))',
              boxShadow: '0 16px 30px rgba(0,0,0,0.45)'
            }}
          >
            <span className="relative z-10">Contact Us</span>
            <span className="absolute inset-x-3 bottom-2 h-2 bg-[rgba(4,84,30,0.4)] rounded-full blur-sm"></span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Internships
