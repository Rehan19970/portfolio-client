const Experience = () => {
  const experiences = [
    {
      role: 'Full Stack Developer & Trainer',
      company: 'Ideoversity',
      period: 'July 2021 — Present',
      icon: '🎓',
      cardSide: 'left',
      points: [
        'Provide hands-on training and mentorship to junior developers.',
        'Collaborate with team members to solve technical challenges.',
        'Develop and deliver training modules focusing on real-world applications.',
      ],
    },
    {
      role: 'MERN Stack Developer',
      company: 'Heapware',
      period: 'Jan 2020 — June 2021',
      icon: '💠',
      cardSide: 'right',
      points: [
        'Build scalable RESTful APIs and handle server-side logic.',
        'Manage integrations between frontend and backend efficiently.',
        'Collaborated with cross-functional teams on multiple projects.',
      ],
    },
    {
      role: 'Frontend Developer',
      company: 'Tech Solutions',
      period: 'Aug 2018 — Dec 2019',
      icon: '⚛️',
      cardSide: 'left',
      points: [
        'Built responsive UIs with React and Tailwind CSS.',
        'Integrated REST APIs and optimized performance.',
        'Worked closely with designers to build component libraries.',
      ],
    },
    {
      role: 'Junior Web Developer',
      company: 'Freelance',
      period: 'Jan 2017 — July 2018',
      icon: '🌐',
      cardSide: 'right',
      points: [
        'Delivered 15+ websites for local businesses.',
        'Handled full project lifecycle from design to deployment.',
        'Maintained client communication and project updates.',
      ],
    },
  ]

  return (
    <section
      id="experience"
      className="relative py-32 px-6 overflow-hidden bg-[#0a0a1a]"
    >
      <BackgroundDots />

      <div className="relative max-w-6xl mx-auto">
        <div className="text-center mb-24">
          <p className="font-mono text-xs text-neutral-500 uppercase tracking-[0.3em] mb-4">
            What I have done so far
          </p>
          <h2 className="text-5xl md:text-6xl font-extrabold text-white tracking-tight">
            Work Experience.
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 md:-translate-x-1/2 w-0.5 bg-white/80" />

          <div className="space-y-24">
            {experiences.map((exp, idx) => {
              const cardOnLeft = exp.cardSide === 'left'
              return (
                <div key={idx} className="relative">
                  <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8 items-center">
                    <div className="flex justify-end pr-8">
                      {cardOnLeft ? (
                        <Card exp={exp} />
                      ) : (
                        <PeriodLabel period={exp.period} align="right" />
                      )}
                    </div>

                    <NodeIcon icon={exp.icon} />

                    <div className="flex justify-start pl-8">
                      {cardOnLeft ? (
                        <PeriodLabel period={exp.period} align="left" />
                      ) : (
                        <Card exp={exp} />
                      )}
                    </div>
                  </div>

                  <div className="md:hidden flex gap-6 pl-12">
                    <div className="flex-1">
                      <p className="text-white text-sm font-medium mb-3">
                        {exp.period}
                      </p>
                      <Card exp={exp} />
                    </div>
                    <div className="absolute left-4 -translate-x-1/2 top-2">
                      <NodeIcon icon={exp.icon} small />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

/* === Card (4-Corner Multi-Color Border) === */
const Card = ({ exp }) => {
  return (
    <div className="relative w-full max-w-md group">
      {/* === 4-Corner Gradient Border === */}
      <div
        className="absolute inset-[-1.5px] rounded-2xl opacity-100"
        style={{
          background:
            'linear-gradient(135deg, #22d3ee 0%, #a855f7 25%, #eab308 50%, #22d3ee 75%, #a855f7 100%)',
        }}
      />

      {/* Inner Card */}
      <div className="relative rounded-2xl bg-[#0a0a1a] p-7">
        <h3 className="text-white text-2xl font-bold mb-1 leading-tight">
          {exp.role}
        </h3>
        <p className="text-neutral-400 text-base font-medium mb-6">
          {exp.company}
        </p>

        <ul className="space-y-3">
          {exp.points.map((point, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-neutral-300 text-[15px] leading-relaxed"
            >
              <span className="text-white/70 mt-2 text-[8px]">●</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/* === Period Label === */
const PeriodLabel = ({ period, align }) => (
  <span
    className={`text-white text-lg font-medium ${
      align === 'right' ? 'text-right' : 'text-left'
    }`}
  >
    {period}
  </span>
)

/* === Node Icon === */
const NodeIcon = ({ icon, small }) => {
  const size = small ? 'w-12 h-12' : 'w-16 h-16'
  const innerSize = small ? 'w-9 h-9 text-base' : 'w-12 h-12 text-xl'

  return (
    <div className={`${small ? 'relative' : 'relative z-20'} flex items-center justify-center`}>
      <div
        className={`${size} rounded-full border-2 border-white/90 bg-[#0a0a1a] flex items-center justify-center shadow-[0_0_30px_rgba(45,212,191,0.25)]`}
      >
        <div
          className={`${innerSize} rounded-full flex items-center justify-center`}
          style={{
            background: 'linear-gradient(135deg, #f0f0f5 0%, #d8d8e0 100%)',
          }}
        >
          <span>{icon}</span>
        </div>
      </div>
    </div>
  )
}

/* === Background Dots === */
const BackgroundDots = () => (
  <div className="absolute inset-0 pointer-events-none">
    <svg className="absolute inset-0 w-full h-full opacity-40">
      <defs>
        <pattern id="exp-dots" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="#2dd4bf" opacity="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#exp-dots)" />
    </svg>

    <svg className="absolute inset-0 w-full h-full opacity-20">
      <line x1="10%" y1="10%" x2="30%" y2="30%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="70%" y1="15%" x2="90%" y2="35%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="15%" y1="60%" x2="40%" y2="80%" stroke="#2dd4bf" strokeWidth="0.5" />
      <line x1="60%" y1="70%" x2="85%" y2="90%" stroke="#2dd4bf" strokeWidth="0.5" />
    </svg>
  </div>
)

export default Experience