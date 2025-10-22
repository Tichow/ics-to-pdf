import { Document } from '@react-pdf/renderer'
import { WeekPage } from './WeekPage'
import { groupEventsByWeek } from '../utils/weekGrouper'

// Note: On utilise Helvetica (police système PDF) au lieu d'Inter
// pour éviter les problèmes d'embedding avec de nombreux événements

/**
 * Composant principal du document PDF
 */
export function CalendarDocument({ events, startDate, endDate, includeWeekends = false, timeRange = { start: 8, end: 20 } }) {
  console.log('CalendarDocument: Génération avec', events.length, 'événements')
  console.log('Période:', startDate, 'à', endDate)
  console.log('Options:', { includeWeekends, timeRange })
  
  const weeks = groupEventsByWeek(events, startDate, endDate, includeWeekends)
  console.log('Nombre de semaines:', weeks.length)
  
  weeks.forEach((week, i) => {
    console.log(`Semaine ${i + 1}:`, week.events.length, 'événements')
  })

  if (weeks.length === 0) {
    console.warn('Aucune semaine à afficher')
  }

  return (
    <Document>
      {weeks.map((week, index) => (
        <WeekPage
          key={index}
          weekStart={week.weekStart}
          weekEnd={week.weekEnd}
          days={week.days}
          events={week.events}
          includeWeekends={includeWeekends}
          timeRange={timeRange}
        />
      ))}
    </Document>
  )
}

