import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ClipboardList, Leaf, ShoppingBag, Shield, Settings2 } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const menuRef = useRef(null)

  useEffect(() => {
    if (isMenuOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'unset'
    return () => (document.body.style.overflow = 'unset')
  }, [isMenuOpen])

  // Close services dropdown when clicking outside
  useEffect(() => {
    const onDocClick = (e) => {
      if (!e.target.closest) return
      const servicesEl = document.getElementById('nav-services-dropdown')
      const servicesBtn = document.getElementById('nav-services-btn')
      if (!servicesEl || !servicesBtn) return
      if (!servicesEl.contains(e.target) && !servicesBtn.contains(e.target)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="bg-bg-secondary/95 backdrop-blur-xl border-b border-[var(--border-color)] fixed top-0 left-0 right-0 z-50 shadow-xl"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 md:h-12">
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-1">
                <div className="w-6 h-6 bg-[var(--accent-primary)] rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="text-text-primary font-bold text-lg">DataWorks</span>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <Link to="/" className="nav-btn-small">Home</Link>
              <Link to="/jobs" className="nav-btn-small">Jobs</Link>
              <div className="relative md:group">
                <button
                  id="nav-services-btn"
                  onClick={() => setIsServicesOpen((s) => !s)}
                  className="nav-btn-small"
                  aria-expanded={isServicesOpen}
                >
                  Services ▼
                </button>
                <div
                  id="nav-services-dropdown"
                  className={`absolute left-0 mt-2 w-72 bg-bg-secondary border border-border-color rounded-lg shadow-xl z-50 py-1 transition-opacity duration-150 ${isServicesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} md:group-hover:opacity-100 md:group-hover:visible`}
                >
                  <Link to="/services" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">All Services</Link>
                  <Link to="/industry/agriculture" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">Agriculture Data</Link>
                  <Link to="/industry/small-business" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">Small Business Analytics</Link>
                  <Link to="/industry/security-ai" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">Security AI/ML</Link>
                  <Link to="/industry/data-engineering" className="block px-4 py-2 text-8px text-text-secondary hover:bg-bg-tertiary hover:text-text-primary">Data Engineering</Link>
                </div>
              </div>
              <Link to="/about" className="nav-btn-small">About</Link>
              <Link to="/team" className="nav-btn-small">Team</Link>
            </div>

            <div className="hidden md:flex items-center space-x-2">
              <ThemeToggle />
              {user ? (
                <>
                  <Link to="/dashboard" className="nav-btn-small">Dashboard</Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="nav-btn-small">Login</Link>
                  <Link to="/signup" className="nav-btn-small bg-accent-primary text-white">Sign Up</Link>
                </>
              )}
            </div>

            <div className="md:hidden flex items-center space-x-2">
              <ThemeToggle />
              <button
                onClick={() => setIsMenuOpen((s) => !s)}
                className="text-text-secondary hover:text-text-primary transition-colors p-2"
                aria-label="Open menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay and drawer placed outside the animated nav to avoid stacking context issues */}
      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-[99998] bg-black/40 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          <motion.aside
            ref={menuRef}
            initial={{ x: 260, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 260, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-y-0 right-0 z-[99999] w-4/5 max-w-xs sm:max-w-sm h-full bg-bg-secondary border-l border-border-color shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-border-color">
              <span className="text-sm font-semibold text-text-primary">Menu</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-lg hover:bg-bg-tertiary transition-colors" aria-label="Close menu">
                <svg className="w-5 h-5 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="px-4 py-3 space-y-1">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg">Home</Link>
              <Link to="/jobs" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg">Jobs</Link>
              <div className="py-2">
                <button
                  onClick={() => setIsServicesOpenMobile((s) => !s)}
                  className="w-full flex items-center justify-between px-3 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors"
                  aria-expanded={isServicesOpenMobile}
                >
                  <span className="flex items-center gap-2"><ClipboardList className="w-4 h-4" /> Services</span>
                  <svg className={`w-4 h-4 transform transition-transform ${isServicesOpenMobile ? 'rotate-180' : 'rotate-0'}`} viewBox="0 0 20 20" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 8l4 4 4-4" />
                  </svg>
                </button>

                <div className={`${isServicesOpenMobile ? 'block' : 'hidden'} px-2 mt-1 space-y-1`}> 
                  <Link to="/services" onClick={() => { setIsMenuOpen(false); setIsServicesOpenMobile(false); }} className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">All Services</Link>
                  <Link to="/industry/agriculture" onClick={() => { setIsMenuOpen(false); setIsServicesOpenMobile(false); }} className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">Agriculture Data</Link>
                  <Link to="/industry/small-business" onClick={() => { setIsMenuOpen(false); setIsServicesOpenMobile(false); }} className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">Small Business Analytics</Link>
                  <Link to="/industry/security-ai" onClick={() => { setIsMenuOpen(false); setIsServicesOpenMobile(false); }} className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">Security AI/ML</Link>
                  <Link to="/industry/data-engineering" onClick={() => { setIsMenuOpen(false); setIsServicesOpenMobile(false); }} className="block px-4 py-2 text-sm text-text-secondary hover:text-text-primary hover:bg-bg-tertiary rounded-lg transition-colors">Data Engineering</Link>
                </div>
              </div>

              {user ? (
                <div className="border-t border-border-color pt-2 mt-2">
                  <Link to="/dashboard" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm">Dashboard</Link>
                </div>
              ) : (
                <div className="border-t border-border-color pt-2 mt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 text-sm bg-accent-primary text-white">Sign Up</Link>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </>
  )
}

export default Navbar
