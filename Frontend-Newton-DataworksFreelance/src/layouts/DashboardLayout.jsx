import { Outlet, Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

const DashboardLayout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 flex lg:flex-row">

      <Sidebar />
      <div className="flex-1 flex flex-col lg:min-w-0">
        <Topbar />
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, x: 18 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -18 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="flex-1 p-4 lg:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </motion.main>
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
