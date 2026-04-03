const Cookies = () => {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-12 mobile-compact">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">Cookie Policy</h1>
          <p className="text-[var(--text-muted)]">Last updated: March 2024</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">1. What Are Cookies?</h2>
            <p className="text-[var(--text-muted)]">
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and to provide information to the owners of the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">2. How We Use Cookies</h2>
            <p className="text-[var(--text-muted)] mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li><strong className="text-[var(--text-primary)]">Essential Cookies:</strong> Required for the website to function properly</li>
              <li><strong className="text-[var(--text-primary)]">Analytics Cookies:</strong> Help us understand how visitors interact with our website</li>
              <li><strong className="text-[var(--text-primary)]">Functionality Cookies:</strong> Remember your preferences and settings</li>
              <li><strong className="text-[var(--text-primary)]">Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">3. Types of Cookies We Use</h2>
            
            <div className="space-y-6">
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Session Cookies</h3>
                <p className="text-[var(--text-muted)]">
                  These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you navigate through the website.
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Persistent Cookies</h3>
                <p className="text-[var(--text-muted)]">
                  These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and settings for future visits.
                </p>
              </div>

              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Third-Party Cookies</h3>
                <p className="text-[var(--text-muted)]">
                  These cookies are set by third-party services that appear on our pages, such as analytics providers and advertising networks.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">4. Specific Cookies We Use</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--border-color)]">
                    <th className="py-3 px-4 text-[var(--text-primary)] font-semibold">Cookie Name</th>
                    <th className="py-3 px-4 text-[var(--text-primary)] font-semibold">Purpose</th>
                    <th className="py-3 px-4 text-[var(--text-primary)] font-semibold">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--text-muted)]">
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="py-3 px-4">session_id</td>
                    <td className="py-3 px-4">Maintains user session</td>
                    <td className="py-3 px-4">Session</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="py-3 px-4">auth_token</td>
                    <td className="py-3 px-4">Authentication</td>
                    <td className="py-3 px-4">30 days</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="py-3 px-4">preferences</td>
                    <td className="py-3 px-4">User preferences</td>
                    <td className="py-3 px-4">1 year</td>
                  </tr>
                  <tr className="border-b border-[var(--border-color)]">
                    <td className="py-3 px-4">_ga</td>
                    <td className="py-3 px-4">Google Analytics</td>
                    <td className="py-3 px-4">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">_gid</td>
                    <td className="py-3 px-4">Google Analytics</td>
                    <td className="py-3 px-4">24 hours</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">5. Managing Cookies</h2>
            <p className="text-[var(--text-muted)] mb-4">
              You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience and some functionality may no longer be available.
            </p>
            <p className="text-[var(--text-muted)] mb-4">Most browsers allow you to:</p>
            <ul className="list-disc list-inside text-[var(--text-muted)] space-y-2 ml-4">
              <li>See what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from particular sites</li>
              <li>Block all cookies from being set</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">6. Browser-Specific Instructions</h2>
            <div className="space-y-4">
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Chrome</h3>
                <p className="text-[var(--text-muted)]">Settings → Privacy and security → Cookies and other site data</p>
              </div>
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Firefox</h3>
                <p className="text-[var(--text-muted)]">Options → Privacy & Security → Cookies and Site Data</p>
              </div>
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Safari</h3>
                <p className="text-[var(--text-muted)]">Preferences → Privacy → Manage Website Data</p>
              </div>
              <div className="bg-[var(--bg-primary)] p-4 rounded-lg">
                <h3 className="text-[var(--text-primary)] font-semibold mb-2">Edge</h3>
                <p className="text-[var(--text-muted)]">Settings → Cookies and site permissions → Cookies and site data</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">7. Updates to This Policy</h2>
            <p className="text-[var(--text-muted)]">
              We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">8. Contact Us</h2>
            <p className="text-[var(--text-muted)]">
              If you have any questions about this Cookie Policy, please contact us at privacy@dataworks.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Cookies
