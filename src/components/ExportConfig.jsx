import { pdf } from '@react-pdf/renderer'
import { CalendarDocument } from '../pdf/CalendarDocument'

/**
 * Composant pour configurer et exporter le PDF
 */
export function ExportConfig({
  filename,
  onFilenameChange,
  events,
  startDate,
  endDate,
  onPreview,
  includeWeekends,
  onIncludeWeekendsChange,
  timeRange,
  onTimeRangeChange,
}) {
  const canExport = events.length > 0 && startDate <= endDate

  const handleDownload = async () => {
    if (!canExport) return

    try {
      console.log('Génération du PDF avec', events.length, 'événements...')
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
      console.log('PDF téléchargé avec succès')
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert(`Erreur lors de la génération du PDF: ${error.message}\n\nVeuillez vérifier la console pour plus de détails.`)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📄 Configuration de l&apos;export</h2>

      {/* Nom du fichier */}
      <div className="mb-4">
        <label htmlFor="filename" className="block text-sm font-medium text-gray-700 mb-2">
          Nom du fichier
        </label>
        <div className="flex gap-2">
          <input
            id="filename"
            type="text"
            value={filename.replace('.pdf', '')}
            onChange={e => onFilenameChange(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="calendrier-2024-01-24"
          />
          <span className="flex items-center text-gray-600 font-medium">.pdf</span>
        </div>
      </div>

      {/* Options d'affichage */}
      <div className="mb-4 space-y-4">
        <h3 className="text-sm font-medium text-gray-700">Options d&apos;affichage</h3>
        
        {/* Option week-end */}
        <div className="flex items-center">
          <input
            id="includeWeekends"
            type="checkbox"
            checked={includeWeekends}
            onChange={e => onIncludeWeekendsChange(e.target.checked)}
            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-2 focus:ring-primary"
          />
          <label htmlFor="includeWeekends" className="ml-2 text-sm text-gray-700">
            Inclure les week-ends
          </label>
        </div>

        {/* Plage horaire */}
        <div className="space-y-2">
          <label className="text-sm text-gray-700 block">
            Plage horaire : {timeRange.start}h - {timeRange.end}h
          </label>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="startHour" className="text-xs text-gray-600 block mb-1">
                Heure de début
              </label>
              <input
                id="startHour"
                type="number"
                min="0"
                max={timeRange.end - 1}
                value={timeRange.start}
                onChange={e => onTimeRangeChange({ ...timeRange, start: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="endHour" className="text-xs text-gray-600 block mb-1">
                Heure de fin
              </label>
              <input
                id="endHour"
                type="number"
                min={timeRange.start + 1}
                max="24"
                value={timeRange.end}
                onChange={e => onTimeRangeChange({ ...timeRange, end: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Statistiques */}
      {events.length > 0 && (
        <div className="bg-accent rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">{events.length}</span> événement
            {events.length > 1 ? 's' : ''} chargé{events.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onPreview}
          disabled={!canExport}
          className="flex-1 px-6 py-3 bg-white border-2 border-primary text-primary rounded-lg font-medium hover:bg-accent transition-colors disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed"
        >
          👁️ Aperçu
        </button>
        <button
          onClick={handleDownload}
          disabled={!canExport}
          className="flex-1 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          ⬇️ Télécharger
        </button>
      </div>

      {!canExport && (
        <p className="text-gray-500 text-sm mt-3 text-center">
          {events.length === 0
            ? 'Veuillez d\'abord charger un calendrier'
            : 'Veuillez sélectionner une période valide'}
        </p>
      )}
    </div>
  )
}

