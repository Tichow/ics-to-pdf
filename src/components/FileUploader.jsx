import { useState, useRef } from 'react'

/**
 * Composant pour uploader un fichier ICS ou entrer une URL
 */
export function FileUploader({ onFileLoad, onURLLoad, loading }) {
  const [mode, setMode] = useState('file') // 'file' ou 'url'
  const [url, setUrl] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = e => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = e => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (file.name.endsWith('.ics')) {
        onFileLoad(file)
      } else {
        alert('Veuillez sélectionner un fichier .ics')
      }
    }
  }

  const handleFileChange = e => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      if (file.name.endsWith('.ics')) {
        onFileLoad(file)
      } else {
        alert('Veuillez sélectionner un fichier .ics')
      }
    }
  }

  const handleURLSubmit = e => {
    e.preventDefault()
    if (url.trim()) {
      onURLLoad(url.trim())
    }
  }

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100">
          <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-neutral-900">
          Importer un calendrier
        </h2>
      </div>

      {/* Sélecteur de mode */}
      <div className="inline-flex items-center bg-neutral-100 rounded-lg p-1 mb-6">
        <button
          onClick={() => setMode('file')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'file'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          disabled={loading}
        >
          Fichier local
        </button>
        <button
          onClick={() => setMode('url')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            mode === 'url'
              ? 'bg-white text-neutral-900 shadow-sm'
              : 'text-neutral-600 hover:text-neutral-900'
          }`}
          disabled={loading}
        >
          URL
        </button>
      </div>

      {/* Zone d'upload de fichier */}
      {mode === 'file' && (
        <div>
          <div
            className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${
              dragActive
                ? 'border-neutral-900 bg-neutral-50'
                : 'border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".ics"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 mb-4">
              <svg className="w-6 h-6 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-neutral-900 font-medium mb-1">
              Glissez-déposez votre fichier .ics ici
            </p>
            <p className="text-neutral-500 text-sm">ou cliquez pour sélectionner</p>
          </div>
        </div>
      )}

      {/* Champ URL */}
      {mode === 'url' && (
        <form onSubmit={handleURLSubmit} className="space-y-4">
          <div>
            <label htmlFor="calendar-url" className="label">
              URL du calendrier
            </label>
            <input
              id="calendar-url"
              type="url"
              value={url}
              onChange={e => setUrl(e.target.value)}
              placeholder="https://example.com/calendrier.ics"
              className="input"
              disabled={loading}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={loading || !url.trim()}
          >
            {loading ? 'Chargement...' : 'Charger le calendrier'}
          </button>
        </form>
      )}

      {loading && (
        <div className="mt-6 flex items-center justify-center gap-3 py-4">
          <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-300 border-t-neutral-900"></div>
          <p className="text-neutral-600 text-sm">Chargement du calendrier...</p>
        </div>
      )}
    </div>
  )
}

