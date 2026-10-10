import { useEffect, useState } from 'react'
import API from '../services/api'

const Skills = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const { data } = await API.get('/skills')
        // ✅ Sirf first 4 lo (professional fixed grid)
        setSkills(data.slice(0, 4))
      } catch (err) {
        console.error('Failed to load skills', err)
      } finally {
        setLoading(false)
      }
    }
    fetchSkills()
  }, [])

  return (
    <section
      id="skills"
      className="relative py-32 px-6 overflow-hidden bg-[#0a0a1a]"
    >
      <BackgroundDots />

      <div className="relative max-w-7xl mx-auto">
        {/* Loading */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-neutral-500 mt-4 text-sm">Loading skills...</p>
          </div>
        ) : skills.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">💎</div>
            <p className="text-neutral-400">Skills coming soon...</p>
          </div>
        ) : (
          /* ✅ Fixed 4 columns */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map((skill, idx) => (
              <div key={skill._id || idx} className="group relative">
                {/* Gradient Border */}
                <div className="absolute -inset-0.5 rounded-2xl bg-linear-to-r from-cyan-400 via-purple-500 to-yellow-400 opacity-90 group-hover:opacity-100 transition-opacity" />

                {/* Card */}
                <div className="relative rounded-2xl bg-[#0d0d1f] px-6 py-16 h-full flex flex-col items-center justify-center gap-8">
                  {/* Crystal Image */}
                  <div className="w-24 h-24 flex items-center justify-center">
                    {skill.image ? (
                      <>
                        <img
                          src={skill.image}
                          alt={skill.name}
                          className="w-full h-full object-contain drop-shadow-[0_0_20px_rgba(139,92,246,0.6)] group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'block'
                          }}
                        />
                        <span className="hidden text-6xl">💎</span>
                      </>
                    ) : (
                      <span className="text-6xl">💎</span>
                    )}
                  </div>

                  {/* Text */}
                  <div className="text-center">
                    <h3 className="text-white text-2xl font-bold leading-tight">
                      {skill.name}
                    </h3>
                    <p className="text-white text-2xl font-bold leading-tight">
                      {skill.subtitle || 'Developer'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* === Background Dots === */
const BackgroundDots = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <pattern
            id="skills-dots"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#2dd4bf" opacity="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#skills-dots)" />
      </svg>

      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="8%" y1="15%" x2="25%" y2="35%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="75%" y1="10%" x2="92%" y2="30%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="15%" y1="80%" x2="40%" y2="90%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="60%" y1="70%" x2="85%" y2="85%" stroke="#2dd4bf" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export default Skills