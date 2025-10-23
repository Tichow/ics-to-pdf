import { lazy, Suspense, Component } from 'react'
import { CalendarDocument } from '../pdf/CalendarDocument'
import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'

// Lazy load PDFViewer pour réduire le bundle initial
const PDFViewer = lazy(() =>
  import('@react-pdf/renderer').then(module => ({ default: module.PDFViewer }))
)

/**
 * Error Boundary pour capturer les erreurs du PDF
 */
class PDFErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Erreur PDF:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center h-full p-8">
          <div className="text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2">
              Erreur lors de la génération du PDF
            </h3>
            <p className="text-muted-foreground text-sm mb-6">
              {this.state.error?.message || 'Une erreur est survenue'}
            </p>
            <Button onClick={this.props.onClose}>
              Fermer
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Composant pour afficher l'aperçu du PDF - Style Notion
 */
export function PDFPreview({ events, startDate, endDate, onClose, includeWeekends, timeRange, theme = 'neutral', showEventTimes = true, showEventLocations = true, showTimezone = false, customTitle = '' }) {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background border border-border rounded-lg shadow-lg w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-sm font-semibold">Aperçu du PDF</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Fermer"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-hidden bg-muted">
          <PDFErrorBoundary onClose={onClose}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-2 border-border border-t-foreground mb-3"></div>
                    <p className="text-sm text-muted-foreground">Chargement...</p>
                  </div>
                </div>
              }
            >
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <CalendarDocument 
                  events={events} 
                  startDate={startDate} 
                  endDate={endDate}
                  includeWeekends={includeWeekends}
                  timeRange={timeRange}
                  theme={theme}
                  showEventTimes={showEventTimes}
                  showEventLocations={showEventLocations}
                  showTimezone={showTimezone}
                  customTitle={customTitle}
                />
              </PDFViewer>
            </Suspense>
          </PDFErrorBoundary>
        </div>
      </div>
    </div>
  )
}

