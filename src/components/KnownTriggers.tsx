import { useState } from 'react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { UserData } from '../App';

interface KnownTriggersProps {
  onNext: (data: Partial<UserData>) => void;
  userData: UserData;
}

const triggers = [
  { id: 'stress', label: 'Stress', default: 5 },
  { id: 'sleep', label: 'Poor sleep or sleep changes', default: 4 },
  { id: 'meals', label: 'Skipped meals or irregular eating', default: 3 },
  { id: 'weather', label: 'Weather changes', default: 3 },
  { id: 'lights', label: 'Bright lights or screen time', default: 2 },
  { id: 'alcohol', label: 'Alcohol', default: 1 },
  { id: 'caffeine', label: 'Caffeine (too much or withdrawal)', default: 2 },
  { id: 'hormonal', label: 'Hormonal changes', default: 5 },
  { id: 'exercise', label: 'Physical exertion', default: 2 },
];

export default function KnownTriggers({ onNext, userData }: KnownTriggersProps) {
  const [triggerValues, setTriggerValues] = useState<Record<string, number>>(
    userData.triggers && Object.keys(userData.triggers).length > 0
      ? userData.triggers
      : triggers.reduce((acc, t) => ({ ...acc, [t.id]: t.default }), {})
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ triggers: triggerValues });
  };

  const handleSliderChange = (id: string, value: number[]) => {
    setTriggerValues({ ...triggerValues, [id]: value[0] });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12 max-w-3xl mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">What triggers your migraines?</h2>
          <p className="text-gray-600">
            Based on your experience, rate how sensitive you are to each factor.
          </p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
          <div className="flex justify-between text-sm text-gray-600 mb-6">
            <span>Not a trigger</span>
            <span>Major trigger</span>
          </div>
          
          {triggers.map((trigger) => (
            <div key={trigger.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base">{trigger.label}</Label>
                <span className="text-sm text-purple-600 min-w-[2rem] text-right">
                  {triggerValues[trigger.id]}
                </span>
              </div>
              <Slider 
                value={[triggerValues[trigger.id]]} 
                onValueChange={(value) => handleSliderChange(trigger.id, value)}
                max={5}
                step={1}
                className="w-full"
              />
            </div>
          ))}
          
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white mt-6">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
