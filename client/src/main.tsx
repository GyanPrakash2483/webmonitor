import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './routes/home/Home.tsx'
import About from './routes/about/About.tsx'
import Offerings from './routes/offerings/Offerings.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path='/offerings' element={<Offerings />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
