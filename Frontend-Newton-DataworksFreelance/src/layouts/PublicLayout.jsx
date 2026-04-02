import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const PublicLayout = () => {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="w-full pt-16 md:pt-20 min-h-screen"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
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
