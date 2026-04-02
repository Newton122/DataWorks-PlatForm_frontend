import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedTechIndex, setSelectedTechIndex] = useState(null);

  // Technology items for carousel
  const techRow1 = [
    { name: "Apache Spark", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Apache Kafka", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Apache Airflow", logo: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Snowflake", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "BigQuery", logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "AWS", logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  const techRow2 = [
    { name: "Azure", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "GCP", logo: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Python", logo: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "TensorFlow", logo: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "PyTorch", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Tableau", logo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  const techRow3 = [
    { name: "Power BI", logo: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Looker", logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "dbt", logo: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "Docker", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "PostgreSQL", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" },
    { name: "MongoDB", logo: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" }
  ];

  const [row1, setRow1] = useState(techRow1);
  const [row2, setRow2] = useState(techRow2);
  const [row3, setRow3] = useState(techRow3);

  const swapTech = (rowSetter, index1, index2, row) => {
    const newRow = [...row];
    [newRow[index1], newRow[index2]] = [newRow[index2], newRow[index1]];
    rowSetter(newRow);
  };

  const handleTechClick = (rowNum, index) => {
    if (selectedTechIndex === null) {
      setSelectedTechIndex({ row: rowNum, index });
    } else if (selectedTechIndex.row === rowNum) {
      swapTech(
        rowNum === 1 ? setRow1 : rowNum === 2 ? setRow2 : setRow3,
        selectedTechIndex.index,
        index,
        rowNum === 1 ? row1 : rowNum === 2 ? row2 : row3
      );
      setSelectedTechIndex(null);
    } else {
      setSelectedTechIndex({ row: rowNum, index });
    }
  };

  const heroSlides = [
    {
      title: "DataWorks Agency",
      subtitle: "Enterprise Data Engineering & Analytics Solutions",
      description: "We build scalable data pipelines, ML models, and analytics platforms that transform your business intelligence.",
      cta: "Start Free Trial",
      secondaryCta: "View Case Studies"
    },
    {
      title: "Expert Data Engineers",
      subtitle: "Hire Top 1% Data Talent",
      description: "Access pre-vetted data engineers, scientists, and analysts ready to accelerate your data initiatives.",
      cta: "Browse Talent",
      secondaryCta: "Post a Job"
    },
    {
      title: "Internship Programs",
      subtitle: "Launch Your Data Career",
      description: "Join our 6-month intensive internship program and work on real-world data projects with industry mentors.",
      cta: "Apply Now",
      secondaryCta: "Learn More"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleGetStarted = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleViewDemo = () => {
    navigate('/services');
  };

  const handleSignIn = () => {
    navigate('/login');
  };

  const handleCreateAccount = () => {
    navigate('/signup');
  };

  const handleDeployNow = () => {
    if (user) {
      navigate('/dashboard');
    } else {
      navigate('/signup');
    }
  };

  const handleJoinTeam = () => {
    navigate('/signup');
  };

  const handleOurWork = () => {
    navigate('/about');
  };

  const caseStudies = [
    {
      title: "E-Commerce Data Pipeline",
      client: "RetailCorp",
      description: "Built real-time data pipeline processing 10M+ transactions daily using Apache Spark and Kafka",
      tech: ["Spark", "Kafka", "Airflow", "Snowflake"],
      result: "40% faster analytics, 60% cost reduction"
    },
    {
      title: "ML Fraud Detection System",
      client: "FinTech Solutions",
      description: "Developed ML model achieving 99.2% accuracy in real-time fraud detection",
      tech: ["Python", "TensorFlow", "AWS SageMaker", "Redis"],
      result: "99.2% accuracy, $2M saved annually"
    },
    {
      title: "Customer 360 Platform",
      client: "MediaGroup",
      description: "Created unified customer data platform integrating 15+ data sources",
      tech: ["dbt", "Snowflake", "Looker", "Segment"],
      result: "360° customer view, 25% increase in retention"
    }
  ];

  const internshipPrograms = [
    {
      title: "Data Engineering Internship",
      duration: "6 months",
      skills: ["Python", "SQL", "Spark", "Airflow"],
      description: "Learn to build and maintain data pipelines at scale"
    },
    {
      title: "Data Science Internship",
      duration: "6 months",
      skills: ["Python", "Machine Learning", "Statistics", "TensorFlow"],
      description: "Work on real ML projects with industry mentors"
    },
    {
      title: "Analytics Engineering Internship",
      duration: "6 months",
      skills: ["SQL", "dbt", "Looker", "Data Modeling"],
      description: "Transform raw data into actionable business insights"
    }
  ];

  const architectureDiagrams = [
    {
      title: "Real-Time Data Pipeline",
      code: `┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Kafka     │───▶│   Spark     │───▶│  Snowflake  │
│   Topics    │    │  Streaming  │    │   Warehouse │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Schema    │    │   Airflow   │    │    Looker   │
│   Registry  │    │   DAGs      │    │   Reports   │
└─────────────┘    └─────────────┘    └─────────────┘`
    },
    {
      title: "ML Model Deployment",
      code: `┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Training  │───▶│   Model     │───▶│   Serving   │
│   Data      │    │   Registry  │    │   API       │
└─────────────┘    └─────────────┘    └─────────────┘
       │                  │                  │
       ▼                  ▼                  ▼
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Feature   │    │   A/B       │    │   Monitor   │
│   Store     │    │   Testing   │    │   & Alert   │
└─────────────┘    └─────────────┘    └─────────────┘`
    }
  ];

  return (
    <div className="bg-[var(--bg-primary)] overflow-x-hidden">

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative py-8 md:py-12 lg:py-16 px-3 sm:px-4 overflow-hidden bg-gradient-to-br from-var(--bg-primary) via-var(--bg-secondary) to-var(--bg-primary)"
      >

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <div className="space-y-4 md:space-y-6">
                <div className="inline-flex items-center px-3 py-1.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--accent-primary)] text-xs font-medium">

                <span className="w-2 h-2 bg-[var(--accent-primary)] mr-2 animate-pulse"></span>
                DataWorks Agency
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-tight">
                {heroSlides[currentSlide].title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-[var(--accent-primary)] font-semibold">
                {heroSlides[currentSlide].subtitle}
              </p>
              <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-lg">
                {heroSlides[currentSlide].description}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <motion.button
                  onClick={handleGetStarted}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="transition-deluxe polidhed-dark-green-btn text-sm sm:text-base py-2 sm:py-3"
                >
                  {heroSlides[currentSlide].cta}
                  <span className="absolute inset-x-3 bottom-2 h-1.5 bg-[rgba(15, 78, 43, 0.45)] rounded-full blur-sm" />
                </motion.button>
                <motion.button
                  onClick={handleViewDemo}
                  whileHover={{ y: -2, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="transition-deluxe btn-sharp polidhed-dark-green-btn"
                >
                  {heroSlides[currentSlide].secondaryCta}
                  <span className="absolute inset-x-3 bottom-2 h-1.5 bg-[rgba(15, 78, 43, 0.3)] rounded-full blur-sm" />
                </motion.button>
              </div>
              <div className="flex items-center gap-3 md:gap-4 pt-2">
                <div className="flex -space-x-1 md:-space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-6 h-6 md:w-8 md:h-8 bg-[var(--bg-tertiary)] border-2 border-[var(--border-color)] flex items-center justify-center text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div className="text-xs md:text-sm text-[var(--text-muted)]">
                  <span className="text-[var(--text-primary)] font-semibold">500+</span> data engineers available
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-500"></div>
                  <div className="w-3 h-3 bg-yellow-500"></div>
                  <div className="w-3 h-3 bg-green-500"></div>
                  <span className="text-xs text-[var(--text-muted)] ml-2">pipeline.py</span>
                </div>
                <pre className="text-xs text-[var(--text-muted)] font-mono overflow-x-auto">
                  <code>{`from pyspark.sql import SparkSession
from airflow import DAG
from datetime import datetime

# Initialize Spark Session
spark = SparkSession.builder \\
    .appName("DataWorksPipeline") \\
    .config("spark.sql.adaptive.enabled", "true") \\
    .getOrCreate()

# Define DAG
dag = DAG(
    'data_pipeline',
    start_date=datetime(2024, 1, 1),
    schedule_interval='@daily'
)

# Extract data
df = spark.read \\
    .format("kafka") \\
    .option("kafka.bootstrap.servers", "localhost:9092") \\
    .option("subscribe", "events") \\
    .load()

# Transform
transformed = df \\
    .selectExpr("CAST(value AS STRING)") \\
    .withColumn("timestamp", current_timestamp())

# Load to Snowflake
transformed.write \\
    .format("snowflake") \\
    .options(**sfOptions) \\
    .mode("append") \\
    .save()`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        className="py-8 md:py-12 lg:py-16 px-3 sm:px-4 bg-[var(--bg-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[var(--text-primary)] mb-3">
              DataWorks Agency Services
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[var(--text-muted)] max-w-2xl mx-auto px-2">
              End-to-end data solutions from pipeline development to machine learning deployment
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {[
              {
                icon: "⚡",
                title: "Data Engineering",
                description: "Build scalable ETL pipelines with Apache Spark, Airflow, and Kafka"
              },
              {
                icon: "📊",
                title: "Data Analytics",
                description: "Transform raw data into actionable insights with SQL and BI tools"
              },
              {
                icon: "🤖",
                title: "Machine Learning",
                description: "Develop and deploy ML models for predictive analytics and automation"
              },
              {
                icon: "📈",
                title: "Data Visualization",
                description: "Create interactive dashboards with Looker, Tableau, and Power BI"
              },
              {
                icon: "🏗️",
                title: "Data Warehousing",
                description: "Design and implement modern data warehouses on Snowflake and BigQuery"
              },
              {
                icon: "🔄",
                title: "ETL Development",
                description: "Extract, transform, and load data from multiple sources efficiently"
              }
            ].map((service, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 hover:border-[var(--accent-primary)] transition-colors">
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{service.title}</h3>
                <p className="text-sm text-[var(--text-muted)]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Horizontal Motion Images Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Technologies We Work With
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Modern data stack technologies powering enterprise solutions
            </p>
          </div>

          {/* Technologies Grid - Three Animated Rows */}
          {/* First Row - Left to Right */}
          <div className="relative mb-6 overflow-hidden">
            <div className="flex animate-scroll-left gap-3 sm:gap-6 pb-4 items-center">
              {row1.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(1, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 1 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
              {/* Duplicate for seamless loop */}
              {row1.map((tech, index) => (
                <motion.div
                  key={`dup1-${index}`}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(1, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 1 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Second Row - Left to Right */}
          <div className="relative mb-6 overflow-hidden">
            <div className="flex animate-scroll-left gap-3 sm:gap-6 pb-4 items-center">
              {row2.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(2, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 2 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
              {/* Duplicate for seamless loop */}
              {row2.map((tech, index) => (
                <motion.div
                  key={`dup2-${index}`}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(2, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 2 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Third Row - Left to Right */}
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll-left gap-3 sm:gap-6 pb-4 items-center">
              {row3.map((tech, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(3, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 3 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
              {/* Duplicate for seamless loop */}
              {row3.map((tech, index) => (
                <motion.div
                  key={`dup3-${index}`}
                  className="flex-shrink-0 cursor-pointer"
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => handleTechClick(3, index)}
                >
                  <motion.div
                    className={`bg-[var(--bg-secondary)] border p-3 sm:p-6 w-32 sm:w-40 md:w-48 h-24 sm:h-32 flex flex-col items-center justify-center hover:border-[var(--accent-primary)] transition-all duration-300 ${
                      selectedTechIndex?.row === 3 && selectedTechIndex?.index === index
                        ? 'border-[var(--accent-primary)] ring-2 ring-[var(--accent-primary)]'
                        : 'border-[var(--border-color)]'
                    }`}
                    whileHover={{ boxShadow: "0 0 30px rgba(184, 134, 11, 0.4)" }}
                  >
                    <motion.img
                      src={tech.logo}
                      alt={tech.name}
                      className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 object-cover rounded-lg mb-2 sm:mb-3"
                      whileHover={{ rotate: 5, scale: 1.15 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    />
                    <span className="text-xs sm:text-sm font-semibold text-[var(--text-primary)] text-center line-clamp-2">
                      {tech.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Case Studies Section */}
      <motion.section
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Case Studies
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Real-world data engineering projects that delivered measurable business impact
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 hover:border-[var(--accent-primary)] transition-colors">
                <div className="text-xs text-[var(--accent-primary)] font-semibold mb-2">{study.client}</div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-3">{study.title}</h3>
                <p className="text-sm text-[var(--text-muted)] mb-4">{study.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {study.tech.map((tech, i) => (
                    <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-[var(--accent-primary)] font-semibold">{study.result}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Internship Programs Section */}
      <motion.section
        initial={{ opacity: 0, y: -100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Internship Programs
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Launch your data career with hands-on experience and industry mentorship
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {internshipPrograms.map((program, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 hover:border-[var(--accent-primary)] transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)]">{program.title}</h3>
                  <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs font-semibold">{program.duration}</span>
                </div>
                <p className="text-sm text-[var(--text-muted)] mb-4">{program.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {program.skills.map((skill, i) => (
                    <span key={i} className="px-2 py-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                      {skill}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => navigate('/jobs?type=internship')}
                  className="w-full px-4 py-2 text-white text-sm font-semibold polidhed-dark-green-btn"
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Architecture Diagrams Section */}
      <motion.section
        initial={{ opacity: 0, rotateY: 90 }}
        whileInView={{ opacity: 1, rotateY: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.6 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              System Architecture
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Enterprise-grade data architectures designed for scale and reliability
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
            {architectureDiagrams.map((diagram, index) => (
              <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 md:p-6">
                <h3 className="text-base md:text-lg font-semibold text-[var(--text-primary)] mb-3 md:mb-4">{diagram.title}</h3>
                <div className="overflow-x-auto">
                  <pre className="text-xs md:text-xs text-[var(--text-muted)] font-mono bg-[var(--bg-secondary)] p-3 md:p-4 border border-[var(--border-color)] max-w-full">
                    <code>{diagram.code}</code>
                  </pre>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.7 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "500+", label: "Data Engineers" },
              { value: "150+", label: "Projects Delivered" },
              { value: "98%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-[var(--accent-primary)] mb-2">{stat.value}</div>
                <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Global Presence Section */}
      <motion.section
        initial={{ opacity: 0, x: -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.8 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-primary)]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Global Presence
            </h2>
            <p className="text-sm text-[var(--text-muted)] max-w-2xl mx-auto">
              Serving clients worldwide with data engineering excellence
            </p>
          </div>
          <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { city: "Algiers", country: "Algeria", timezone: "UTC+1", status: "Headquarters" },
                { city: "London", country: "United Kingdom", timezone: "UTC+0", status: "European Hub" },
                { city: "Dubai", country: "UAE", timezone: "UTC+4", status: "Middle East Hub" }
              ].map((location, index) => (
                <div key={index} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 hover:border-[var(--accent-primary)] transition-colors">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">{location.city}</h3>
                    <span className="px-2 py-1 bg-[var(--accent-primary)] text-white text-xs font-semibold">{location.status}</span>
                  </div>
                  <p className="text-sm text-[var(--text-muted)] mb-2">{location.country}</p>
                  <p className="text-xs text-[#64748B]">{location.timezone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.9 }}
        className="py-12 md:py-16 px-4 bg-[var(--bg-secondary)]"
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
              Get Started Free
            </button>
            <button
              onClick={handleDeployNow}
              className="px-8 py-3 border border-[var(--border-color)] text-[var(--text-primary)] font-semibold hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
            >
              Deploy Now Free
            </button>
          </div>
        </div>
      </motion.section>

    </div>
  );
};

export default Home;
