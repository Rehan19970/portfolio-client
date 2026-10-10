import { useEffect, useState, useRef } from 'react'
import { FiUpload, FiFileText, FiTrash2, FiExternalLink } from 'react-icons/fi'
import toast from 'react-hot-toast'
import API from '../services/api'

const ResumeTab = () => {
  const [resume, setResume] = useState(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    fetchResume()
  }, [])

  const fetchResume = async () => {
    try {
      const { data } = await API.get('/resume')
      setResume(data.pdfUrl ? data : null)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.type !== 'application/pdf') {
      toast.error('Only PDF files allowed')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error('PDF must be less than 10MB')
      return
    }

    setUploading(true)
    const uploadData = new FormData()
    uploadData.append('pdf', file)

    try {
      // Upload PDF
      const { data: uploadRes } = await API.post('/upload/pdf', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })

      // Save to resume collection
      const { data: resumeRes } = await API.post('/resume', {
        pdfUrl: uploadRes.pdfUrl,
        filename: file.name,
      })

      setResume(resumeRes)
      toast.success('Resume updated!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Upload failed')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  const handleDelete = async () => {
    if (!confirm('Delete resume?')) return
    try {
      // Delete old resume (simplified — assumes single resume)
      await API.post('/resume', { pdfUrl: '', filename: '' })
      setResume(null)
      toast.success('Resume deleted')
    } catch (err) {
      toast.error('Failed to delete')
    }
  }

  if (loading) {
    return <div className="text-center py-20 text-neutral-500">Loading...</div>
  }

  return (
    <>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Resume / CV</h2>
        <p className="text-neutral-400 text-sm">
          Upload your resume PDF. It will appear on the Hero section download button.
        </p>
      </div>

      {/* Current Resume */}
      {resume ? (
        <div className="bg-[#0d0d24] border border-white/6 rounded-2xl p-6 mb-6">
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center shrink-0">
              <FiFileText className="text-red-400" size={28} />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-white mb-1">
                {resume.filename || 'resume.pdf'}
              </h3>
              <p className="text-xs text-neutral-500 font-mono mb-3">
                Updated: {new Date(resume.updatedAt).toLocaleString()}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={resume.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-400/10 border border-teal-400/20 text-teal-400 hover:bg-teal-400/20 text-sm font-medium rounded-lg transition-colors"
                >
                  <FiExternalLink size={14} />
                  View PDF
                </a>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/5 border border-white/10 text-white hover:border-teal-400/40 text-sm font-medium rounded-lg transition-colors"
                >
                  <FiUpload size={14} />
                  Replace
                </button>
                <button
                  onClick={handleDelete}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-sm font-medium rounded-lg transition-colors"
                >
                  <FiTrash2 size={14} />
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#0d0d24] border border-dashed border-white/10 rounded-2xl p-12 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
            <FiFileText className="text-red-400" size={28} />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">No resume uploaded</h3>
          <p className="text-neutral-400 text-sm mb-6">
            Upload your CV so visitors can download it from the Hero section.
          </p>
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-6 py-3 bg-teal-400 hover:bg-teal-300 disabled:opacity-50 text-black font-bold rounded-xl transition-all"
          >
            <FiUpload />
            {uploading ? 'Uploading...' : 'Upload PDF'}
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="application/pdf"
        onChange={handleUpload}
        className="hidden"
      />
    </>
  )
}

export default ResumeTab