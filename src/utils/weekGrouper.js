import { getWeekStarts, getWeekDays, getWeekEnd, isEventInRange } from './dateHelpers'

/**
 * Groupe les événements par semaine
 * @param {Array<Object>} events - Tableau d'événements
 * @param {Date} startDate - Date de début de la période
 * @param {Date} endDate - Date de fin de la période
 * @returns {Array<Object>} - Tableau de semaines avec leurs événements
 */
export function groupEventsByWeek(events, startDate, endDate) {
  // Filtrer les événements dans la plage de dates
  const filteredEvents = events.filter(event => isEventInRange(event, startDate, endDate))

  // Obtenir tous les lundis dans la plage
  const weekStarts = getWeekStarts(startDate, endDate)

  // Grouper les événements par semaine
  return weekStarts.map(weekStart => {
    const weekEnd = getWeekEnd(weekStart)
    const weekDays = getWeekDays(weekStart)

    // Filtrer les événements pour cette semaine
    const weekEvents = filteredEvents.filter(event =>
      isEventInRange(event, weekStart, weekEnd)
    )

    return {
      weekStart,
      weekEnd,
      days: weekDays,
      events: weekEvents,
    }
  })
}

/**
 * Calcule la position verticale d'un événement dans la grille
 * @param {Date} eventTime - Heure de l'événement
 * @param {number} startHour - Heure de début de la grille (défaut: 8)
 * @returns {number} - Position en minutes (minimum 0)
 */
export function calculateEventPosition(eventTime, startHour = 8) {
  const hours = eventTime.getHours()
  const minutes = eventTime.getMinutes()
  const totalMinutes = (hours - startHour) * 60 + minutes
  // S'assurer que la position est dans la plage valide
  return Math.max(0, Math.min(totalMinutes, 720)) // Max 12h * 60 = 720 minutes
}

/**
 * Calcule la durée d'un événement en minutes
 * @param {Date} start - Date de début
 * @param {Date} end - Date de fin
 * @returns {number} - Durée en minutes
 */
export function calculateEventDuration(start, end) {
  return Math.max(15, (end - start) / (1000 * 60)) // Minimum 15 minutes pour visibilité
}

/**
 * Vérifie si un événement est dans la plage horaire visible (8h-20h)
 * @param {Object} event - Événement avec start et end
 * @param {Date} day - Jour à vérifier
 * @returns {boolean} - True si l'événement est visible
 */
export function isEventVisible(event, day) {
  const eventStart = new Date(event.start)
  const eventEnd = new Date(event.end)

  // Si l'événement n'est pas le même jour, vérifier s'il chevauche ce jour
  const dayStart = new Date(day)
  dayStart.setHours(8, 0, 0, 0)
  const dayEnd = new Date(day)
  dayEnd.setHours(20, 0, 0, 0)

  return eventEnd > dayStart && eventStart < dayEnd
}

/**
 * Tronque un événement pour qu'il rentre dans la plage horaire (8h-20h)
 * @param {Object} event - Événement avec start et end
 * @param {Date} day - Jour de référence
 * @returns {Object} - Événement tronqué
 */
export function truncateEventToWorkHours(event, day) {
  // Créer les bornes du jour pour les heures de travail
  const dayStart = new Date(day)
  dayStart.setHours(8, 0, 0, 0)
  const dayEnd = new Date(day)
  dayEnd.setHours(20, 0, 0, 0)

  // Copier les dates d'événement pour ne pas les modifier
  let eventStart = new Date(event.start)
  let eventEnd = new Date(event.end)

  // Si l'événement commence avant ce jour, le commencer à 8h ce jour
  if (eventStart < dayStart) {
    eventStart = dayStart
  }

  // Si l'événement finit après ce jour, le finir à 20h ce jour
  if (eventEnd > dayEnd) {
    eventEnd = dayEnd
  }

  // S'assurer que l'événement est bien dans ce jour
  const nextDayStart = new Date(day)
  nextDayStart.setDate(nextDayStart.getDate() + 1)
  nextDayStart.setHours(0, 0, 0, 0)

  if (eventEnd > nextDayStart) {
    eventEnd = dayEnd
  }

  return {
    ...event,
    displayStart: eventStart,
    displayEnd: eventEnd,
  }
}

