import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useICSData } from './hooks/useICSData'
import { FileUploader } from './components/FileUploader'
import { DateRangePicker } from './components/DateRangePicker'
import { PDFPreview } from './components/PDFPreview'
import { ThemeSelector } from './components/ThemeSelector'
import { CalendarDocument } from './pdf/CalendarDocument'
import { useTheme } from './hooks/useTheme'

/**
 * Composant principal de l'application - Landing page
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
  } = useICSData()

  const { themeClasses } = useTheme()
  const [showPreview, setShowPreview] = useState(false)
  const [includeWeekends, setIncludeWeekends] = useState(false)
  const [timeRange, setTimeRange] = useState({ start: 8, end: 20 })

  const canExport = events.length > 0 && startDate <= endDate

  const handleDownload = async () => {
    if (!canExport) return

    try {
      const blob = await pdf(
        <CalendarDocument 
          events={events} 
          startDate={startDate} 
          endDate={endDate}
          includeWeekends={includeWeekends}
          timeRange={timeRange}
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert(`Erreur lors de la génération du PDF: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sélecteur de thème fixe en haut à droite */}
      <div className="fixed top-6 right-6 z-40">
        <ThemeSelector />
      </div>

      {/* Hero Section */}
      <div className="pt-20 pb-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-semibold text-neutral-900 tracking-tight mb-4">
            ICS to PDF
          </h1>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Convertissez vos calendriers ICS en PDF élégants en quelques secondes
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-3xl mx-auto px-4 pb-20">
        {/* Zone d'import */}
        <div className="mb-8">
          <FileUploader
            onFileLoad={loadFromFile}
            onURLLoad={loadFromURL}
            loading={loading}
          />
        </div>

        {/* Message d'erreur */}
        {error && (
          <div className="mb-8 card border-neutral-300 bg-neutral-50 animate-in fade-in slide-in-from-top-4 duration-300">
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

        {/* Zone de configuration (se déploie après l'import) */}
        {events.length > 0 && !error && (
          <div className="space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Message de succès */}
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
                    <span className="font-semibold text-neutral-900">{events.length}</span> événement{events.length > 1 ? 's' : ''} trouvé{events.length > 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Configuration */}
            <div className="card">
              <h2 className="text-lg font-semibold text-neutral-900 mb-6">
                Configuration de l'export
              </h2>

              <div className="space-y-6">
                {/* Nom du fichier */}
                <div>
                  <label htmlFor="filename" className="label">
                    Nom du fichier
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      id="filename"
                      type="text"
                      value={filename.replace('.pdf', '')}
                      onChange={e => setFilename(e.target.value)}
                      className="input flex-1"
                      placeholder="mon-calendrier"
                    />
                    <span className="text-neutral-500 text-sm font-medium">.pdf</span>
                  </div>
                </div>

                {/* Période */}
                <div>
                  <label className="label mb-3">Période à exporter</label>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                  />
                </div>

                {/* Options */}
                <div className="space-y-5">
                  <h3 className="text-sm font-medium text-neutral-700">Options d'affichage</h3>
                  
                  {/* Week-end */}
                  <label htmlFor="includeWeekends" className="flex items-center gap-3 cursor-pointer group">
                    <input
                      id="includeWeekends"
                      type="checkbox"
                      checked={includeWeekends}
                      onChange={e => setIncludeWeekends(e.target.checked)}
                      className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 cursor-pointer"
                    />
                    <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
                      Inclure les week-ends
                    </span>
                  </label>

                  {/* Plage horaire */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-neutral-700">
                        Plage horaire
                      </label>
                      <span className="text-sm text-neutral-500">
                        {timeRange.start}h - {timeRange.end}h
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="startHour" className="label text-xs">
                          Heure de début
                        </label>
                        <div className="relative">
                          <select
                            id="startHour"
                            value={timeRange.start}
                            onChange={e => setTimeRange({ ...timeRange, start: parseInt(e.target.value) })}
                            className="input appearance-none pr-10 cursor-pointer"
                          >
                            {Array.from({ length: timeRange.end }, (_, i) => i).map(hour => (
                              <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}:00
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="endHour" className="label text-xs">
                          Heure de fin
                        </label>
                        <div className="relative">
                          <select
                            id="endHour"
                            value={timeRange.end}
                            onChange={e => setTimeRange({ ...timeRange, end: parseInt(e.target.value) })}
                            className="input appearance-none pr-10 cursor-pointer"
                          >
                            {Array.from({ length: 25 - timeRange.start }, (_, i) => timeRange.start + i + 1).map(hour => (
                              <option key={hour} value={hour}>
                                {hour.toString().padStart(2, '0')}:00
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    onClick={() => setShowPreview(true)}
                    disabled={!canExport}
                    className="btn-secondary flex-1 flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <span>Aperçu</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    disabled={!canExport}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 ${themeClasses.primary}`}
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    <span>Télécharger</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

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

