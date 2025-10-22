import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'
import { formatDayHeader, getEventsForDay } from '../utils/dateHelpers'
import { isEventVisible } from '../utils/weekGrouper'
import { EventBlock } from './EventBlock'

/**
 * Composant pour afficher une colonne de jour avec ses événements
 */
export function DayColumn({ date, events, timeRange = { start: 8, end: 20 }, layout }) {
  // Filtrer et valider les événements pour ce jour
  const dayEvents = getEventsForDay(events, date)
    .filter(event => isEventVisible(event, date, timeRange))
    .filter(event => {
      // Valider que les dates sont correctes
      if (!event.start || !event.end) {
        console.warn('Événement sans dates:', event.summary)
        return false
      }
      if (isNaN(event.start.getTime()) || isNaN(event.end.getTime())) {
        console.warn('Événement avec dates invalides:', event.summary)
        return false
      }
      return true
    })

  const numberOfHours = timeRange.end - timeRange.start
  const hours = Array.from({ length: numberOfHours }, (_, i) => i + timeRange.start)

  const cellStyle = {
    height: layout.cellHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
  }

  const headerTextStyle = {
    fontSize: layout.dayHeaderTextSize,
    fontWeight: 700,
    color: '#2563EB',
    textAlign: 'center',
  }

  return (
    <View style={[styles.dayColumn, { width: layout.dayColumnWidth }]}>
      {/* En-tête du jour */}
      <View style={[styles.dayHeader, { height: layout.dayHeaderHeight }]}>
        <Text style={headerTextStyle}>{formatDayHeader(date)}</Text>
      </View>

      {/* Corps avec grille horaire */}
      <View style={[styles.dayBody, { height: layout.gridBodyHeight }]}>
        {/* Lignes horaires en fond */}
        {hours.map(hour => (
          <View key={hour} style={cellStyle} />
        ))}

        {/* Événements en position absolue */}
        {dayEvents.map((event, index) => (
          <EventBlock 
            key={`${event.summary}-${index}`} 
            event={event} 
            day={date}
            timeRange={timeRange}
            layout={layout}
          />
        ))}
      </View>
    </View>
  )
}

