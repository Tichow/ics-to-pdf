import { View } from '@react-pdf/renderer'
import { createStyles } from './styles'
import { TimeColumn } from './TimeColumn'
import { DayColumn } from './DayColumn'
import { calculateLayout } from '../utils/layoutCalculator'

/**
 * Composant pour afficher la grille complète du calendrier - Style Notion
 */
export function CalendarGrid({ days, events, timeRange = { start: 8, end: 20 }, theme = 'neutral', showEventTimes = true, showEventLocations = true }) {
  // Calculer le layout responsive selon le nombre d'heures et de jours
  const numberOfHours = timeRange.end - timeRange.start
  const numberOfDays = days.length
  const layout = calculateLayout(numberOfHours, numberOfDays)
  const styles = createStyles(theme)

  return (
    <View style={styles.grid}>
      <TimeColumn 
        timeRange={timeRange}
        layout={layout}
        theme={theme}
      />
      {days.map((day, index) => (
        <DayColumn 
          key={index} 
          date={day} 
          events={events}
          timeRange={timeRange}
          layout={layout}
          theme={theme}
          isLast={index === days.length - 1}
          showEventTimes={showEventTimes}
          showEventLocations={showEventLocations}
        />
      ))}
    </View>
  )
}

