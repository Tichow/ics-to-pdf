import { pdf } from '@react-pdf/renderer'
import { CalendarDocument } from '../pdf/CalendarDocument'
import { TimePicker } from './TimePicker'
import { useTheme } from '../hooks/useTheme'

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
  const { themeClasses } = useTheme()
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
    <div className="card">
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100">
          <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <h2 className="text-base font-semibold text-neutral-900">
          Configuration de l&apos;export
        </h2>
      </div>

      {/* Nom du fichier */}
      <div className="mb-6">
        <label htmlFor="filename" className="label">
          Nom du fichier
        </label>
        <div className="flex items-center gap-2">
          <input
            id="filename"
            type="text"
            value={filename.replace('.pdf', '')}
            onChange={e => onFilenameChange(e.target.value)}
            className="input flex-1"
            placeholder="calendrier-2025-10-23"
          />
          <span className="text-neutral-500 text-sm font-medium">.pdf</span>
        </div>
      </div>

      {/* Options d'affichage */}
      <div className="mb-6 space-y-5">
        <h3 className="text-sm font-medium text-neutral-700">Options d&apos;affichage</h3>
        
        {/* Option week-end */}
        <label htmlFor="includeWeekends" className="flex items-center gap-3 cursor-pointer group">
          <div className="relative flex items-center">
            <input
              id="includeWeekends"
              type="checkbox"
              checked={includeWeekends}
              onChange={e => onIncludeWeekendsChange(e.target.checked)}
              className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2 cursor-pointer"
            />
          </div>
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
            <TimePicker
              id="startHour"
              label="Heure de début"
              value={timeRange.start}
              onChange={(value) => onTimeRangeChange({ ...timeRange, start: value })}
              min={0}
              max={timeRange.end - 1}
            />
            <TimePicker
              id="endHour"
              label="Heure de fin"
              value={timeRange.end}
              onChange={(value) => onTimeRangeChange({ ...timeRange, end: value })}
              min={timeRange.start + 1}
              max={24}
            />
          </div>
        </div>
      </div>

      {/* Statistiques */}
      {events.length > 0 && (
        <div className="bg-neutral-50 rounded-lg px-4 py-3 mb-6 border border-neutral-200">
          <p className="text-sm text-neutral-600">
            <span className="font-semibold text-neutral-900">{events.length}</span> événement
            {events.length > 1 ? 's' : ''} chargé{events.length > 1 ? 's' : ''}
          </p>
        </div>
      )}

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={onPreview}
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
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all duration-200 active:scale-[0.98] disabled:bg-neutral-300 disabled:text-neutral-500 disabled:cursor-not-allowed ${themeClasses.primary}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Télécharger</span>
        </button>
      </div>

      {!canExport && (
        <p className="text-neutral-500 text-sm mt-4 text-center">
          {events.length === 0
            ? 'Veuillez d\'abord charger un calendrier'
            : 'Veuillez sélectionner une période valide'}
        </p>
      )}
    </div>
  )
}

