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
  
  // ✅ Check karein — pehle dikha chuka hai?
  const [loading, setLoading] = useState(
    () => !sessionStorage.getItem('loaderShown')
  )

  // Keyboard shortcut: Ctrl + Shift + A
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

  const handleLoaderComplete = () => {
    // ✅ Session storage mein mark karein
    sessionStorage.setItem('loaderShown', 'true')
    setLoading(false)
  }

  return (
    <>
      {loading && <Loader onComplete={handleLoaderComplete} />}

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