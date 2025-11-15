import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { UserData } from '../App';

interface MigraineHistoryProps {
  onNext: (data: Partial<UserData>) => void;
  userData: UserData;
}

export default function MigraineHistory({ onNext, userData }: MigraineHistoryProps) {
  const [migraineDuration, setMigraineDuration] = useState(userData.migraineDuration || '5+ years');
  const [daysPerMonth, setDaysPerMonth] = useState([userData.daysPerMonth || 8]);
  const [recognizeWarnings, setRecognizeWarnings] = useState(userData.recognizeWarnings || 'Sometimes');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ 
      migraineDuration, 
      daysPerMonth: daysPerMonth[0],
      recognizeWarnings 
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">Tell us about your migraines</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-3">
            <Label>How long have you experienced migraines?</Label>
            <Select value={migraineDuration} onValueChange={setMigraineDuration}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Less than 1 year">Less than 1 year</SelectItem>
                <SelectItem value="1-3 years">1-3 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5+ years">5+ years</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label>How many migraine days do you typically have per month?</Label>
            <div className="space-y-4">
              <Slider 
                value={daysPerMonth} 
                onValueChange={setDaysPerMonth}
                max={30}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>0</span>
                <span className="text-purple-600">{daysPerMonth[0]}</span>
                <span>30</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <Label>Can you recognize warning signs before a migraine hits?</Label>
            <div className="flex gap-2">
              {['Yes', 'Sometimes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setRecognizeWarnings(option)}
                  className={`flex-1 py-3 rounded-lg border-2 transition-all ${
                    recognizeWarnings === option
                      ? 'border-purple-600 bg-purple-50 text-purple-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
