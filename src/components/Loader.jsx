import { useEffect, useState } from 'react'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Random increment (5-15%)
        return prev + Math.random() * 10 + 5
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (progress >= 100) {
      // Fade out after reaching 100
      setTimeout(() => setHiding(true), 300)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 800)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#070714] flex items-center justify-center transition-all duration-500 ${
        hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-6">
        {/* Logo — Rotating React Atom */}
        <div className="relative">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-2xl animate-pulse" />

          {/* Rotating SVG */}
          <svg
            width="80"
            height="80"
            viewBox="-11.5 -10.23 23 20.46"
            xmlns="http://www.w3.org/2000/svg"
            className="relative text-teal-400 animate-spin-slow"
            style={{ animationDuration: '3s' }}
          >
            <circle r="2.05" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="1" fill="none">
              <ellipse rx="11" ry="4.2" />
              <ellipse rx="11" ry="4.2" transform="rotate(60)" />
              <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
          </svg>
        </div>

        {/* Text */}
        <div className="text-center">
          <h1 className="text-white font-bold text-2xl tracking-tight mb-1">
            Rehan<span className="text-teal-400">.</span>
          </h1>
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-[0.3em]">
            Loading Portfolio
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 max-w-full">
          <div className="h-0.5 bg-white/6 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-teal-400 to-cyan-500 transition-all duration-200 ease-out"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center mt-3">
            <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
              Please wait
            </span>
            <span className="font-mono text-xs text-teal-400 font-bold">
              {Math.min(Math.round(progress), 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader