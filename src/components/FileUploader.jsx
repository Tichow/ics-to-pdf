import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Upload, X, FileText, Link as LinkIcon } from 'lucide-react'

/**
 * Composant pour uploader un fichier ICS ou entrer une URL - Style Notion
 */
export function FileUploader({ onFileLoad, onURLLoad, onReset, loading, hasEvents, eventsCount = 0 }) {
  const [mode, setMode] = useState('file') // 'file' ou 'url'
  const [url, setUrl] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [loadedFileName, setLoadedFileName] = useState('')
  const [loadedSource, setLoadedSource] = useState('') // 'file' ou 'url'
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
        setLoadedFileName(file.name)
        setLoadedSource('file')
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
        setLoadedFileName(file.name)
        setLoadedSource('file')
        onFileLoad(file)
      } else {
        alert('Veuillez sélectionner un fichier .ics')
      }
    }
  }

  const handleURLSubmit = e => {
    e.preventDefault()
    if (url.trim()) {
      setLoadedFileName(url.trim())
      setLoadedSource('url')
      onURLLoad(url.trim())
    }
  }

  const handleReset = () => {
    setLoadedFileName('')
    setLoadedSource('')
    setUrl('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onReset()
  }

  return (
    <div>
      {/* Sélecteur de mode - Notion-style */}
      <div className="inline-flex items-center bg-secondary rounded-md p-0.5 mb-4">
        <Button
          variant={mode === 'file' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('file')}
          disabled={loading}
          className="h-7"
        >
          Fichier local
        </Button>
        <Button
          variant={mode === 'url' ? 'default' : 'ghost'}
          size="sm"
          onClick={() => setMode('url')}
          disabled={loading}
          className="h-7"
        >
          URL
        </Button>
      </div>

      {/* Zone d'upload de fichier */}
      {mode === 'file' && (
        <div>
          {hasEvents && loadedSource === 'file' ? (
            // Affichage du fichier chargé
            <div className="border-2 border-border rounded-md p-6 relative">
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                title="Supprimer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-accent">
                  <FileText className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{loadedFileName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Calendrier chargé avec succès • <strong>{eventsCount} événement{eventsCount > 1 ? 's' : ''}</strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Zone de drop initiale
            <div
              className={`border-2 border-dashed rounded-md p-8 text-center cursor-pointer transition-colors ${
                dragActive
                  ? 'border-foreground bg-accent'
                  : 'border-border hover:border-foreground/50 hover:bg-accent/50'
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
              <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">
                Glissez-déposez votre fichier .ics
              </p>
              <p className="text-xs text-muted-foreground">ou cliquez pour sélectionner</p>
            </div>
          )}
        </div>
      )}

      {/* Champ URL */}
      {mode === 'url' && (
        <div>
          {hasEvents && loadedSource === 'url' ? (
            // Affichage de l'URL chargée
            <div className="border-2 border-border rounded-md p-6 relative">
              <button
                onClick={handleReset}
                className="absolute top-3 right-3 p-1 rounded-md hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
                title="Supprimer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-accent">
                  <LinkIcon className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{loadedFileName}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Calendrier chargé avec succès • <strong>{eventsCount} événement{eventsCount > 1 ? 's' : ''}</strong>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Formulaire URL initial
            <form onSubmit={handleURLSubmit} className="space-y-3">
              <Input
                type="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://example.com/calendrier.ics"
                disabled={loading}
                required
              />
              <Button
                type="submit"
                className="w-full"
                disabled={loading || !url.trim()}
              >
                {loading ? 'Chargement...' : 'Charger le calendrier'}
              </Button>
            </form>
          )}
        </div>
      )}

      {loading && (
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-border border-t-foreground"></div>
          <span>Chargement...</span>
        </div>
      )}
    </div>
  )
}

