import { StyleSheet } from '@react-pdf/renderer'

export const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 20,
    fontFamily: 'Helvetica',
  },
  
  // En-tête
  weekHeader: {
    textAlign: 'center',
    marginBottom: 15,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#2563EB',
  },
  
  // Grille
  grid: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderStyle: 'solid',
  },
  
  // Colonne des heures
  timeColumn: {
    width: '8%',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    borderRightStyle: 'solid',
  },
  timeCell: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    paddingTop: 4,
    paddingLeft: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#666666',
  },
  
  // Colonnes des jours
  dayColumn: {
    width: '18.4%',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
    borderRightStyle: 'solid',
    position: 'relative',
  },
  dayHeader: {
    height: 30,
    backgroundColor: '#EFF6FF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
  },
  dayHeaderText: {
    fontSize: 12,
    fontWeight: 700,
    color: '#2563EB',
    textAlign: 'center',
  },
  dayBody: {
    position: 'relative',
    height: 480,
  },
  
  // Cellules horaires du jour
  hourCell: {
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    borderBottomStyle: 'solid',
  },
  
  // Événements
  eventBlock: {
    position: 'absolute',
    left: 2,
    right: 2,
    backgroundColor: '#EFF6FF',
    borderLeftWidth: 3,
    borderLeftColor: '#2563EB',
    borderLeftStyle: 'solid',
    borderRadius: 4,
    padding: 4,
    overflow: 'hidden',
  },
  eventTitle: {
    fontSize: 10,
    fontWeight: 700,
    color: '#000000',
    marginBottom: 2,
    lineHeight: 1.2,
  },
  eventTime: {
    fontSize: 10,
    color: '#666666',
  },
  
  // Message vide
  emptyMessage: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 12,
    color: '#666666',
  },
})

