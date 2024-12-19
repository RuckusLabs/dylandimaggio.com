import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Video from './pages/Video';
import Writing from './pages/Writing';
import VideosPage from './pages/VideosPage';

function App() {

  return (
    <>
      <Router basename="/dylandimaggio.com">
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/video/:id" element={<Video />} />
          <Route path="/about" element={<About />} />
          <Route path="/writing" element={<Writing />} />
        </Routes>
        <Footer />
      </Router>
    </>
  )
}

export default App
