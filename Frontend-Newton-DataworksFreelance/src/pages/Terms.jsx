const Terms = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Terms of Service</h1>
          <p className="text-[var(--text-muted)]">Last updated: March 2024</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. Acceptance of Terms</h2>
            <p className="text-[var(--text-muted)]">
              By accessing or using DataWorks platform and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. Description of Service</h2>
            <p className="text-[var(--text-muted)]">
              DataWorks provides a platform connecting data professionals with companies seeking data engineering, analytics, and science talent. We also offer consulting services, project-based work, and internship programs.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. User Accounts</h2>
            <p className="text-[var(--text-muted)] mb-4">To use certain features of our service, you must create an account. You agree to:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. User Conduct</h2>
            <p className="text-[var(--text-muted)] mb-4">You agree not to:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Transmit harmful or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Interfere with the proper functioning of the service</li>
              <li>Engage in fraudulent or deceptive practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Intellectual Property</h2>
            <p className="text-[var(--text-muted)]">
              All content, features, and functionality of our platform are owned by DataWorks and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express permission.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Payment Terms</h2>
            <p className="text-[var(--text-muted)]">
              Payment terms are specified in individual agreements. All fees are non-refundable unless otherwise stated. We reserve the right to modify our pricing with reasonable notice.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Limitation of Liability</h2>
            <p className="text-[var(--text-muted)]">
              To the maximum extent permitted by law, DataWorks shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. Indemnification</h2>
            <p className="text-[var(--text-muted)]">
              You agree to indemnify and hold harmless DataWorks from any claims, damages, or expenses arising from your use of our services or violation of these terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">9. Termination</h2>
            <p className="text-[var(--text-muted)]">
              We may terminate or suspend your account at any time, with or without cause, with or without notice. Upon termination, your right to use our services will immediately cease.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">10. Changes to Terms</h2>
            <p className="text-[var(--text-muted)]">
              We reserve the right to modify these terms at any time. We will notify you of any material changes by posting the new terms on this page. Your continued use of our services after such modifications constitutes acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">11. Contact Us</h2>
            <p className="text-[var(--text-muted)]">
              If you have any questions about these Terms of Service, please contact us at legal@dataworks.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Terms
