import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { UserData } from '../App';
import ReportMigraineModal from './ReportMigraineModal';
import MigraineDetailModal from './MigraineDetailModal';

interface TimelineScreenProps {
  userData: UserData;
}

interface MigraineEntry {
  date: string;
  severity: number;
  duration: string;
  predictedRisk: number;
}

export default function TimelineScreen({ userData }: TimelineScreenProps) {
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedMigraine, setSelectedMigraine] = useState<MigraineEntry | null>(null);
  
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
          <div className="flex justify-center">
            <Calendar
              mode="multiple"
              selected={migraineDates}
              month={new Date(2025, 10)}
              className="rounded-lg"
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
          </div>
        </Card>

        {/* Recent Migraines List */}
        <div className="space-y-4">
          <h2 className="text-xl">Recent Migraines</h2>
          
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
        </div>
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
    </div>
  );
}
