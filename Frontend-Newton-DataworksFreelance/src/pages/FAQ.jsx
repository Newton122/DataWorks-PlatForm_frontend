import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: "What services does DataWorks offer?",
      answer: "DataWorks offers a comprehensive range of data services including data engineering, data analytics, machine learning, data visualization and business intelligence. We help companies build scalable data pipelines, create insightful dashboards, and implement ML solutions."
    },
    {
      question: "How do I post a job on DataWorks?",
      answer: "To post a job, you need to create an employer account and navigate to the 'Post a Job' section in your dashboard. Fill in the job details including title, description, requirements and salary range. Once submitted, your job will be reviewed and published within 24 hours."
    },
    {
      question: "What is the hiring process like?",
      answer: "Our hiring process typically involves: 1) Application review, 2) Initial screening call, 3) Technical assessment, 4) Interview with the hiring manager and 5) Final offer. The entire process usually takes 2-3 weeks."
    },
    {
      question: "Do you offer remote positions?",
      answer: "Yes! Many of our positions are fully remote. We believe in flexible work arrangements and have team members working from various locations worldwide. Each job listing specifies whether it's remote, hybrid or on-site."
    },
    {
      question: "What technologies do you work with?",
      answer: "We work with a wide range of modern data technologies including Apache Spark, Kafka, Airflow, Snowflake, BigQuery, Python, SQL, TensorFlow, PyTorch, Tableau, Power BI and many more. Our tech stack is constantly evolving to stay current with industry trends."
    },
    {
      question: "How can I apply for an internship?",
      answer: "Internship applications are accepted on a rolling basis. Visit our Internships page to view current openings and submit your application. We offer 6-month intensive programs in data engineering, data science and data analytics."
    },
    {
      question: "What is the typical project timeline?",
      answer: "Project timelines vary based on scope and complexity. Small projects may take 2-4 weeks, while larger enterprise implementations can take 3-6 months. We work closely with clients to establish realistic timelines and deliver milestones on schedule."
    },
    {
      question: "Do you provide ongoing support after project completion?",
      answer: "Yes, we offer various support packages including maintenance, monitoring and optimization services. We can also provide training for your team to ensure they can manage and extend the solutions we build."
    },
    {
      question: "How do you ensure data security?",
      answer: "Data security is our top priority. We implement industry-standard security practices including encryption at rest and in transit, access controls, regular security audits and compliance with regulations like GDPR and HIPAA when required."
    },
    {
      question: "What are your pricing models?",
      answer: "We offer flexible pricing models including fixed-price projects, time and materials and retainer agreements. Pricing depends on project scope, complexity, and timeline. Contact us for a customized quote based on your specific needs."
    }
  ]

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-highlight mb-4">Frequently Asked Questions</h1>
          <p className="text-[var(--text-muted)] text-lg">
            Find answers to common questions about our services, hiring process, and more.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden"
            >
              <motion.button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.15 }}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-[var(--border-color)] transition-colors"
              >
                <span className="text-[var(--text-primary)] font-medium">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-[var(--accent-primary)] transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
              {openIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-[var(--text-muted)]">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-[var(--text-muted)] mb-4">
            Still have questions? We're here to help.
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

export default FAQ
