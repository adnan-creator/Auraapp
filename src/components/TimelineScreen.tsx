import { useState } from 'react';
import { Plus, Star, Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { UserData } from '../App';
import ReportMigraineModal from './ReportMigraineModal';
import MigraineDetailModal from './MigraineDetailModal';
import ActionPlan from './ActionPlan';
import { PlannedEvent } from './MainApp';

interface TimelineScreenProps {
  userData: UserData;
  plannedEvents: PlannedEvent[];
  onAddPlannedEvent: (event: PlannedEvent) => void;
  onUpdatePlannedEvent: (id: string, updates: Partial<PlannedEvent>) => void;
  onDeletePlannedEvent: (id: string) => void;
}

interface MigraineEntry {
  date: string;
  severity: number;
  duration: string;
  predictedRisk: number;
}

export default function TimelineScreen({ userData, plannedEvents, onAddPlannedEvent, onUpdatePlannedEvent, onDeletePlannedEvent }: TimelineScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedMigraine, setSelectedMigraine] = useState<MigraineEntry | null>(null);
  const [showActionPlan, setShowActionPlan] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PlannedEvent | null>(null);
  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);
  
  const migraines: MigraineEntry[] = [
    { date: 'Nov 12, 2025', severity: 8, duration: '18 hours', predictedRisk: 78 },
    { date: 'Nov 7, 2025', severity: 6, duration: '12 hours', predictedRisk: 65 },
    { date: 'Nov 3, 2025', severity: 7, duration: '14 hours', predictedRisk: 71 },
    { date: 'Oct 28, 2025', severity: 5, duration: '8 hours', predictedRisk: 58 },
  ];

  // Migraine dates for calendar
  const migraineDates = [
    new Date(2025, 10, 3),
    new Date(2025, 10, 7),
    new Date(2025, 10, 12),
  ];

  // Planned event dates for calendar (blue star indicators)
  const plannedEventDates = plannedEvents.map(event => event.eventDate);

  const handleSavePlan = (plan: PlannedEvent) => {
    if (selectedPlan) {
      // Update existing plan
      onUpdatePlannedEvent(plan.id, plan);
    } else {
      // Add new plan
      onAddPlannedEvent(plan);
    }
  };

  const handleOpenNewPlan = () => {
    setSelectedPlan(null);
    setIsCreatingNewPlan(true);
    setShowActionPlan(true);
  };

  const handleOpenExistingPlan = (plan: PlannedEvent) => {
    setSelectedPlan(plan);
    setIsCreatingNewPlan(false);
    setShowActionPlan(true);
  };

  const handleCloseActionPlan = () => {
    setShowActionPlan(false);
    setSelectedPlan(null);
    setIsCreatingNewPlan(false);
  };

  const renderSeverityDots = (severity: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i < severity ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl">Timeline</h1>
          <Button 
            onClick={() => setShowReportModal(true)}
            size="sm"
            className="bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Report Migraine
          </Button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Calendar View */}
        <Card className="p-6">
          <div className="flex justify-center relative">
            <Calendar
              mode="multiple"
              selected={migraineDates}
              month={new Date(2025, 10)}
              className="rounded-lg"
              components={{
                DayContent: ({ date }) => {
                  const hasPlannedEvent = plannedEventDates.some(
                    eventDate => 
                      eventDate.getDate() === date.getDate() &&
                      eventDate.getMonth() === date.getMonth() &&
                      eventDate.getFullYear() === date.getFullYear()
                  );
                  
                  return (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <span>{date.getDate()}</span>
                      {hasPlannedEvent && (
                        <Star 
                          className="absolute -top-1 -right-1 w-3 h-3 text-blue-500 fill-blue-500" 
                          aria-label="Planned event"
                        />
                      )}
                    </div>
                  );
                }
              }}
            />
          </div>
          
          <div className="mt-6 flex flex-wrap gap-4 justify-center text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-gray-600">Confirmed migraine</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span className="text-gray-600">Prodrome symptoms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-green-100 rounded"></div>
              <span className="text-gray-600">Predicted high-risk</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
              <span className="text-gray-600">Planned event</span>
            </div>
          </div>
        </Card>

        {/* Tabbed List View */}
        <Tabs defaultValue="migraines" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="migraines">Migraines</TabsTrigger>
            <TabsTrigger value="planned-events">Planned Events</TabsTrigger>
          </TabsList>

          {/* Migraines Tab */}
          <TabsContent value="migraines" className="space-y-4">
            {migraines.map((migraine, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg text-gray-900">{migraine.date}</h3>
                      <p className="text-sm text-gray-600 mt-1">Duration: {migraine.duration}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600">Risk</div>
                      <div className={`text-lg ${
                        migraine.predictedRisk > 70 ? 'text-red-600' :
                        migraine.predictedRisk > 50 ? 'text-orange-600' :
                        'text-yellow-600'
                      }`}>
                        {migraine.predictedRisk}%
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-sm text-gray-600">Severity: {migraine.severity}/10</div>
                    {renderSeverityDots(migraine.severity)}
                  </div>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setSelectedMigraine(migraine)}
                    className="w-full"
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Planned Events Tab */}
          <TabsContent value="planned-events" className="space-y-4">
            {plannedEvents.length > 0 ? (
              plannedEvents.map((event, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg text-gray-900">{event.eventName}</h3>
                        <p className="text-sm text-gray-600 mt-1">{event.dateString}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          {event.daysRemaining === 0 ? 'Today' : 
                           event.daysRemaining === 1 ? 'Tomorrow' :
                           `In ${event.daysRemaining} days`}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {event.completedItems} of {event.totalItems} items completed
                        </span>
                        <span className="text-blue-600">
                          {Math.round((event.completedItems / event.totalItems) * 100)}%
                        </span>
                      </div>
                      <Progress 
                        value={(event.completedItems / event.totalItems) * 100} 
                        className="h-2"
                      />
                    </div>
                    
                    <Button 
                      onClick={() => handleOpenExistingPlan(event)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      View Plan
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <Card className="p-12 text-center">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center">
                    <CalendarIcon className="w-8 h-8 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-gray-900">No planned events yet</p>
                    <p className="text-sm text-gray-600 mt-2">
                      Create a plan to stay migraine-free on important days
                    </p>
                  </div>
                  <Button 
                    onClick={handleOpenNewPlan}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Plan a Migraine-Free Day
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Migraine Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent>
          <ReportMigraineModal onClose={() => setShowReportModal(false)} />
        </DialogContent>
      </Dialog>

      {/* Migraine Detail Modal */}
      <Dialog open={selectedMigraine !== null} onOpenChange={() => setSelectedMigraine(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedMigraine && (
            <MigraineDetailModal 
              migraine={selectedMigraine} 
              onClose={() => setSelectedMigraine(null)} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Action Plan Modal */}
      <Dialog open={showActionPlan} onOpenChange={handleCloseActionPlan}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ActionPlan 
            existingPlan={selectedPlan}
            onClose={handleCloseActionPlan}
            onSavePlan={handleSavePlan}
            onDeletePlan={onDeletePlannedEvent}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
