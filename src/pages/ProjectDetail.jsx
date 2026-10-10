import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  FiArrowLeft,
  FiExternalLink,
  FiGithub,
  FiCalendar,
  FiUser,
  FiClock,
  FiCheckCircle,
  FiAlertTriangle,
} from 'react-icons/fi'
import axios from 'axios'

const ProjectDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/projects/${id}`
        )
        setProject(data)
      } catch (err) {
        console.error(err)
        navigate('/')
      } finally {
        setLoading(false)
      }
    }
    fetchProject()
  }, [id, navigate])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070714] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!project) return null

  return (
    <div className="min-h-screen bg-[#070714] text-white">
      {/* Grid BG */}
      <div
        className="fixed inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-5xl mx-auto px-6 py-12">
        {/* Back */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-teal-400 transition-colors mb-12"
        >
          <FiArrowLeft />
          Back to Portfolio
        </button>

        {/* Hero */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-4">
            {project.title}
          </h1>
          <p className="text-neutral-400 text-lg md:text-xl max-w-3xl leading-relaxed mb-8">
            {project.description}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400 hover:bg-teal-300 text-black font-bold rounded-xl transition-all hover:-translate-y-0.5"
              >
                <FiExternalLink />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/15 hover:border-teal-400 hover:text-teal-400 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
              >
                <FiGithub />
                View Code
              </a>
            )}
          </div>
        </div>

        {/* Hero Image */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-16">
            <img
              src={project.image}
              alt={project.title}
              className="w-full object-cover"
            />
          </div>
        )}

        {/* Overview */}
        <Section title="Overview" icon="📋">
          <div className="grid md:grid-cols-3 gap-4">
            {project.role && (
              <InfoCard icon={FiUser} label="Role" value={project.role} />
            )}
            {project.duration && (
              <InfoCard icon={FiClock} label="Duration" value={project.duration} />
            )}
            {project.year && (
              <InfoCard icon={FiCalendar} label="Year" value={project.year} />
            )}
          </div>
        </Section>

        {/* Problem */}
        {project.problem && (
          <Section title="The Challenge" icon="🎯">
            <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
              {project.problem}
            </p>
          </Section>
        )}

        {/* Solution */}
        {project.solution && (
          <Section title="The Solution" icon="💡">
            <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
              {project.solution}
            </p>
          </Section>
        )}

        {/* Tech Stack */}
        {project.tech && project.tech.length > 0 && (
          <Section title="Tech Stack" icon="🛠️">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t, i) => (
                <span
                  key={i}
                  className="font-mono text-sm px-4 py-2 rounded-lg bg-teal-400/10 text-teal-400 border border-teal-400/20"
                >
                  {t}
                </span>
              ))}
            </div>
          </Section>
        )}

        {/* Challenges */}
        {project.challenges && project.challenges.length > 0 && (
          <Section title="Challenges & Solutions" icon="⚠️">
            <div className="space-y-4">
              {project.challenges.map((c, i) => (
                <div
                  key={i}
                  className="bg-[#0d0d24] border border-white/[0.06] rounded-2xl p-6"
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <FiAlertTriangle className="text-orange-400" size={14} />
                    </div>
                    <h3 className="text-white font-bold text-lg">
                      {c.title}
                    </h3>
                  </div>
                  <p className="text-neutral-400 leading-relaxed pl-11">
                    {c.description}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Design Decisions */}
        {project.designDecisions && (
          <Section title="Design Decisions" icon="🎨">
            <p className="text-neutral-300 leading-relaxed whitespace-pre-line">
              {project.designDecisions}
            </p>
          </Section>
        )}

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <Section title="Results" icon="📊">
            <ul className="space-y-3">
              {project.results.map((r, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-neutral-300"
                >
                  <FiCheckCircle className="text-teal-400 mt-1 flex-shrink-0" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Learnings */}
        {project.learnings && project.learnings.length > 0 && (
          <Section title="What I Learned" icon="🎓">
            <ul className="space-y-3">
              {project.learnings.map((l, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-neutral-300"
                >
                  <span className="text-teal-400 font-mono">▹</span>
                  <span>{l}</span>
                </li>
              ))}
            </ul>
          </Section>
        )}

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <Section title="Screenshots" icon="📸">
            <div className="grid md:grid-cols-2 gap-4">
              {project.screenshots.map((s, i) => (
                <div
                  key={i}
                  className="rounded-xl overflow-hidden border border-white/10 hover:border-teal-400/40 transition-colors"
                >
                  <img src={s} alt={`Screenshot ${i + 1}`} className="w-full" />
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* Bottom CTA */}
        <div className="mt-20 pt-12 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-teal-400 transition-colors"
          >
            <FiArrowLeft />
            Back to Projects
          </button>

          <div className="flex gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-teal-400 hover:bg-teal-300 text-black font-semibold rounded-xl transition-all"
              >
                <FiExternalLink size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/* === Section Component === */
const Section = ({ title, icon, children }) => (
  <div className="mb-16">
    <div className="flex items-center gap-3 mb-6">
      <span className="text-2xl">{icon}</span>
      <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent" />
    </div>
    {children}
  </div>
)

/* === Info Card === */
const InfoCard = ({ icon: Icon, label, value }) => (
  <div className="bg-[#0d0d24] border border-white/[0.06] rounded-xl p-5">
    <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase tracking-wider mb-2">
      <Icon size={12} />
      {label}
    </div>
    <div className="text-white font-semibold">{value}</div>
  </div>
)

export default ProjectDetail