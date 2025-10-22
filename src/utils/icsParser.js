import ICAL from 'ical.js'

/**
 * Parse un fichier ICS et retourne un tableau d'événements
 * @param {string} icsContent - Contenu du fichier ICS
 * @returns {Array<Object>} - Tableau d'événements parsés
 * @throws {Error} Si le fichier ICS est invalide
 */
export function parseICS(icsContent) {
  try {
    const jcalData = ICAL.parse(icsContent)
    const component = new ICAL.Component(jcalData)
    const vevents = component.getAllSubcomponents('vevent')

    const events = vevents
      .map(vevent => {
        try {
          const event = new ICAL.Event(vevent)
          let startDate = event.startDate?.toJSDate()
          let endDate = event.endDate?.toJSDate()

          // Valider les dates
          if (!startDate || !endDate || isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            console.warn('Événement avec dates invalides ignoré:', event.summary)
            return null
          }

          // S'assurer que la date de fin est après la date de début
          if (endDate <= startDate) {
            endDate = new Date(startDate)
            endDate.setHours(startDate.getHours() + 1) // Ajouter 1h par défaut
          }

          return {
            summary: event.summary || '(Sans titre)',
            start: startDate,
            end: endDate,
            location: event.location || '',
            description: event.description || '',
          }
        } catch (err) {
          console.warn('Erreur lors du parsing d\'un événement:', err.message)
          return null
        }
      })
      .filter(event => event !== null) // Filtrer les événements invalides

    if (events.length === 0) {
      throw new Error('Aucun événement valide trouvé dans le fichier')
    }

    return events
  } catch (error) {
    throw new Error(`Erreur lors du parsing du fichier ICS: ${error.message}`)
  }
}

/**
 * Récupère et parse un fichier ICS depuis une URL
 * @param {string} url - URL du fichier ICS
 * @returns {Promise<Array<Object>>} - Promesse contenant les événements parsés
 */
export async function fetchAndParseICS(url) {
  try {
    // Essayer d'abord directement
    let response
    try {
      response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Accept': 'text/calendar, text/plain, */*',
        },
      })
    } catch (corsError) {
      // Si CORS échoue, essayer avec un proxy
      console.warn('CORS bloqué, tentative avec proxy...')
      response = await fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
    }

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`)
    }

    const icsContent = await response.text()
    
    if (!icsContent || icsContent.trim().length === 0) {
      throw new Error('Le fichier téléchargé est vide')
    }

    return parseICS(icsContent)
  } catch (error) {
    if (error.message.includes('Failed to fetch')) {
      throw new Error('Impossible de télécharger le calendrier. Vérifiez l\'URL et votre connexion internet.')
    }
    throw new Error(`Erreur lors du téléchargement du calendrier: ${error.message}`)
  }
}

/**
 * Lit et parse un fichier ICS depuis un File object
 * @param {File} file - Fichier ICS
 * @returns {Promise<Array<Object>>} - Promesse contenant les événements parsés
 */
export async function readAndParseICSFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = event => {
      try {
        const events = parseICS(event.target.result)
        resolve(events)
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = () => {
      reject(new Error('Erreur lors de la lecture du fichier'))
    }

    reader.readAsText(file)
  })
}

