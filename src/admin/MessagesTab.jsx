import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiTrash2, FiMail, FiCheckCircle } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../services/api'
import { useAuth } from '../context/AuthContext'

const MessagesTab = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const { logout } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      const { data } = await API.get('/contact')
      setMessages(data)
    } catch (err) {
      if (err.response?.status === 401) {
        logout()
        navigate('/admin/login')
      } else {
        toast.error('Failed to load messages')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleMarkRead = async (id) => {
    try {
      await API.put(`/contact/${id}/read`)
      setMessages((prev) =>
        prev.map((m) => (m._id === id ? { ...m, read: true } : m))
      )
      toast.success('Marked as read')
    } catch (err) {
      toast.error('Failed to update')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return
    try {
      await API.delete(`/contact/${id}`)
      setMessages((prev) => prev.filter((m) => m._id !== id))
      toast.success('Message deleted')
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  const unreadCount = messages.filter((m) => !m.read).length

  if (loading) {
    return <div className="text-center py-20 text-neutral-500">Loading...</div>
  }

  return (
    <>
      {/* Stats */}
      <div className="mb-6 flex items-center gap-4">
        <div className="bg-[#0d0d24] border border-white/6 rounded-xl px-5 py-3">
          <span className="text-neutral-400 text-sm">Total:</span>{' '}
          <span className="font-bold text-teal-400">{messages.length}</span>
        </div>
        {unreadCount > 0 && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-3">
            <span className="text-red-400 text-sm">Unread:</span>{' '}
            <span className="font-bold text-red-400">{unreadCount}</span>
          </div>
        )}
      </div>

      {messages.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📭</div>
          <h2 className="text-xl font-bold mb-2">No messages yet</h2>
          <p className="text-neutral-400">
            When someone contacts you, their message will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`relative bg-[#0d0d24] border rounded-2xl p-6 transition-all ${
                msg.read
                  ? 'border-white/6'
                  : 'border-teal-400/30 shadow-lg shadow-teal-400/5'
              }`}
            >
              {!msg.read && (
                <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              )}

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-linear-to-br from-teal-400 to-cyan-500 flex items-center justify-center text-black font-bold text-lg shrink-0">
                  {msg.name.charAt(0).toUpperCase()}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="font-bold text-white">{msg.name}</h3>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-sm text-teal-400 hover:underline flex items-center gap-1"
                    >
                      <FiMail className="text-xs" />
                      {msg.email}
                    </a>
                  </div>

                  <p className="text-neutral-300 leading-relaxed mb-3">
                    {msg.message}
                  </p>

                  <div className="flex items-center justify-between flex-wrap gap-3">
                    <span className="text-xs text-neutral-500 font-mono">
                      {new Date(msg.createdAt).toLocaleString()}
                    </span>

                    <div className="flex items-center gap-2">
                      {!msg.read && (
                        <button
                          onClick={() => handleMarkRead(msg._id)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 text-xs font-medium rounded-lg transition-colors"
                        >
                          <FiCheckCircle />
                          Mark Read
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(msg._id)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-medium rounded-lg transition-colors"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default MessagesTab