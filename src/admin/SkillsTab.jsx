import { useEffect, useState, useRef } from 'react'
import { FiEdit2, FiX, FiUpload, FiCheck } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../services/api'

const SkillsTab = () => {
  const [skills, setSkills] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    name: '',
    subtitle: 'Developer',
    image: '',
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const { data } = await API.get('/skills')
      setSkills(data)
    } catch (err) {
      toast.error('Failed to load skills')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB')
      return
    }

    setUploading(true)
    const uploadData = new FormData()
    uploadData.append('image', file)

    try {
      const { data } = await API.post('/upload/image', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setFormData((prev) => ({ ...prev, image: data.imageUrl }))
      toast.success('Image uploaded!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleEdit = (skill) => {
    setEditingId(skill._id)
    setFormData({
      name: skill.name,
      subtitle: skill.subtitle || 'Developer',
      image: skill.image || '',
    })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({ name: '', subtitle: 'Developer', image: '' })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await API.put(`/skills/${editingId}`, formData)
      setSkills((prev) =>
        prev.map((s) => (s._id === editingId ? data : s))
      )
      toast.success('Skill updated!')
      handleCancel()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update')
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-neutral-500">Loading...</div>
  }

  return (
    <>
      {/* Info Banner */}
      <div className="mb-6 bg-[#0d0d24] border border-teal-400/20 rounded-xl p-4">
        <p className="text-sm text-neutral-400">
          💡 <span className="text-white font-medium">Note:</span> There are exactly{' '}
          <span className="text-teal-400 font-bold">4 skill cards</span> shown on
          the homepage. You can edit their content below (name, subtitle, image).
        </p>
      </div>

      {/* Edit Form */}
      {editingId && (
        <div className="mb-8 bg-[#0d0d24] border border-teal-400/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Edit Skill</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Skill Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="React.Js"
                  required
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleChange}
                  placeholder="Developer"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Crystal Image
              </label>

              {formData.image ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-32 object-contain bg-[#151530] p-4"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-teal-400 text-black font-medium rounded-lg hover:bg-teal-300"
                    >
                      Change
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, image: '' }))
                      }
                      className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                  className="w-full border-2 border-dashed border-white/10 hover:border-teal-400/50 rounded-xl p-6 transition-colors flex flex-col items-center gap-2 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="w-6 h-6 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-neutral-400 text-sm">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <FiUpload className="text-teal-400" size={20} />
                      <p className="text-white font-medium text-sm">
                        Upload Crystal Image
                      </p>
                      <p className="text-neutral-500 text-xs">
                        PNG with transparency (max 5MB)
                      </p>
                    </>
                  )}
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 inline-flex items-center justify-center gap-2 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all"
              >
                <FiCheck />
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Skills List — 4 Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {skills.map((skill, idx) => (
          <div
            key={skill._id}
            className="bg-[#0d0d24] border border-white/6 hover:border-teal-400/30 rounded-2xl p-5 flex items-center gap-4 transition-colors"
          >
            {/* Number */}
            <div className="w-8 h-8 rounded-lg bg-teal-400/10 border border-teal-400/20 flex items-center justify-center text-teal-400 font-bold text-sm shrink-0">
              {idx + 1}
            </div>

            {/* Image Preview */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#151530] flex items-center justify-center shrink-0">
              {skill.image ? (
                <img
                  src={skill.image}
                  alt={skill.name}
                  className="w-full h-full object-contain p-1"
                />
              ) : (
                <span className="text-2xl">💎</span>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white truncate">{skill.name}</h3>
              <p className="text-neutral-500 text-xs truncate">
                {skill.subtitle}
              </p>
            </div>

            {/* Edit */}
            <button
              onClick={() => handleEdit(skill)}
              className="p-2.5 bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 rounded-lg transition-colors shrink-0"
              title="Edit skill"
            >
              <FiEdit2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </>
  )
}

export default SkillsTab