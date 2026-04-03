import { Link } from 'react-router-dom'

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Getting Started with Apache Spark for Data Engineering",
      excerpt: "Learn the fundamentals of Apache Spark and how to build scalable data pipelines for your organization.",
      date: "April 10, 2026",
      category: "Data Engineering",
      readTime: "8 min read"
    },
    {
      id: 2,
      title: "Best Practices for Data Quality in ETL Pipelines",
      excerpt: "Discover essential strategies for maintaining high data quality throughout your ETL processes.",
      date: "March 28, 2026",
      category: "Data Quality",
      readTime: "6 min read"
    },
    {
      id: 3,
      title: "Introduction to Machine Learning with Python",
      excerpt: "A beginner's guide to machine learning concepts and practical implementation using Python.",
      date: "March 20, 2026",
      category: "Machine Learning",
      readTime: "10 min read"
    },
    {
      id: 4,
      title: "Building Real-time Dashboards with Tableau",
      excerpt: "Step-by-step guide to creating interactive and real-time dashboards for business intelligence.",
      date: "March 15, 2026",
      category: "Data Visualization",
      readTime: "7 min read"
    },
    {
      id: 5,
      title: "Cloud Data Warehousing: Snowflake vs BigQuery",
      excerpt: "Compare two leading cloud data warehouse solutions and choose the right one for your needs.",
      date: "March 5, 2026",
      category: "Cloud Computing",
      readTime: "9 min read"
    },
    {
      id: 6,
      title: "Data Governance: A Complete Guide",
      excerpt: "Understand the importance of data governance and how to implement it in your organization.",
      date: "February 25, 2026",
      category: "Data Governance",
      readTime: "11 min read"
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Blog</h1>
          <p className="text-[var(--text-muted)] text-lg max-w-2xl mx-auto">
            Insights, tutorials, and best practices from our data engineering and analytics experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden hover:border-[var(--accent-primary)] transition-colors"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[var(--accent-primary)] text-sm font-medium">{post.category}</span>
                  <span className="text-[#64748B] text-sm">{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-3 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-[var(--text-muted)] mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#64748B] text-sm">{post.date}</span>
                  <button className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] text-sm font-medium">
                    Read More →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            Want to contribute? We're always looking for guest writers.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-[var(--accent-primary)] text-white px-6 py-3 rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Blog
