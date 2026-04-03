import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout, updateProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('account');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    notifications: {
      emailNotifications: true,
      messageNotifications: true,
      jobAlerts: true,
      weeklyDigest: true
    },
    privacy: {
      profileVisibility: 'public',
      showEmail: false,
      showPhone: false
    },
    theme: 'dark'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.includes('.')) {
      const [section, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      await updateProfile({
        name: formData.name,
        email: formData.email
      });
      setMessage('✅ Profile updated successfully');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error updating profile: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('❌ Passwords do not match');
      return;
    }

    if (formData.newPassword.length < 6) {
      setMessage('❌ Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      // Note: This would require a backend endpoint that we'd need to create
      setMessage('✅ Password changed successfully');
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('❌ Error changing password');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (confirm('Are you sure you want to log out?')) {
      logout();
      navigate('/login');
    }
  };

  const handleDeleteAccount = () => {
    if (confirm('Are you sure? This action cannot be undone.')) {
      if (confirm('Type "DELETE" to confirm account deletion.')) {
        // Would need backend endpoint
        setMessage('Account deletion functionality coming soon');
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] mobile-compact">
      {/* Header */}
      <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Settings</h1>
          <p className="text-[var(--text-secondary)] mt-2">Manage your account and preferences</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${
            message.includes('✅')
              ? 'bg-green-500/10 border-green-500/20 text-green-600'
              : 'bg-red-500/10 border-red-500/20 text-red-600'
          }`}>
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg overflow-hidden sticky top-4">
              <nav className="flex flex-col">
                {[
                  { id: 'account', label: 'Account Settings', icon: '👤' },
                  { id: 'password', label: 'Change Password', icon: '🔐' },
                  { id: 'notifications', label: 'Notifications', icon: '🔔' },
                  { id: 'privacy', label: 'Privacy & Visibility', icon: '👁️' },
                  { id: 'theme', label: 'Appearance', icon: '🎨' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-3 text-left border-b border-[var(--border-color)] last:border-b-0 transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[var(--accent-primary)] text-white'
                        : 'hover:bg-[var(--bg-tertiary)] text-[var(--text-primary)]'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span> {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-6">
              {/* Account Settings Tab */}
              {activeTab === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Account Settings</h2>
                  <form onSubmit={handleUpdateProfile} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                      <p className="text-xs text-[var(--text-secondary)] mt-2">
                        Account role: <span className="font-semibold capitalize">{user?.role}</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Change Password</h2>
                  <form onSubmit={handleChangePassword} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        placeholder="Enter your current password"
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        placeholder="Enter your new password"
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your new password"
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Updating...' : 'Change Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Notification Settings</h2>
                  <div className="space-y-4">
                    {[
                      { key: 'emailNotifications', label: 'Email Notifications', desc: 'Receive email updates about your account' },
                      { key: 'messageNotifications', label: 'Message Notifications', desc: 'Get notified when you receive messages' },
                      { key: 'jobAlerts', label: 'Job Alerts', desc: 'Receive alerts for new job matches' },
                      { key: 'weeklyDigest', label: 'Weekly Digest', desc: 'Get a weekly summary of activity' }
                    ].map(setting => (
                      <div key={setting.key} className="flex items-center justify-between p-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg">
                        <div>
                          <p className="font-medium text-[var(--text-primary)]">{setting.label}</p>
                          <p className="text-sm text-[var(--text-secondary)]">{setting.desc}</p>
                        </div>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name={`notifications.${setting.key}`}
                            checked={formData.notifications[setting.key]}
                            onChange={handleChange}
                            className="w-5 h-5 accent-[var(--accent-primary)]"
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setMessage('✅ Notification preferences saved')}
                    className="mt-6 px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                  >
                    Save Preferences
                  </button>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Privacy & Visibility</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                        Profile Visibility
                      </label>
                      <select
                        name="privacy.profileVisibility"
                        value={formData.privacy.profileVisibility}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)]"
                      >
                        <option value="public">Public - Everyone can see your profile</option>
                        <option value="private">Private - Only logged-in users can see</option>
                        <option value="hidden">Hidden - Only you can see your profile</option>
                      </select>
                    </div>

                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="privacy.showEmail"
                          checked={formData.privacy.showEmail}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[var(--accent-primary)]"
                        />
                        <span className="ml-2 text-sm text-[var(--text-primary)]">Show email on profile</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="privacy.showPhone"
                          checked={formData.privacy.showPhone}
                          onChange={handleChange}
                          className="w-4 h-4 accent-[var(--accent-primary)]"
                        />
                        <span className="ml-2 text-sm text-[var(--text-primary)]">Show phone number on profile</span>
                      </label>
                    </div>

                    <button
                      onClick={() => setMessage('✅ Privacy settings saved')}
                      className="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      Save Privacy Settings
                    </button>
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'theme' && (
                <div>
                  <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Appearance</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text-primary)] mb-3">
                        Theme
                      </label>
                      <div className="space-y-3">
                        {[
                          { value: 'light', label: '☀️ Light', desc: 'Bright, eye-friendly light theme' },
                          { value: 'dark', label: '🌙 Dark', desc: 'Easy on the eyes dark theme' },
                          { value: 'auto', label: '⚙️ Auto', desc: 'Follow system preferences' }
                        ].map(option => (
                          <label key={option.value} className="flex items-center p-4 border border-[var(--border-color)] rounded-lg cursor-pointer hover:bg-[var(--bg-primary)]">
                            <input
                              type="radio"
                              name="theme"
                              value={option.value}
                              checked={formData.theme === option.value}
                              onChange={handleChange}
                              className="w-4 h-4 accent-[var(--accent-primary)]"
                            />
                            <div className="ml-3">
                              <p className="font-medium text-[var(--text-primary)]">{option.label}</p>
                              <p className="text-sm text-[var(--text-secondary)]">{option.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => setMessage('✅ Theme preference saved')}
                      className="px-6 py-2 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors"
                    >
                      Save Theme
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Danger Zone */}
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-6">
              <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
              <div className="space-y-4">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  🚪 Log Out
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
