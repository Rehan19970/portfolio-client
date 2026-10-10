import { useEffect, useState } from 'react'
import {
  FiGithub,
  FiLinkedin,
  FiTwitter,
  FiArrowDown,
  FiArrowRight,
  FiDownload,
} from 'react-icons/fi'
import API from '../services/api'

const socials = [
  { icon: <FiGithub />, href: 'https://github.com/', label: 'GitHub' },
  { icon: <FiLinkedin />, href: 'https://linkedin.com/', label: 'LinkedIn' },
  { icon: <FiTwitter />, href: 'https://twitter.com/', label: 'Twitter' },
]

const stack = ['React', 'Node.js', 'Tailwind', 'MongoDB']

const stats = [
  { value: '20+', label: 'Projects' },
  { value: '2+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
]

export default function Hero() {
  const [resumeUrl, setResumeUrl] = useState(null)

  // 📄 Fetch resume
  useEffect(() => {
    const fetchResume = async () => {
      try {
        const { data } = await API.get('/resume')
        if (data.pdfUrl) setResumeUrl(data.pdfUrl)
      } catch (err) {
        console.error('Resume fetch failed:', err)
      }
    }
    fetchResume()
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 pb-16 bg-[#070714]"
    >
      {/* GRID BG */}
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.35) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 25%, transparent 75%)',
        }}
      />

      {/* GLOWS */}
      <div className="absolute top-1/4 left-1/4 w-115 h-115 rounded-full bg-indigo-600/20 blur-[130px]" />
      <div className="absolute bottom-0 right-1/4 w-130 h-130 rounded-full bg-teal-400/10 blur-[150px]" />

      {/* MAIN */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-10 w-full text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-1.5 text-emerald-400 text-sm mb-8">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          Available for freelance work
        </div>

        <h1 className="text-5xl md:text-7xl xl:text-8xl font-extrabold text-white leading-[1.05] tracking-tight">
          Hi, I'm{' '}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-teal-400 to-blue-500">
            Rehan
          </span>
        </h1>

        <h2 className="mt-5 text-2xl md:text-3xl font-semibold text-gray-200">
          Full-Stack Web Developer
        </h2>

        <p className="text-gray-400 mt-5 text-base md:text-lg max-w-2xl leading-relaxed">
          I build fast, scalable and visually polished web applications, from
          clean interfaces to reliable backends, that help businesses grow.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2">
          {stack.map((s) => (
            <span
              key={s}
              className="rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-mono text-gray-300"
            >
              {s}
            </span>
          ))}
        </div>

        {/* ✅ Buttons — Clean & Professional */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          {/* Primary CTA */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-7 py-3 rounded-lg text-white font-medium shadow-lg shadow-blue-600/30 transition hover:-translate-y-0.5"
          >
            View Projects
            <FiArrowRight className="transition group-hover:translate-x-1" />
          </a>

          {/* Download CV — Dynamic */}
          {resumeUrl ? (
            <a
              href={resumeUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="inline-flex items-center gap-2 border border-white/15 hover:border-teal-400 hover:text-teal-400 px-7 py-3 rounded-lg text-white font-medium transition hover:-translate-y-0.5"
            >
              <FiDownload /> Download CV
            </a>
          ) : (
            <span
              className="inline-flex items-center gap-2 border border-white/10 text-gray-500 px-7 py-3 rounded-lg font-medium cursor-not-allowed"
              title="CV will be available soon"
            >
              <FiDownload /> CV Coming Soon
            </span>
          )}

          {/* Social Icons */}
          <div className="flex gap-2 sm:ml-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-11 h-11 flex items-center justify-center rounded-full border border-white/10 bg-white/5 text-white text-lg transition hover:bg-teal-400/10 hover:border-teal-400 hover:text-teal-400 hover:-translate-y-0.5"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 w-full max-w-xl flex justify-center gap-10 sm:gap-16">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-2xl md:text-3xl font-bold text-white">
                {s.value}
              </div>
              <div className="text-xs md:text-sm text-gray-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-gray-500 animate-bounce">
        <FiArrowDown size={20} />
      </div>
    </section>
  )
}