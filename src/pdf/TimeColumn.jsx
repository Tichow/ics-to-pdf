import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'

/**
 * Composant pour afficher la colonne des heures
 */
export function TimeColumn({ timeRange = { start: 8, end: 20 }, layout }) {
  const numberOfHours = timeRange.end - timeRange.start
  const hours = Array.from({ length: numberOfHours }, (_, i) => i + timeRange.start)

  const cellStyle = {
    height: layout.cellHeight,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingLeft: 4,
  }

  const textStyle = {
    fontSize: layout.timeTextSize,
    color: '#666666',
  }

  return (
    <View style={[styles.timeColumn, { width: layout.timeColumnWidth }]}>
      {/* Cellule vide pour l'en-tête */}
      <View style={{ height: layout.dayHeaderHeight, borderBottom: '1pt solid #E5E7EB' }} />
      
      {/* Heures */}
      {hours.map(hour => (
        <View key={hour} style={cellStyle}>
          <Text style={textStyle}>{`${hour}:00`}</Text>
        </View>
      ))}
    </View>
  )
}

