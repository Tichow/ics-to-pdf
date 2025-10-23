import { StyleSheet } from '@react-pdf/renderer'

/**
 * Couleurs des thèmes pour le PDF - Style Notion
 */
const themeColors = {
  neutral: {
    primary: '#000000',
    light: '#F5F5F5', // Gris clair opaque pour masquer les lignes de grille
  },
  blue: {
    primary: '#2563EB',
    light: '#EFF6FF',
  },
  green: {
    primary: '#16A34A',
    light: '#F0FDF4',
  },
  orange: {
    primary: '#EA580C',
    light: '#FFF7ED',
  },
  purple: {
    primary: '#9333EA',
    light: '#FAF5FF',
  },
}

/**
 * Génère les styles dynamiques selon le thème - Style Notion monochrome épuré
 */
export const createStyles = (theme = 'neutral') => {
  const colors = themeColors[theme] || themeColors.neutral
  
  return StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 16,
      fontFamily: 'Helvetica',
    },
    
    // En-tête - Style Notion minimaliste
    weekHeader: {
      textAlign: 'center',
      marginBottom: 12,
      paddingBottom: 10,
    },
    weekTitle: {
      fontSize: 14,
      fontWeight: 600,
      color: '#000000',
      letterSpacing: -0.3,
    },
    weekSubtitle: {
      fontSize: 9,
      color: '#9CA3AF',
      marginTop: 2,
    },
    
    // Grille - Notion-like ultra sobre avec coins arrondis propres
    grid: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'rgba(0, 0, 0, 0.08)',
      borderStyle: 'solid',
      borderRadius: 8,
      overflow: 'hidden', // Empêche les lignes internes de dépasser
    },
    
    // Colonne des heures - alignement sur les lignes
    timeColumn: {
      width: '6%',
      borderRightWidth: 1,
      borderRightColor: 'rgba(0, 0, 0, 0.06)',
      borderRightStyle: 'solid',
      backgroundColor: '#FAFAFA', // Gris très clair opaque
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
    },
    timeCell: {
      height: 40, // Cellule complète d'une heure
      position: 'relative',
      display: 'flex',
      // Aligner le label sur le bord supérieur de la cellule pour qu'il coïncide avec la ligne de séparation
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 1, // léger décalage visuel pour éviter que le texte ne touche la ligne
    },
    // Ligne horizontale dans la colonne temps (couleur plus claire)
    timeCellWithBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(0, 0, 0, 0.05)',
      borderBottomStyle: 'solid',
    },
    timeLabel: {
      fontSize: 9,
      color: '#6B7280',
      fontWeight: 500,
      marginTop: -6, // remonte légèrement le texte pour l’aligner sur la ligne
    },
    
    // Colonnes des jours
    dayColumn: {
      width: '13.43%', // (94% / 7 jours)
      borderRightWidth: 0.5,
      borderRightColor: 'rgba(0, 0, 0, 0.06)',
      borderRightStyle: 'solid',
      position: 'relative',
    },
    dayColumnLast: {
      // Dernière colonne sans bordure droite pour respecter les coins arrondis
      borderRightWidth: 0,
    },
    dayHeader: {
      height: 28,
      backgroundColor: colors.light,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 4,
    },
    dayHeaderBorder: {
      // Bordure séparée pour ne pas interférer avec les coins arrondis
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.08)',
      borderBottomStyle: 'solid',
    },

    // Appliqué au dernier header de colonne pour restaurer le coin supérieur droit arrondi
    dayHeaderLast: {
      borderTopRightRadius: 8,
    },
    dayHeaderText: {
      fontSize: 8,
      fontWeight: 600,
      color: colors.primary,
      textAlign: 'center',
      letterSpacing: -0.15,
      textTransform: 'uppercase',
    },
    dayHeaderDate: {
      fontSize: 9,
      fontWeight: 700,
      color: '#000000',
      marginTop: 1,
    },
    dayBody: {
      position: 'relative',
      height: 480,
      backgroundColor: '#FFFFFF',
    },

    // Variante pour le dernier jour afin d’arrondir le coin bas-droit
    dayBodyLast: {
      borderBottomRightRadius: 8,
      overflow: 'hidden',
    },
    
    // Cellules horaires du jour - avec lignes qui ne traversent pas la colonne temps
    hourCell: {
      height: 40,
      position: 'relative',
    },
    hourCellWithBorder: {
      borderBottomWidth: 0.5,
      borderBottomColor: 'rgba(0, 0, 0, 0.05)',
      borderBottomStyle: 'solid',
    },

    // Pour la dernière cellule horaire de la dernière colonne → arrondi bas droit
    hourCellLastOfGrid: {
      borderBottomRightRadius: 8,
    },
    
    // Événements - Style Notion minimaliste avec accent et coins arrondis propres
    eventBlock: {
      position: 'absolute',
      left: 1.5,
      right: 1.5,
      backgroundColor: colors.light,
      borderLeftWidth: 2,
      borderLeftColor: colors.primary,
      borderLeftStyle: 'solid',
      borderRadius: 3,
      padding: 4,
      overflow: 'hidden', // Empêche le texte de dépasser
    },
    eventTitle: {
      fontSize: 7.5,
      fontWeight: 600,
      color: '#000000',
      marginBottom: 2,
      lineHeight: 1.25,
      letterSpacing: -0.08,
    },
    eventTime: {
      fontSize: 6.5,
      color: '#6B7280',
      fontWeight: 500,
      marginBottom: 1,
    },
    eventLocation: {
      fontSize: 6,
      color: '#9CA3AF',
      fontWeight: 400,
      lineHeight: 1.2,
    },
    
    // Message vide
    emptyMessage: {
      textAlign: 'center',
      marginTop: 50,
      fontSize: 10,
      color: '#9CA3AF',
      fontWeight: 400,
    },
  })
}

// Export des styles par défaut (neutral)
export const styles = createStyles('neutral')

