import { format } from 'date-fns'

/**
 * Composant pour sélectionner la plage de dates
 */
export function DateRangePicker({ startDate, endDate, onStartDateChange, onEndDateChange }) {
  const formatDateForInput = date => {
    return format(date, 'yyyy-MM-dd')
  }

  const handleStartDateChange = e => {
    const newDate = new Date(e.target.value)
    onStartDateChange(newDate)
  }

  const handleEndDateChange = e => {
    const newDate = new Date(e.target.value)
    onEndDateChange(newDate)
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
          Période à exporter
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Date de début */}
        <div>
          <label htmlFor="start-date" className="label">
            Date de début
          </label>
          <input
            id="start-date"
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="input"
          />
        </div>

        {/* Date de fin */}
        <div>
          <label htmlFor="end-date" className="label">
            Date de fin
          </label>
          <input
            id="end-date"
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            min={formatDateForInput(startDate)}
            className="input"
          />
        </div>
      </div>

      {endDate < startDate && (
        <div className="mt-4 flex items-center gap-2 text-neutral-600">
          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm">
            La date de fin doit être après la date de début
          </p>
        </div>
      )}
    </div>
  )
}

