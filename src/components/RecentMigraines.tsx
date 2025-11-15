import { useState } from 'react';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserData } from '../App';

interface RecentMigrainesProps {
  onNext: (data: Partial<UserData>) => void;
  onSkip: () => void;
  userData: UserData;
}

export default function RecentMigraines({ onNext, onSkip, userData }: RecentMigrainesProps) {
  const [selectedDates, setSelectedDates] = useState<Date[]>(
    userData.recentMigraines?.map(m => new Date(m.date)) || []
  );
  const [showModal, setShowModal] = useState(false);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [severity, setSeverity] = useState([8]);
  const [duration, setDuration] = useState('12-24 hours');
  const [migraineData, setMigraineData] = useState<Array<{
    date: string;
    severity: number;
    duration: string;
  }>>(userData.recentMigraines || []);

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setCurrentDate(date);
    
    // Check if date already has data
    const existing = migraineData.find(m => 
      new Date(m.date).toDateString() === date.toDateString()
    );
    
    if (existing) {
      setSeverity([existing.severity]);
      setDuration(existing.duration);
    } else {
      setSeverity([8]);
      setDuration('12-24 hours');
    }
    
    setShowModal(true);
  };

  const handleSave = () => {
    if (!currentDate) return;
    
    const dateString = currentDate.toISOString();
    const newData = migraineData.filter(m => 
      new Date(m.date).toDateString() !== currentDate.toDateString()
    );
    newData.push({
      date: dateString,
      severity: severity[0],
      duration,
    });
    
    setMigraineData(newData);
    
    if (!selectedDates.some(d => d.toDateString() === currentDate.toDateString())) {
      setSelectedDates([...selectedDates, currentDate]);
    }
    
    setShowModal(false);
  };

  const handleSubmit = () => {
    onNext({ recentMigraines: migraineData });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12 max-w-3xl mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">Log your recent migraines</h2>
          <p className="text-gray-600">
            Tap on the dates you had a migraine in the last 30 days. 
            This helps train your prediction model.
          </p>
        </div>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg space-y-6">
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onDayClick={handleDateSelect}
            className="mx-auto"
            disabled={(date) => date > new Date() || date < new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)}
          />
          
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              Continue
            </Button>
            <button
              type="button"
              onClick={onSkip}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              I don't remember (Skip this step)
            </button>
          </div>
        </div>
      </div>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Migraine on {currentDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label>How severe was it?</Label>
                <span className="text-purple-600">{severity[0]}/10</span>
              </div>
              <Slider 
                value={severity} 
                onValueChange={setSeverity}
                min={1}
                max={10}
                step={1}
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>Mild</span>
                <span>Severe</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>How long did it last?</Label>
              <Select value={duration} onValueChange={setDuration}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Still ongoing">Still ongoing</SelectItem>
                  <SelectItem value="1-4 hours">1-4 hours</SelectItem>
                  <SelectItem value="4-12 hours">4-12 hours</SelectItem>
                  <SelectItem value="12-24 hours">12-24 hours</SelectItem>
                  <SelectItem value="24+ hours">24+ hours</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button onClick={handleSave} className="w-full bg-purple-600 hover:bg-purple-700 text-white">
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
