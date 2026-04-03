import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    skills: [],
    experience: '',
    education: '',
    linkedin: '',
    github: '',
    portfolio: ''
  });
  const [newSkill, setNewSkill] = useState('');
  const [stats, setStats] = useState({
    applications: 12,
    savedJobs: 8,
    messages: 5,
    profileViews: 45
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || [],
        experience: user.experience || '',
        education: user.education || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        portfolio: user.portfolio || ''
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileData.skills.includes(newSkill.trim())) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateProfile(profileData);
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
      setIsEditing(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfileData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        bio: user.bio || '',
        skills: user.skills || [],
        experience: user.experience || '',
        education: user.education || '',
        linkedin: user.linkedin || '',
        github: user.github || '',
        portfolio: user.portfolio || ''
      });
    }
    setIsEditing(false);
  };

  const handleDownloadResume = () => {
    alert('Resume download started!');
  };

  return (
    <div className="bg-gray-50 dark:bg-slate-900 mobile-compact">

      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pb-4">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-[var(--text-primary)]">Profile</h1>
              <p className="text-sm text-[var(--text-muted)] mt-1">Manage your profile and preferences</p>
            </div>
            <div className="flex items-center gap-1">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2.5 border border-[var(--border-color)] text-[var(--text-muted)] text-sm font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="px-5 py-2.5 bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
                  >
                    {loading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pb-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center text-3xl font-bold text-[var(--accent-primary)] mx-auto mb-4">
                  {profileData.name?.charAt(0) || 'U'}
                </div>
                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-1">{profileData.name}</h2>
                <p className="text-sm text-[var(--text-muted)]">{profileData.email}</p>
                <p className="text-sm text-[var(--text-muted)]">{profileData.location}</p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Applications', value: stats.applications },
                  { label: 'Saved Jobs', value: stats.savedJobs },
                  { label: 'Messages', value: stats.messages },
                  { label: 'Profile Views', value: stats.profileViews }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xl font-bold text-[var(--accent-primary)]">{stat.value}</div>

                    <div className="text-xs text-[var(--text-muted)]">{stat.label}</div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleDownloadResume}
                  className="w-full px-4 py-2 bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
                >
                  Download Resume
                </button>
                <button
                  onClick={() => navigate('/jobs')}
                  className="w-full px-4 py-2 border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-medium hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)] transition-colors"
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              <div className="p-4 border-b border-[var(--border-color)]">
                <h2 className="text-lg font-semibold text-[var(--text-primary)]">Profile Information</h2>
              </div>
              <div className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Basic Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Basic Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Full Name</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="name"
                            value={profileData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.name}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Email</label>
                        {isEditing ? (
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.email}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Phone</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.phone || 'Not provided'}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Location</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="location"
                            value={profileData.location}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.location || 'Not provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Professional Info */}
                  <div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Professional Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Experience</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="experience"
                            value={profileData.experience}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.experience}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Education</label>
                        {isEditing ? (
                          <input
                            type="text"
                            name="education"
                            value={profileData.education}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.education}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Bio</label>
                        {isEditing ? (
                          <textarea
                            name="bio"
                            value={profileData.bio}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                          />
                        ) : (
                          <p className="text-sm text-[var(--text-primary)]">{profileData.bio || 'No bio provided'}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Skills</h3>
                  {isEditing ? (
                    <div>
                      <div className="flex gap-2 mb-3">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                          placeholder="Add a skill..."
                          className="flex-1 px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                        <button
                          onClick={handleAddSkill}
                          className="px-4 py-2 bg-[var(--accent-primary)] text-white text-sm font-medium hover:bg-[var(--accent-hover)] transition-colors"
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] flex items-center gap-2"
                          >
                            {skill}
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-[var(--text-muted)] hover:text-[var(--accent-primary)]"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {profileData.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-color)] text-sm text-[var(--accent-primary)]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">Social Links</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">LinkedIn</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="linkedin"
                          value={profileData.linkedin}
                          onChange={handleInputChange}
                          placeholder="Enter your LinkedIn profile URL"
                          className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--text-primary)]">
                          {profileData.linkedin ? (
                            <a href={profileData.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                              {profileData.linkedin}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">GitHub</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="github"
                          value={profileData.github}
                          onChange={handleInputChange}
                          placeholder="Enter your GitHub profile URL"
                          className="w-full px-3 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--text-primary)]">
                          {profileData.github ? (
                            <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                              {profileData.github}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-[var(--text-muted)] mb-2">Portfolio</label>
                      {isEditing ? (
                        <input
                          type="url"
                          name="portfolio"
                          value={profileData.portfolio}
                          onChange={handleInputChange}
                          placeholder="Enter your portfolio URL"
                          className="w-full px-3 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm focus:outline-none focus:border-[var(--accent-primary)]"
                        />
                      ) : (
                        <p className="text-sm text-[var(--text-primary)]">
                          {profileData.portfolio ? (
                            <a href={profileData.portfolio} target="_blank" rel="noopener noreferrer" className="text-[var(--accent-primary)] hover:underline">
                              {profileData.portfolio}
                            </a>
                          ) : (
                            'Not provided'
                          )}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
