import { useEffect, useState, useRef } from 'react'

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [hiding, setHiding] = useState(false)
  const startTimeRef = useRef(null)
  const rafRef = useRef(null)

  useEffect(() => {
    // ✅ Total duration: 1.4 seconds
    const duration = 1400

    // ✅ Smooth easing function (easeInOutQuad)
    const easeInOut = (t) => {
      return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
    }

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp

      const elapsed = timestamp - startTimeRef.current
      const linearProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeInOut(linearProgress)

      setProgress(easedProgress * 100)

      if (linearProgress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setProgress(100)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  useEffect(() => {
    if (progress >= 99.9) {
      setTimeout(() => setHiding(true), 200)
      setTimeout(() => {
        if (onComplete) onComplete()
      }, 700)
    }
  }, [progress, onComplete])

  return (
    <div
      className={`fixed inset-0 z-9999 bg-[#070714] flex items-center justify-center transition-all duration-500 ease-out ${
        hiding ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Ambient glows */}
      <div className="absolute top-1/4 left-1/4 w-100 h-100 rounded-full bg-teal-500/10 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-indigo-600/10 blur-[120px]" />

      {/* Content */}
      <div className="relative flex flex-col items-center gap-8 px-6">
        {/* Logo — Continuous rotating React Atom */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Outer glow */}
          <div className="absolute inset-0 rounded-full bg-teal-400/20 blur-2xl animate-pulse" />

          {/* ✅ CSS Animation for smooth rotation */}
          <svg
            width="72"
            height="72"
            viewBox="-11.5 -10.23 23 20.46"
            xmlns="http://www.w3.org/2000/svg"
            className="text-teal-400 loader-spin"
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
          <h1 className="text-white font-bold text-2xl tracking-tight mb-2">
            Rehan<span className="text-teal-400">.</span>
          </h1>
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-[0.3em]">
            Loading Portfolio
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-64 max-w-full">
          {/* Bar */}
          <div className="h-0.75 bg-white/6 rounded-full overflow-hidden relative">
            <div
              className="h-full rounded-full absolute top-0 left-0"
              style={{
                width: `${Math.min(progress, 100)}%`,
                background:
                  'linear-gradient(90deg, #2dd4bf 0%, #22d3ee 50%, #2dd4bf 100%)',
                boxShadow: '0 0 12px rgba(45, 212, 191, 0.6)',
                willChange: 'width',
              }}
            />
          </div>

          {/* Percentage */}
          <div className="flex justify-between items-center mt-4">
            <span className="font-mono text-[10px] text-neutral-600 uppercase tracking-widest">
              Please wait
            </span>
            <span className="font-mono text-sm text-teal-400 font-bold tabular-nums">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loader