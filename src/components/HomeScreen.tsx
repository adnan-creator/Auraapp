import { useState } from 'react';
import { Settings as SettingsIcon, ChevronDown, ChevronUp, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { UserData } from '../App';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import ActionPlan from './ActionPlan';

interface HomeScreenProps {
  userData: UserData;
}

export default function HomeScreen({ userData }: HomeScreenProps) {
  const [expandedRisk, setExpandedRisk] = useState(false);
  const [showActionPlan, setShowActionPlan] = useState(false);
  
  // High risk state by default
  const riskLevel = 72;
  const riskLabel = 'High Risk';
  const primaryFactor = 'Primarily due to poor sleep';

  const triggers = [
    { name: 'Stress', percentage: 38, description: 'High-stress days strongly correlate with your migraines.' },
    { name: 'Poor Sleep', percentage: 31, description: 'Less than 7 hours of sleep is a major risk factor for you.' },
    { name: 'Weather Changes', percentage: 16, description: 'You are sensitive to barometric pressure drops.' },
    { name: 'Skipped Meals', percentage: 10, description: 'Irregular eating patterns increase your risk.' },
    { name: 'Screen Time', percentage: 5, description: 'Extended screen exposure shows mild correlation.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Hello, {userData.name || 'Sarah'}</p>
            <p className="text-gray-500 text-xs">Friday, November 15</p>
          </div>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <SettingsIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Today's Risk Card */}
        <Card className="p-8 bg-white shadow-lg">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Circular Progress */}
            <div className="relative">
              <svg className="w-40 h-40 transform -rotate-90">
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="#f3f4f6"
                  strokeWidth="12"
                  fill="none"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="70"
                  stroke="url(#gradient)"
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - riskLevel / 100)}`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-4xl text-gray-900">{riskLevel}%</div>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left">
              <div>
                <h3 className="text-2xl text-red-600">{riskLabel}</h3>
                <p className="text-gray-600 mt-1">{primaryFactor}</p>
              </div>

              <button
                onClick={() => setExpandedRisk(!expandedRisk)}
                className="flex items-center gap-2 text-purple-600 hover:text-purple-700 mx-auto md:mx-0"
              >
                <span className="text-sm">Contributing Factors</span>
                {expandedRisk ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {expandedRisk && (
                <div className="space-y-3 pt-4 border-t">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="text-gray-900">Poor Sleep Quality: +28%</span>
                        <p className="text-gray-600">You slept only 5.2 hours last night</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="text-gray-900">Calendar Density: +25%</span>
                        <p className="text-gray-600">8 meetings scheduled today</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="text-gray-900">Barometric Pressure: +14%</span>
                        <p className="text-gray-600">Pressure dropping 6mb in the last 3 hours</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-2">
                      <TrendingDown className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0" />
                      <div className="text-sm">
                        <span className="text-gray-900">Heart Rate Variability: +5%</span>
                        <p className="text-gray-600">HRV is 12% below your baseline</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Primary Action */}
        <Button 
          onClick={() => setShowActionPlan(true)}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
        >
          + Plan a Migraine-Free Day
        </Button>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 text-center">
            <div className="text-2xl text-purple-600">18</div>
            <div className="text-xs text-gray-600 mt-1">Migraine-Free Days</div>
            <div className="text-xs text-gray-500">this month</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-2xl text-green-600">5</div>
            <div className="text-xs text-gray-600 mt-1">Current Streak</div>
            <div className="text-xs text-gray-500">days</div>
          </Card>
          
          <Card className="p-4 text-center">
            <div className="text-sm text-orange-600">Nov 19</div>
            <div className="text-xs text-gray-600 mt-1">Next High-Risk</div>
            <div className="text-xs text-gray-500">Day</div>
          </Card>
        </div>

        {/* Migraine Genome */}
        <Card className="p-6 space-y-4">
          <div>
            <h3 className="text-xl">Your Migraine Genome</h3>
            <p className="text-sm text-gray-600">Based on 45 days of data</p>
          </div>

          <div className="flex justify-center py-6">
            <svg width="200" height="120" viewBox="0 0 200 120" className="opacity-80">
              <path d="M 10,60 Q 30,20 50,60 T 90,60 T 130,60 T 170,60 T 190,60" 
                stroke="url(#dna-gradient-1)" strokeWidth="3" fill="none" />
              <path d="M 10,60 Q 30,100 50,60 T 90,60 T 130,60 T 170,60 T 190,60" 
                stroke="url(#dna-gradient-2)" strokeWidth="3" fill="none" />
              <defs>
                <linearGradient id="dna-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
                <linearGradient id="dna-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="space-y-4">
            {triggers.map((trigger, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">
                    <span className="text-gray-900">{index + 1}. {trigger.name}</span>
                    <span className="text-purple-600 ml-2">({trigger.percentage}%)</span>
                  </span>
                </div>
                <p className="text-xs text-gray-600">{trigger.description}</p>
                <Progress value={trigger.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Action Plan Dialog */}
      <Dialog open={showActionPlan} onOpenChange={setShowActionPlan}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <ActionPlan onClose={() => setShowActionPlan(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
