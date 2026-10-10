import { motion } from 'framer-motion'

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  const stats = [
    { value: '15+', label: 'Projects Built' },
    { value: '1+', label: 'Years Experience' },
    { value: '10+', label: 'Happy Clients' },
  ]

  return (
    <section
      id="about"
      className="relative py-32 px-6 overflow-hidden border-t border-[#1a1a1a]"
    >
      {/* Background dots + connections */}
      <BackgroundDots />

      {/* Ambient glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(45,212,191,0.08), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="relative max-w-5xl mx-auto"
      >
        {/* Small label */}
        <motion.div
          variants={itemVariants}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-teal-400" />
          <span className="font-mono text-xs text-teal-400 uppercase tracking-[0.3em]">
            Introduction
          </span>
        </motion.div>

        {/* Big heading */}
        <motion.h2
          variants={itemVariants}
          className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.05]"
        >
          Overview.
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-neutral-400 text-lg md:text-xl leading-relaxed max-w-3xl mb-16"
        >
          I'm a skilled{' '}
          <span className="text-white font-medium">software developer</span> with
          experience in{' '}
          <span className="text-teal-400 font-medium">TypeScript</span> and{' '}
          <span className="text-teal-400 font-medium">JavaScript</span>, and
          expertise in frameworks like{' '}
          <span className="text-white font-medium">React</span>,{' '}
          <span className="text-white font-medium">Node.js</span>, and{' '}
          <span className="text-white font-medium">Three.js</span>. I'm a quick
          learner and collaborate closely with clients to create efficient,
          scalable, and user-friendly solutions that solve real-world problems.
          Let's work together to bring your ideas to life!
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#1a1a1a]"
        >
          {stats.map((stat, i) => (
            <div
              key={i}
              className="group relative p-6 rounded-2xl bg-white/[0.02] backdrop-blur-md border border-white/[0.06] hover:border-teal-400/30 transition-all duration-300 hover:bg-white/[0.04]"
            >
              {/* Corner accent */}
              <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full bg-teal-400/40 group-hover:bg-teal-400 transition-colors" />

              <div className="text-4xl font-extrabold bg-gradient-to-r from-white to-neutral-500 bg-clip-text text-transparent mb-1">
                {stat.value}
              </div>
              <div className="font-mono text-xs text-neutral-500 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex items-center gap-4 text-neutral-500"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#262626] to-transparent" />
          <span className="font-mono text-xs uppercase tracking-widest">
            Let's build something great
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#262626] to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* === Background Dots + Connections === */
const BackgroundDots = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {/* Dot grid */}
      <svg className="absolute inset-0 w-full h-full opacity-40">
        <defs>
          <pattern
            id="about-dots"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="1" fill="#2dd4bf" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#about-dots)" />
      </svg>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <line x1="10%" y1="20%" x2="30%" y2="40%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="70%" y1="15%" x2="90%" y2="45%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="20%" y1="70%" x2="50%" y2="85%" stroke="#2dd4bf" strokeWidth="0.5" />
        <line x1="60%" y1="60%" x2="85%" y2="75%" stroke="#2dd4bf" strokeWidth="0.5" />
      </svg>
    </div>
  )
}

export default About