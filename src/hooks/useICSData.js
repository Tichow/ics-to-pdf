import { useState, useCallback } from 'react'
import { readAndParseICSFile, fetchAndParseICS } from '../utils/icsParser'
import { getCurrentMonthRange, generateDefaultFilename } from '../utils/dateHelpers'

/**
 * Hook personnalisé pour gérer l'état du calendrier ICS
 * @returns {Object} État et méthodes pour gérer les données ICS
 */
export function useICSData() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const defaultRange = getCurrentMonthRange()
  const [startDate, setStartDate] = useState(defaultRange.startDate)
  const [endDate, setEndDate] = useState(defaultRange.endDate)
  const [filename, setFilename] = useState(generateDefaultFilename())

  /**
   * Charge un fichier ICS depuis un File object
   */
  const loadFromFile = useCallback(async (file) => {
    setLoading(true)
    setError(null)
    try {
      const parsedEvents = await readAndParseICSFile(file)
      setEvents(parsedEvents)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Charge un fichier ICS depuis une URL
   */
  const loadFromURL = useCallback(async (url) => {
    setLoading(true)
    setError(null)
    try {
      const parsedEvents = await fetchAndParseICS(url)
      setEvents(parsedEvents)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  /**
   * Réinitialise toutes les données
   */
  const reset = useCallback(() => {
    setEvents([])
    setError(null)
    const defaultRange = getCurrentMonthRange()
    setStartDate(defaultRange.startDate)
    setEndDate(defaultRange.endDate)
    setFilename(generateDefaultFilename())
  }, [])

  return {
    events,
    loading,
    error,
    startDate,
    endDate,
    filename,
    setStartDate,
    setEndDate,
    setFilename,
    loadFromFile,
    loadFromURL,
    reset,
  }
}

