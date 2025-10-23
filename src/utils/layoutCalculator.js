/**
 * Calculateur de layout responsive pour le PDF
 * Adapte toutes les dimensions selon le nombre d'heures et de jours
 */

// Dimensions A4 paysage en points
const A4_LANDSCAPE = {
  width: 842,
  height: 595,
}

// Marges et espacements - Style Notion épuré
const SPACING = {
  pagePadding: 16,
  weekHeaderHeight: 20,
  weekHeaderMargin: 12,
  weekHeaderPaddingBottom: 10, // correspond à styles.weekHeader.paddingBottom
  dayHeaderHeight: 28,
}

/**
 * Calcule toutes les dimensions du layout
 * @param {number} numberOfHours - Nombre d'heures à afficher
 * @param {number} numberOfDays - Nombre de jours à afficher
 * @returns {Object} - Toutes les dimensions calculées
 */
export function calculateLayout(numberOfHours, numberOfDays) {
  // Largeur des bordures entre cellules (1pt) –
  // IMPORTANT : React-PDF inclut la bordure dans la hauteur déclarée de l'élément
  // (modèle "border-box"). Par conséquent, ces bordures NE doivent PAS être
  // soustraites du calcul de la hauteur des cellules. Sinon on provoque un
  // manque cumulatif qui crée l'espace vide observé en bas de la grille.

  const BORDER_WIDTH = 1

  // Calculer l'espace total disponible pour la grille
  const availableHeight =
    A4_LANDSCAPE.height -
    (SPACING.pagePadding * 2) -
    SPACING.weekHeaderHeight -
    SPACING.weekHeaderMargin -
    SPACING.weekHeaderPaddingBottom -
    SPACING.dayHeaderHeight

  // Petite marge de sécurité pour absorber les arrondis du moteur PDF
  const SAFETY_MARGIN = 1
  const effectiveAvailableHeight = availableHeight - SAFETY_MARGIN

  // React-PDF applique le modèle border-box : la bordure fait partie de la
  // hauteur déclarée. Nous pouvons donc simplement répartir la hauteur
  // disponible entre toutes les cellules ; la bordure ne nécessite aucun
  // ajustement supplémentaire.

  const cellHeight = effectiveAvailableHeight / numberOfHours

  // Hauteur de la grille = exactement l'espace disponible (pas plus!)
  const gridBodyHeight = effectiveAvailableHeight

  // Largeurs des colonnes - Style Notion épuré avec colonne temps plus petite
  const timeColumnWidth = '6%'
  // Utiliser plus de décimales pour éviter les espaces blancs
  const dayColumnWidth = `${(94 / numberOfDays).toFixed(4)}%`

  // Tailles de police adaptatives selon la hauteur des cellules
  const fontSizes = calculateFontSizes(cellHeight)

  return {
    // Dimensions principales
    cellHeight,
    gridBodyHeight,
    timeColumnWidth,
    dayColumnWidth,
    
    // Hauteurs fixes
    weekHeaderHeight: SPACING.weekHeaderHeight,
    dayHeaderHeight: SPACING.dayHeaderHeight,
    
    // Polices
    ...fontSizes,
    
    // Métadonnées
    numberOfHours,
    numberOfDays,
    pixelsPerHour: cellHeight, // Pixels par heure pour le positionnement des événements
  }
}

/**
 * Calcule les tailles de police selon la hauteur des cellules
 * @param {number} cellHeight - Hauteur d'une cellule horaire
 * @returns {Object} - Tailles de police
 */
function calculateFontSizes(cellHeight) {
  // Tailles de police adaptées à la hauteur de cellule - Style Notion épuré
  // Pour cellHeight = 40 (référence), on a les tailles actuelles
  const ratio = cellHeight / 40
  
  return {
    weekTitleSize: Math.max(12, Math.min(14, Math.round(14 * ratio))),
    dayHeaderTextSize: Math.max(8, Math.min(10, Math.round(10 * ratio))),
    timeTextSize: Math.max(7, Math.min(8, Math.round(7.5 * ratio))),
    eventTitleSize: Math.max(6.5, Math.min(8, Math.round(7.5 * ratio))),
    eventTimeSize: Math.max(6, Math.min(7, Math.round(6.5 * ratio))),
  }
}

/**
 * Calcule si un événement peut afficher le titre complet ou doit le tronquer
 * @param {number} eventHeightPx - Hauteur de l'événement en pixels
 * @param {number} cellHeight - Hauteur d'une cellule
 * @param {number} baseTitleSize - Taille de base du titre
 * @param {number} baseTimeSize - Taille de base de l'horaire
 * @returns {Object} - Configuration d'affichage du texte
 */
export function calculateEventTextDisplay(eventHeightPx, cellHeight, baseTitleSize = 10, baseTimeSize = 9) {
  // Hauteur minimale pour afficher les horaires (besoin d'au moins 2 lignes)
  const minHeightForTime = Math.max(25, cellHeight * 0.8)
  
  // Hauteur pour afficher titre sur 2 lignes
  const minHeightForTwoLines = Math.max(35, cellHeight * 1.2)
  
  // Toujours afficher le titre, mais adapter la taille de police
  // Pour événements très courts (< 20px), réduire la police
  let titleSize = baseTitleSize
  let maxTitleLength = 30
  
  if (eventHeightPx < 15) {
    // Très très petit événement
    titleSize = 6
    maxTitleLength = 15
  } else if (eventHeightPx < 20) {
    // Petit événement
    titleSize = 7
    maxTitleLength = 20
  } else if (eventHeightPx < 30) {
    // Événement moyen
    titleSize = 8
    maxTitleLength = 25
  } else if (eventHeightPx >= minHeightForTwoLines) {
    // Grand événement - titre sur 2 lignes
    maxTitleLength = 50
  }

  return {
    showTitle: true, // Toujours afficher le titre
    showTime: eventHeightPx >= minHeightForTime,
    titleSize,
    timeSize: baseTimeSize,
    maxTitleLines: eventHeightPx >= minHeightForTwoLines ? 2 : 1,
    maxTitleLength,
  }
}

/**
 * Calcule la position et la hauteur d'un événement
 * @param {Date} startTime - Heure de début
 * @param {Date} endTime - Heure de fin
 * @param {number} startHour - Heure de début de la grille
 * @param {number} pixelsPerHour - Pixels par heure
 * @returns {Object} - Position et hauteur en pixels
 */
export function calculateEventDimensions(startTime, endTime, startHour, pixelsPerHour) {
  const startHours = startTime.getHours()
  const startMinutes = startTime.getMinutes()
  const endHours = endTime.getHours()
  const endMinutes = endTime.getMinutes()

  const startTotalMinutes = (startHours - startHour) * 60 + startMinutes
  const endTotalMinutes = (endHours - startHour) * 60 + endMinutes

  const topPosition = (startTotalMinutes / 60) * pixelsPerHour
  const height = ((endTotalMinutes - startTotalMinutes) / 60) * pixelsPerHour

  return {
    top: Math.max(0, topPosition),
    height: height, // Pas de minimum ici, sera appliqué après contrainte de grille
  }
}

