import { View, Text } from '@react-pdf/renderer'
import { createStyles } from './styles'
import { formatDayHeader, getEventsForDay } from '../utils/dateHelpers'
import { isEventVisible } from '../utils/weekGrouper'
import { EventBlock } from './EventBlock'

/**
 * Composant pour afficher une colonne de jour avec ses événements - Style Notion
 */
export function DayColumn({ date, events, timeRange = { start: 8, end: 20 }, layout, theme = 'neutral', isLast = false, showEventTimes = true, showEventLocations = true }) {
  const styles = createStyles(theme)
  
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

  // Pour la dernière colonne, utiliser flex: 1 et supprimer la bordure droite
  const columnStyle = isLast 
    ? [{ flex: 1 }, styles.dayColumnLast]
    : [{ width: layout.dayColumnWidth }]

  // Formatter l'en-tête : jour de la semaine + date
  const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' }).toUpperCase().replace('.', '')
  const dayNumber = date.getDate()

  return (
    <View style={[styles.dayColumn, ...columnStyle]}>
      {/* En-tête du jour - Style Notion avec bordure séparée */}
      <View style={[
        styles.dayHeader,
        styles.dayHeaderBorder,
        // Pour la dernière colonne, appliquer le rayon du coin supérieur droit
        isLast && styles.dayHeaderLast,
        { height: layout.dayHeaderHeight },
      ]}>
        <Text style={styles.dayHeaderText}>{dayName}</Text>
        <Text style={styles.dayHeaderDate}>{dayNumber}</Text>
      </View>

      {/* Corps avec grille horaire */}
      <View style={[
        styles.dayBody,
        isLast && styles.dayBodyLast,
        { height: layout.gridBodyHeight },
      ]}>
        {/* Lignes horaires - toutes de même hauteur */}
        {hours.map((hour, index) => {
          const isLastCell = index === hours.length - 1
          return (
            <View
              key={hour}
              style={[
                styles.hourCell,
                { height: layout.cellHeight },
                // Bordure sauf pour la dernière
                !isLastCell && styles.hourCellWithBorder,
                // Dernière cellule de la dernière colonne → arrondi
                (isLast && isLastCell) && styles.hourCellLastOfGrid,
              ]}
            />
          )
        })}

        {/* Événements en position absolue */}
        {dayEvents.map((event, index) => (
          <EventBlock 
            key={`${event.summary}-${index}`} 
            event={event} 
            day={date}
            timeRange={timeRange}
            layout={layout}
            theme={theme}
            showEventTimes={showEventTimes}
            showEventLocations={showEventLocations}
          />
        ))}
      </View>
    </View>
  )
}

