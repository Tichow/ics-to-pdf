import { View } from '@react-pdf/renderer'
import { styles } from './styles'
import { TimeColumn } from './TimeColumn'
import { DayColumn } from './DayColumn'

/**
 * Composant pour afficher la grille complète du calendrier
 */
export function CalendarGrid({ days, events }) {
  return (
    <View style={styles.grid}>
      <TimeColumn />
      {days.map((day, index) => (
        <DayColumn key={index} date={day} events={events} />
      ))}
    </View>
  )
}

