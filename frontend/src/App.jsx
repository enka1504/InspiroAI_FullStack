import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './pages/landing'
import Blog from './pages/blog'
import Video from './pages/video'
import Dashboard from './pages/dashboard'
import Image from './pages/image'
import Article from './pages/article'
import Resume from './pages/resume'
import Pricing from './pages/pricing'
import Code from './pages/code'


const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />} />
      <Route path='/blog' element={<Blog />} />
      <Route path='/video' element={<Video />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/image' element={<Image />} />
      <Route path='/article' element={<Article />} />
      <Route path='/resume' element={<Resume />} />
      <Route path='/pricing' element={<Pricing />} />
      <Route path='/code' element={<Code />} />
    </Routes>
  )
}

export default App