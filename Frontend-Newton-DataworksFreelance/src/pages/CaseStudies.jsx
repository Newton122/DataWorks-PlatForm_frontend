import { Link } from 'react-router-dom'

const CaseStudies = () => {
  const caseStudies = [
    {
      id: 1,
      title: "E-commerce Data Pipeline Transformation",
      client: "Major Retail Company",
      description: "Built a real-time data pipeline processing 10M+ events daily, reducing data latency from hours to seconds.",
      results: ["95% reduction in data latency", "3x faster query performance", "$2M annual cost savings"],
      technologies: ["Apache Spark", "Kafka", "Airflow", "Snowflake"]
    },
    {
      id: 2,
      title: "Healthcare Analytics Platform",
      client: "Healthcare Provider Network",
      description: "Developed an analytics platform for patient outcomes analysis and predictive modeling.",
      results: ["40% improvement in patient outcomes", "Real-time monitoring", "HIPAA compliant"],
      technologies: ["Python", "TensorFlow", "Tableau", "PostgreSQL"]
    },
    {
      id: 3,
      title: "Financial Data Warehouse Modernization",
      client: "Investment Bank",
      description: "Migrated legacy data warehouse to cloud-native solution, improving performance and scalability.",
      results: ["60% cost reduction", "10x faster reporting", "99.9% uptime"],
      technologies: ["BigQuery", "dbt", "Airflow", "Looker"]
    },
    {
      id: 4,
      title: "Supply Chain Optimization",
      client: "Logistics Company",
      description: "Implemented ML-based demand forecasting and route optimization system.",
      results: ["25% reduction in delivery times", "30% cost savings", "Improved customer satisfaction"],
      technologies: ["Python", "Scikit-learn", "Apache Spark", "Power BI"]
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-highlight mb-4">Case Studies</h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Real-world examples of how we've helped companies transform their data infrastructure and achieve measurable results.
          </p>
        </div>

        <div className="space-y-8">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 hover:border-[var(--accent-primary)] transition-colors"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-2">{study.title}</h2>
                  <p className="text-[var(--accent-primary)] font-medium">{study.client}</p>
                </div>
              </div>

              <p className="text-[var(--text-muted)] mb-6 text-lg">{study.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold mb-3">Key Results</h3>
                  <ul className="space-y-2">
                    {study.results.map((result, index) => (
                      <li key={index} className="flex items-center text-[var(--text-muted)]">
                        <svg className="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {result}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-[var(--text-primary)] font-semibold mb-3">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--border-color)] text-[var(--text-muted)] rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] font-medium">
                  Read Full Case Study →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            Ready to achieve similar results for your business?
          </p>
          <Link
            to="/contact"
            className="btn btn-primary"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CaseStudies
