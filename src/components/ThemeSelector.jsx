import { useTheme } from '../hooks/useTheme'

/**
 * Composant pour sélectionner le thème de couleur
 */
export function ThemeSelector() {
  const { currentTheme, setCurrentTheme, allThemes } = useTheme()

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-neutral-600">Thème</span>
      <div className="flex items-center gap-2">
        {allThemes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => setCurrentTheme(theme.id)}
            className={`w-8 h-8 rounded-lg transition-all ${
              currentTheme === theme.id
                ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110'
                : 'hover:scale-105'
            }`}
            style={{ backgroundColor: theme.colors.primary }}
            aria-label={`Thème ${theme.name}`}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  )
}

