import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiTwitter } from 'react-icons/fi'

const Footer = () => {
  const navigate = useNavigate()
  const tapCount = useRef(0)
  const tapTimer = useRef(null)

  // 🔒 5 taps on logo → admin login
  const handleLogoTap = () => {
    tapCount.current += 1

    if (tapTimer.current) clearTimeout(tapTimer.current)

    if (tapCount.current >= 5) {
      tapCount.current = 0
      navigate('/admin/login')
      return
    }

    tapTimer.current = setTimeout(() => {
      tapCount.current = 0
    }, 1500)
  }

  return (
    <footer className="relative py-8 px-6 border-t border-white/6 bg-[#0a0a1a]">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Left — Logo */}
        <span
          onClick={handleLogoTap}
          className="text-white font-bold text-lg select-none cursor-default"
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          Rehan<span className="text-teal-400">.</span>
        </span>

        {/* Center — Social Icons */}
        <div className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-400/5 hover:-translate-y-0.5 transition-all duration-300"
            aria-label="GitHub"
          >
            <FiGithub size={15} />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-400/5 hover:-translate-y-0.5 transition-all duration-300"
            aria-label="LinkedIn"
          >
            <FiLinkedin size={15} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="w-9 h-9 rounded-full bg-white/3 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-teal-400 hover:border-teal-400/40 hover:bg-teal-400/5 hover:-translate-y-0.5 transition-all duration-300"
            aria-label="Twitter"
          >
            <FiTwitter size={15} />
          </a>
        </div>

        {/* Right — Copyright */}
        <p className="font-mono text-xs text-neutral-500 hidden sm:block">
          © {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  )
}

export default Footer