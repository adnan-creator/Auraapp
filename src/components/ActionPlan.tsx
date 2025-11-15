import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Progress } from './ui/progress';
import { Checkbox } from './ui/checkbox';
import { DialogHeader, DialogTitle } from './ui/dialog';
import { PlannedEvent } from './MainApp';

interface ActionPlanProps {
  existingPlan?: PlannedEvent | null;
  onClose: () => void;
  onSavePlan: (plan: PlannedEvent) => void;
  onDeletePlan?: (id: string) => void;
}

export default function ActionPlan({ existingPlan, onClose, onSavePlan, onDeletePlan }: ActionPlanProps) {
  const [step, setStep] = useState<'select' | 'plan'>(existingPlan ? 'plan' : 'select');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(existingPlan?.eventDate);
  const [eventName, setEventName] = useState(existingPlan?.eventName || 'Product Launch Presentation');
  const [checkedItems, setCheckedItems] = useState<Set<number>>(existingPlan?.checkedItems || new Set());

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };

  const handleGeneratePlan = () => {
    if (selectedDate) {
      setStep('plan');
    }
  };

  const toggleCheck = (index: number) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedItems(newChecked);
  };

  const checklistItems = [
    { day: '3 Days Before', items: [
      'Get 8+ hours of sleep tonight - Poor sleep is your #2 trigger',
      'Drink at least 2 liters of water today',
      'Avoid alcohol completely',
      'Keep stress low — consider rescheduling non-essential meetings'
    ]},
    { day: '2 Days Before', items: [
      'Maintain regular meal times - Don\'t skip breakfast or lunch',
      'Limit caffeine to morning only - Avoid after 2 PM',
      'Do 20 minutes of light exercise - A walk, yoga, or stretching',
      'Reduce screen time after 8 PM - Use blue light filter if needed',
      'Check the weather forecast - Be prepared for pressure changes'
    ]},
    { day: '1 Day Before', items: [
      'Prioritize sleep — aim for 8+ hours - Go to bed by 10 PM',
      'Stay hydrated throughout the day',
      'Avoid trigger foods - Skip aged cheese, processed meats, wine',
      'Keep your schedule light and predictable - No surprises or last-minute changes',
      'Have your preventive medication ready - Keep it with you tomorrow'
    ]},
    { day: 'On Event Day', items: [
      'Wake up at your regular time - Avoid sleeping in or waking early',
      'Eat a balanced breakfast - Include protein and complex carbs',
      'Stay hydrated - Bring a water bottle',
      'Take breaks during the event - Step outside for fresh air if possible',
      'Manage stress with breathing exercises - 5 deep breaths before the presentation'
    ]}
  ];

  const totalItems = checklistItems.reduce((sum, section) => sum + section.items.length, 0);
  const progress = (checkedItems.size / totalItems) * 100;

  const calculateDaysRemaining = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate = new Date(date);
    eventDate.setHours(0, 0, 0, 0);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleSavePlan = () => {
    if (!selectedDate) return;

    const daysRemaining = calculateDaysRemaining(selectedDate);
    const dateString = selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

    const plan: PlannedEvent = {
      id: existingPlan?.id || `plan-${Date.now()}`,
      eventName,
      eventDate: selectedDate,
      dateString,
      daysRemaining,
      totalItems,
      completedItems: checkedItems.size,
      checkedItems: new Set(checkedItems)
    };

    onSavePlan(plan);
    onClose();
  };

  const handleDelete = () => {
    if (existingPlan && onDeletePlan) {
      onDeletePlan(existingPlan.id);
      onClose();
    }
  };

  if (step === 'select') {
    return (
      <div className="space-y-6">
        <DialogHeader>
          <DialogTitle>Plan a Migraine-Free Day</DialogTitle>
        </DialogHeader>
        <p className="text-gray-600">Select an important upcoming date</p>

        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleDateSelect}
          disabled={(date) => date < new Date()}
          className="mx-auto"
        />

        {selectedDate && (
          <div className="p-4 bg-purple-50 rounded-lg">
            <p className="text-sm text-gray-700">
              Selected: <span className="text-purple-600">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </p>
          </div>
        )}

        <Button 
          onClick={handleGeneratePlan}
          disabled={!selectedDate}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white"
        >
          Generate Plan
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>
          {existingPlan ? `Plan for ${existingPlan.dateString}` : `Your Plan for ${selectedDate?.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`}
        </DialogTitle>
      </DialogHeader>

      <div className="space-y-2">
        <Label>What's the occasion?</Label>
        <Input 
          value={eventName}
          onChange={(e) => setEventName(e.target.value)}
          placeholder="Enter event name"
        />
      </div>

      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg space-y-2">
        <p className="text-sm text-gray-700">
          Current predicted risk: <span className="text-red-600">74%</span>
        </p>
        <p className="text-sm">
          Follow this plan to reduce your risk to <span className="text-green-600">22%</span>
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">{checkedItems.size} of {totalItems} items complete</span>
          <span className="text-purple-600">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-6 max-h-96 overflow-y-auto pr-2">
        {checklistItems.map((section, sectionIndex) => (
          <div key={sectionIndex} className="space-y-3">
            <h3 className="text-purple-600">{section.day}</h3>
            {section.items.map((item, itemIndex) => {
              const globalIndex = checklistItems
                .slice(0, sectionIndex)
                .reduce((sum, s) => sum + s.items.length, 0) + itemIndex;
              
              return (
                <div key={itemIndex} className="flex items-start gap-3">
                  <Checkbox 
                    id={`item-${globalIndex}`}
                    checked={checkedItems.has(globalIndex)}
                    onCheckedChange={() => toggleCheck(globalIndex)}
                    className="mt-1"
                  />
                  <label 
                    htmlFor={`item-${globalIndex}`}
                    className={`text-sm cursor-pointer ${checkedItems.has(globalIndex) ? 'line-through text-gray-400' : 'text-gray-700'}`}
                  >
                    {item}
                  </label>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        {existingPlan && onDeletePlan && (
          <Button 
            onClick={handleDelete}
            variant="outline"
            className="flex items-center gap-2 text-red-600 border-red-300 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
            Delete Plan
          </Button>
        )}
        <Button 
          onClick={handleSavePlan}
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          {existingPlan ? 'Update Plan' : 'Save Plan'}
        </Button>
      </div>
    </div>
  );
}
