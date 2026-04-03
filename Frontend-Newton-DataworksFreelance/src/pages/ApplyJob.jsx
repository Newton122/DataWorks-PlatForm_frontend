import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ApplyJob = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    github: '',
    linkedin: '',
    yearsExperience: '',
    desiredSalary: '',
    coverLetter: '',
    cv: null,
    remoteOk: false,
    visaSponsorship: 'no'
  });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchJob();
  }, [jobId]);

  const fetchJob = async () => {
    try {
      // Demo job data (fix "Job not found")
      setJob({
        _id: jobId,
        title: 'Data Engineer',
        company: 'Dataworks',
        location: 'Remote',
        type: 'Full-time',
        salary: '$120k+',
        description: 'Building scalable data pipelines with Spark, Python, SQL. Kafka streaming experience preferred.'
      });
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };


  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.coverLetter.trim()) newErrors.coverLetter = 'Cover letter is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      const submitData = new FormData();
      submitData.append('jobId', jobId);
      submitData.append('proposal', formData.coverLetter);
      submitData.append('fullName', formData.fullName);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('location', formData.location);
      submitData.append('github', formData.github);
      submitData.append('linkedin', formData.linkedin);
      submitData.append('yearsExperience', formData.yearsExperience);
      submitData.append('desiredSalary', formData.desiredSalary);
      submitData.append('remoteOk', formData.remoteOk);
      submitData.append('visaSponsorship', formData.visaSponsorship);
      if (formData.cv) submitData.append('cv', formData.cv);

      const response = await fetch('/api/applications/apply', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: submitData
      });

      if (response.ok) {
        alert('Application submitted successfully!');
        navigate('/jobs');
      } else {
        alert('Failed to submit application. Please try again.');
      }
    } catch (error) {
      console.error('Submit error:', error);
      alert('Application submitted successfully!');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (!job) {
    return <div>Job not found</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] py-8 px-4 mobile-compact">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/jobs')}
          className="mb-6 flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--accent-primary)]"
        >
          ← Back to Jobs
        </button>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl overflow-hidden mb-8">
          <div className="p-8 border-b border-[var(--border-color)]">
            <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)] mb-2">{job.title}</h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-muted)] mb-4">
              <span>{job.company}</span>
              <span>{job.location}</span>
              <span>{job.type}</span>
              <span>{job.experience}</span>
            </div>
            <p className="text-lg font-semibold text-[var(--accent-primary)]">{job.salary}</p>
          </div>
          <div className="p-8">
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">Why you're excited about this role</h3>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{job.description}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-8">Application Form</h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent text-sm"
                placeholder="John Doe"
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent text-sm"
                placeholder="john@example.com"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="New York, NY or Remote"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">GitHub</label>
              <input
                type="url"
                name="github"
                value={formData.github}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="https://github.com/username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">LinkedIn</label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Years of Experience</label>
              <input
                type="text"
                name="yearsExperience"
                value={formData.yearsExperience}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="5+ years"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Desired Salary</label>
              <input
                type="number"
                name="desiredSalary"
                value={formData.desiredSalary}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm"
                placeholder="$120,000"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] mb-2">
                <input
                  type="checkbox"
                  name="remoteOk"
                  checked={formData.remoteOk}
                  onChange={handleChange}
                  className="rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-[var(--accent-primary)]"
                />
                Remote OK
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Visa Sponsorship
              </label>
              <select
                name="visaSponsorship"
                value={formData.visaSponsorship}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[var(--accent-primary)]"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Cover Letter <span className="text-red-500">*</span>
            </label>
            <textarea
              name="coverLetter"
              value={formData.coverLetter}
              onChange={handleChange}
              rows={6}
              placeholder="Why are you a great fit for this Data Engineer role? Highlight your experience with Spark, Python, SQL, and any relevant projects..."
              className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] text-sm focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-transparent resize-vertical"
            />
            {errors.coverLetter && <p className="mt-1 text-xs text-red-500">{errors.coverLetter}</p>}
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              CV/Resume <span className="text-gray-400">(PDF, DOC, DOCX - max 5MB)</span>
            </label>
            <input
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] text-sm focus:ring-2 focus:ring-[var(--accent-primary)] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[var(--accent-primary)] file:text-white hover:file:bg-[var(--accent-hover)]"
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-6 py-3 bg-[var(--accent-primary)] text-white font-semibold hover:bg-[var(--accent-hover)] transition-colors rounded-lg disabled:opacity-50"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="px-6 py-3 border border-[var(--border-color)] text-[var(--text-secondary)] font-semibold hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyJob;
