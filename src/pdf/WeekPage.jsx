import { Page, View, Text } from '@react-pdf/renderer'
import { createStyles } from './styles'
import { formatWeekRange } from '../utils/dateHelpers'
import { CalendarGrid } from './CalendarGrid'

/**
 * Composant pour afficher une page de semaine - Style Notion
 */
export function WeekPage({ 
  weekStart, 
  weekEnd, 
  days, 
  events, 
  includeWeekends = false, 
  timeRange = { start: 8, end: 20 },
  theme = 'neutral',
  showEventTimes = true,
  showEventLocations = true,
  showTimezone = false,
  customTitle = ''
}) {
  const hasEvents = events && events.length > 0
  const styles = createStyles(theme)

  // Obtenir la timezone locale et son offset UTC
  const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone
  
  // Calculer l'offset UTC en heures
  const now = new Date()
  const offsetMinutes = -now.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60)
  const offsetMins = Math.abs(offsetMinutes) % 60
  const sign = offsetMinutes >= 0 ? '+' : '-'
  const offsetString = offsetMins > 0 
    ? `${sign}${offsetHours}:${offsetMins.toString().padStart(2, '0')}` 
    : `${sign}${offsetHours}`
  
  const timezoneDisplay = `UTC ${offsetString} - ${timezoneName}`

  // Les jours sont déjà filtrés dans weekGrouper, pas besoin de refiltrer ici
  return (
    <Page orientation="landscape" size="A4" style={styles.page}>
      {/* En-tête de la semaine */}
      <View style={styles.weekHeader}>
        <View style={{ position: 'relative', width: '100%', height: 20 }}>
          {/* Titre personnalisé à gauche */}
          {customTitle && (
            <Text style={[styles.weekSubtitle, { position: 'absolute', left: 0, top: 0 }]}>
              {customTitle}
            </Text>
          )}
          
          {/* Zone centrale pour "Semaine du ..." - toujours centré */}
          <View style={{ position: 'absolute', left: 0, right: 0, top: 0, alignItems: 'center' }}>
            <Text style={styles.weekTitle}>
              {formatWeekRange(weekStart, weekEnd)}
            </Text>
          </View>
          
          {/* Timezone à droite */}
          {showTimezone && (
            <Text style={[styles.weekSubtitle, { position: 'absolute', right: 0, top: 0 }]}>
              {timezoneDisplay}
            </Text>
          )}
        </View>
      </View>

      {/* Grille ou message vide */}
      {hasEvents ? (
        <CalendarGrid 
          days={days} 
          events={events}
          timeRange={timeRange}
          theme={theme}
          showEventTimes={showEventTimes}
          showEventLocations={showEventLocations}
        />
      ) : (
        <Text style={styles.emptyMessage}>Aucun événement cette semaine</Text>
      )}
    </Page>
  )
}

