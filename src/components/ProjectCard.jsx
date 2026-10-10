import { Link } from 'react-router-dom'
import { FiExternalLink, FiGithub, FiArrowRight } from 'react-icons/fi'

const ProjectCard = ({ project }) => {
  return (
    <div className="group relative rounded-2xl bg-[#0f0f22] border border-white/[0.06] hover:border-teal-400/30 transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#15152a]">
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
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1e1e3f] to-[#0f0f22]">
            <span className="text-6xl opacity-30">📁</span>
          </div>
        )}

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 left-3 px-2.5 py-1 bg-yellow-500/90 backdrop-blur-sm text-black text-[10px] font-bold uppercase tracking-wider rounded-full">
            ⭐ Featured
          </div>
        )}

        {/* Hover overlay with action icons */}
        <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-400 hover:text-black transition-all"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
          )}
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-teal-400 hover:text-black transition-all"
              aria-label="Live"
            >
              <FiExternalLink size={18} />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-white text-xl font-bold mb-2 group-hover:text-teal-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-neutral-400 text-sm leading-relaxed mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Tags */}
        {project.tech && project.tech.length > 0 && (
          <ul className="flex flex-wrap gap-2 mb-5">
            {project.tech.slice(0, 4).map((t, idx) => (
              <li
                key={idx}
                className="font-mono text-xs px-3 py-1 rounded-md bg-teal-400/10 text-teal-400 border border-teal-400/20"
              >
                #{t}
              </li>
            ))}
          </ul>
        )}

        {/* ✅ Case Study Link — YEH ZAROORI HAI */}
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

export default ProjectCard