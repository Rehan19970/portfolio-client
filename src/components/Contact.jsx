import { useState, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import axios from 'axios'

// 🌍 Globe Model
function Globe() {
  const { scene } = useGLTF('/scene.gltf')
  return <primitive object={scene} scale={0.9} />
}

export default function Contact() {
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStatus('')

    const formData = new FormData(e.target)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    }

    try {
      // ✅ Aapka apna backend API
      const response = await axios.post('http://localhost:5000/api/contact', data)

      if (response.data.success) {
        setStatus('✅ Message sent successfully!')
        e.target.reset()

        // 3 second baad status clear
        setTimeout(() => setStatus(''), 4000)
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || '❌ Something went wrong. Try again!'
      setStatus(errorMsg)
      setTimeout(() => setStatus(''), 4000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contact"
      style={{
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0B0B1F',
        color: 'white',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* Left Contact Form */}
      <div style={{ flex: 1, padding: '60px 40px' }}>
        <h1 style={{ fontSize: '60px', fontWeight: '800', marginBottom: '40px' }}>
          Contact<span style={{ color: '#38bdf8' }}>.</span>
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxWidth: '450px',
          }}
        >
          <label>
            <span>Your Name</span>
            <input
              type="text"
              name="name"
              placeholder="What's your good name?"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#1a1a2e',
                border: 'none',
                color: 'white',
                marginTop: '8px',
              }}
              required
            />
          </label>

          <label>
            <span>Your Email</span>
            <input
              type="email"
              name="email"
              placeholder="What's your email?"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#1a1a2e',
                border: 'none',
                color: 'white',
                marginTop: '8px',
              }}
              required
            />
          </label>

          <label>
            <span>Your Message</span>
            <textarea
              name="message"
              placeholder="What you want to say?"
              rows="5"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '8px',
                backgroundColor: '#1a1a2e',
                border: 'none',
                color: 'white',
                marginTop: '8px',
                resize: 'vertical',
              }}
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: loading ? '#1e6fa8' : '#38bdf8',
              border: 'none',
              padding: '15px',
              borderRadius: '8px',
              color: 'white',
              fontWeight: 'bold',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
            }}
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        {status && (
          <p
            style={{
              marginTop: '20px',
              color: status.startsWith('✅') ? '#4ade80' : '#f87171',
              fontWeight: 'bold',
            }}
          >
            {status}
          </p>
        )}
      </div>

      {/* ✅ Right Globe */}
      <div className="globe-container" style={{ flex: 1, height: '100vh' }}>
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} />
          <Suspense fallback={null}>
            <Globe />
          </Suspense>
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            enableRotate={true}
            autoRotate
            autoRotateSpeed={1}
          />
        </Canvas>
      </div>

      {/* ✅ Mobile responsiveness fix */}
      <style>
        {`
          @media (max-width: 968px) {
            section#contact {
              flex-direction: column;
              padding: 40px 20px;
              align-items: center;
            }

            section#contact > div:first-child {
              padding: 30px 0;
              width: 100%;
            }

            .globe-container {
              display: none !important;
            }

            h1 {
              font-size: 40px !important;
            }

            input, textarea, button {
              font-size: 14px !important;
            }
          }

          @media (max-width: 480px) {
            .globe-container {
              display: none !important;
            }
          }
        `}
      </style>
    </section>
  )
}