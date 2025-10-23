/**
 * Composant TimePicker moderne et élégant
 */
export function TimePicker({ value, onChange, min, max, label, id }) {
  const handleChange = (e) => {
    const hour = parseInt(e.target.value)
    if (!isNaN(hour) && hour >= (min || 0) && hour <= (max || 24)) {
      onChange(hour)
    }
  }

  return (
    <div>
      {label && (
        <label htmlFor={id} className="label text-xs">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="input appearance-none pr-10 cursor-pointer"
        >
          {Array.from(
            { length: (max || 24) - (min || 0) + (label?.includes('fin') ? 0 : 1) },
            (_, i) => (min || 0) + i
          ).map((hour) => (
            <option key={hour} value={hour}>
              {hour.toString().padStart(2, '0')}:00
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-neutral-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

