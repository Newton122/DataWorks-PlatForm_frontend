import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const DashboardLayout = () => {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (!mobile) {
        setIsSidebarOpen(false) // Close sidebar on desktop
      }
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)

  const initialFor = (variants) => (isMobile ? false : variants)

  // Motion components that render as plain HTML on mobile
  const MotionMain = ({ children, initial, animate, exit, transition, ...props }) => {
    return isMobile ? (
      <main {...props}>{children}</main>
    ) : (
      <motion.main initial={initialFor(initial)} animate={animate} exit={exit} transition={transition} {...props}>{children}</motion.main>
    );
  };

  const MotionDiv = ({ children, initial, animate, transition, ...props }) => {
    return isMobile ? (
      <div {...props}>{children}</div>
    ) : (
      <motion.div initial={initialFor(initial)} animate={animate} transition={transition} {...props}>{children}</motion.div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex lg:flex-row">
      {/* Sidebar - Hidden on mobile, overlay when open */}
      <div className={`lg:block ${isMobile ? (isSidebarOpen ? 'fixed inset-0 z-50' : 'hidden') : ''}`}>
        <div className={`${isMobile ? 'absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
        <div className={`relative ${isMobile ? 'w-64 h-full ml-auto bg-[var(--bg-secondary)]' : ''}`}>
          <Sidebar onClose={() => setIsSidebarOpen(false)} />
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:min-w-0">
        <Topbar onMenuClick={toggleSidebar} />
        <AnimatePresence mode="wait">
          <MotionMain
            key={location.pathname}
            initial={initialFor({ opacity: 0, x: 18 })}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 p-3 sm:p-4 lg:p-6"
          >
            <MotionDiv
              initial={initialFor({ opacity: 0, y: 14 })}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </MotionDiv>
          </MotionMain>
        </AnimatePresence>
        
        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] z-40">
          <div className="flex items-center justify-around h-16 px-2">
            <Link
              to="/dashboard"
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                location.pathname === '/dashboard'
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="text-xs mt-1">Home</span>
            </Link>
            
            <Link
              to="/messages"
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                location.pathname === '/messages'
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span className="text-xs mt-1">Messages</span>
            </Link>
            
            <Link
              to="/jobs"
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                location.pathname === '/jobs'
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-xs mt-1">Jobs</span>
            </Link>
            
            <Link
              to="/profile"
              className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors ${
                location.pathname === '/profile'
                  ? 'text-[var(--accent-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-xs mt-1">Profile</span>
            </Link>
          </div>
        </div>
        
        {/* Add padding bottom on mobile for bottom nav */}
        <div className="lg:hidden h-16"></div>
        
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] p-3 sm:p-4 lg:p-6 mt-auto">
          <div className="max-w-7xl mx-auto text-center text-sm text-[var(--text-muted)]">
            &copy; 2026 DataWorks Freelance. All rights reserved. | 
            <Link to="/privacy" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] mx-2">Privacy</Link> | 
            <Link to="/terms" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout
