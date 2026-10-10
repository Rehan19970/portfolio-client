import { useState, useEffect } from 'react'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#070714]/85 backdrop-blur-md border-b border-white/6'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-8 h-18 flex items-center justify-between">
        {/* Logo — React atom + Text */}
        <a href="#home" className="flex items-center gap-2.5 group">
          {/* React Atom Icon (custom SVG) */}
          <svg
            width="32"
            height="32"
            viewBox="-11.5 -10.23 23 20.46"
            xmlns="http://www.w3.org/2000/svg"
            className="text-teal-400 group-hover:rotate-180 transition-transform duration-700"
          >
            <circle r="2.05" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>

          <span className="text-white font-bold text-xl tracking-tight">
            RRash
          </span>
        </a>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-white text-[15px] font-medium hover:text-teal-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#070714]/95 backdrop-blur-xl border-t border-white/6">
          <ul className="px-8 py-6 flex flex-col gap-4">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-white text-base font-medium hover:text-teal-400 transition-colors block py-2"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}

export default Navbar