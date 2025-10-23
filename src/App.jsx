import { useState } from 'react'
import { useICSData } from './hooks/useICSData'
import { FileUploader } from './components/FileUploader'
import { DateRangePicker } from './components/DateRangePicker'
import { ExportConfig } from './components/ExportConfig'
import { PDFPreview } from './components/PDFPreview'

/**
 * Composant principal de l'application
 */
function App() {
  const {
    events,
    loading,
    error,
    startDate,
    endDate,
    filename,
    setStartDate,
    setEndDate,
    setFilename,
    loadFromFile,
    loadFromURL,
    reset,
  } = useICSData()

  const [showPreview, setShowPreview] = useState(false)
  const [includeWeekends, setIncludeWeekends] = useState(false)
  const [timeRange, setTimeRange] = useState({ start: 8, end: 20 })

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* En-tête */}
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
                ICS to PDF
              </h1>
              <p className="text-neutral-600 mt-1 text-sm">
                Convertissez vos calendriers ICS en PDF élégants
              </p>
            </div>
            {events.length > 0 && (
              <button
                onClick={reset}
                className="btn-ghost text-sm"
                aria-label="Réinitialiser"
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Colonne gauche */}
          <div className="space-y-6">
            <FileUploader
              onFileLoad={loadFromFile}
              onURLLoad={loadFromURL}
              loading={loading}
            />

            {events.length > 0 && (
              <DateRangePicker
                startDate={startDate}
                endDate={endDate}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
              />
            )}
          </div>

          {/* Colonne droite */}
          <div className="space-y-6">
            {events.length > 0 && (
              <ExportConfig
                filename={filename}
                onFilenameChange={setFilename}
                events={events}
                startDate={startDate}
                endDate={endDate}
                onPreview={() => setShowPreview(true)}
                includeWeekends={includeWeekends}
                onIncludeWeekendsChange={setIncludeWeekends}
                timeRange={timeRange}
                onTimeRangeChange={setTimeRange}
              />
            )}

            {/* Message d'erreur */}
            {error && (
              <div className="card border-neutral-300 bg-neutral-50">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium mt-0.5">
                    !
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                      Erreur
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Message de succès */}
            {events.length > 0 && !error && (
              <div className="card border-neutral-200 bg-white">
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center mt-0.5">
                    <svg 
                      className="w-3 h-3 text-white" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={3}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-neutral-900 mb-1">
                      Calendrier chargé
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      Vous pouvez maintenant configurer et exporter votre PDF
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {events.length === 0 && !loading && !error && (
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                Comment ça marche ?
              </h2>
              <p className="text-neutral-600 text-sm">
                Trois étapes simples pour convertir votre calendrier
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 text-neutral-900 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 text-base">
                  1. Importez
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Chargez votre fichier .ics ou entrez une URL de calendrier
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 text-neutral-900 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 text-base">
                  2. Configurez
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Sélectionnez la période à exporter et nommez votre fichier
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 text-neutral-900 mb-4">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2 text-base">
                  3. Exportez
                </h3>
                <p className="text-neutral-600 text-sm leading-relaxed">
                  Prévisualisez ou téléchargez votre calendrier en PDF
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-neutral-500 text-sm">
            Fait avec <span className="text-neutral-700">♥</span> en utilisant React et @react-pdf/renderer
          </p>
        </div>
      </footer>

      {/* Aperçu PDF (modal) */}
      {showPreview && events.length > 0 && (
        <PDFPreview
          events={events}
          startDate={startDate}
          endDate={endDate}
          onClose={() => setShowPreview(false)}
          includeWeekends={includeWeekends}
          timeRange={timeRange}
        />
      )}
    </div>
  )
}

export default App

