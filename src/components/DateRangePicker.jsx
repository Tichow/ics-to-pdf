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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">📆 Période à exporter</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Date de début */}
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-2">
            Date de début
          </label>
          <input
            id="start-date"
            type="date"
            value={formatDateForInput(startDate)}
            onChange={handleStartDateChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Date de fin */}
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-2">
            Date de fin
          </label>
          <input
            id="end-date"
            type="date"
            value={formatDateForInput(endDate)}
            onChange={handleEndDateChange}
            min={formatDateForInput(startDate)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
      </div>

      {endDate < startDate && (
        <p className="text-red-600 text-sm mt-2">
          ⚠️ La date de fin doit être après la date de début
        </p>
      )}
    </div>
  )
}

