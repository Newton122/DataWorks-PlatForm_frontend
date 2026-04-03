import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Jobs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedExperience, setSelectedExperience] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  // showApplyModal removed - ApplyJob page handles form

  const [applicationData, setApplicationData] = useState({
    coverLetter: '',
    resume: null
  });

  const categories = [
    'All',
    'Data Engineering',
    'Data Analytics',
    'Data Science',
    'Machine Learning',
    'AI Development',
    'Data Visualization',
    'Business Intelligence',
    'Big Data',
    'Data Warehousing',
    'ETL Development',
    'Product Management'
  ];

  const jobTypes = ['All', 'Full-time', 'Part-time', 'Contract', 'Internship', 'Freelance'];
  const experienceLevels = ['All', 'Entry Level', 'Mid Level', 'Senior Level', 'Lead', 'Principal'];

  const skillTags = [
    'Python', 'SQL', 'Spark', 'Kafka', 'Airflow', 'dbt', 'Snowflake', 'BigQuery',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'TensorFlow', 'PyTorch', 'Pandas',
    'NumPy', 'Scikit-learn', 'Tableau', 'Power BI', 'Looker', 'MongoDB', 'PostgreSQL',
    'Redis', 'Elasticsearch', 'Hadoop', 'Hive', 'Presto', 'Flink', 'Beam'
  ];

  useEffect(() => {
    fetchJobs();
  }, []);


  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/jobs');
      if (response.ok) {
        const data = await response.json();
        setJobs(data.jobs || data);

        // Force user jobs for demo
        setJobs([
          { _id: '1', title: 'Data Engineer', company: 'Dataworks', description: 'Spark/Python/SQL job from DB', location: 'Remote', type: 'Full-time', salary: '$120k+', category: 'Data Engineering', skills: ['Python', 'SQL', 'Spark'], experience: 'Senior Level', postedDate: '2 days ago', requirements: ['5+ years experience in Spark', 'ETL pipelines', 'Cloud data platforms'] },
          { _id: '2', title: 'Data Analytics Architect', company: 'Client A', description: 'High-impact analytics role at growing startup', location: 'NYC', type: 'Contract', salary: '$80k', category: 'Data Analytics', skills: ['SQL', 'Python'], experience: 'Mid Level', postedDate: '1 week ago', requirements: ['Business intelligence', 'Tableau/Power BI', 'Strong SQL'] },
          { _id: '3', title: 'Machine Learning Engineer', company: 'Client B', description: 'AI model production in remote-first team', location: 'Remote', type: 'Full-time', salary: '$150k+', category: 'Data Science', skills: ['ML', 'Python'], experience: 'Senior Level', postedDate: '3 days ago', requirements: ['Model training', 'TensorFlow/PyTorch', 'A/B testing'] }
        ]);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Force user jobs
      setJobs([
        { _id: '1', title: 'Data Engineer', company: 'Dataworks', description: 'Spark/Python/SQL job from DB', location: 'Remote', type: 'Full-time', salary: '$120k+', category: 'Data Engineering', skills: ['Python', 'SQL', 'Spark'], experience: 'Senior Level', postedDate: '2 days ago' },
        { _id: '2', title: 'Job1', company: 'Client A', description: 'Test job from dataworks.jobs', location: 'NYC', type: 'Contract', salary: '$80k', category: 'Data Analytics', skills: ['SQL', 'Python'], experience: 'Mid Level', postedDate: '1 week ago' },
        { _id: '3', title: 'Job2', company: 'Client B', description: 'Another user job', location: 'Remote', type: 'Full-time', salary: '$150k+', category: 'Data Science', skills: ['ML', 'Python'], experience: 'Senior Level', postedDate: '3 days ago' }
      ]);
    } finally {
      setLoading(false);
    }
  };




  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || job.category === selectedCategory;
    const matchesType = selectedType === 'All' || job.type === selectedType;
    const matchesLocation = locationFilter.trim() === '' || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesExperience = selectedExperience === 'All' || job.experience === selectedExperience;
    return matchesSearch && matchesCategory && matchesType && matchesExperience && matchesLocation;
  });

  const startupJobs = jobs.filter(job =>
    job.description?.toLowerCase().includes('startup') ||
    job.company?.toLowerCase().includes('startup') ||
    (job.category?.toLowerCase().includes('data') && job.type?.toLowerCase().includes('full-time'))
  ).slice(0, 3);

  const remoteJobs = jobs.filter(job => job.location?.toLowerCase().includes('remote')).slice(0, 3);

  const handleSaveJob = (jobId) => {
    setJobs(jobs.map(job => 
      job._id === jobId ? { ...job, saved: !job.saved } : job
    ));
  };

  const handleApply = (job) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/jobs/apply/${job._id}`);
  };


  const submitApplication = async () => {
    try {
      const response = await fetch('/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          jobId: selectedJob._id,
          coverLetter: applicationData.coverLetter
        })
      });
      
      if (response.ok) {
        alert('Application submitted successfully!');
        setShowApplyModal(false);
        setApplicationData({ coverLetter: '', resume: null });
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Application submitted successfully!');
      setShowApplyModal(false);
      setApplicationData({ coverLetter: '', resume: null });
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedType('All');
    setSelectedExperience('All');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center mobile-compact">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading jobs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] mobile-compact">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">DataWorks Job Board</h1>
              <p className="text-sm text-[var(--text-secondary)] mt-1">Find your next data engineering opportunity</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--accent-primary)] transition-colors"
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              {user && (
                <button
                  onClick={() => navigate('/dashboard')}
                  className="px-4 py-2 bg-[#5f4608] text-white text-sm font-medium hover:bg-[#4f3b07] transition-colors"
                >
                  Post a Job
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Search and Filters */}
        <div className="mb-6">
          {/* Search Bar */}
          <div className="grid gap-3 md:grid-cols-3 mb-4">
            <input
              type="text"
              placeholder="Search jobs by title, company, skills, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] text-sm"
            />
            <input
              type="text"
              placeholder="Location (e.g. Remote, NYC, Austin)"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="w-full px-4 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] text-sm"
            />
            <button
              onClick={() => { setSearchTerm(''); setLocationFilter(''); }}
              className="w-full px-4 py-3 bg-[#6d5208] hover:bg-[#5a4506] text-white text-sm font-semibold transition-colors"
            >
              Clear Search
            </button>
          </div>
            <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-[var(--accent-primary)] text-white'
                    : 'bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 mb-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Job Type</label>
                  <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                  >
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-[var(--text-secondary)] mb-2">Experience Level</label>
                  <select
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                    className="w-full px-3 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                  >
                    {experienceLevels.map((level) => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={clearFilters}
                    className="w-full px-4 py-2 polidhed-dark-green-btn text-sm font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Results Count */}
          <div className="text-sm text-[var(--text-secondary)]">
            Showing {filteredJobs.length} of {jobs.length} jobs
          </div>

          {/* Featured Sections */}
          <div className="grid md:grid-cols-2 gap-4 my-5">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Startup jobs</h3>
              <div className="space-y-2">
                {startupJobs.length === 0 ? (
                  <p className="text-xs text-[var(--text-secondary)]">No startup jobs right now.</p>
                ) : (
                  startupJobs.map((job) => (
                    <div key={job._id} className="p-2 rounded-md border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                      <p className="text-xs text-[var(--text-primary)] font-medium">{job.title}</p>
                      <p className="text-[var(--text-secondary)] text-xs">{job.company} · {job.location}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
              <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Remote jobs</h3>
              <div className="space-y-2">
                {remoteJobs.length === 0 ? (
                  <p className="text-xs text-[var(--text-secondary)]">No remote positions currently.</p>
                ) : (
                  remoteJobs.map((job) => (
                    <div key={job._id} className="p-2 rounded-md border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-colors">
                      <p className="text-xs text-[var(--text-primary)] font-medium">{job.title}</p>
                      <p className="text-[var(--text-secondary)] text-xs">{job.company} · {job.location}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Swap with image + text block */}
          <div className="bg-[var(--bg-tertiary)] border border-[var(--border-color)] p-4 rounded-lg mb-6">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <img src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="job search" className="w-full md:w-1/2 h-40 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Pinpoint the right role faster</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-2">Use text and location search to find your ideal positions. Click any job to view details, save, and apply instantly.</p>
                <button
                  onClick={() => setShowFilters(true)}
                  className="px-4 py-2 polidhed-dark-green-btn text-sm font-semibold"
                >
                  Refine Search
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Job Listings */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Job List */}
          <div className="lg:col-span-2 space-y-4">
            {filteredJobs.length === 0 ? (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 text-center">
                <p className="text-[var(--text-secondary)]">No jobs found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 polidhed-dark-green-btn text-sm font-medium"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              filteredJobs.map((job) => (
                <div
                  key={job._id}
                  className={`bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 cursor-pointer transition-colors ${
                    selectedJob?._id === job._id ? 'border-[var(--accent-primary)]' : 'hover:border-[var(--accent-primary)]'
                  }`}
                  onClick={() => setSelectedJob(job)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-sm md:text-base font-semibold text-highlight mb-1">{job.title}</h3>
                      <p className="text-xs text-[var(--text-secondary)]">{job.company}</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSaveJob(job._id);
                      }}
                      className={`p-2 transition-colors ${
                        job.saved ? 'text-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--accent-primary)]'
                      }`}
                    >
                      <svg className="w-5 h-5" fill={job.saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {job.location}
                    </span>
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {job.type}
                    </span>
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {job.experience}
                    </span>
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {job.salary}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-secondary)] mb-3 line-clamp-2">{job.description}</p>

                  {/* Skill Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {job.skills.slice(0, 5).map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--accent-primary)]">
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 5 && (
                      <span className="px-2 py-0.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-muted)]">
                        +{job.skills.length - 5} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-muted)]">Posted {job.postedDate}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                        className="px-3 py-2 polidhed-dark-green-btn text-xs font-medium"
                      >
                        View Details
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(job);
                        }}
                        className="px-4 py-2 bg-[rgba(8,8,10,0.08)] text-white text-xs font-bold border border-white/8 backdrop-blur-2xl shadow-[0_14px_50px_rgba(0,0,0,0.65)] hover:bg-[rgba(8,8,10,0.12)] transition-colors"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            {selectedJob ? (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 sticky top-6">
                <div className="mb-4">
                  <h2 className="text-lg font-semibold text-highlight mb-2">{selectedJob.title}</h2>
                  <p className="text-sm text-[var(--text-secondary)] mb-4">{selectedJob.company}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {selectedJob.location}
                    </span>
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {selectedJob.type}
                    </span>
                    <span className="px-2 py-1 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {selectedJob.experience}
                    </span>
                  </div>

                  <div className="text-sm text-[var(--accent-primary)] font-semibold mb-4">{selectedJob.salary}</div>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Description</h3>
                  <p className="text-xs text-[var(--text-secondary)]">{selectedJob.description}</p>
                </div>

                <div className="mb-4">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Requirements</h3>
                  <ul className="space-y-1">
                    {(selectedJob.requirements || ['Strong domain experience', 'Excellent communication', 'Problem-solving mindset']).map((req, index) => (
                      <li key={index} className="text-xs text-[var(--text-secondary)] flex items-start">
                        <span className="text-[var(--accent-primary)] mr-2">•</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-2">Required Skills</h3>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedJob.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-0.5 bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs text-[var(--accent-primary)]">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleApply(selectedJob)}
                    className="flex-1 px-4 py-2 bg-[rgba(8,8,10,0.08)] text-white text-sm font-bold border border-white/8 backdrop-blur-2xl shadow-[0_14px_50px_rgba(0,0,0,0.65)] hover:bg-[rgba(8,8,10,0.12)] transition-colors"
                  >
                    Apply Now
                  </button>
                  <button
                    onClick={() => handleSaveJob(selectedJob._id)}
                    className={`px-4 py-2 border text-sm font-medium transition-colors ${
                      selectedJob.saved
                          ? 'bg-[#5f4608] border-[#5f4608] text-white'
                        : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]'
                    }`}
                  >
                    {selectedJob.saved ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 text-center">
                <p className="text-[var(--text-secondary)]">Select a job to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
  );
};

export default Jobs;
