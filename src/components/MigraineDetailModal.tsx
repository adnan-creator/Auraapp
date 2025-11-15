import { Button } from './ui/button';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { DialogHeader, DialogTitle } from './ui/dialog';

interface MigraineEntry {
  date: string;
  severity: number;
  duration: string;
  predictedRisk: number;
}

interface MigraineDetailModalProps {
  migraine: MigraineEntry;
  onClose: () => void;
}

export default function MigraineDetailModal({ migraine, onClose }: MigraineDetailModalProps) {
  const renderSeverityDots = (severity: number) => {
    return (
      <div className="flex gap-1">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              i < severity ? 'bg-red-500' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <DialogHeader>
        <DialogTitle>November 12, 2025</DialogTitle>
      </DialogHeader>
      <p className="text-gray-600">2:30 PM</p>

      <Card className="p-4 bg-gray-50">
        <div className="space-y-3">
          <div>
            <div className="text-sm text-gray-600 mb-1">Severity: {migraine.severity}/10</div>
            {renderSeverityDots(migraine.severity)}
          </div>
          <div className="text-sm">
            <span className="text-gray-600">Duration: </span>
            <span className="text-gray-900">{migraine.duration}</span>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg">What Was Happening That Day</h3>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="p-4">
            <div className="text-xs text-gray-600 mb-1">Sleep</div>
            <div className="text-lg">5.2 hours</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown className="w-3 h-3" />
              <span>2.8 hours below your average</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-xs text-gray-600 mb-1">Heart Rate Variability</div>
            <div className="text-lg">42 ms</div>
            <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
              <TrendingDown className="w-3 h-3" />
              <span>18% below your baseline</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-xs text-gray-600 mb-1">Calendar</div>
            <div className="text-lg">8 meetings</div>
            <div className="text-xs text-gray-600">6 hours</div>
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>3x busier than typical</span>
            </div>
          </Card>

          <Card className="p-4">
            <div className="text-xs text-gray-600 mb-1">Weather</div>
            <div className="text-sm">Pressure dropped 8mb</div>
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>Rapid change in 6 hours</span>
            </div>
          </Card>

          <Card className="p-4 col-span-2">
            <div className="text-xs text-gray-600 mb-1">Screen Time</div>
            <div className="text-lg">9.5 hours</div>
            <div className="flex items-center gap-1 text-xs text-orange-600 mt-1">
              <TrendingUp className="w-3 h-3" />
              <span>2.5 hours above average</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg">Likely Triggers for This Episode</h3>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <Badge className="bg-red-600">High Confidence</Badge>
            <div className="flex-1">
              <div className="text-sm text-gray-900">1. Poor Sleep</div>
              <div className="text-sm text-gray-600">You slept significantly less than usual.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
            <Badge className="bg-red-600">High Confidence</Badge>
            <div className="flex-1">
              <div className="text-sm text-gray-900">2. High Stress</div>
              <div className="text-sm text-gray-600">Your calendar was unusually busy.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
            <Badge className="bg-orange-600">Medium Confidence</Badge>
            <div className="flex-1">
              <div className="text-sm text-gray-900">3. Weather Changes</div>
              <div className="text-sm text-gray-600">Barometric pressure dropped rapidly.</div>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
            <Badge className="bg-yellow-600">Low Confidence</Badge>
            <div className="flex-1">
              <div className="text-sm text-gray-900">4. Extended Screen Time</div>
              <div className="text-sm text-gray-600">Screen time was elevated.</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-4 border-t">
        <Button variant="outline" className="flex-1">
          Edit
        </Button>
        <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
          Delete
        </Button>
      </div>
    </div>
  );
}
