import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiLogOut, FiMail, FiFolder, FiFileText, FiTarget } from 'react-icons/fi'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import MessagesTab from './MessagesTab'
import ProjectsTab from './ProjectsTab'
import SkillsTab from './SkillsTab'
import ResumeTab from './ResumeTab'

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('messages')
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/admin/login')
    }
  }, [user, navigate])

  const handleLogout = () => {
    logout()
    toast.success('Logged out')
    navigate('/admin/login')
  }

  const tabs = [
    { id: 'messages', label: 'Messages', icon: FiMail },
    { id: 'projects', label: 'Projects', icon: FiFolder },
    { id: 'skills', label: 'Skills', icon: FiTarget },
    { id: 'resume', label: 'Resume', icon: FiFileText },
  ]

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white">
      {/* Header */}
      <header className="border-b border-white/6 bg-[#0d0d24]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-black font-bold">
              R
            </div>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs text-neutral-500">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/"
              className="hidden md:inline-flex text-sm text-neutral-400 hover:text-white transition-colors"
            >
              View Site →
            </a>
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg transition-colors"
            >
              <FiLogOut />
              Logout
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-teal-400 text-teal-400'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon />
                {tab.label}
              </button>
            )
          })}
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'messages' && <MessagesTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'resume' && <ResumeTab />}
      </main>
    </div>
  )
}

export default Dashboard