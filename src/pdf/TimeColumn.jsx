import { View, Text } from '@react-pdf/renderer'
import { styles } from './styles'

/**
 * Composant pour afficher la colonne des heures
 */
export function TimeColumn() {
  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8h à 19h

  return (
    <View style={styles.timeColumn}>
      {/* Cellule vide pour l'en-tête */}
      <View style={{ height: 30, borderBottom: '1pt solid #E5E7EB' }} />
      
      {/* Heures */}
      {hours.map(hour => (
        <View key={hour} style={styles.timeCell}>
          <Text style={styles.timeText}>{`${hour}:00`}</Text>
        </View>
      ))}
    </View>
  )
}

