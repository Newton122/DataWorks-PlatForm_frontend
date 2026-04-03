import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'freelancer'
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signup } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match')
    }

    if (formData.password.length < 6) {
      return setError('Password must be at least 6 characters')
    }

    setLoading(true)

    try {
      await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      })
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4 mobile-compact">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Create Account</h1>
          <p className="text-[var(--text-muted)]">Join DataWorks and start your journey</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[#64748B] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[#64748B] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                I am a
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
              >
                <option value="freelancer">Freelancer</option>
                <option value="client">Client</option>
                <option value="intern">Intern</option>
              </select>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[#64748B] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-lg text-[var(--text-primary)] placeholder-[#64748B] focus:outline-none focus:border-[var(--accent-primary)] transition-colors"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                className="w-4 h-4 bg-[var(--bg-primary)] border border-[var(--border-color)] rounded text-[var(--accent-primary)] focus:ring-[var(--accent-primary)] focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="ml-2 text-sm text-[var(--text-muted)]">
                I agree to the{' '}
                <Link to="/terms" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)]">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[var(--accent-primary)] text-white font-semibold rounded-lg hover:bg-[var(--accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[var(--text-muted)]">
              Already have an account?{' '}
              <Link to="/login" className="text-[var(--accent-primary)] hover:text-[var(--accent-primary)] font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
