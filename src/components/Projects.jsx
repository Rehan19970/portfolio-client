import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiGithub, FiExternalLink, FiArrowRight } from 'react-icons/fi'
import API from '../services/api'

/* 🎨 Tech Colors — Har tech ka apna color */
const TECH_COLORS = {
  react: { text: 'text-cyan-400', bg: 'bg-cyan-400/10', border: 'border-cyan-400/30' },
  next: { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
  'next.js': { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
  node: { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  'node.js': { text: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  express: { text: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  mongodb: { text: 'text-emerald-400', bg: 'bg-emerald-400/10', border: 'border-emerald-400/30' },
  mongoose: { text: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' },
  javascript: { text: 'text-yellow-300', bg: 'bg-yellow-300/10', border: 'border-yellow-300/30' },
  js: { text: 'text-yellow-300', bg: 'bg-yellow-300/10', border: 'border-yellow-300/30' },
  typescript: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  ts: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  tailwind: { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/30' },
  'tailwind css': { text: 'text-sky-400', bg: 'bg-sky-400/10', border: 'border-sky-400/30' },
  css: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  css3: { text: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
  html: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
  html5: { text: 'text-orange-400', bg: 'bg-orange-400/10', border: 'border-orange-400/30' },
  scss: { text: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30' },
  sass: { text: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30' },
  git: { text: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/30' },
  github: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  api: { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  'rest api': { text: 'text-purple-400', bg: 'bg-purple-400/10', border: 'border-purple-400/30' },
  python: { text: 'text-yellow-500', bg: 'bg-yellow-500/10', border: 'border-yellow-500/30' },
  firebase: { text: 'text-amber-400', bg: 'bg-amber-400/10', border: 'border-amber-400/30' },
  mysql: { text: 'text-blue-600', bg: 'bg-blue-600/10', border: 'border-blue-600/30' },
  postgres: { text: 'text-sky-500', bg: 'bg-sky-500/10', border: 'border-sky-500/30' },
  figma: { text: 'text-pink-500', bg: 'bg-pink-500/10', border: 'border-pink-500/30' },
  java: { text: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/30' },
  docker: { text: 'text-blue-400', bg: 'bg-blue-400/10', border: 'border-blue-400/30' },
  vercel: { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
  stripe: { text: 'text-indigo-400', bg: 'bg-indigo-400/10', border: 'border-indigo-400/30' },
  jwt: { text: 'text-pink-400', bg: 'bg-pink-400/10', border: 'border-pink-400/30' },
  chart: { text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/30' },
  'chart.js': { text: 'text-teal-400', bg: 'bg-teal-400/10', border: 'border-teal-400/30' },
  vite: { text: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/30' },
  three: { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
  'three.js': { text: 'text-white', bg: 'bg-white/10', border: 'border-white/20' },
}

const getTechStyle = (tech) => {
  const key = tech.toLowerCase().trim()
  return (
    TECH_COLORS[key] || {
      text: 'text-teal-400',
      bg: 'bg-teal-400/10',
      border: 'border-teal-400/30',
    }
  )
}

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await API.get('/projects')
        const sorted = data.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return (a.order || 0) - (b.order || 0)
        })
        setProjects(sorted)
      } catch (err) {
        console.error('Failed to load projects', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <section
      id="projects"
      className="relative py-32 px-6 overflow-hidden bg-[#0a0a1a]"
    >
      <BackgroundDots />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <p className="font-mono text-xs text-teal-400 uppercase tracking-[0.3em] mb-4">
            My Work
          </p>
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6">
            Projects<span className="text-teal-400">.</span>
          </h2>
          <p className="text-neutral-400 text-lg max-w-3xl leading-relaxed">
            Following projects showcase my{' '}
            <span className="text-white font-medium">skills</span> and{' '}
            <span className="text-white font-medium">experience</span> through
            real-world examples.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-neutral-500 mt-4 text-sm">Loading projects...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📁</div>
            <p className="text-neutral-400">
              No projects yet. Add some from admin panel!
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* === Project Card === */
const ProjectCard = ({ project }) => {
  return (
    <div className="group relative rounded-2xl bg-[#0f0f22] border border-white/6 hover:border-teal-400/30 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-4/3 overflow-hidden bg-[#15152a]">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none'
              e.target.parentElement.style.background =
                'linear-gradient(135deg, #1e1e3f, #0f0f22)'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-[#1e1e3f] to-[#0f0f22]">
            <span className="text-6xl opacity-30">📁</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
            ⭐ Featured
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-400 hover:text-black transition-colors"
              aria-label="GitHub"
            >
              <FiGithub />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-400 hover:text-black transition-colors"
              aria-label="Live Demo"
            >
              <FiExternalLink />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-2xl font-bold mb-2">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        {project.tech && project.tech.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((t, idx) => {
              const style = getTechStyle(t)
              return (
                <li
                  key={idx}
                  className={`font-mono text-xs px-3 py-1 rounded-md border ${style.bg} ${style.text} ${style.border}`}
                >
                  #{t}
                </li>
              )
            })}
          </ul>
        )}

        {/* ✅ Case Study Link */}
        <Link
          to={`/project/${project._id}`}
          className="inline-flex items-center gap-2 text-teal-400 text-sm font-semibold hover:gap-3 transition-all"
        >
          View Case Study
          <FiArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}

/* === Background Dots === */
const BackgroundDots = () => (
  <div className="absolute inset-0 pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-40">
      <defs>
        <pattern
          id="proj-dots"
          x="0"
          y="0"
          width="50"
          height="50"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="1" fill="#2dd4bf" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#proj-dots)" />
    </svg>

    <svg className="absolute inset-0 w-full h-full opacity-20">
      <line x1="10%" y1="10%" x2="30%" y2="30%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="70%" y1="15%" x2="90%" y2="35%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="15%" y1="60%" x2="40%" y2="80%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="60%" y1="70%" x2="85%" y2="90%" stroke="#2dd4bf" strokeWidth="0.5" />
    </svg>
  </div>
)

export default Projects