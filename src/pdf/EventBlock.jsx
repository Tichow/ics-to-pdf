import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'
import { formatTime } from '../utils/dateHelpers'
import { truncateEventToWorkHours } from '../utils/weekGrouper'
import { calculateEventDimensions, calculateEventTextDisplay } from '../utils/layoutCalculator'

/**
 * Composant pour afficher un bloc événement dans la grille
 */
export function EventBlock({ event, day, timeRange = { start: 8, end: 20 }, layout }) {
  try {
    // Validation des entrées
    if (!event || !event.start || !event.end || !day) {
      console.warn('EventBlock: données manquantes', event)
      return null
    }

    // Tronquer l'événement aux heures de travail
    const truncatedEvent = truncateEventToWorkHours(event, day, timeRange)
    const { displayStart, displayEnd } = truncatedEvent

    // Valider les dates retournées
    if (!displayStart || !displayEnd) {
      console.warn('Dates tronquées invalides pour événement:', event.summary)
      return null
    }

    if (isNaN(displayStart.getTime()) || isNaN(displayEnd.getTime())) {
      console.warn('Dates invalides pour événement:', event.summary)
      return null
    }

    // Calculer la position et la hauteur avec le layout responsive
    const dimensions = calculateEventDimensions(
      displayStart,
      displayEnd,
      timeRange.start,
      layout.pixelsPerHour
    )

    let topPosition = dimensions.top
    let height = dimensions.height

    // Valider les valeurs calculées
    if (isNaN(topPosition) || isNaN(height)) {
      console.warn('Dimensions invalides pour événement:', event.summary)
      return null
    }

    // Forcer les limites strictes selon le layout
    const maxPosition = layout.gridBodyHeight - 15
    topPosition = Math.floor(Math.max(0, Math.min(topPosition, maxPosition)))
    height = Math.floor(Math.max(15, Math.min(height, layout.gridBodyHeight - topPosition)))

    // Dernière vérification de sécurité
    if (topPosition + height > layout.gridBodyHeight) {
      height = layout.gridBodyHeight - topPosition
    }

    // Calculer l'affichage du texte selon la hauteur disponible
    const textDisplay = calculateEventTextDisplay(
      height, 
      layout.cellHeight,
      layout.eventTitleSize,
      layout.eventTimeSize
    )
    
    const title = event.summary && event.summary.length > textDisplay.maxTitleLength 
      ? event.summary.substring(0, textDisplay.maxTitleLength) + '...'
      : event.summary || '(Sans titre)'

    // Sécuriser le formatage des heures
    let startTime, endTime
    try {
      startTime = formatTime(displayStart)
      endTime = formatTime(displayEnd)
    } catch (e) {
      console.warn('Erreur formatage heure:', e)
      startTime = '??:??'
      endTime = '??:??'
    }

    const titleStyle = {
      fontSize: textDisplay.titleSize,
      fontWeight: 700,
      color: '#000000',
      marginBottom: textDisplay.showTime ? 2 : 0,
      lineHeight: 1.1,
    }

    const timeStyle = {
      fontSize: textDisplay.timeSize,
      color: '#666666',
    }

    return (
      <View
        style={[
          styles.eventBlock,
          {
            top: topPosition,
            height: height,
          },
        ]}
      >
        {textDisplay.showTitle && (
          <Text style={titleStyle}>{title}</Text>
        )}
        {textDisplay.showTime && (
          <Text style={timeStyle}>
            {startTime} - {endTime}
          </Text>
        )}
      </View>
    )
  } catch (error) {
    console.error('Erreur dans EventBlock:', error, event)
    return null
  }
}

