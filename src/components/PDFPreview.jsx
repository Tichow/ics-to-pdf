import { lazy, Suspense, Component } from 'react'
import { CalendarDocument } from '../pdf/CalendarDocument'

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
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-neutral-100 mb-4">
              <svg className="w-8 h-8 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">
              Erreur lors de la génération du PDF
            </h3>
            <p className="text-neutral-600 text-sm mb-6 leading-relaxed">
              {this.state.error?.message || 'Une erreur est survenue'}
            </p>
            <button
              onClick={this.props.onClose}
              className="btn-primary"
            >
              Fermer
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

/**
 * Composant pour afficher l'aperçu du PDF
 */
export function PDFPreview({ events, startDate, endDate, onClose, includeWeekends, timeRange }) {
  console.log('PDFPreview: Affichage avec', events.length, 'événements')

  return (
    <div className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white rounded-xl shadow-xl w-full h-full max-w-7xl max-h-[95vh] flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-neutral-100">
              <svg className="w-4 h-4 text-neutral-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-base font-semibold text-neutral-900">Aperçu du PDF</h2>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost text-sm"
            aria-label="Fermer l'aperçu"
          >
            Fermer
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-hidden bg-neutral-100">
          <PDFErrorBoundary onClose={onClose}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-neutral-300 border-t-neutral-900 mb-4"></div>
                    <p className="text-neutral-600 text-sm">Chargement de l&apos;aperçu...</p>
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
                />
              </PDFViewer>
            </Suspense>
          </PDFErrorBoundary>
        </div>
      </div>
    </div>
  )
}

