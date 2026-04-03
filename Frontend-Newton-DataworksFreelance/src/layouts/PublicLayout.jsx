import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PublicLayout = () => {
  const location = useLocation()
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const initialFor = (variants) => (isMobile ? false : variants)

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={initialFor({ opacity: 0, y: 16 })}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="w-full pt-16 md:pt-20 min-h-screen"
        >
          <motion.div
            initial={initialFor({ opacity: 0, y: 12 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <Outlet />
          </motion.div>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default PublicLayout
