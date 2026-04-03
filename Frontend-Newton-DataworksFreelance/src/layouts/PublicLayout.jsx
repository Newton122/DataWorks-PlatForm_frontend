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
    <div className="min-h-screen bg-bg-primary">
      <Navbar />
      <AnimatePresence mode="wait">
        <MotionMain
          key={location.pathname}
          initial={initialFor({ opacity: 0, y: 16 })}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="w-full pt-16 md:pt-20 min-h-screen"
        >
          <MotionDiv
            initial={initialFor({ opacity: 0, y: 12 })}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <Outlet />
          </MotionDiv>
        </MotionMain>
      </AnimatePresence>
      <Footer />
    </div>
  )
}

export default PublicLayout
