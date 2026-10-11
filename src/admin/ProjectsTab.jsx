import { useEffect, useState, useRef } from 'react'
import {
  FiTrash2,
  FiPlus,
  FiExternalLink,
  FiGithub,
  FiX,
  FiUpload,
  FiEdit2,
} from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../services/api'

const ProjectsTab = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const emptyForm = {
    title: '',
    description: '',
    image: '',
    tech: '',
    github: '',
    live: '',
    featured: false,
    // Case study
    problem: '',
    solution: '',
    challenges: [],
    learnings: '',
    designDecisions: '',
    results: '',
    duration: '',
    role: '',
    year: '',
    screenshots: [],
  }

  const [formData, setFormData] = useState(emptyForm)

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const { data } = await API.get('/projects')
      setProjects(data)
    } catch (err) {
      toast.error('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  // Image upload
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

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const payload = {
        ...formData,
        tech: formData.tech
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        learnings: formData.learnings
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        results: formData.results
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      }

      if (editingId) {
        // Update
        const { data } = await API.put(`/projects/${editingId}`, payload)
        setProjects((prev) =>
          prev.map((p) => (p._id === editingId ? data : p))
        )
        toast.success('Project updated!')
      } else {
        // Create
        const { data } = await API.post('/projects', payload)
        setProjects((prev) => [...prev, data])
        toast.success('Project added!')
      }

      handleCancel()
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to save project')
    }
  }

  const handleEdit = (project) => {
    setEditingId(project._id)
    setShowForm(true)
    setFormData({
      title: project.title || '',
      description: project.description || '',
      image: project.image || '',
      tech: project.tech?.join(', ') || '',
      github: project.github || '',
      live: project.live || '',
      featured: project.featured || false,
      problem: project.problem || '',
      solution: project.solution || '',
      challenges: project.challenges || [],
      learnings: project.learnings?.join(', ') || '',
      designDecisions: project.designDecisions || '',
      results: project.results?.join(', ') || '',
      duration: project.duration || '',
      role: project.role || '',
      year: project.year || '',
      screenshots: project.screenshots || [],
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData(emptyForm)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await API.delete(`/projects/${id}`)
      setProjects((prev) => prev.filter((p) => p._id !== id))
      toast.success('Project deleted')
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  // Challenge handlers
  const addChallenge = () => {
    setFormData((prev) => ({
      ...prev,
      challenges: [...prev.challenges, { title: '', description: '' }],
    }))
  }

  const updateChallenge = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.map((c, i) =>
        i === index ? { ...c, [field]: value } : c
      ),
    }))
  }

  const removeChallenge = (index) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.filter((_, i) => i !== index),
    }))
  }

  if (loading) {
    return <div className="text-center py-20 text-neutral-500">Loading...</div>
  }

  return (
    <>
      {/* Header */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div className="bg-[#0d0d24] border border-white/6 rounded-xl px-5 py-3">
          <span className="text-neutral-400 text-sm">Total:</span>{' '}
          <span className="font-bold text-teal-400">{projects.length}</span>
        </div>

        <button
          onClick={() => (showForm ? handleCancel() : setShowForm(true))}
          className="inline-flex items-center gap-2 px-5 py-3 bg-teal-400 hover:bg-teal-300 text-black font-bold rounded-xl transition-all hover:-translate-y-0.5"
        >
          {showForm ? (
            <>
              <FiX />
              Cancel
            </>
          ) : (
            <>
              <FiPlus />
              Add Project
            </>
          )}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="mb-8 bg-[#0d0d24] border border-teal-400/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">
            {editingId ? 'Edit Project' : 'Add New Project'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ═══════════ BASIC INFO ═══════════ */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Project Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="E-Commerce Platform"
                required
                className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Short Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Full-featured online store with product catalog..."
                rows="3"
                required
                className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Project Image
              </label>

              {formData.image ? (
                <div className="relative rounded-xl overflow-hidden border border-white/10 group">
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="w-full h-48 object-cover"
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
                  className="w-full border-2 border-dashed border-white/10 hover:border-teal-400/50 rounded-xl p-8 transition-colors flex flex-col items-center gap-3 disabled:opacity-50"
                >
                  {uploading ? (
                    <>
                      <div className="w-8 h-8 border-2 border-teal-400 border-t-transparent rounded-full animate-spin" />
                      <p className="text-neutral-400 text-sm">Uploading...</p>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-teal-400/10 flex items-center justify-center text-teal-400">
                        <FiUpload size={20} />
                      </div>
                      <div className="text-center">
                        <p className="text-white font-medium">
                          Click to upload image
                        </p>
                        <p className="text-neutral-500 text-xs mt-1">
                          JPG, PNG (max 5MB)
                        </p>
                      </div>
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

            {/* Tech Stack */}
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                name="tech"
                value={formData.tech}
                onChange={handleChange}
                placeholder="React, Node.js, MongoDB, Tailwind"
                className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
              />
            </div>

            {/* Links */}
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <FiGithub className="inline mr-2" size={14} />
                  GitHub URL
                </label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  <FiExternalLink className="inline mr-2" size={14} />
                  Live Demo URL
                </label>
                <input
                  type="url"
                  name="live"
                  value={formData.live}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                />
              </div>
            </div>

            {/* Featured */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                name="featured"
                checked={formData.featured}
                onChange={handleChange}
                className="w-4 h-4 accent-teal-400"
              />
              <span className="text-sm text-neutral-300">
                ⭐ Mark as Featured
              </span>
            </label>

            {/* ═══════════ CASE STUDY FIELDS ═══════════ */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-lg font-bold text-teal-400 mb-4">
                📋 Case Study Details
              </h3>

              {/* Overview Row */}
              <div className="grid md:grid-cols-3 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    placeholder="Full-Stack Developer"
                    className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="3 weeks"
                    className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    placeholder="2025"
                    className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50"
                  />
                </div>
              </div>

              {/* Problem */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  🎯 The Challenge (Problem)
                </label>
                <textarea
                  name="problem"
                  value={formData.problem}
                  onChange={handleChange}
                  placeholder="What problem were you solving? Why did you build this?"
                  rows="3"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                />
              </div>

              {/* Solution */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  💡 The Solution
                </label>
                <textarea
                  name="solution"
                  value={formData.solution}
                  onChange={handleChange}
                  placeholder="How did you approach it?"
                  rows="3"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                />
              </div>

              {/* Challenges */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-neutral-300">
                    ⚠️ Challenges & Solutions
                  </label>
                  <button
                    type="button"
                    onClick={addChallenge}
                    className="inline-flex items-center gap-1 text-xs px-3 py-1.5 bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 rounded-lg transition-colors"
                  >
                    <FiPlus size={12} />
                    Add Challenge
                  </button>
                </div>

                {formData.challenges.length === 0 && (
                  <p className="text-xs text-neutral-500 italic">
                    No challenges added yet. Click "Add Challenge" to add one.
                  </p>
                )}

                <div className="space-y-3">
                  {formData.challenges.map((c, idx) => (
                    <div
                      key={idx}
                      className="bg-[#151530] border border-white/6 rounded-xl p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-xs text-neutral-500 font-mono">
                          Challenge #{idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeChallenge(idx)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                        >
                          <FiTrash2 size={12} />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={c.title}
                        onChange={(e) =>
                          updateChallenge(idx, 'title', e.target.value)
                        }
                        placeholder="Challenge title (e.g., 3D Model Slowing Site)"
                        className="w-full bg-[#0d0d24] border border-white/6 rounded-lg px-3 py-2 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 mb-2"
                      />

                      <textarea
                        value={c.description}
                        onChange={(e) =>
                          updateChallenge(idx, 'description', e.target.value)
                        }
                        placeholder="Solution (e.g., Lazy loading + moved heavy models to Contact section)"
                        rows="2"
                        className="w-full bg-[#0d0d24] border border-white/6 rounded-lg px-3 py-2 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Design Decisions */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  🎨 Design Decisions
                </label>
                <textarea
                  name="designDecisions"
                  value={formData.designDecisions}
                  onChange={handleChange}
                  placeholder="Why this color scheme? Why this layout?"
                  rows="3"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                />
              </div>

              {/* Learnings */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  🎓 What I Learned (comma separated)
                </label>
                <textarea
                  name="learnings"
                  value={formData.learnings}
                  onChange={handleChange}
                  placeholder="MERN Stack, JWT Auth, File Uploads, Email Integration"
                  rows="2"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                />
              </div>

              {/* Results */}
              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  📊 Results (comma separated)
                </label>
                <textarea
                  name="results"
                  value={formData.results}
                  onChange={handleChange}
                  placeholder="Lighthouse 95+, Mobile responsive 100%, Load time <1.5s"
                  rows="2"
                  className="w-full bg-[#151530] border border-white/6 rounded-xl px-4 py-3 text-white placeholder:text-neutral-600 focus:outline-none focus:border-teal-400/50 resize-none"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={uploading}
                className="flex-1 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-bold py-3 rounded-xl transition-all"
              >
                {editingId ? 'Save Changes' : 'Add Project'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6 bg-white/5 border border-white/10 hover:border-white/20 text-white font-medium rounded-xl transition-colors"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      {projects.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📁</div>
          <h2 className="text-xl font-bold mb-2">No projects yet</h2>
          <p className="text-neutral-400">
            Click "Add Project" to add your first project.
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-[#0d0d24] border border-white/6 hover:border-white/10 rounded-2xl p-6 transition-colors"
            >
              <div className="flex items-start gap-5">
                {/* Image Thumbnail */}
                {project.image && (
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-[#151530] border border-white/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="font-bold text-white text-lg">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs font-bold rounded-full">
                        ⭐ Featured
                      </span>
                    )}
                  </div>

                  <p className="text-neutral-400 text-sm mb-3 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech?.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs px-3 py-1 rounded-full bg-white/5 text-teal-400 border border-white/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-teal-400 transition-colors"
                      >
                        <FiGithub size={14} />
                        Code
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-teal-400 transition-colors"
                      >
                        <FiExternalLink size={14} />
                        Live
                      </a>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2.5 bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 rounded-xl transition-colors"
                    title="Edit project"
                  >
                    <FiEdit2 size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-2.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-xl transition-colors"
                    title="Delete project"
                  >
                    <FiTrash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default ProjectsTab