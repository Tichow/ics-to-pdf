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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">
        📅 Importer un calendrier
      </h2>

      {/* Sélecteur de mode */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setMode('file')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'file'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          disabled={loading}
        >
          Fichier local
        </button>
        <button
          onClick={() => setMode('url')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            mode === 'url'
              ? 'bg-primary text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              dragActive
                ? 'border-primary bg-accent'
                : 'border-gray-300 hover:border-primary hover:bg-gray-50'
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
            <div className="text-4xl mb-2">📁</div>
            <p className="text-gray-700 font-medium mb-1">
              Glissez-déposez votre fichier .ics ici
            </p>
            <p className="text-gray-500 text-sm">ou cliquez pour sélectionner</p>
          </div>
        </div>
      )}

      {/* Champ URL */}
      {mode === 'url' && (
        <form onSubmit={handleURLSubmit}>
          <input
            type="url"
            value={url}
            onChange={e => setUrl(e.target.value)}
            placeholder="https://example.com/calendrier.ics"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent mb-3"
            disabled={loading}
            required
          />
          <button
            type="submit"
            className="w-full px-4 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={loading || !url.trim()}
          >
            {loading ? 'Chargement...' : 'Charger le calendrier'}
          </button>
        </form>
      )}

      {loading && (
        <div className="mt-4 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 border-t-primary"></div>
          <p className="text-gray-600 mt-2">Chargement du calendrier...</p>
        </div>
      )}
    </div>
  )
}

