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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* En-tête */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                ICS to PDF
              </h1>
              <p className="text-gray-600 mt-1">
                Convertissez vos calendriers ICS en PDF élégants
              </p>
            </div>
            {events.length > 0 && (
              <button
                onClick={reset}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                🔄 Réinitialiser
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
              />
            )}

            {/* Message d'erreur */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">⚠️</span>
                  <div>
                    <h3 className="font-semibold text-red-800 mb-1">
                      Erreur
                    </h3>
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Message de succès */}
            {events.length > 0 && !error && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">✅</span>
                  <div>
                    <h3 className="font-semibold text-green-800 mb-1">
                      Calendrier chargé
                    </h3>
                    <p className="text-green-700 text-sm">
                      Vous pouvez maintenant configurer et exporter votre PDF
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Instructions */}
        {events.length === 0 && !loading && (
          <div className="mt-12 bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Comment ça marche ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-3">📁</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  1. Importez
                </h3>
                <p className="text-gray-600 text-sm">
                  Chargez votre fichier .ics ou entrez une URL de calendrier
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">⚙️</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  2. Configurez
                </h3>
                <p className="text-gray-600 text-sm">
                  Sélectionnez la période à exporter et nommez votre fichier
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-3">📄</div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  3. Exportez
                </h3>
                <p className="text-gray-600 text-sm">
                  Prévisualisez ou téléchargez votre calendrier en PDF
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 py-6 text-center text-gray-600 text-sm">
        <p>
          Fait avec ❤️ en utilisant React et @react-pdf/renderer
        </p>
      </footer>

      {/* Aperçu PDF (modal) */}
      {showPreview && events.length > 0 && (
        <PDFPreview
          events={events}
          startDate={startDate}
          endDate={endDate}
          onClose={() => setShowPreview(false)}
        />
      )}
    </div>
  )
}

export default App

