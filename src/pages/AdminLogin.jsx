import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLock, FiMail } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'

const AdminLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const { login } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { data } = await API.post('/auth/login', { email, password })
      login(data)
      toast.success('Welcome back!')
      navigate('/admin/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a1a] px-6">
      {/* Background Grid */}
      <div
        className="absolute inset-0 opacity-[0.15] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      <div className="relative w-full max-w-md">
        {/* Glow */}
        <div
          className="absolute -inset-4 rounded-3xl pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, rgba(45,212,191,0.15), transparent 70%)',
            filter: 'blur(40px)',
          }}
        />

        <div className="relative bg-[#0d0d24] border border-white/6 rounded-2xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-black font-bold text-lg">
                R
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Login</h1>
            <p className="text-neutral-400 text-sm">
              Enter your credentials to access dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                Email
              </label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full bg-[#151530] border border-white/6 rounded-xl pl-12 pr-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 transition-colors"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-white font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-[#151530] border border-white/6 rounded-xl pl-12 pr-5 py-4 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 transition-colors"
                />
              </div>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-bold py-4 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-lg shadow-teal-400/20"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          {/* Back link */}
          <div className="mt-6 text-center">
            <a
              href="/"
              className="text-sm text-neutral-400 hover:text-teal-400 transition-colors"
            >
              ← Back to Portfolio
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminLogin