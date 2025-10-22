import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'
import { formatTime } from '../utils/dateHelpers'
import { 
  calculateEventPosition, 
  calculateEventDuration,
  truncateEventToWorkHours 
} from '../utils/weekGrouper'

/**
 * Composant pour afficher un bloc événement dans la grille
 */
export function EventBlock({ event, day }) {
  try {
    // Validation des entrées
    if (!event || !event.start || !event.end || !day) {
      console.warn('EventBlock: données manquantes', event)
      return null
    }

    // Tronquer l'événement aux heures de travail
    const truncatedEvent = truncateEventToWorkHours(event, day)
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

    // Calculer la position et la hauteur
    const topPositionMinutes = calculateEventPosition(displayStart)
    const duration = calculateEventDuration(displayStart, displayEnd)
    
    // Convertir en pixels : 40px par heure = 40/60 px par minute
    let topPosition = (topPositionMinutes / 60) * 40
    let height = (duration / 60) * 40 // 40px par heure

    // Valider et corriger les valeurs calculées
    if (isNaN(topPosition)) {
      console.warn('Position NaN pour événement:', event.summary)
      return null
    }

    if (isNaN(height)) {
      console.warn('Hauteur NaN pour événement:', event.summary)
      return null
    }

    // Forcer les limites strictes
    topPosition = Math.floor(Math.max(0, Math.min(topPosition, 450))) // 480 - 30
    height = Math.floor(Math.max(25, Math.min(height, 480 - topPosition)))

    // Dernière vérification de sécurité
    if (topPosition + height > 480) {
      height = 480 - topPosition
    }

    // Permettre au titre de tenir sur 2 lignes (environ 50 caractères)
    const maxTitleLength = 50
    const title = event.summary && event.summary.length > maxTitleLength 
      ? event.summary.substring(0, maxTitleLength) + '...'
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
        <Text style={styles.eventTitle}>{title}</Text>
        <Text style={styles.eventTime}>
          {startTime} - {endTime}
        </Text>
      </View>
    )
  } catch (error) {
    console.error('Erreur dans EventBlock:', error, event)
    return null
  }
}

