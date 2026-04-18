const Privacy = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Privacy Policy</h1>
          <p className="text-[var(--text-muted)]">Last updated: April 2026</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Introduction</h2>
            <p className="text-[var(--text-muted)]">
              DataWorks ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose and safeguard your information when you use our platform and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Information We Collect</h2>
            <p className="text-[var(--text-muted)] mb-4">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>Name and contact information</li>
              <li>Email address</li>
              <li>Professional information and resume</li>
              <li>Payment information</li>
              <li>Communications with us</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. How We Use Your Information</h2>
            <p className="text-[var(--text-muted)] mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>Provide and maintain our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Improve our services and develop new features</li>
              <li>Protect against fraudulent or illegal activity</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Information Sharing</h2>
            <p className="text-[var(--text-muted)]">
              We do not sell your personal information. We may share your information with third parties only in the following circumstances: with your consent, to comply with legal obligations, to protect our rights, or with service providers who assist us in operating our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Data Security</h2>
            <p className="text-[var(--text-muted)]">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Your Rights</h2>
            <p className="text-[var(--text-muted)] mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Cookies</h2>
            <p className="text-[var(--text-muted)]">
              We use cookies and similar technologies to enhance your experience, analyze usage, and assist with our marketing efforts. You can control cookies through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. Changes to This Policy</h2>
            <p className="text-[var(--text-muted)]">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">9. Contact Us</h2>
            <p className="text-[var(--text-muted)]">
              If you have any questions about this Privacy Policy, please contact us at privacy@dataworks.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Privacy
