import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { CalendarIcon } from 'lucide-react';
import { Badge } from './ui/badge';
import { DialogHeader, DialogTitle } from './ui/dialog';

interface ReportMigraineModalProps {
  onClose: () => void;
}

export default function ReportMigraineModal({ onClose }: ReportMigraineModalProps) {
  const [date, setDate] = useState<Date>(new Date(2025, 10, 15));
  const [time, setTime] = useState('2:30 PM');
  const [severity, setSeverity] = useState([8]);
  const [duration, setDuration] = useState('12-24 hours');
  const [warningSigns, setWarningSigns] = useState<Set<string>>(new Set());

  const warningOptions = [
    'Fatigue', 'Neck Pain', 'Food Cravings', 
    'Mood Changes', 'Visual Changes', 'Light Sensitivity', 'Other'
  ];

  const toggleWarningSign = (sign: string) => {
    const newSigns = new Set(warningSigns);
    if (newSigns.has(sign)) {
      newSigns.delete(sign);
    } else {
      newSigns.add(sign);
    }
    setWarningSigns(newSigns);
  };

  const handleSave = () => {
    // Would save the migraine data here
    onClose();
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>Report a Migraine</DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label>When did the migraine occur?</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(d) => d && setDate(d)}
            />
          </PopoverContent>
        </Popover>
        
        <div className="mt-2">
          <Label className="text-sm text-gray-600">Time (Optional)</Label>
          <Select value={time} onValueChange={setTime}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => {
                const hour = i % 12 || 12;
                const ampm = i < 12 ? 'AM' : 'PM';
                return (
                  <SelectItem key={i} value={`${hour}:00 ${ampm}`}>
                    {hour}:00 {ampm}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>
      </div>

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

      <div className="space-y-3">
        <Label>Did you notice any warning signs? (Optional)</Label>
        <div className="flex flex-wrap gap-2">
          {warningOptions.map((option) => (
            <Badge
              key={option}
              variant={warningSigns.has(option) ? "default" : "outline"}
              className={`cursor-pointer ${
                warningSigns.has(option) 
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'hover:bg-gray-100'
              }`}
              onClick={() => toggleWarningSign(option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button variant="outline" onClick={onClose} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleSave}
          className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
        >
          Save
        </Button>
      </div>
    </div>
  );
}
