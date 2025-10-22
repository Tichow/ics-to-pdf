import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'
import { formatDayHeader, getEventsForDay } from '../utils/dateHelpers'
import { isEventVisible } from '../utils/weekGrouper'
import { EventBlock } from './EventBlock'

/**
 * Composant pour afficher une colonne de jour avec ses événements
 */
export function DayColumn({ date, events }) {
  // Filtrer et valider les événements pour ce jour
  const dayEvents = getEventsForDay(events, date)
    .filter(event => isEventVisible(event, date))
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

  const hours = Array.from({ length: 12 }, (_, i) => i + 8)

  return (
    <View style={styles.dayColumn}>
      {/* En-tête du jour */}
      <View style={styles.dayHeader}>
        <Text style={styles.dayHeaderText}>{formatDayHeader(date)}</Text>
      </View>

      {/* Corps avec grille horaire */}
      <View style={styles.dayBody}>
        {/* Lignes horaires en fond */}
        {hours.map(hour => (
          <View key={hour} style={styles.hourCell} />
        ))}

        {/* Événements en position absolue */}
        {dayEvents.map((event, index) => (
          <EventBlock key={`${event.summary}-${index}`} event={event} day={date} />
        ))}
      </View>
    </View>
  )
}

