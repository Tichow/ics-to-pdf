# Guide de Style Rapide - ICS to PDF

Guide de référence rapide pour maintenir la cohérence du design

---

## 🎨 Couleurs

```jsx
// Fonds
bg-neutral-50      // Fond de page
bg-white           // Cartes, conteneurs
bg-neutral-100     // Éléments secondaires (icônes, sélecteurs)
bg-neutral-50      // Zones d'information

// Texte
text-neutral-900   // Titres, texte principal
text-neutral-700   // Labels
text-neutral-600   // Texte secondaire
text-neutral-500   // Texte d'aide, désactivé

// Bordures
border-neutral-200 // Bordures par défaut
border-neutral-300 // Bordures actives/hover
```

---

## 📝 Typographie

```jsx
// Titres
<h1 className="text-2xl font-semibold text-neutral-900 tracking-tight">
<h2 className="text-xl font-semibold text-neutral-900">
<h3 className="text-base font-semibold text-neutral-900">

// Corps de texte
<p className="text-sm text-neutral-600 leading-relaxed">

// Petit texte
<span className="text-xs text-neutral-500">
```

---

## 🔘 Boutons

```jsx
// Primaire (action principale)
<button className="btn-primary">
  Télécharger
</button>

// Secondaire (action secondaire)
<button className="btn-secondary">
  Aperçu
</button>

// Ghost (action tertiaire)
<button className="btn-ghost">
  Annuler
</button>

// Avec icône
<button className="btn-primary flex items-center justify-center gap-2">
  <svg className="w-4 h-4">...</svg>
  <span>Action</span>
</button>
```

---

## 📝 Formulaires

```jsx
// Input text
<div>
  <label htmlFor="id" className="label">Label</label>
  <input
    id="id"
    type="text"
    className="input"
    placeholder="Placeholder..."
  />
</div>

// Input avec suffix
<div className="flex items-center gap-2">
  <input className="input flex-1" />
  <span className="text-neutral-500 text-sm font-medium">.pdf</span>
</div>

// Select
<select className="input">
  <option>Option 1</option>
</select>

// Checkbox
<label className="flex items-center gap-3 cursor-pointer group">
  <input
    type="checkbox"
    className="w-4 h-4 text-neutral-900 border-neutral-300 rounded focus:ring-2 focus:ring-neutral-900"
  />
  <span className="text-sm text-neutral-700 group-hover:text-neutral-900">
    Label
  </span>
</label>
```

---

## 📦 Cartes

```jsx
// Carte standard
<div className="card">
  {/* En-tête avec icône */}
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

---

## 💬 Messages

```jsx
// Succès
<div className="card border-neutral-200 bg-white">
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-900 flex items-center justify-center mt-0.5">
      <svg className="w-3 h-3 text-white">
        {/* Check icon */}
      </svg>
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">Titre</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">Message</p>
    </div>
  </div>
</div>

// Erreur
<div className="card border-neutral-300 bg-neutral-50">
  <div className="flex items-start gap-3">
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center text-xs font-medium mt-0.5">
      !
    </div>
    <div className="flex-1 min-w-0">
      <h3 className="text-sm font-semibold text-neutral-900 mb-1">Erreur</h3>
      <p className="text-sm text-neutral-600 leading-relaxed">Message</p>
    </div>
  </div>
</div>

// Info / Statistiques
<div className="bg-neutral-50 rounded-lg px-4 py-3 border border-neutral-200">
  <p className="text-sm text-neutral-600">
    <span className="font-semibold text-neutral-900">123</span> événements chargés
  </p>
</div>
```

---

## 🔄 Sélecteurs (Tabs)

```jsx
<div className="inline-flex items-center bg-neutral-100 rounded-lg p-1">
  <button className="px-4 py-2 rounded-md text-sm font-medium bg-white text-neutral-900 shadow-sm">
    Actif
  </button>
  <button className="px-4 py-2 rounded-md text-sm font-medium text-neutral-600 hover:text-neutral-900">
    Inactif
  </button>
</div>
```

---

## 📤 Drag & Drop

```jsx
<div className="border-2 border-dashed border-neutral-300 hover:border-neutral-400 hover:bg-neutral-50 rounded-xl p-10 text-center cursor-pointer transition-all">
  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-100 mb-4">
    <svg className="w-6 h-6 text-neutral-700">...</svg>
  </div>
  <p className="text-neutral-900 font-medium mb-1">Titre</p>
  <p className="text-neutral-500 text-sm">Description</p>
</div>
```

---

## ⏳ Loading

```jsx
// Spinner
<div className="flex items-center gap-3">
  <div className="animate-spin rounded-full h-5 w-5 border-2 border-neutral-300 border-t-neutral-900" />
  <p className="text-neutral-600 text-sm">Chargement...</p>
</div>
```

---

## 📱 Responsive

```jsx
// Container
<div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

// Grid 1 col mobile, 2 cols desktop
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Flex vertical mobile, horizontal desktop
<div className="flex flex-col sm:flex-row gap-3">

// Input grid 1 col mobile, 2 cols desktop
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
```

---

## 🎯 Espacements Communs

```jsx
// Entre icône et texte
gap-2

// Entre éléments liés
gap-3

// Entre champs de formulaire
gap-4

// Entre sections dans une carte
space-y-4  ou  space-y-5  ou  space-y-6

// Entre cartes
space-y-6

// Entre colonnes
gap-8

// Padding cartes
p-6

// Margin sections
mt-16

// Margin footer
mt-20
```

---

## 🎨 Icônes (Heroicons inline SVG)

```jsx
// Taille standard dans boutons/cards
<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>

// Taille dans les conteneurs d'icônes
<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
  <path strokeLinecap="round" strokeLinejoin="round" d="..." />
</svg>
```

---

## ✨ Animations

```jsx
// Transition standard
className="transition-all duration-200"

// Hover scale down (boutons)
className="hover:bg-neutral-50 active:scale-[0.98]"

// Focus ring
className="focus:outline-none focus:ring-2 focus:ring-neutral-900 focus:ring-offset-2"
```

---

## 🎪 Modal / Overlay

```jsx
<div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
  <div className="bg-white rounded-xl shadow-xl w-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
    {/* Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200">
      <h2>Titre</h2>
      <button className="btn-ghost text-sm">Fermer</button>
    </div>
    
    {/* Content */}
    <div className="flex-1 overflow-auto">
      {/* ... */}
    </div>
  </div>
</div>
```

---

## 📋 Checklist Design

Avant de pusher du code, vérifier :

- [ ] Utilise les couleurs de la palette neutre
- [ ] Typographie cohérente (Inter, tailles définies)
- [ ] Espacements réguliers (multiples de 4px)
- [ ] Border radius cohérent (lg = 12px, xl = 16px)
- [ ] États hover/focus/active/disabled définis
- [ ] Responsive (mobile → desktop)
- [ ] Accessibilité (labels, aria, focus visible)
- [ ] Transitions douces (200ms)
- [ ] Contraste suffisant (WCAG AA)

---

## 🚫 À Éviter

❌ Emojis dans le code (sauf si demandé explicitement)  
❌ Couleurs custom en dehors de la palette  
❌ Ombres trop prononcées  
❌ Animations trop longues (> 300ms)  
❌ Texte trop petit (< 12px)  
❌ Boutons sans états hover/focus  
❌ Inputs sans labels  
❌ Layout cassé sur mobile  
❌ Border-radius inconsistants  
❌ Couleurs de texte hors palette  

---

## ✅ Bonnes Pratiques

✅ Utiliser les classes de composants (`.btn-primary`, `.input`, `.card`)  
✅ Grouper les propriétés logiquement  
✅ Préférer `flex` et `grid` pour les layouts  
✅ Toujours tester sur mobile  
✅ Ajouter des `aria-label` aux boutons d'icônes  
✅ Utiliser `gap` plutôt que des margins  
✅ Rester cohérent avec les espacements  
✅ Documenter les composants complexes  
✅ Penser accessibilité dès le début  

---

**Guide créé le 23 octobre 2025**  
Pour toute question, consulter `DESIGN-SYSTEM.md` pour plus de détails

