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
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Erreur lors de la génération du PDF
            </h3>
            <p className="text-gray-700 mb-4">
              {this.state.error?.message || 'Une erreur est survenue'}
            </p>
            <button
              onClick={this.props.onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
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
export function PDFPreview({ events, startDate, endDate, onClose }) {
  console.log('PDFPreview: Affichage avec', events.length, 'événements')

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full h-full max-w-7xl max-h-[90vh] flex flex-col">
        {/* En-tête */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-800">Aperçu du PDF</h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-colors"
          >
            ✕ Fermer
          </button>
        </div>

        {/* Viewer */}
        <div className="flex-1 overflow-hidden">
          <PDFErrorBoundary onClose={onClose}>
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-primary mb-4"></div>
                    <p className="text-gray-600">Chargement de l&apos;aperçu...</p>
                  </div>
                </div>
              }
            >
              <PDFViewer width="100%" height="100%" showToolbar={true}>
                <CalendarDocument events={events} startDate={startDate} endDate={endDate} />
              </PDFViewer>
            </Suspense>
          </PDFErrorBoundary>
        </div>
      </div>
    </div>
  )
}

