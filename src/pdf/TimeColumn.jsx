import { View, Text } from '@react-pdf/renderer'
import { createStyles } from './styles'

/**
 * Composant pour afficher la colonne des heures - Style Notion épuré
 * Les heures sont alignées exactement sur les lignes, avec marqueurs de demi-heures
 */
export function TimeColumn({ timeRange = { start: 8, end: 20 }, layout, theme = 'neutral' }) {
  const numberOfHours = timeRange.end - timeRange.start
  const hours = Array.from({ length: numberOfHours }, (_, i) => i + timeRange.start)
  const styles = createStyles(theme)

  return (
    <View style={[styles.timeColumn, { width: layout.timeColumnWidth }]}>
      {/* En-tête vide SANS bordure pour respecter les coins arrondis */}
      <View style={{ 
        height: layout.dayHeaderHeight,
        backgroundColor: 'rgba(0, 0, 0, 0.015)',
      }} />
      
      {/* Cellules horaires avec labels alignés en haut à gauche */}
      {hours.map((hour, index) => {
        const isLastCell = index === hours.length - 1
        return (
          <View key={hour} style={[
            styles.timeCell,
            { height: layout.cellHeight },
          ]}>
            <Text style={styles.timeLabel}>{hour.toString().padStart(2, '0')}:00</Text>
          </View>
        )
      })}
    </View>
  )
}

