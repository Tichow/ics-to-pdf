# Système de Design - ICS to PDF

Design moderne, minimal et professionnel inspiré de Peec AI

---

## 🎨 Palette de Couleurs

### Neutre (Base)
Le système utilise une palette neutre chaude pour un look professionnel et sobre :

```css
neutral-50:  #FAFAFA  /* Fond de page */
neutral-100: #F5F5F5  /* Fond d'éléments secondaires */
neutral-200: #E5E5E5  /* Bordures */
neutral-300: #D4D4D4  /* Bordures actives */
neutral-400: #A3A3A3  /* Texte désactivé */
neutral-500: #737373  /* Texte secondaire */
neutral-600: #525252  /* Texte tertiaire */
neutral-700: #404040  /* Texte labels */
neutral-800: #262626  /* Texte hover */
neutral-900: #171717  /* Texte principal, boutons */
neutral-950: #0A0A0A  /* Noir profond */
```

### Utilisation
- **Fond principal** : `bg-neutral-50` (corps de page)
- **Cartes / Conteneurs** : `bg-white` avec `border-neutral-200`
- **Texte principal** : `text-neutral-900`
- **Texte secondaire** : `text-neutral-600` ou `text-neutral-500`
- **Labels** : `text-neutral-700`
- **Bordures** : `border-neutral-200` (défaut), `border-neutral-300` (actif)

---

## 📝 Typographie

### Police
**Inter** - Police système moderne avec excellente lisibilité
```css
font-family: 'Inter', 'system-ui', '-apple-system', 'sans-serif'
```

### Hiérarchie

| Niveau | Taille | Poids | Usage |
|--------|--------|-------|-------|
| **H1** | `text-2xl` (24px) | `font-semibold` (600) | Titre principal |
| **H2** | `text-xl` (20px) | `font-semibold` (600) | Sous-titres de section |
| **H3** | `text-base` (16px) | `font-semibold` (600) | Titres de cartes |
| **Body** | `text-sm` (14px) | `font-normal` (400) | Texte courant |
| **Small** | `text-xs` (12px) | `font-normal` (400) | Texte d'aide, labels secondaires |

### Caractéristiques
- **Tracking** : `-tracking-tight` pour les titres (H1)
- **Leading** : `leading-relaxed` pour le texte corps (améliore la lisibilité)
- **Features** : `font-feature-settings: 'rlig' 1, 'calt' 1` (ligatures)
- **Antialiasing** : `antialiased` partout

---

## 📦 Composants

### Boutons

#### Primaire (`.btn-primary`)
- **Usage** : Actions principales (Télécharger, Valider)
- **Style** : Fond noir, texte blanc
- **États** :
  - Normal : `bg-neutral-900 text-white`
  - Hover : `bg-neutral-800`
  - Active : `scale-[0.98]` (feedback tactile)
  - Disabled : `bg-neutral-300 text-neutral-500`
- **Padding** : `px-4 py-2.5`
- **Border Radius** : `rounded-lg`

#### Secondaire (`.btn-secondary`)
- **Usage** : Actions secondaires (Aperçu, Annuler)
- **Style** : Fond blanc, bordure
- **États** :
  - Normal : `bg-white border-neutral-300`
  - Hover : `bg-neutral-50 border-neutral-400`
  - Active : `scale-[0.98]`
  - Disabled : `bg-neutral-100 text-neutral-400`

#### Ghost (`.btn-ghost`)
- **Usage** : Actions tertiaires (Réinitialiser, Fermer)
- **Style** : Transparent
- **États** :
  - Normal : `bg-transparent text-neutral-700`
  - Hover : `bg-neutral-100`
  - Active : `scale-[0.98]`

#### Tailles d'icônes
- Petite : `w-4 h-4` (16px)
- Moyenne : `w-5 h-5` (20px)
- Grande : `w-6 h-6` (24px)

### Champs de Formulaire

#### Input (`.input`)
- **Padding** : `px-3.5 py-2.5`
- **Bordure** : `border-neutral-300` (1px)
- **Border Radius** : `rounded-lg`
- **États** :
  - Normal : `border-neutral-300`
  - Hover : `border-neutral-400`
  - Focus : `ring-2 ring-neutral-900 border-transparent`
  - Disabled : `bg-neutral-50 text-neutral-500`
- **Placeholder** : `placeholder:text-neutral-400`

#### Label (`.label`)
- **Style** : `text-sm font-medium text-neutral-700 mb-2`
- **Toujours visible** (pas de labels flottants)

#### Select
- Utilise la classe `.input` avec les mêmes états
- Icône de dropdown native stylisée

#### Checkbox
- **Taille** : `w-4 h-4`
- **Style** : `rounded border-neutral-300`
- **Focus** : `ring-2 ring-neutral-900 ring-offset-2`
- **Checked** : `bg-neutral-900`

### Cartes (`.card`)
- **Fond** : `bg-white`
- **Bordure** : `border-neutral-200` (1px)
- **Border Radius** : `rounded-xl` (12px)
- **Padding** : `p-6` (24px)
- **Ombre** : Aucune par défaut (utiliser `shadow-sm` si besoin)
- **Transition** : `transition-all duration-200`

#### En-tête de Carte
- Icône dans un conteneur : `w-8 h-8 rounded-lg bg-neutral-100`
- Titre : `text-base font-semibold text-neutral-900`
- Gap entre icône et titre : `gap-2`
- Margin bottom : `mb-6`

### Alertes / Messages

#### Succès
```jsx
<div className="card border-neutral-200 bg-white">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full bg-neutral-900">
      {/* Icône check */}
    </div>
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">Titre</h3>
      <p className="text-sm text-neutral-600">Message</p>
    </div>
  </div>
</div>
```

#### Erreur
```jsx
<div className="card border-neutral-300 bg-neutral-50">
  <div className="flex items-start gap-3">
    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white">!</div>
    <div>
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">Erreur</h3>
      <p className="text-sm text-neutral-600">Message d'erreur</p>
    </div>
  </div>
</div>
```

### Sélecteur d'Onglets

Utilise un conteneur avec fond gris et onglets avec effet de "carte blanche" :

```jsx
<div className="inline-flex bg-neutral-100 rounded-lg p-1">
  <button className="px-4 py-2 bg-white text-neutral-900 shadow-sm rounded-md">
    Actif
  </button>
  <button className="px-4 py-2 text-neutral-600 hover:text-neutral-900 rounded-md">
    Inactif
  </button>
</div>
```

### Zone de Drag & Drop

```jsx
<div className="border-2 border-dashed border-neutral-300 hover:border-neutral-400 rounded-xl p-10">
  {/* Contenu */}
</div>
```

**État actif (dragover)** : `border-neutral-900 bg-neutral-50`

---

## 📐 Espacements

### Système d'Espacement
Le design utilise une échelle cohérente basée sur des multiples de 4px :

| Token | Valeur | Usage |
|-------|--------|-------|
| `gap-2` | 8px | Entre icône et texte |
| `gap-3` | 12px | Entre éléments liés |
| `gap-4` | 16px | Entre champs de formulaire |
| `gap-6` | 24px | Entre sections dans une carte |
| `gap-8` | 32px | Entre cartes |
| `py-2.5` | 10px | Padding vertical boutons/inputs |
| `px-3.5` | 14px | Padding horizontal inputs |
| `px-4` | 16px | Padding horizontal boutons |
| `p-6` | 24px | Padding cartes |
| `py-8` | 32px | Padding header |
| `py-10` | 40px | Padding main content |

### Margins
- Entre cartes : `space-y-6` (24px)
- Entre sections : `mt-16` (64px)
- Footer : `mt-20` (80px)

---

## 🎭 Micro-interactions

### Transitions
- **Durée par défaut** : `200ms`
- **Timing function** : `cubic-bezier(0.4, 0, 0.2, 1)` (ease-in-out)

### Effets

#### Hover
```css
hover:bg-neutral-50      /* Léger changement de fond */
hover:border-neutral-400 /* Bordure plus visible */
hover:text-neutral-900   /* Texte plus sombre */
```

#### Active (Click)
```css
active:scale-[0.98]      /* Légère réduction pour feedback tactile */
```

#### Focus
```css
focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2
```

#### Loading Spinner
```jsx
<div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-300 border-t-neutral-900" />
```

---

## 📱 Responsive Design

### Breakpoints Tailwind
- **Mobile** : < 640px (défaut)
- **Tablet** : ≥ 640px (`sm:`)
- **Desktop** : ≥ 1024px (`lg:`)

### Layout Principal

#### Mobile (< 640px)
```jsx
<div className="grid grid-cols-1 gap-6">
  {/* Une colonne, tout empilé verticalement */}
</div>
```

#### Desktop (≥ 1024px)
```jsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Deux colonnes équilibrées */}
</div>
```

### Stratégie Responsive

#### 1. Container
- Max-width : `max-w-6xl` (1152px)
- Centré : `mx-auto`
- Padding : `px-4 sm:px-6 lg:px-8`

#### 2. Cartes
- Mobile : Pleine largeur avec padding réduit
- Desktop : Colonnes avec plus d'espacement

#### 3. Boutons
```jsx
/* Mobile : Empilés verticalement */
<div className="flex flex-col gap-3">
  
/* Desktop : Côte à côte */
<div className="flex flex-col sm:flex-row gap-3">
```

#### 4. Inputs
```jsx
/* Mobile : Empilés */
<div className="grid grid-cols-1 gap-4">

/* Desktop : Côte à côte */
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

#### 5. Modal PDF
- Mobile : Padding réduit `p-4`
- Desktop : Plus de padding `p-6`
- Height : `max-h-[95vh]` pour éviter le débordement

---

## ♿ Accessibilité

### Conformité WCAG AA

#### Contraste
- Texte normal : 4.5:1 minimum
  - `text-neutral-900` sur `bg-white` ✅
  - `text-neutral-600` sur `bg-white` ✅
- Texte large : 3:1 minimum
  - `text-neutral-500` sur `bg-white` ✅

#### Focus Visible
```css
*:focus-visible {
  outline: none;
  ring: 2px solid neutral-900;
  ring-offset: 2px;
}
```

#### Cibles Tactiles
- Taille minimum : 44×44px
- Tous les boutons respectent cette règle avec le padding

#### Labels
- Tous les inputs ont des `<label>` associés via `htmlFor`
- Les boutons d'icônes ont des `aria-label`

#### Navigation au Clavier
- Ordre logique des tabulations
- États de focus clairement visibles
- Pas de `tabindex` positifs

---

## 🎯 Recommandations UX

### 1. Hiérarchie Visuelle
✅ **Implémenté** :
- Titres clairs avec icônes contextuelles
- Sections bien séparées
- Actions primaires mises en avant

### 2. Feedback Utilisateur
✅ **Implémenté** :
- Messages de succès/erreur clairs
- Spinners de chargement
- États disabled explicites
- Validation en temps réel (dates)

### 3. Prévention d'Erreurs
✅ **Implémenté** :
- Validation de format de fichier (.ics)
- Date de fin min = date de début
- Désactivation des boutons si données invalides
- Messages d'aide contextuels

### 4. Clarté des Actions
✅ **Implémenté** :
- Libellés de boutons explicites ("Télécharger", pas "OK")
- Icônes + texte pour les actions importantes
- Distinction claire primaire/secondaire

### 5. Progression
✅ **Implémenté** :
- 3 étapes claires : Import → Configure → Export
- Compteur d'événements chargés
- Affichage conditionnel des sections

### 6. Mobile-First
✅ **Implémenté** :
- Layout qui s'adapte du mobile au desktop
- Pas de scroll horizontal
- Cibles tactiles suffisamment grandes

---

## 🔧 Utilisation Pratique

### Créer un Nouveau Bouton
```jsx
// Primaire
<button className="btn-primary">Action Principale</button>

// Secondaire
<button className="btn-secondary">Action Secondaire</button>

// Ghost
<button className="btn-ghost">Action Tertiaire</button>

// Avec icône
<button className="btn-primary flex items-center gap-2">
  <svg className="w-4 h-4">...</svg>
  <span>Télécharger</span>
</button>
```

### Créer une Nouvelle Carte
```jsx
<div className="card">
  {/* En-tête */}
  <div className="flex items-center gap-2 mb-6">
    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100">
      <svg className="w-4 h-4 text-neutral-700">...</svg>
    </div>
    <h2 className="text-base font-semibold text-neutral-900">Titre</h2>
  </div>
  
  {/* Contenu */}
  <div className="space-y-4">
    {/* ... */}
  </div>
</div>
```

### Créer un Input
```jsx
<div>
  <label htmlFor="input-id" className="label">
    Label du champ
  </label>
  <input
    id="input-id"
    type="text"
    className="input"
    placeholder="Texte d'exemple"
  />
  <p className="helper-text">Texte d'aide (optionnel)</p>
</div>
```

---

## 📊 Avantages du Design

### Performance
- ✅ Classes utilitaires Tailwind (CSS minimal)
- ✅ Pas de bibliothèque de composants lourde
- ✅ Transitions GPU-accelerated
- ✅ Police Google Fonts avec preconnect

### Maintenabilité
- ✅ Système de couleurs cohérent
- ✅ Classes réutilisables (`.btn-primary`, `.input`, `.card`)
- ✅ Nomenclature claire et prévisible
- ✅ Documentation complète

### Expérience Utilisateur
- ✅ Design familier et moderne
- ✅ Feedback immédiat sur toutes les actions
- ✅ Accessibilité intégrée
- ✅ Responsive sans compromis

### Évolutivité
- ✅ Facile d'ajouter de nouveaux composants
- ✅ Palette extensible
- ✅ Patterns établis à suivre
- ✅ Design system documenté

---

## 🚀 Prochaines Étapes (Optionnel)

Si vous souhaitez aller plus loin :

1. **Toast Notifications** : Remplacer `alert()` par des toasts élégants
2. **Animations** : Ajouter des transitions d'entrée/sortie pour les cartes
3. **Dark Mode** : Implémenter un thème sombre avec les mêmes principes
4. **Loading States** : Skeleton loaders pendant le chargement du calendrier
5. **Drag & Drop visuel** : Améliorer le feedback visuel du drag & drop

---

**Design System créé le 23 octobre 2025**  
Inspiré par Peec AI et les meilleures pratiques de design moderne

