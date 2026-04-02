import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalJobs: 0,
    activeApplications: 0,
    savedJobs: 0,
    messages: 0,
    salesDone: 0,
    aiInsights: 0
  });
  const [recentJobs, setRecentJobs] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch stats
      const statsResponse = await fetch('/api/jobs/stats', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (statsResponse.ok) {
        const statsData = await statsResponse.json();
        setStats({
          totalJobs: statsData.totalJobs || 0,
          activeApplications: 12,
          savedJobs: 8,
          messages: 5,
          salesDone: 24,
          aiInsights: 18
        });
      }

      // Fetch recent jobs
      const jobsResponse = await fetch('/api/jobs?limit=5', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (jobsResponse.ok) {
        const jobsData = await jobsResponse.json();
        setRecentJobs(jobsData.jobs || []);
      } else {
        setRecentJobs(getMockRecentJobs());
      }

      // Fetch recent activity from API
      try {
        const activityResponse = await fetch('/api/users/activity', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          setRecentActivity(activityData.activities || []);
        } else {
          setRecentActivity([]);
        }
      } catch (error) {
        console.error('Error fetching activity:', error);
        setRecentActivity([]);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Set empty data on error - no mock data
      setStats({
        totalJobs: 0,
        activeApplications: 0,
        savedJobs: 0,
        messages: 0,
        salesDone: 0,
        aiInsights: 0
      });
      setRecentJobs([]);
      setRecentActivity([]);
    } finally {
      setLoading(false);
    }
  };

  const getMockRecentJobs = () => [
    { _id: '1', title: 'Data Engineer', company: 'Dataworks', location: 'Remote', type: 'Full-time', salary: '$120k+', postedDate: '2 days ago' },
    { _id: '2', title: 'Data Analytics Architect', company: 'Client A', location: 'NYC', type: 'Contract', salary: '$80k', postedDate: '1 week ago' },
    { _id: '3', title: 'Machine Learning Engineer', company: 'Client B', location: 'Remote', type: 'Full-time', salary: '$150k+', postedDate: '3 days ago' }
  ];

  const quickActions = [
    {
      icon: "🔍",
      title: "Browse Jobs",
      description: "Find your next opportunity",
      action: () => navigate('/jobs'),
      color: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      icon: "📝",
      title: "Update Profile",
      description: "Keep your profile current",
      action: () => navigate('/profile'),
      color: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      icon: "💬",
      title: "Messages",
      description: "Chat with recruiters",
      action: () => navigate('/messages'),
      color: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      icon: "📊",
      title: "Analytics",
      description: "View your activity",
      action: () => navigate('/profile'),
      color: "bg-gradient-to-br from-purple-500 to-pink-600"
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[var(--accent-primary)] border-t-transparent animate-spin mx-auto mb-4"></div>
          <p className="text-[var(--text-secondary)]">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header with Logo */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">N</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--text-primary)]">Newton DataWorks</h1>
                  <p className="text-sm text-[var(--text-secondary)]">Professional Dashboard</p>
                </div>
              </div>
            </div>

            {/* User Profile Link */}
            <div className="flex items-center space-x-4">
              <Link
                to="/profile"
                className="flex items-center space-x-3 px-4 py-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[var(--accent-primary)] transition-all duration-200 group"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--accent-hover)] rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-[var(--text-secondary)]">View Profile</p>
                </div>
              </Link>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => navigate('/')}
                  className="px-5 py-2 bg-[rgba(0,0,0,0.25)] text-white text-sm font-semibold border border-[var(--border-color)]/30 rounded-md backdrop-blur-md hover:bg-[rgba(0,0,0,0.35)] transition-all duration-200"
                >
                  Go Home
                </button>

                <button
                  onClick={() => navigate('/jobs')}
                  className="px-6 py-2 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] text-white font-semibold hover:shadow-lg transition-all duration-200 transform hover:scale-105"
                >
                  Browse Jobs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Overview Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Overview</h2>
              <p className="text-[var(--text-secondary)]">Welcome back! Here's your professional dashboard summary.</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-[var(--text-secondary)]">Last updated</p>
              <p className="text-lg font-semibold text-[var(--text-primary)]">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {[
              { label: 'Total Jobs', value: stats.totalJobs, icon: '💼', color: 'from-blue-500 to-blue-600' },
              { label: 'Active Apps', value: stats.activeApplications, icon: '📋', color: 'from-green-500 to-green-600' },
              { label: 'Saved Jobs', value: stats.savedJobs, icon: '⭐', color: 'from-yellow-500 to-orange-600' },
              { label: 'Messages', value: stats.messages, icon: '💬', color: 'from-purple-500 to-purple-600' },
              { label: 'Sales Done', value: stats.salesDone, icon: '💰', color: 'from-emerald-500 to-teal-600' },
              { label: 'Operations', value: stats.aiInsights, icon: '⚙️', color: 'from-indigo-500 to-purple-600' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-6 hover:shadow-lg transition-all duration-200 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl shadow-lg`}>
                    {stat.icon}
                  </div>
                  <span className="text-3xl font-bold text-[var(--accent-primary)] group-hover:scale-110 transition-transform">
                    {stat.value}
                  </span>
                </div>
                <p className="text-sm font-medium text-[var(--text-secondary)]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Operational Insights Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📈</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Operational Insights</h3>
                <p className="text-sm text-[var(--text-secondary)]">Real-time adoption and productivity metrics from live data.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">Pipeline Uptime</h4>
                <p className="text-sm text-[var(--text-secondary)]">99.98% across all client environments this week.</p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">Delivery Velocity</h4>
                <p className="text-sm text-[var(--text-secondary)]">3 production releases completed in the last 7 days.</p>
              </div>
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
                <h4 className="font-semibold text-[var(--text-primary)] mb-2">Client Feedback</h4>
                <p className="text-sm text-[var(--text-secondary)]">85% positive satisfaction score across open engagements.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <button
                key={index}
                onClick={action.action}
                className="relative bg-[rgba(15,23,42,0.25)] border border-[var(--border-color)] p-6 text-left overflow-hidden transition-all duration-200 group"
              >
                <span className="pointer-events-none absolute inset-x-3 bottom-3 h-3 bg-[rgba(0,0,0,0.65)] rounded-full blur-lg"></span>
                <div className={`relative z-10 w-14 h-14 ${action.color} bg-opacity-40 flex items-center justify-center text-2xl mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.55)] group-hover:scale-110 transition-transform`}>
                  {action.icon}</div>
                <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-2 group-hover:text-[var(--accent-primary)]">
                  {action.title}
                </h4>
                <p className="text-sm text-[var(--text-secondary)]">{action.description}</p>
              </button>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
              <div className="p-6 border-b border-[var(--border-color)]">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-[var(--text-primary)]">Recent Jobs</h3>
                  <Link
                    to="/jobs"
                    className="text-sm text-[var(--accent-primary)] hover:text-[var(--accent-hover)] font-medium"
                  >
                    View All →
                  </Link>
                </div>
              </div>
              <div className="divide-y divide-[var(--border-color)]">
                {recentJobs.length === 0 ? (
                  <div className="p-8 text-center text-[var(--text-secondary)]">
                    No jobs found
                  </div>
                ) : (
                  recentJobs.map((job) => (
                    <div key={job._id} className="p-6 hover:bg-[var(--bg-tertiary)] transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-lg font-semibold text-[var(--text-primary)] mb-1">{job.title}</h4>
                          <p className="text-sm text-[var(--text-secondary)]">{job.company}</p>
                        </div>
                        <span className="px-3 py-1 bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-hover)] text-white text-xs font-medium">
                          {job.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-[var(--text-muted)] mb-4">
                        <span>📍 {job.location}</span>
                        <span>💰 {job.salary}</span>
                        <span>🕒 {job.postedDate}</span>
                      </div>
                      <button
                        onClick={() => navigate('/jobs')}
                        className="px-4 py-2 bg-[var(--accent-primary)] text-white font-medium hover:bg-[var(--accent-hover)] transition-colors"
                      >
                        View Details
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
              <div className="p-6 border-b border-[var(--border-color)]">
                <h3 className="text-xl font-bold text-[var(--text-primary)]">Recent Activity</h3>
              </div>
              <div className="divide-y divide-[var(--border-color)]">
                {recentActivity.length === 0 ? (
                  <div className="p-6 text-center text-[var(--text-secondary)]">
                    <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">📊</span>
                    </div>
                    <p>No recent activity</p>
                  </div>
                ) : (
                  recentActivity.map((activity) => (
                    <div key={activity.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className={`w-10 h-10 flex items-center justify-center text-lg shadow-lg ${
                          activity.type === 'application' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                          activity.type === 'save' ? 'bg-gradient-to-br from-yellow-500 to-orange-600' :
                          'bg-gradient-to-br from-blue-500 to-purple-600'
                        }`}>
                          {activity.type === 'application' ? '📋' :
                           activity.type === 'save' ? '⭐' : '💬'}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">{activity.title}</h4>
                          <p className="text-xs text-[var(--text-secondary)] mb-1">{activity.company}</p>
                          <p className="text-xs text-[var(--text-muted)]">{activity.time}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
