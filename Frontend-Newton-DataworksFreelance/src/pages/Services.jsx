import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const Services = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeService, setActiveService] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const mobileInitial = { opacity: 1, x: 0, y: 0, scale: 1 };
  const initialFor = (variants) => (isMobile ? false : variants);
  const fadeUp = isMobile ? false : { opacity: 0, y: 100 };
  const fadeLeft = isMobile ? false : { opacity: 0, x: -100 };
  const scaleIn = isMobile ? false : { opacity: 0, scale: 0.8 };

  // Motion component that renders as plain HTML on mobile, framer motion on desktop
  const MotionSection = ({ children, ...rest }) => {
    if (isMobile) return <section>{children}</section>;
    return <motion.section {...rest}>{children}</motion.section>;
  };

  const MotionSectionNoAnimate = ({ children, ...rest }) => {
    return isMobile ? <section {...rest}>{children}</section> : <motion.div {...rest}>{children}</motion.div>;
  };

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleViewPricing = () => {
    navigate('/about');
  };

  const services = [
    {
      icon: "⚡",
      title: "Data Engineering",
      description: "Build scalable data pipelines with Apache Spark, Kafka, and Airflow. We design and implement enterprise-grade data infrastructure that processes millions of events daily.",
      features: [
        "Real-time data streaming with Kafka",
        "Batch processing with Apache Spark",
        "Workflow orchestration with Airflow",
        "Data quality and validation",
        "Performance optimization"
      ],
      technologies: ["Spark", "Kafka", "Airflow", "Python", "SQL"]
    },
    {
      icon: "📊",
      title: "Data Analytics",
      description: "Transform raw data into actionable insights. Our analytics team creates interactive dashboards and reports that drive business decisions.",
      features: [
        "Interactive dashboard development",
        "Ad-hoc analysis and reporting",
        "KPI tracking and monitoring",
        "Data storytelling",
        "Self-service analytics"
      ],
      technologies: ["Tableau", "Power BI", "Looker", "SQL", "Python"]
    },
    {
      icon: "🤖",
      title: "Machine Learning",
      description: "Develop and deploy ML models for predictive analytics, recommendation systems, and automation. We bring AI from prototype to production.",
      features: [
        "Predictive modeling",
        "Recommendation systems",
        "Natural language processing",
        "Computer vision",
        "MLOps and deployment"
      ],
      technologies: ["TensorFlow", "PyTorch", "Scikit-learn", "Python", "Docker"]
    },
    {
      icon: "📈",
      title: "Data Visualization",
      description: "Create stunning visualizations that make complex data understandable. We design charts, graphs, and interactive displays that tell your data story.",
      features: [
        "Custom chart development",
        "Interactive dashboards",
        "Real-time data displays",
        "Mobile-responsive designs",
        "Accessibility compliance"
      ],
      technologies: ["D3.js", "Tableau", "Power BI", "React", "Vega-Lite"]
    },
    {
      icon: "🏗️",
      title: "Data Warehousing",
      description: "Design and implement modern data warehouses on Snowflake, BigQuery, and Redshift. We build scalable, cost-effective data storage solutions.",
      features: [
        "Schema design and modeling",
        "ETL/ELT pipeline development",
        "Performance tuning",
        "Cost optimization",
        "Data governance"
      ],
      technologies: ["Snowflake", "BigQuery", "Redshift", "dbt", "Airflow"]
    },
    {
      icon: "🔄",
      title: "ETL Development",
      description: "Extract, transform, and load data from multiple sources efficiently. We build reliable data integration pipelines that keep your data fresh.",
      features: [
        "Multi-source data integration",
        "Data transformation logic",
        "Error handling and recovery",
        "Incremental loading",
        "Data lineage tracking"
      ],
      technologies: ["Informatica", "Talend", "Airflow", "Python", "SQL"]
    },
    {
      icon: "🌾",
      title: "Agriculture Data",
      description: "Crop insights, yield prediction, and farm management analytics for Zimbabwe farmers.",
      link: "/industry/agriculture",
      features: ["Weather analytics", "Satellite NDVI", "Maize yield prediction"]
    },
    {
      icon: "🏪",
      title: "Small Business Analytics",
      description: "Sales forecasting and customer insights for SMEs in Harare & Bulawayo.",
      link: "/industry/small-business",
      features: ["Cash flow prediction", "Inventory optimization", "Customer 360"]
    },
    {
      icon: "🔐",
      title: "Security AI/ML",
      description: "Prediction systems for sales, demand, risk, and recommendations.",
      link: "/industry/security-ai",
      features: ["Sales prediction", "Risk assessment", "Recommendation engines"]
    },
    {
      icon: "⚙️",
      title: "Data Engineering",
      description: "Build pipelines, clean messy data, connect APIs, PowerBI dashboards.",
      link: "/industry/data-engineering",
      features: ["API integration", "Data cleaning", "PowerBI dashboards"]
    }
  ];

  const pricingPlans = [

    {
      name: "Starter",
      price: "$2,500",
      period: "/month",
      description: "Perfect for small teams and startups",
      features: [
        "Up to 5 data pipelines",
        "Basic analytics dashboards",
        "Email support",
        "Monthly reporting",
        "Standard SLA"
      ],
      popular: false
    },
    {
      name: "Professional",
      price: "$7,500",
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 20 data pipelines",
        "Advanced analytics & ML",
        "Priority support",
        "Weekly reporting",
        "Enhanced SLA",
        "Dedicated account manager"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "",
      description: "For large organizations with complex needs",
      features: [
        "Unlimited data pipelines",
        "Full ML & AI capabilities",
        "24/7 dedicated support",
        "Real-time reporting",
        "Premium SLA",
        "On-site team integration",
        "Custom integrations"
      ],
      popular: false
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)] overflow-x-hidden">

      {/* Hero Section */}
      <MotionSection
        initial={fadeUp}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative py-12 md:py-20 lg:py-24 px-3 sm:px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-var(--bg-primary) via-var(--bg-secondary) to-var(--bg-primary)"></div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center px-3 py-1.5 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-medium mb-6">
            <span className="w-2 h-2 bg-[var(--accent-primary)] mr-2 animate-pulse"></span>
            DataWorks Agency Services
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-highlight mb-4">
            Enterprise Data Solutions
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto mb-6 md:mb-8">
            End-to-end data engineering, analytics, and machine learning services 
            that transform your business intelligence and drive growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-4 md:px-6 py-2 md:py-2.5 polidhed-dark-green-btn font-semibold text-sm md:text-base backdrop-blur-sm bg-opacity-90"
            >
              Get Started Free
            </button>
            <button
              onClick={handleViewPricing}
              className="px-4 md:px-6 py-2 md:py-2.5 backdrop-blur-md bg-white/10 border border-white/20 text-white font-semibold hover:bg-white/20 transition-all text-sm md:text-base"
            >
              View Pricing
            </button>
          </div>
        </div>
      </MotionSection>

      {/* Services Grid */}
      <MotionSection
        initial={fadeLeft}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Our Services
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Comprehensive data solutions tailored to your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{services.map((service, index) => {
              const isIndustry = service.link;
              return (
                <Link 
                  key={index}
                  to={isIndustry ? service.link : '#'}
                  className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 transition-all hover:border-[var(--accent-primary)] hover:shadow-lg cursor-pointer block ${
                    activeService === index ? 'border-[var(--accent-primary)] shadow-lg shadow-[var(--accent-primary)]/10' : ''
                  }`}
                  onClick={(e) => !isIndustry && setActiveService(index)}
                >
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{service.title}</h3>
                  <p className="text-sm text-[var(--text-muted)] mb-4">{service.description}</p>
                  {service.technologies && (
                    <div className="flex flex-wrap gap-2">
                      {service.technologies.slice(0, 3).map((tech, i) => (
                        <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--accent-primary)]">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  {isIndustry && (
                    <div className="mt-4 pt-4 border-t border-[var(--border-color)]">
                      <span className="text-xs text-[var(--accent-primary)]">Learn More →</span>
                    </div>
                  )}
                </Link>
              );
            })}

          </div>
        </div>
      </MotionSection>

      {/* Service Details */}
      <MotionSection
        initial={scaleIn}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
            <div>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
                {services[activeService].title}
              </h2>
              <p className="text-sm md:text-sm text-[var(--text-muted)] mb-6">
                {services[activeService].description}
              </p>
              <div className="space-y-3">
                {services[activeService].features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-4 h-4 md:w-5 md:h-5 bg-[var(--accent-primary)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-[var(--text-primary)]">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6">
              <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)] mb-4">Technologies We Use</h3>
              <div className="flex flex-wrap gap-2 md:gap-3">
                {services[activeService].technologies.map((tech, index) => (
                  <span key={index} className="px-3 md:px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs md:text-sm text-[var(--accent-primary)] font-medium">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-3">Why Choose Us?</h4>
                <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                  <li>• 10+ years of industry experience</li>
                  <li>• 500+ successful projects delivered</li>
                  <li>• 98% client satisfaction rate</li>
                  <li>• 24/7 support available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </MotionSection>

      {/* Pricing Section */}
      <MotionSection
        initial={fadeLeft}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Choose the plan that fits your business needs
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 relative flex flex-col h-full ${
                  plan.popular ? 'border-[var(--accent-primary)] shadow-lg shadow-[var(--accent-primary)]/10' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="px-3 py-1 bg-[var(--accent-primary)] text-white text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[var(--accent-primary)]">{plan.price}</span>
                  <span className="text-sm text-[var(--text-muted)]">{plan.period}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-6 flex-grow">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                      <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={handleGetStarted}
                  className={`w-full py-2 text-sm font-semibold transition-colors mt-auto ${
                    plan.popular
                      ? 'bg-[var(--accent-primary)] text-white hover:bg-[var(--accent-hover)]'
                      : 'border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
                  }`}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </MotionSection>

      {/* CTA Section */}
      <MotionSection
        initial={scaleIn}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)]"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-4">
            Ready to Transform Your Data Infrastructure?
          </h2>
          <p className="text-sm text-[var(--text-muted)] mb-8 max-w-2xl mx-auto">
            Join 500+ companies that trust DataWorks Agency for their data engineering needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-[var(--accent-primary)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors"
            >
              Start Free Trial
            </button>
            <button
              onClick={() => navigate('/jobs')}
              className="px-8 py-3 border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              Browse Jobs
            </button>
          </div>
        </div>
      </MotionSection>
    </div>
  );
};

export default Services;
