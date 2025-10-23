# Design V2 - ICS to PDF

Guide complet du nouveau design épuré et moderne

---

## ✨ Nouveautés

### 1. **Landing Page Moderne**
- **Hero Section** : Titre et sous-titre centrés en haut avec grande typographie (`text-4xl sm:text-5xl`)
- **Layout vertical** : Tout est empilé verticalement dans une colonne centrale (max-width: 768px)
- **Suppression** : Navbar et footer retirés pour un look plus épuré

### 2. **Sélecteur de Thème**
Position fixe en haut à droite avec 5 options de couleurs :

| Thème | Couleur Primaire | Usage |
|-------|------------------|-------|
| **Noir & Blanc** | #171717 | Défaut, sobre et professionnel |
| **Bleu** | #2563EB | Moderne et tech |
| **Vert** | #16A34A | Nature, écologie |
| **Orange** | #EA580C | Créatif, énergique |
| **Violet** | #9333EA | Premium, élégant |

Le thème s'applique sur :
- Bouton "Télécharger" (couleur primaire)
- Accents dans le PDF généré
- Enregistré dans `localStorage` pour persister entre les sessions

### 3. **Zone de Configuration Déployable**
Après l'import d'un fichier :
1. **Animation d'entrée** : Fade-in + slide-in depuis le haut (500ms)
2. **Message de succès** : Badge avec compteur d'événements
3. **Configuration complète** : Tout regroupé dans une seule grande carte

### 4. **Composants Améliorés**

#### Date Picker
- Input natif type="date" stylisé avec icône
- Icône calendrier à droite (pointer-events: none)
- États hover/focus cohérents
- Validation visuelle si date de fin < date de début

#### Time Picker
- Select natif stylisé avec format "HH:00"
- Icône horloge à droite
- Design minimal et épuré
- Padding ajusté pour l'icône (pr-10)

---

## 🎨 Palette de Couleurs

### Base (inchangée)
```css
neutral-50:  #FAFAFA   /* Fond de page */
neutral-100: #F5F5F5   /* Éléments secondaires */
neutral-200: #E5E5E5   /* Bordures */
neutral-300: #D4D4D4   /* Bordures actives */
neutral-500: #737373   /* Texte secondaire */
neutral-600: #525252   /* Texte tertiaire */
neutral-700: #404040   /* Labels */
neutral-900: #171717   /* Texte principal */
```

### Thèmes (nouveaux)
Chaque thème inclut :
- `primary`: Couleur principale (600)
- `primaryHover`: Hover state (700)
- `light`: Fond léger (50)
- `lighter`: Fond très léger (100)

---

## 📐 Structure de la Page

```
┌─────────────────────────────────────────┐
│  [Sélecteur de thème]        (fixed)    │
├─────────────────────────────────────────┤
│                                         │
│            ICS to PDF                   │  ← Hero
│  Convertissez vos calendriers...        │
│                                         │
├─────────────────────────────────────────┤
│                                         │
│     ┌─────────────────────────┐        │
│     │ Importer un calendrier  │        │  ← Zone d'import
│     │  [Fichier] [URL]        │        │
│     │  [Drag & Drop Area]     │        │
│     └─────────────────────────┘        │
│                                         │
├─────────────────────────────────────────┤
│  [Si erreur]                            │
│     ┌─────────────────────────┐        │
│     │ ! Erreur                │        │  ← Message d'erreur
│     │ Message...              │        │
│     └─────────────────────────┘        │
├─────────────────────────────────────────┤
│  [Si succès] (animation entrée)         │
│     ┌─────────────────────────┐        │
│     │ ✓ Calendrier chargé     │        │  ← Succès + config
│     │ 188 événements          │        │
│     └─────────────────────────┘        │
│                                         │
│     ┌─────────────────────────┐        │
│     │ Configuration           │        │
│     │                         │        │
│     │ • Nom du fichier        │        │
│     │ • Période               │        │
│     │ • Week-ends             │        │
│     │ • Plage horaire         │        │
│     │                         │        │
│     │ [Aperçu] [Télécharger]  │        │
│     └─────────────────────────┘        │
│                                         │
└─────────────────────────────────────────┘
```

---

## 🔧 Composants Techniques

### ThemeSelector
```jsx
<div className="fixed top-6 right-6 z-40">
  <ThemeSelector />
</div>
```
- Boutons circulaires colorés (8x8)
- Ring sur le thème actif
- Scale effet sur hover
- Accessible avec aria-label

### Custom Select (Time/Date)
```jsx
<div className="relative">
  <select className="input appearance-none pr-10 cursor-pointer">
    {options}
  </select>
  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
    <svg>...</svg>
  </div>
</div>
```
- Suppression de l'apparence native (`appearance-none`)
- Icône positionnée en absolu à droite
- `pointer-events: none` sur l'icône pour permettre le clic

---

## 🎬 Animations

### Entrée de la configuration
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideInFromTop {
  from {
    transform: translateY(-16px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
```

Classes appliquées :
```html
<div className="animate-in fade-in slide-in-from-top-4 duration-500">
```

### Effets de boutons
- `hover:scale-105` : Légère augmentation au survol
- `active:scale-[0.98]` : Légère réduction au clic
- `transition-all duration-200` : Transition fluide

---

## 📱 Responsive

### Mobile (< 640px)
- **Hero** : `text-4xl` → Titre grande taille mais lisible
- **Inputs** : Pleine largeur, empilés verticalement
- **Dates/Heures** : Grid 1 colonne
- **Boutons** : Pleine largeur, empilés verticalement

### Tablet (≥ 640px)
- **Hero** : `sm:text-5xl` → Titre plus grand
- **Dates/Heures** : Grid 2 colonnes
- **Boutons** : `sm:flex-row` → Côte à côte

### Desktop (≥ 1024px)
- Même layout que tablet
- Container max-width: `max-w-3xl` (768px)

---

## ♿ Accessibilité

### Focus States
Tous les éléments interactifs ont :
```css
focus:outline-none 
focus:ring-2 
focus:ring-neutral-900 
focus:ring-offset-2
```

### Labels
- Tous les inputs ont des labels associés (`htmlFor`)
- Labels visibles (pas de placeholders seuls)
- Hiérarchie claire (H1 → H2 → H3)

### Contraste
- Texte principal : `text-neutral-900` sur `bg-white` ✅
- Texte secondaire : `text-neutral-600` sur `bg-white` ✅
- Labels : `text-neutral-700` sur `bg-white` ✅
- Tous conformes WCAG AA

### Cibles Tactiles
- Tous les boutons : minimum 44px de hauteur
- Checkbox : 16px (w-4 h-4) avec padding généreux
- Sélecteur de thème : 32px (w-8 h-8)

---

## 🎯 UX Améliorations

### Réduction de la Friction
1. **Moins de clics** : Tout sur une seule page
2. **Feedback immédiat** : Animations et messages clairs
3. **Validation en temps réel** : Message si dates invalides
4. **Mémorisation** : Thème sauvegardé automatiquement

### Clarté Visuelle
1. **Hiérarchie** : Titre grand → zones distinctes → actions claires
2. **Groupement** : Configuration regroupée logiquement
3. **États** : Disabled, hover, focus bien visibles
4. **Messages** : Icônes + texte pour clarté

### Progressivité
1. Import d'abord (simple)
2. Configuration déployée après (détails)
3. Actions finales (aperçu/téléchargement)

---

## 🔄 Hook useTheme

### Utilisation
```jsx
import { useTheme } from './hooks/useTheme'

const { currentTheme, setCurrentTheme, theme, themeClasses, allThemes } = useTheme()
```

### Retour
```js
{
  currentTheme: 'neutral' | 'blue' | 'green' | 'orange' | 'purple',
  setCurrentTheme: (id) => void,
  theme: {
    id: string,
    name: string,
    colors: {
      primary: string,
      primaryHover: string,
      light: string,
      lighter: string
    }
  },
  themeClasses: {
    primary: string,        // Classes pour bouton primaire
    secondary: string,      // Classes pour bouton secondaire
    accent: string,         // Classes pour accents
    accentHover: string     // Classes pour hover accents
  },
  allThemes: Array<Theme>   // Liste de tous les thèmes
}
```

### Exemple
```jsx
// Bouton avec thème dynamique
<button className={`... ${themeClasses.primary}`}>
  Télécharger
</button>
```

---

## 📝 Checklist de Style

Avant de commit :

- [ ] Typographie : Inter partout
- [ ] Tailles : H1 (4xl), H2 (lg), Body (sm), Small (xs)
- [ ] Couleurs : Palette neutre uniquement (sauf thème)
- [ ] Espacements : Cohérents (4, 6, 8)
- [ ] Border radius : lg (12px) ou xl (16px)
- [ ] Focus states : Ring visible partout
- [ ] Hover states : Changements subtils
- [ ] Disabled states : Grisé et cursor-not-allowed
- [ ] Responsive : Testé mobile → desktop
- [ ] Animations : Fluides et rapides (200-500ms)
- [ ] Accessibilité : Labels, contraste, focus

---

## 🚀 Prochaines Améliorations (Optionnel)

### Toast Notifications
Remplacer `alert()` par des toasts élégants :
```jsx
<Toast type="success">PDF téléchargé avec succès</Toast>
```

### Drag & Drop Amélioré
Feedback visuel plus riche :
- Overlay coloré pendant le drag
- Animation de "drop" réussie
- Preview du fichier uploadé

### Dark Mode
Ajouter un toggle pour basculer en mode sombre :
```jsx
<ThemeSelector showDarkMode />
```

### Aperçu Rapide
Miniature du PDF dans la configuration :
```jsx
<PDFThumbnail />
```

---

## 💡 Conseils d'Utilisation

### Modifier les Couleurs du Thème
Éditer `/src/hooks/useTheme.js` :
```js
blue: {
  id: 'blue',
  name: 'Bleu',
  colors: {
    primary: '#2563EB',      // ← Changer ici
    primaryHover: '#1D4ED8',
    light: '#EFF6FF',
    lighter: '#DBEAFE',
  },
}
```

### Ajouter un Nouveau Thème
```js
// Dans THEMES
rose: {
  id: 'rose',
  name: 'Rose',
  colors: {
    primary: '#E11D48',
    primaryHover: '#BE123C',
    light: '#FFF1F2',
    lighter: '#FFE4E6',
  },
},

// Dans getThemeClasses()
rose: {
  primary: 'bg-rose-600 hover:bg-rose-700 text-white',
  secondary: 'bg-white hover:bg-rose-50 border-rose-300 text-rose-900',
  accent: 'bg-rose-100 text-rose-900',
  accentHover: 'hover:bg-rose-200',
},
```

### Personnaliser les Animations
Éditer `/src/index.css` :
```css
@keyframes slideInFromTop {
  from {
    transform: translateY(-32px);  /* Plus de distance */
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.duration-custom {
  animation-duration: 800ms;  /* Plus lent */
}
```

---

**Design V2 finalisé le 23 octobre 2025**  
Interface moderne, épurée et accessible avec système de thèmes intégré

