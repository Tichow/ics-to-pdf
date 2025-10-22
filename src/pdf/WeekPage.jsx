import { Page, View, Text } from '@react-pdf/renderer'
import { styles } from './styles'
import { formatWeekRange } from '../utils/dateHelpers'
import { CalendarGrid } from './CalendarGrid'

/**
 * Composant pour afficher une page de semaine
 */
export function WeekPage({ weekStart, weekEnd, days, events }) {
  const hasEvents = events && events.length > 0

  return (
    <Page orientation="landscape" size="A4" style={styles.page}>
      {/* En-tête de la semaine */}
      <View style={styles.weekHeader}>
        <Text style={styles.weekTitle}>
          {formatWeekRange(weekStart, weekEnd)}
        </Text>
      </View>

      {/* Grille ou message vide */}
      {hasEvents ? (
        <CalendarGrid days={days} events={events} />
      ) : (
        <Text style={styles.emptyMessage}>Aucun événement cette semaine</Text>
      )}
    </Page>
  )
}

