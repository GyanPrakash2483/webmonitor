import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home.tsx'
import About from './routes/about/About.tsx'
import Offerings from './routes/offerings/Offerings.tsx'
import Blog from './routes/blog/Blog.tsx'
import MasteringTheFirstImpression from './routes/blog/mastering-the-first-impression.tsx'
import TheArtOfDrawingReadersIn from './routes/blog/the-art-of-drawing-readers-in.tsx'
import CraftingCaptivatingHeadlines from './routes/blog/crafting-captivating-headlines.tsx'
import Contact from './routes/contact/Contact.tsx'
import { AnimatePresence, motion } from 'framer-motion';
import Dashboard from './routes/dashboard/Dashboard.tsx'
import TermsOfService from './routes/pages/terms-of-service.tsx'
import PrivacyPolicy from './routes/pages/privacy-policy.tsx'
import Register from './routes/register/Register.tsx'
import VerifyAccount from './routes/verifyaccount/VerifyAccount.tsx'
import Login from './routes/login/login.tsx'
import ForgotPassword from './routes/forgotpassword/forgotpassword.tsx'
import ResetPassword from './routes/resetpassword/resetpassword.tsx'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<motion.div {...pageVariants}><Home /></motion.div>} />
        <Route path="/home" element={<motion.div {...pageVariants}><Home /></motion.div>} />
        <Route path="/about" element={<motion.div {...pageVariants}><About /></motion.div>} />
        <Route path="/offerings" element={<motion.div {...pageVariants}><Offerings /></motion.div>} />
        <Route path="/blog" element={<motion.div {...pageVariants}><Blog /></motion.div>} />
        <Route path="/blog/mastering-the-first-impression" element={<motion.div {...pageVariants}><MasteringTheFirstImpression /></motion.div>} />
        <Route path="/blog/the-art-of-drawing-readers-in" element={<motion.div {...pageVariants}><TheArtOfDrawingReadersIn /></motion.div>} />
        <Route path="/blog/crafting-captivating-headlines" element={<motion.div {...pageVariants}><CraftingCaptivatingHeadlines /></motion.div>} />
        <Route path="/contact" element={<motion.div {...pageVariants}><Contact /></motion.div>} />
        <Route path="/dashboard" element={<motion.div {...pageVariants}><Dashboard /></motion.div>} />
        <Route path="/register" element={<motion.div {...pageVariants}><Register /></motion.div>} />
        <Route path="/pages/terms-of-service" element={<motion.div {...pageVariants}><TermsOfService /></motion.div>} />
        <Route path="/pages/privacy-policy" element={<motion.div {...pageVariants}><PrivacyPolicy /></motion.div>} />
        <Route path="/verifyaccount" element={<motion.div {...pageVariants}><VerifyAccount /></motion.div>} />
        <Route path="/login" element={<motion.div {...pageVariants}><Login /></motion.div>} />
        <Route path="/forgotpassword" element={<motion.div {...pageVariants}><ForgotPassword /></motion.div>} />
        <Route path="/resetpassword" element={<motion.div {...pageVariants}><ResetPassword /></motion.div>} />

      </Routes>
    </AnimatePresence>
    </BrowserRouter>
  </StrictMode>,
)
