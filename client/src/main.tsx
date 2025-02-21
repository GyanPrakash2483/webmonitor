import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home.tsx'
import About from './routes/about/About.tsx'
import Offerings from './routes/offerings/Offerings.tsx'
import Blog from './routes/blog/Blog.tsx'
import MasteringTheFirstImpression from './routes/blog/mastering-the-first-impression.tsx'
import TheArtOfDrawingReadersIn from './routes/blog/the-art-of-drawing-readers-in.tsx'
import CraftingCaptivatingHeadlines from './routes/blog/crafting-captivating-headlines.tsx'
import Contact from './routes/contact/Contact.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/offerings' element={<Offerings />} />
        <Route path='/blog' element={<Blog />} />
        <Route path='/blog/mastering-the-first-impression' element={<MasteringTheFirstImpression />} />
        <Route path='/blog/the-art-of-drawing-readers-in' element={<TheArtOfDrawingReadersIn />} />
        <Route path='/blog/crafting-captivating-headlines' element={<CraftingCaptivatingHeadlines />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
