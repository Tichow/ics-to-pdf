# Bibliothèque de Composants - ICS to PDF

Exemples de composants réutilisables avec le design system

---

## 🧩 Composants de Base

### Badge / Tag

```jsx
// Badge neutre
<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
  Badge
</span>

// Badge avec compteur
<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-neutral-900 text-white text-xs font-semibold">
  123
</span>

// Badge avec icône
<span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-100 text-neutral-700 text-xs font-medium">
  <svg className="w-3 h-3">...</svg>
  <span>Nouveau</span>
</span>
```

---

## 📊 Composants de Statistiques

### Stat Card

```jsx
<div className="card">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-neutral-600 mb-1">Total événements</p>
      <p className="text-2xl font-semibold text-neutral-900">188</p>
    </div>
    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center">
      <svg className="w-6 h-6 text-neutral-700">...</svg>
    </div>
  </div>
  <div className="mt-4 flex items-center gap-2 text-sm">
    <span className="text-green-600 font-medium">+12%</span>
    <span className="text-neutral-500">vs. dernier mois</span>
  </div>
</div>
```

### Progress Bar

```jsx
<div>
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium text-neutral-700">Progression</span>
    <span className="text-sm text-neutral-600">75%</span>
  </div>
  <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden">
    <div className="h-full bg-neutral-900 rounded-full transition-all duration-300" style={{ width: '75%' }} />
  </div>
</div>
```

---

## 🔔 Notifications (Toast)

### Toast Success

```jsx
<div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top">
  <div className="bg-white border border-neutral-200 rounded-xl shadow-lg p-4 flex items-start gap-3 min-w-[320px]">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center">
      <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-semibold text-neutral-900 mb-0.5">Succès</p>
      <p className="text-sm text-neutral-600">Votre fichier a été téléchargé</p>
    </div>
    <button className="flex-shrink-0 text-neutral-400 hover:text-neutral-600">
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>
</div>
```

### Toast Error

```jsx
<div className="bg-neutral-900 text-white border border-neutral-800 rounded-xl shadow-lg p-4 flex items-start gap-3 min-w-[320px]">
  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-white text-neutral-900 flex items-center justify-center text-xs font-bold">
    !
  </div>
  <div className="flex-1 min-w-0">
    <p className="text-sm font-semibold mb-0.5">Erreur</p>
    <p className="text-sm text-neutral-300">Une erreur est survenue</p>
  </div>
  <button className="flex-shrink-0 text-neutral-400 hover:text-neutral-200">
    <svg className="w-4 h-4">...</svg>
  </button>
</div>
```

---

## 📋 Listes

### Liste Simple

```jsx
<div className="card">
  <div className="divide-y divide-neutral-200">
    {items.map((item) => (
      <div key={item.id} className="py-3 first:pt-0 last:pb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-neutral-700">...</svg>
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-900">{item.title}</p>
              <p className="text-xs text-neutral-500">{item.subtitle}</p>
            </div>
          </div>
          <button className="btn-ghost text-sm">
            Action
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
```

### Liste avec Actions

```jsx
<div className="card">
  <ul className="space-y-2">
    {items.map((item) => (
      <li key={item.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-neutral-50 transition-colors">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <input
            type="checkbox"
            className="w-4 h-4 text-neutral-900 border-neutral-300 rounded"
          />
          <span className="text-sm text-neutral-900 truncate">{item.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-neutral-100 rounded">
            <svg className="w-4 h-4 text-neutral-600">...</svg>
          </button>
          <button className="p-1.5 hover:bg-neutral-100 rounded">
            <svg className="w-4 h-4 text-neutral-600">...</svg>
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
```

---

## 🔍 Recherche

### Search Input

```jsx
<div className="relative">
  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
    <svg className="w-4 h-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  </div>
  <input
    type="search"
    className="input pl-10 pr-4"
    placeholder="Rechercher..."
  />
</div>
```

### Search avec filtres

```jsx
<div className="card">
  <div className="flex flex-col sm:flex-row gap-3">
    {/* Search */}
    <div className="relative flex-1">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-neutral-400">...</svg>
      </div>
      <input
        type="search"
        className="input pl-10"
        placeholder="Rechercher..."
      />
    </div>
    
    {/* Filtres */}
    <select className="input sm:w-48">
      <option>Tous les types</option>
      <option>Réunions</option>
      <option>Tâches</option>
    </select>
    
    <button className="btn-secondary">
      <svg className="w-4 h-4">...</svg>
    </button>
  </div>
</div>
```

---

## 📅 Date Picker Avancé

### Date Range avec Preset

```jsx
<div className="card">
  <div className="flex items-center justify-between mb-4">
    <label className="label mb-0">Période</label>
    <div className="inline-flex gap-2">
      <button className="text-xs px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
        7 jours
      </button>
      <button className="text-xs px-2.5 py-1 rounded bg-neutral-100 text-neutral-700 hover:bg-neutral-200">
        30 jours
      </button>
      <button className="text-xs px-2.5 py-1 rounded bg-neutral-900 text-white">
        Personnalisé
      </button>
    </div>
  </div>
  
  <div className="grid grid-cols-2 gap-4">
    <div>
      <label className="label text-xs">De</label>
      <input type="date" className="input" />
    </div>
    <div>
      <label className="label text-xs">À</label>
      <input type="date" className="input" />
    </div>
  </div>
</div>
```

---

## 🖼️ Empty States

### Empty State avec Action

```jsx
<div className="flex flex-col items-center justify-center py-12 px-4 text-center">
  <div className="w-16 h-16 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
    <svg className="w-8 h-8 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  </div>
  <h3 className="text-base font-semibold text-neutral-900 mb-2">
    Aucun fichier importé
  </h3>
  <p className="text-sm text-neutral-600 mb-6 max-w-sm">
    Commencez par importer un calendrier .ics pour générer votre PDF
  </p>
  <button className="btn-primary">
    Importer un calendrier
  </button>
</div>
```

---

## ⚙️ Settings / Options

### Toggle Switch

```jsx
<div className="flex items-center justify-between">
  <div>
    <p className="text-sm font-medium text-neutral-900">Notifications</p>
    <p className="text-xs text-neutral-500 mt-0.5">Recevoir des notifications par email</p>
  </div>
  <button
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
      enabled ? 'bg-neutral-900' : 'bg-neutral-200'
    }`}
    onClick={() => setEnabled(!enabled)}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
        enabled ? 'translate-x-6' : 'translate-x-1'
      }`}
    />
  </button>
</div>
```

### Option Group

```jsx
<div className="card">
  <h3 className="text-sm font-medium text-neutral-700 mb-4">Préférences d'export</h3>
  <div className="space-y-4">
    {/* Toggle */}
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
        Inclure les week-ends
      </span>
      <input type="checkbox" className="w-4 h-4 text-neutral-900 border-neutral-300 rounded" />
    </label>
    
    {/* Toggle */}
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
        Afficher les descriptions
      </span>
      <input type="checkbox" className="w-4 h-4 text-neutral-900 border-neutral-300 rounded" />
    </label>
    
    {/* Toggle */}
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
        Mode compact
      </span>
      <input type="checkbox" className="w-4 h-4 text-neutral-900 border-neutral-300 rounded" />
    </label>
  </div>
</div>
```

---

## 🎯 Dropdowns & Menus

### Dropdown Menu

```jsx
<div className="relative">
  <button className="btn-secondary flex items-center gap-2">
    <span>Options</span>
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {/* Menu (show when open) */}
  <div className="absolute right-0 mt-2 w-56 bg-white border border-neutral-200 rounded-xl shadow-lg py-1 z-10">
    <button className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-3">
      <svg className="w-4 h-4">...</svg>
      <span>Modifier</span>
    </button>
    <button className="w-full px-4 py-2.5 text-left text-sm text-neutral-700 hover:bg-neutral-50 transition-colors flex items-center gap-3">
      <svg className="w-4 h-4">...</svg>
      <span>Dupliquer</span>
    </button>
    <div className="my-1 border-t border-neutral-200"></div>
    <button className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3">
      <svg className="w-4 h-4">...</svg>
      <span>Supprimer</span>
    </button>
  </div>
</div>
```

---

## 📄 Composants de Contenu

### Accordion / Collapsible

```jsx
<div className="card">
  <button
    onClick={() => setOpen(!open)}
    className="flex items-center justify-between w-full text-left"
  >
    <h3 className="text-base font-semibold text-neutral-900">Options avancées</h3>
    <svg
      className={`w-5 h-5 text-neutral-600 transition-transform ${open ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
  
  {open && (
    <div className="mt-4 space-y-4 pt-4 border-t border-neutral-200">
      {/* Contenu */}
    </div>
  )}
</div>
```

### Tabs

```jsx
<div className="card">
  {/* Tab Headers */}
  <div className="flex gap-1 border-b border-neutral-200 mb-6">
    <button className="px-4 py-2.5 text-sm font-medium text-neutral-900 border-b-2 border-neutral-900">
      Aperçu
    </button>
    <button className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent">
      Paramètres
    </button>
    <button className="px-4 py-2.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 border-b-2 border-transparent">
      Historique
    </button>
  </div>
  
  {/* Tab Content */}
  <div>
    {/* Contenu de l'onglet actif */}
  </div>
</div>
```

---

## 🎪 Modals / Dialogs

### Confirmation Dialog

```jsx
<div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
  <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
    {/* Icon */}
    <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
      <svg className="w-6 h-6 text-neutral-700">...</svg>
    </div>
    
    {/* Content */}
    <h2 className="text-lg font-semibold text-neutral-900 mb-2">
      Confirmer la suppression
    </h2>
    <p className="text-sm text-neutral-600 leading-relaxed mb-6">
      Êtes-vous sûr de vouloir supprimer ce fichier ? Cette action est irréversible.
    </p>
    
    {/* Actions */}
    <div className="flex gap-3">
      <button className="btn-secondary flex-1">
        Annuler
      </button>
      <button className="btn-primary flex-1 bg-red-600 hover:bg-red-700">
        Supprimer
      </button>
    </div>
  </div>
</div>
```

### Full Screen Modal

```jsx
<div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
  <div className="bg-white rounded-xl shadow-xl w-full h-full max-w-5xl max-h-[90vh] flex flex-col">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-neutral-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-neutral-700">...</svg>
        </div>
        <h2 className="text-base font-semibold text-neutral-900">Titre</h2>
      </div>
      <button className="btn-ghost text-sm">Fermer</button>
    </div>
    
    {/* Body */}
    <div className="flex-1 overflow-auto p-6">
      {/* Contenu scrollable */}
    </div>
    
    {/* Footer (optionnel) */}
    <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-neutral-200 bg-neutral-50">
      <button className="btn-secondary">Annuler</button>
      <button className="btn-primary">Valider</button>
    </div>
  </div>
</div>
```

---

## 💡 Tips d'Utilisation

### Composition de Composants

Ces composants peuvent être combinés pour créer des interfaces complexes :

```jsx
// Exemple : Carte avec recherche et liste
<div className="card">
  {/* Search */}
  <div className="relative mb-6">
    <input type="search" className="input pl-10" placeholder="Rechercher..." />
  </div>
  
  {/* Liste */}
  <div className="divide-y divide-neutral-200">
    {items.map(item => (
      <div key={item.id} className="py-3">
        {/* Item */}
      </div>
    ))}
  </div>
  
  {/* Actions */}
  <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
    <button className="btn-secondary">Annuler</button>
    <button className="btn-primary">Valider</button>
  </div>
</div>
```

### Animation d'Entrée

Pour animer l'apparition des éléments :

```jsx
// Avec Tailwind (si @tailwindcss/forms est installé)
className="animate-in fade-in slide-in-from-bottom-4 duration-200"

// Ou avec CSS custom
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 200ms ease-out;
}
```

---

## 🎨 Variantes de Couleur

Si vous avez besoin d'autres couleurs (ex: succès, danger) :

```jsx
// Bouton Danger
<button className="px-4 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 active:scale-[0.98] disabled:bg-red-300">
  Supprimer
</button>

// Badge Succès
<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-green-100 text-green-700 text-xs font-medium">
  Actif
</span>

// Badge Avertissement
<span className="inline-flex items-center px-2.5 py-1 rounded-md bg-yellow-100 text-yellow-700 text-xs font-medium">
  En attente
</span>
```

---

**Bibliothèque mise à jour le 23 octobre 2025**  
Tous les composants respectent le design system et sont accessibles

