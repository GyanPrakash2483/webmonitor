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
      </Routes>
    </AnimatePresence>
    </BrowserRouter>
  </StrictMode>,
)
