import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Apple, Activity, Calendar, MapPin, ChevronRight, Bell, User, Shield, Info } from 'lucide-react';
import { UserData } from '../App';

interface SettingsScreenProps {
  userData: UserData;
}

export default function SettingsScreen({ userData }: SettingsScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl">Settings</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Data Sources */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-700">Data Sources</h2>
          
          <Card className="divide-y">
            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center flex-shrink-0">
                <Apple className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm">Apple Health</h3>
                <p className="text-xs text-green-600">Connected ✓</p>
                <p className="text-xs text-gray-500">Last synced: 2 minutes ago</p>
                <p className="text-xs text-gray-600 mt-1">Sleep, Heart Rate, HRV, Activity</p>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>

            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm">Calendar</h3>
                <p className="text-xs text-green-600">Connected ✓</p>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>

            <div className="p-4 flex items-center gap-4">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm">Location / Weather</h3>
                <p className="text-xs text-green-600">Enabled ✓</p>
                <p className="text-xs text-gray-600 mt-1">Helsinki, Finland</p>
              </div>
              <Button variant="ghost" size="sm">
                Manage
              </Button>
            </div>
          </Card>
        </div>

        {/* Notification Preferences */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-700">Notification Preferences</h2>
          
          <Card className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="high-risk" className="text-sm">High-risk day warnings</Label>
              <Switch id="high-risk" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="action-plan" className="text-sm">Action plan reminders</Label>
              <Switch id="action-plan" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="confirmation" className="text-sm">Migraine confirmation requests</Label>
              <Switch id="confirmation" defaultChecked />
            </div>
            
            <div className="flex items-center justify-between">
              <Label htmlFor="insights" className="text-sm">Weekly insights summary</Label>
              <Switch id="insights" />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm">Quiet Hours</div>
                  <div className="text-xs text-gray-600">10:00 PM — 8:00 AM</div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Profile & Preferences */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-700">Profile & Preferences</h2>
          
          <Card className="divide-y">
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Edit Profile</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Update Trigger Sensitivity</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-2">
                <span className="text-sm">Medication Tracking</span>
                <span className="text-xs text-gray-500">(Coming Soon)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </Card>
        </div>

        {/* Data & Privacy */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-700">Data & Privacy</h2>
          
          <Card className="p-4 space-y-4">
            <p className="text-sm text-gray-600">
              Your data is stored locally on your device 
              and is never shared with third parties.
            </p>
            
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1">
                Export My Data
              </Button>
              <Button variant="outline" className="flex-1 text-red-600 hover:bg-red-50">
                Delete All Data
              </Button>
            </div>
          </Card>
        </div>

        {/* About */}
        <div className="space-y-3">
          <h2 className="text-lg text-gray-700">About</h2>
          
          <Card className="divide-y">
            <div className="p-4">
              <span className="text-sm text-gray-600">App Version: 1.0.0</span>
            </div>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Privacy Policy</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Terms of Service</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
            
            <button className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <span className="text-sm">Send Feedback</span>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </button>
          </Card>
        </div>
      </div>
    </div>
  );
}
