import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import AdminLogin from './pages/AdminLogin'
import ProjectDetail from './pages/ProjectDetail'
import Dashboard from './admin/Dashboard'
import { AuthProvider } from './context/AuthContext'
import Loader from './components/Loader'

function App() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault()
        navigate('/admin/login')
      }
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [navigate])

  return (
    <>
      {loading && <Loader onComplete={() => setLoading(false)} />}

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App