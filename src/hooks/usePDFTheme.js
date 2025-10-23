import { useState, useEffect } from 'react'

export const PDF_THEMES = {
  neutral: {
    id: 'neutral',
    name: 'Noir & Blanc',
    color: '#000000',
    light: 'rgba(0, 0, 0, 0.06)',
  },
  blue: {
    id: 'blue',
    name: 'Bleu',
    color: '#2563EB',
    light: '#EFF6FF',
  },
  green: {
    id: 'green',
    name: 'Vert',
    color: '#16A34A',
    light: '#F0FDF4',
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    color: '#EA580C',
    light: '#FFF7ED',
  },
  purple: {
    id: 'purple',
    name: 'Violet',
    color: '#9333EA',
    light: '#FAF5FF',
  },
}

/**
 * Hook pour gérer le thème du PDF (pas l'UI)
 */
export function usePDFTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('ics-to-pdf-theme')
    return saved || 'neutral'
  })

  useEffect(() => {
    localStorage.setItem('ics-to-pdf-theme', currentTheme)
  }, [currentTheme])

  const theme = PDF_THEMES[currentTheme]

  return {
    currentTheme,
    setCurrentTheme,
    theme,
    allThemes: Object.values(PDF_THEMES),
  }
}

