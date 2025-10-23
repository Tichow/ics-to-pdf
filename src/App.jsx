import { useState } from 'react'
import { pdf } from '@react-pdf/renderer'
import { useICSData } from './hooks/useICSData'
import { usePDFTheme } from './hooks/usePDFTheme'
import { FileUploader } from './components/FileUploader'
import { DateRangePicker } from './components/DateRangePicker'
import { PDFPreview } from './components/PDFPreview'
import { CalendarDocument } from './pdf/CalendarDocument'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { Eye, Download } from 'lucide-react'

/**
 * Composant principal - Style Notion monochrome
 */
function App() {
  const {
    events,
    loading,
    error,
    startDate,
    endDate,
    filename,
    setStartDate,
    setEndDate,
    setFilename,
    loadFromFile,
    loadFromURL,
    reset,
  } = useICSData()

  const { currentTheme, setCurrentTheme, allThemes } = usePDFTheme()
  const [showPreview, setShowPreview] = useState(false)
  const [includeWeekends, setIncludeWeekends] = useState(false)
  const [timeRange, setTimeRange] = useState({ start: 8, end: 20 })
  const [showEventTimes, setShowEventTimes] = useState(true)
  const [showEventLocations, setShowEventLocations] = useState(true)

  const canExport = events.length > 0 && startDate <= endDate

  const handleDownload = async () => {
    if (!canExport) return

    try {
      const blob = await pdf(
        <CalendarDocument 
          events={events} 
          startDate={startDate} 
          endDate={endDate}
          includeWeekends={includeWeekends}
          timeRange={timeRange}
          theme={currentTheme}
          showEventTimes={showEventTimes}
          showEventLocations={showEventLocations}
        />
      ).toBlob()

      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = filename.endsWith('.pdf') ? filename : `${filename}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Erreur génération PDF:', error)
      alert(`Erreur lors de la génération du PDF: ${error.message}`)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="pt-16 pb-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-semibold text-foreground mb-2">
            ICS to PDF
          </h1>
          <p className="text-muted-foreground">
            Exportez vos Calendriers ICS en PDF facilement.
          </p>
        </div>
      </div>

      {/* Contenu principal */}
      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* Message d'erreur */}
        {error && (
          <Alert variant="destructive" className="mb-6 animate-in">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Layout adaptatif : centré si pas d'événements, 2 colonnes sinon */}
        <div className={`grid gap-6 mb-6 ${
          events.length > 0 
            ? 'grid-cols-1 lg:grid-cols-2' 
            : 'grid-cols-1 place-items-center'
        }`}>
          {/* Colonne gauche : Import + Période */}
          <Card className={`p-6 ${events.length === 0 ? 'max-w-2xl w-full' : ''}`}>
            <h2 className="text-lg font-semibold mb-4">Importer un calendrier</h2>
            <FileUploader
              onFileLoad={loadFromFile}
              onURLLoad={loadFromURL}
              onReset={reset}
              loading={loading}
              hasEvents={events.length > 0}
              eventsCount={events.length}
            />
            
            {events.length > 0 && (
              <>
                <Separator className="my-6" />
                <div>
                  <h3 className="text-sm font-medium mb-3">Période à exporter</h3>
                  <DateRangePicker
                    startDate={startDate}
                    endDate={endDate}
                    onStartDateChange={setStartDate}
                    onEndDateChange={setEndDate}
                  />
                </div>
              </>
            )}
          </Card>

          {/* Colonne droite : Configuration (visible uniquement après import) */}
          {events.length > 0 && (
            <Card className="p-6 animate-in">
              <h2 className="text-lg font-semibold mb-4">Configuration de l'export</h2>
              
              <div className="space-y-4">
                {/* Nom du fichier */}
                <div>
                  <Label htmlFor="filename">Nom du fichier</Label>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Input
                      id="filename"
                      value={filename.replace('.pdf', '')}
                      onChange={e => setFilename(e.target.value)}
                      placeholder="mon-calendrier"
                      className="flex-1"
                    />
                    <span className="text-muted-foreground text-sm">.pdf</span>
                  </div>
                </div>

                <Separator />

                {/* Options d'affichage */}
                <div>
                  <h3 className="text-sm font-medium mb-3">Options d'affichage</h3>
                  
                  <div className="space-y-3">
                    {/* Week-end */}
                    <div className="flex items-center space-x-2">
                      <input
                        id="weekends"
                        type="checkbox"
                        checked={includeWeekends}
                        onChange={e => setIncludeWeekends(e.target.checked)}
                        className="w-4 h-4 rounded border-input"
                      />
                      <Label htmlFor="weekends" className="cursor-pointer">
                        Week-ends
                      </Label>
                    </div>

                    {/* Horaires des événements */}
                    <div className="flex items-center space-x-2">
                      <input
                        id="eventTimes"
                        type="checkbox"
                        checked={showEventTimes}
                        onChange={e => setShowEventTimes(e.target.checked)}
                        className="w-4 h-4 rounded border-input"
                      />
                      <Label htmlFor="eventTimes" className="cursor-pointer">
                        Horaires des événements
                      </Label>
                    </div>

                    {/* Lieux des événements */}
                    <div className="flex items-center space-x-2">
                      <input
                        id="eventLocations"
                        type="checkbox"
                        checked={showEventLocations}
                        onChange={e => setShowEventLocations(e.target.checked)}
                        className="w-4 h-4 rounded border-input"
                      />
                      <Label htmlFor="eventLocations" className="cursor-pointer">
                        Lieux des événements
                      </Label>
                    </div>

                    {/* Plage horaire */}
                    <div>
                      <Label className="text-xs text-muted-foreground mb-2">
                        Plage horaire ({timeRange.start}h - {timeRange.end}h)
                      </Label>
                      <div className="grid grid-cols-2 gap-2 mt-1.5">
                        <Select
                          value={timeRange.start.toString()}
                          onValueChange={v => setTimeRange({ ...timeRange, start: parseInt(v) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: timeRange.end }, (_, i) => i).map(h => (
                              <SelectItem key={h} value={h.toString()}>
                                {h.toString().padStart(2, '0')}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Select
                          value={timeRange.end.toString()}
                          onValueChange={v => setTimeRange({ ...timeRange, end: parseInt(v) })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Array.from({ length: 24 - timeRange.start }, (_, i) => timeRange.start + i + 1).map(h => (
                              <SelectItem key={h} value={h.toString()}>
                                {h.toString().padStart(2, '0')}:00
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Thème PDF */}
                    <div>
                      <Label htmlFor="theme">Thème du calendrier</Label>
                      <Select value={currentTheme} onValueChange={setCurrentTheme}>
                        <SelectTrigger id="theme" className="mt-1.5">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {allThemes.map(t => (
                            <SelectItem key={t.id} value={t.id}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: t.color }}
                                />
                                {t.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowPreview(true)}
                    disabled={!canExport}
                    className="flex-1"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Aperçu
                  </Button>
                  <Button
                    onClick={handleDownload}
                    disabled={!canExport}
                    className="flex-1"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>

      </main>

      {/* Aperçu PDF (modal) */}
      {showPreview && events.length > 0 && (
        <PDFPreview
          events={events}
          startDate={startDate}
          endDate={endDate}
          onClose={() => setShowPreview(false)}
          includeWeekends={includeWeekends}
          timeRange={timeRange}
          theme={currentTheme}
          showEventTimes={showEventTimes}
          showEventLocations={showEventLocations}
        />
      )}
    </div>
  )
}

export default App

