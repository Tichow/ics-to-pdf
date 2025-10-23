import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachWeekOfInterval,
  eachDayOfInterval,
  addDays,
  format,
  isWithinInterval,
  isSameDay,
} from 'date-fns'

/**
 * Retourne le début et la fin du mois en cours
 * @returns {Object} - { startDate, endDate }
 */
export function getCurrentMonthRange() {
  const now = new Date()
  return {
    startDate: startOfMonth(now),
    endDate: endOfMonth(now),
  }
}

/**
 * Retourne le début d'une semaine (lundi)
 * @param {Date} date - Date quelconque
 * @returns {Date} - Lundi de la semaine
 */
export function getWeekStart(date) {
  return startOfWeek(date, { weekStartsOn: 1 }) // 1 = lundi
}

/**
 * Retourne la fin d'une semaine (dimanche)
 * @param {Date} date - Date quelconque
 * @returns {Date} - Dimanche de la semaine
 */
export function getWeekEnd(date) {
  return endOfWeek(date, { weekStartsOn: 1 })
}

/**
 * Retourne tous les lundis entre deux dates
 * @param {Date} startDate - Date de début
 * @param {Date} endDate - Date de fin
 * @returns {Array<Date>} - Tableau des lundis
 */
export function getWeekStarts(startDate, endDate) {
  return eachWeekOfInterval(
    { start: startDate, end: endDate },
    { weekStartsOn: 1 }
  )
}

/**
 * Retourne les jours d'une semaine (lundi-vendredi ou lundi-dimanche)
 * @param {Date} weekStart - Lundi de la semaine
 * @param {boolean} includeWeekends - Inclure samedi et dimanche
 * @returns {Array<Date>} - Tableau des jours
 */
export function getWeekDays(weekStart, includeWeekends = false) {
  const lastDay = includeWeekends ? 6 : 4 // 6 jours après lundi = dimanche, 4 = vendredi
  return eachDayOfInterval({
    start: weekStart,
    end: addDays(weekStart, lastDay),
  })
}

/**
 * Formate une date pour l'affichage dans l'en-tête
 * @param {Date} date - Date à formater
 * @returns {string} - Date formatée (ex: "LUN. 24")
 */
export function formatDayHeader(date) {
  const jours = ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM']
  const jour = jours[date.getDay()]
  const numero = date.getDate()
  return `${jour}. ${numero}`
}

/**
 * Formate une plage de dates pour le titre de la semaine
 * @param {Date} startDate - Date de début
 * @param {Date} endDate - Date de fin
 * @returns {string} - Plage formatée (ex: "Semaine du 24 au 28 octobre 2025")
 */
export function formatWeekRange(startDate, endDate) {
  const mois = [
    'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
    'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
  ]
  
  const start = startDate.getDate()
  const end = endDate.getDate()
  const startMois = mois[startDate.getMonth()]
  const endMois = mois[endDate.getMonth()]
  const annee = endDate.getFullYear()
  
  // Si la semaine traverse deux mois
  if (startDate.getMonth() !== endDate.getMonth()) {
    return `Semaine du ${start} ${startMois} au ${end} ${endMois} ${annee}`
  }
  
  return `Semaine du ${start} au ${end} ${endMois} ${annee}`
}

/**
 * Formate une heure pour l'affichage
 * @param {Date} date - Date contenant l'heure
 * @returns {string} - Heure formatée (ex: "09:30")
 */
export function formatTime(date) {
  const heures = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  return `${heures}:${minutes}`
}

/**
 * Vérifie si un événement est dans une plage de dates
 * @param {Object} event - Événement avec start et end
 * @param {Date} startDate - Date de début de la plage
 * @param {Date} endDate - Date de fin de la plage
 * @returns {boolean} - True si l'événement est dans la plage
 */
export function isEventInRange(event, startDate, endDate) {
  return (
    isWithinInterval(event.start, { start: startDate, end: endDate }) ||
    isWithinInterval(event.end, { start: startDate, end: endDate }) ||
    (event.start < startDate && event.end > endDate)
  )
}

/**
 * Filtre les événements pour un jour spécifique
 * @param {Array<Object>} events - Tableau d'événements
 * @param {Date} day - Jour à filtrer
 * @returns {Array<Object>} - Événements du jour
 */
export function getEventsForDay(events, day) {
  return events.filter(event => {
    const eventStart = new Date(event.start)
    const eventEnd = new Date(event.end)
    const dayStart = new Date(day)
    dayStart.setHours(0, 0, 0, 0)
    const dayEnd = new Date(day)
    dayEnd.setHours(23, 59, 59, 999)

    return (
      isSameDay(eventStart, day) ||
      (eventStart <= dayEnd && eventEnd >= dayStart)
    )
  })
}

/**
 * Génère un nom de fichier par défaut avec la date
 * @returns {string} - Nom de fichier (ex: "calendrier-2024-01-24.pdf")
 */
export function generateDefaultFilename() {
  return `calendrier-${format(new Date(), 'yyyy-MM-dd')}.pdf`
}

