import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const DashboardLayout = () => {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

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

      <Sidebar />
      <div className="flex-1 flex flex-col lg:min-w-0">
        <Topbar />
        <AnimatePresence mode="wait">
          <MotionMain
            key={location.pathname}
            initial={initialFor({ opacity: 0, x: 18 })}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 p-4 lg:p-6"
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
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)] p-6 mt-auto">
          <div className="max-w-7xl mx-auto text-center text-sm text-[var(--text-muted)]">
            &copy; 2024 DataWorks Freelance. All rights reserved. | 
            <Link to="/privacy" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)] mx-2">Privacy</Link> | 
            <Link to="/terms" className="text-[var(--accent-primary)] hover:text-[var(--accent-hover)]">Terms</Link>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default DashboardLayout
