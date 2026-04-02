import { useState } from 'react';

const Overview = () => {
  const [activeTab, setActiveTab] = useState('tech');

  const technologies = [
    { name: 'React', description: 'Modern UI framework for building interactive interfaces', icon: '⚛️' },
    { name: 'Vite', description: 'Fast build tool and development server', icon: '⚡' },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework for rapid styling', icon: '🎨' },
    { name: 'Node.js', description: 'JavaScript runtime for server-side development', icon: '🟢' },
    { name: 'Express.js', description: 'Minimal web framework for Node.js', icon: '🚀' },
    { name: 'MongoDB', description: 'NoSQL database for flexible data storage', icon: '🍃' },
    { name: 'Socket.io', description: 'Real-time bidirectional communication', icon: '🔌' },
    { name: 'Framer Motion', description: 'Animation library for React', icon: '🎭' },
    { name: 'JWT', description: 'JSON Web Tokens for secure authentication', icon: '🔐' },
    { name: 'bcrypt', description: 'Password hashing for security', icon: '🛡️' },
    { name: 'Axios', description: 'HTTP client for API requests', icon: '📡' },
    { name: 'React Router', description: 'Declarative routing for React', icon: '🛣️' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Data Engineer at TechCorp',
      content: 'DataWorks transformed our data pipeline efficiency by 300%. The platform is intuitive and powerful.',
      avatar: 'SJ'
    },
    {
      name: 'Michael Chen',
      role: 'CTO at StartupXYZ',
      content: 'The AI integration features are game-changing. We\'ve reduced our development time by 60%.',
      avatar: 'MC'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Product Manager at DataFlow',
      content: 'Outstanding platform with excellent support. The web builder made our job posting process seamless.',
      avatar: 'ER'
    },
    {
      name: 'David Kim',
      role: 'Freelance Developer',
      content: 'As a freelancer, DataWorks has been invaluable. The job matching and messaging features are top-notch.',
      avatar: 'DK'
    }
  ];

  const upcomingFeatures = [
    {
      title: 'AI-Powered Job Matching',
      description: 'Advanced machine learning algorithms to match candidates with the perfect job opportunities based on skills, experience, and preferences.',
      icon: '🤖',
      status: 'In Development'
    },
    {
      title: 'Web Builder Integration',
      description: 'Drag-and-drop website builder for companies to create professional landing pages and job portals without coding.',
      icon: '🛠️',
      status: 'Beta Testing'
    },
    {
      title: 'Real-time Collaboration Tools',
      description: 'Integrated video calls, screen sharing, and collaborative coding environments for remote teams.',
      icon: '👥',
      status: 'Planning'
    },
    {
      title: 'Advanced Analytics Dashboard',
      description: 'Comprehensive analytics for job seekers and employers with insights on market trends and hiring patterns.',
      icon: '📊',
      status: 'In Development'
    },
    {
      title: 'Mobile App Launch',
      description: 'Native mobile applications for iOS and Android with offline capabilities and push notifications.',
      icon: '📱',
      status: 'Design Phase'
    },
    {
      title: 'Blockchain Integration',
      description: 'Secure credential verification and smart contract-based agreements for freelance work.',
      icon: '⛓️',
      status: 'Research'
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">

      {/* Hero Section */}
      <section className="relative py-12 md:py-20 lg:py-24 px-3 sm:px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-3 md:px-4 py-1.5 md:py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs md:text-sm font-medium mb-4 md:mb-6">
            <span className="w-2 h-2 bg-[var(--accent-primary)] mr-2 animate-pulse"></span>
            Platform Overview
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-highlight mb-3 md:mb-4">
            Built by Brighton & IO
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-3xl mx-auto mb-6 md:mb-8 px-2">
            A full-stack development collaboration bringing together expertise in modern web technologies,
            AI integration, and user experience design to create the future of data-driven platforms.
          </p>

          <div className="grid md:grid-cols-2 gap-4 md:gap-8 max-w-4xl mx-auto px-2">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6 rounded-lg">
              <div className="w-10 md:w-12 h-10 md:h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center mb-3 md:mb-4 mx-auto">
                <span className="text-white font-bold text-base md:text-lg">B</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)] mb-2">Brighton</h3>
              <p className="text-xs md:text-sm text-[var(--text-secondary)] mb-3">Full Stack Developer</p>
              <p className="text-xs md:text-sm text-[var(--text-muted)]">
                Expert in React, Node.js, and modern web architectures. Passionate about creating
                scalable solutions and exceptional user experiences.
              </p>
            </div>

            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6 rounded-lg">
              <div className="w-12 h-12 bg-[var(--accent-secondary)] rounded-full flex items-center justify-center mb-4 mx-auto">
                <span className="text-white font-bold text-lg">IO</span>
              </div>
              <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">IO</h3>
              <p className="text-[var(--text-secondary)] mb-3">AI & Integration Specialist</p>
              <p className="text-sm text-[var(--text-muted)]">
                Focused on AI integration, system architecture, and innovative technology solutions.
                Driving the future of intelligent platforms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Technology Stack
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Built with modern, scalable technologies to ensure performance, security, and maintainability.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, index) => (
              <div
                key={index}
                className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 rounded-lg hover:border-[var(--accent-primary)] transition-colors"
              >
                <div className="text-3xl mb-3">{tech.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{tech.name}</h3>
                <p className="text-sm text-[var(--text-muted)]">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-highlight mb-4">
              What Our Users Say
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              Hear from developers, companies, and freelancers who have transformed their workflow with DataWorks.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 rounded-lg"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[var(--accent-primary)] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-[var(--text-primary)] mb-3 italic">"{testimonial.content}"</p>
                    <div>
                      <p className="font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                      <p className="text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Features Section */}
      <section className="py-16 px-4 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
              Upcoming Features
            </h2>
            <p className="text-[var(--text-muted)] max-w-2xl mx-auto">
              We're constantly innovating to bring you cutting-edge features that will revolutionize
              how you work with data and development.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-[var(--bg-primary)] border border-[var(--border-color)] p-6 rounded-lg hover:border-[var(--accent-primary)] transition-colors"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{feature.description}</p>
                <div className="inline-flex items-center px-3 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--accent-primary)] rounded-full">
                  {feature.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-[var(--bg-primary)]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Experience the Future?
          </h2>
          <p className="text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
            Join thousands of developers and companies already using DataWorks to build amazing things.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-6 py-2 polidhed-dark-green-btn font-semibold text-sm">
              Get Started Today
            </button>
            <button className="px-6 py-2 bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold hover:bg-white/20 transition-colors text-sm">
              Learn More
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Overview;