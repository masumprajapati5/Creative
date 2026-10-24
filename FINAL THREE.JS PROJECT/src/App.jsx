import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import ProjectDetail from './components/ProjectDetail'

const App = () => {
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  return (
    <div className="min-h-screen flex flex-col justify-between relative selection:bg-neutral-900 selection:text-white">
      {/* Navbar */}
      <div className="navbar fixed flex items-center justify-between top-0 left-0 z-[100] h-[8vh] w-full px-[3vw] backdrop-blur-sm bg-[#ebebeb]/50">
        <div className="name">
          <Link to="/">
            <h3 className="text-[1.5rem] instrument cursor-pointer hover:opacity-60 transition-opacity">
              Masum Prajapati
            </h3>
          </Link>
        </div>
        <div className="aboutLink">
          <Link to="/about">
            <h3 className="text-[1.5rem] instrument cursor-pointer hover:opacity-60 transition-opacity">
              About
            </h3>
          </Link>
        </div>
      </div>

      {/* Routes */}
      <main className="flex-1 w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
        </Routes>
      </main>

      {/* Footer */}
      <div
        className={`footer z-[100] w-full px-[3vw] py-4 flex items-center justify-between ${
          isHomePage
            ? 'fixed bottom-0 left-0 pointer-events-none'
            : 'relative mt-16'
        }`}
      >
        <div className="copyright pointer-events-auto">
          <h3 className="text-[1rem] instrument">© 2026 Masum Prajapati</h3>
        </div>
        <div className="contactinfo pointer-events-auto flex items-center gap-12 sm:gap-20">
          <div className="socials flex flex-col gap-0.5">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="text-[0.8rem] leading-[1.3] text-neutral-800 hover:text-black transition-colors"
            >
              Instagram
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="text-[0.8rem] leading-[1.3] text-neutral-800 hover:text-black transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="text-[0.8rem] leading-[1.3] text-neutral-800 hover:text-black transition-colors"
            >
              Github
            </a>
          </div>
          <div className="email flex flex-col gap-0.5">
            <h3 className="text-[0.8rem] leading-[1.3] text-neutral-600">
              h3llo fr!3nd !
            </h3>
            <a
              href="mailto:pm04092005@gmail.com"
              className="text-[0.8rem] leading-[1.3] font-medium text-neutral-900 hover:underline"
            >
              pm04092005@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App