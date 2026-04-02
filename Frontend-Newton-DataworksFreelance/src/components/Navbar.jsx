import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const menuRef = useRef(null)

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'hidden' // Prevent background scrolling
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.body.style.overflow = 'unset'
    }
  }, [isMenuOpen])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="bg-bg-secondary border-b border-border-color fixed top-0 left-0 right-0 z-50"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex items-center justify-between h-14 md:h-12">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-1">
              <div className="w-6 h-6 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="text-text-primary font-bold text-lg">DataWorks</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280 }}>
              <Link to="/" className="nav-btn-small">Home</Link>
            </motion.div>
            <motion.div whileHover={{ y: -2, scale: 1.01 }} transition={{ type: 'spring', stiffness: 280 }}>
              <Link to="/jobs" className="nav-btn-small">Jobs</Link>
            </motion.div>
            <div className="relative group">
              <motion.button whileHover={{ y: -1, scale: 1.01 }} transition={{ duration: 0.15 }} className="nav-btn-small flex items-center justify-center">
                Services ▼
              </motion.button>
              <div className="absolute left-0 mt-2 w-72 bg-bg-secondary border border-border-color rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible shadow-xl z-50 py-1">
                <Link to="/services" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded">📋 All Services</Link>
                <Link to="/industry/agriculture" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded flex items-center gap-2">🌾 Agriculture Data</Link>
                <Link to="/industry/small-business" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded flex items-center gap-2">🏪 Small Business Analytics</Link>
                <Link to="/industry/security-ai" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded flex items-center gap-2">🔐 Security AI/ML</Link>
                <Link to="/industry/data-engineering" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary rounded flex items-center gap-2">⚙️ Data Engineering</Link>
              </div>
            </div>

            <Link to="/about" className="nav-btn-small">About</Link>
            <Link to="/overview" className="nav-btn-small">Overview</Link>
            <Link to="/contact" className="nav-btn-small">Contact</Link>
            <Link to="/blog" className="nav-btn-small">Blog</Link>
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            {user ? (
              <div className="flex items-center space-x-2">
                <motion.button whileHover={{ scale: 1.04 }} className="relative p-1 text-text-secondary hover:text-text-primary transition-colors"> ... </motion.button>
                <Link to="/dashboard" className="nav-btn-small">Dashboard</Link>
                <Link to="/messages" className="nav-btn-small">Messages</Link>
                <div className="relative group">
                  <button className="flex items-center space-x-1 text-text-secondary hover:text-text-primary transition-colors nav-btn-small">
                    <div className="w-6 h-6 bg-accent-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-medium text-8px">{user.name?.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="text-8px">{user.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-bg-secondary border border-border-color rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <Link to="/profile" className="block px-4 py-2 text-8px text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors">Profile</Link>
                    <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-8px text-text-secondary hover:text-text-primary hover:bg-bg-tertiary transition-colors">Logout</button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="nav-btn-small">Login</Link>
                <Link to="/signup" className="nav-btn-small bg-accent-primary text-white hover:bg-accent-hover">Sign Up</Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-text-primary transition-colors p-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </motion.button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-bg-secondary border-t border-border-color absolute top-full left-0 right-0 z-40 shadow-lg"
          >
            <div className="px-4 pt-2 pb-3 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                Home
              </Link>
              <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                Jobs
              </Link>

              {/* Services Section */}
              <div className="py-2">
                <div className="px-3 py-1 text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Services
                </div>
                <Link to="/services" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                  📋 All Services
                </Link>
                <Link to="/industry/agriculture" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                  🌾 Agriculture Data
                </Link>
                <Link to="/industry/small-business" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                  🏪 Small Business Analytics
                </Link>
                <Link to="/industry/security-ai" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                  🔐 Security AI/ML
                </Link>
                <Link to="/industry/data-engineering" onClick={() => setIsMenuOpen(false)} className="block px-6 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                  ⚙️ Data Engineering
                </Link>
              </div>

              <Link to="/about" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                About
              </Link>
              <Link to="/overview" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                Overview
              </Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                Contact
              </Link>
              <Link to="/blog" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                Blog
              </Link>

              {/* User Section */}
              {user ? (
                <div className="border-t border-border-color pt-2 mt-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                    Dashboard
                  </Link>
                  <Link to="/messages" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                    Messages
                  </Link>
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="border-t border-border-color pt-2 mt-2 space-y-1">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm bg-accent-primary text-white hover:bg-accent-hover rounded-lg transition-colors text-center">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </motion.nav>
  )
}

export default Navbar
