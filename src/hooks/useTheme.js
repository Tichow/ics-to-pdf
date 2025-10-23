import { useState, useEffect } from 'react'

export const THEMES = {
  neutral: {
    id: 'neutral',
    name: 'Noir & Blanc',
    colors: {
      primary: '#171717', // neutral-900
      primaryHover: '#262626', // neutral-800
      light: '#FAFAFA', // neutral-50
      lighter: '#F5F5F5', // neutral-100
    },
  },
  blue: {
    id: 'blue',
    name: 'Bleu',
    colors: {
      primary: '#2563EB',
      primaryHover: '#1D4ED8',
      light: '#EFF6FF',
      lighter: '#DBEAFE',
    },
  },
  green: {
    id: 'green',
    name: 'Vert',
    colors: {
      primary: '#16A34A',
      primaryHover: '#15803D',
      light: '#F0FDF4',
      lighter: '#DCFCE7',
    },
  },
  orange: {
    id: 'orange',
    name: 'Orange',
    colors: {
      primary: '#EA580C',
      primaryHover: '#C2410C',
      light: '#FFF7ED',
      lighter: '#FFEDD5',
    },
  },
  purple: {
    id: 'purple',
    name: 'Violet',
    colors: {
      primary: '#9333EA',
      primaryHover: '#7E22CE',
      light: '#FAF5FF',
      lighter: '#F3E8FF',
    },
  },
}

/**
 * Hook pour gérer le thème de l'application
 */
export function useTheme() {
  const [currentTheme, setCurrentTheme] = useState(() => {
    const saved = localStorage.getItem('ics-to-pdf-theme')
    return saved || 'neutral'
  })

  useEffect(() => {
    localStorage.setItem('ics-to-pdf-theme', currentTheme)
  }, [currentTheme])

  const theme = THEMES[currentTheme]

  const getThemeClasses = () => {
    const baseClasses = {
      neutral: {
        primary: 'bg-neutral-900 hover:bg-neutral-800 text-white',
        secondary: 'bg-white hover:bg-neutral-50 border-neutral-300 text-neutral-900',
        accent: 'bg-neutral-100 text-neutral-900',
        accentHover: 'hover:bg-neutral-200',
      },
      blue: {
        primary: 'bg-theme-blue-600 hover:bg-theme-blue-700 text-white',
        secondary: 'bg-white hover:bg-theme-blue-50 border-theme-blue-300 text-theme-blue-900',
        accent: 'bg-theme-blue-100 text-theme-blue-900',
        accentHover: 'hover:bg-theme-blue-200',
      },
      green: {
        primary: 'bg-theme-green-600 hover:bg-theme-green-700 text-white',
        secondary: 'bg-white hover:bg-theme-green-50 border-theme-green-300 text-theme-green-900',
        accent: 'bg-theme-green-100 text-theme-green-900',
        accentHover: 'hover:bg-theme-green-200',
      },
      orange: {
        primary: 'bg-theme-orange-600 hover:bg-theme-orange-700 text-white',
        secondary: 'bg-white hover:bg-theme-orange-50 border-theme-orange-300 text-theme-orange-900',
        accent: 'bg-theme-orange-100 text-theme-orange-900',
        accentHover: 'hover:bg-theme-orange-200',
      },
      purple: {
        primary: 'bg-theme-purple-600 hover:bg-theme-purple-700 text-white',
        secondary: 'bg-white hover:bg-theme-purple-50 border-theme-purple-300 text-theme-purple-900',
        accent: 'bg-theme-purple-100 text-theme-purple-900',
        accentHover: 'hover:bg-theme-purple-200',
      },
    }

    return baseClasses[currentTheme]
  }

  return {
    currentTheme,
    setCurrentTheme,
    theme,
    themeClasses: getThemeClasses(),
    allThemes: Object.values(THEMES),
  }
}

