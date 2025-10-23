import { View, Text } from '@react-pdf/renderer'
import { createStyles } from './styles'
import { formatTime } from '../utils/dateHelpers'
import { truncateEventToWorkHours } from '../utils/weekGrouper'
import { calculateEventDimensions, calculateEventTextDisplay } from '../utils/layoutCalculator'

/**
 * Composant pour afficher un bloc événement dans la grille - Style Notion
 */
export function EventBlock({ event, day, timeRange = { start: 8, end: 20 }, layout, theme = 'neutral' }) {
  const styles = createStyles(theme)
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
    // D'abord on s'assure que la position est dans la grille
    topPosition = Math.floor(Math.max(0, topPosition))
    
    // Ensuite on calcule la hauteur maximale disponible
    const availableHeight = layout.gridBodyHeight - topPosition
    
    // On applique un minimum de 10px SEULEMENT si on a l'espace
    // Sinon on prend ce qui est disponible (pour les événements tronqués)
    height = Math.floor(Math.min(height, availableHeight))
    if (height < 10 && availableHeight >= 10) {
      height = 10
    }

    // Dernière vérification de sécurité
    if (topPosition + height > layout.gridBodyHeight) {
      height = layout.gridBodyHeight - topPosition
    }
    
    // Si la hauteur est trop petite (< 5px), ne pas afficher l'événement
    if (height < 5) {
      return null
    }

    // Calculer l'affichage du texte selon la hauteur disponible
    const textDisplay = calculateEventTextDisplay(
      height, 
      layout.cellHeight,
      layout.eventTitleSize,
      layout.eventTimeSize
    )
    
    // Préparer le titre
    const title = event.summary && event.summary.length > textDisplay.maxTitleLength 
      ? event.summary.substring(0, textDisplay.maxTitleLength) + '...'
      : event.summary || '(Sans titre)'

    // Afficher les heures INTEGRALES de l'événement, même si la hauteur est tronquée
    let startTime, endTime
    try {
      startTime = formatTime(new Date(event.start))
      endTime = formatTime(new Date(event.end))
    } catch (e) {
      console.warn('Erreur formatage heure (original):', e)
      // Repli sur les dates tronquées si problème
      try {
        startTime = formatTime(displayStart)
        endTime = formatTime(displayEnd)
      } catch {
        startTime = '??:??'
        endTime = '??:??'
      }
    }

    // Préparer le lieu
    const location = event.location && event.location.length > 20 
      ? event.location.substring(0, 20) + '...'
      : event.location || ''

    // Styles selon le layout
    if (textDisplay.layout === 'three-lines') {
      // Layout 3 lignes : Ligne 1 = Titre, Ligne 2 = Horaire, Ligne 3 = Lieu
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
          <Text style={{
            fontSize: textDisplay.titleSize,
            fontWeight: 600,
            color: '#000000',
            marginBottom: 1.5,
            lineHeight: 1.2,
            letterSpacing: -0.08,
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: textDisplay.timeSize,
            color: '#6B7280',
            fontWeight: 500,
            lineHeight: 1.2,
            marginBottom: location ? 1 : 0,
          }}>
            {startTime} - {endTime}
          </Text>
          {location && (
            <Text style={{
              fontSize: textDisplay.timeSize - 0.5,
              color: '#9CA3AF',
              fontWeight: 400,
              lineHeight: 1.2,
            }}>
              {location}
            </Text>
          )}
        </View>
      )
    } else if (textDisplay.layout === 'two-lines') {
      // Layout 2 lignes : Ligne 1 = Titre, Ligne 2 = Horaire - Lieu
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
          <Text style={{
            fontSize: textDisplay.titleSize,
            fontWeight: 600,
            color: '#000000',
            marginBottom: 1.5,
            lineHeight: 1.2,
            letterSpacing: -0.08,
          }}>
            {title}
          </Text>
          <Text style={{
            fontSize: textDisplay.timeSize,
            color: '#6B7280',
            fontWeight: 500,
            lineHeight: 1.2,
          }}>
            {startTime} - {endTime}{location ? ` • ${location}` : ''}
          </Text>
        </View>
      )
    } else {
      // Layout 1 ligne : Titre - Horaire - Lieu (horaire et lieu en gris)
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
          <Text style={{
            fontSize: textDisplay.titleSize,
            lineHeight: 1.2,
            letterSpacing: -0.08,
          }}>
            <Text style={{ fontWeight: 600, color: '#000000' }}>
              {title}
            </Text>
            <Text style={{ fontWeight: 500, color: '#6B7280' }}>
              {' • '}{startTime}-{endTime}{location ? ` • ${location}` : ''}
            </Text>
          </Text>
        </View>
      )
    }
  } catch (error) {
    console.error('Erreur dans EventBlock:', error, event)
    return null
  }
}

