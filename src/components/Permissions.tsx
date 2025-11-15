import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Calendar, MapPin } from 'lucide-react';
import { UserData } from '../App';

interface PermissionsProps {
  onNext: (data: Partial<UserData>) => void;
  userData: UserData;
}

export default function Permissions({ onNext, userData }: PermissionsProps) {
  const [calendar, setCalendar] = useState(userData.permissions.calendar);
  const [location, setLocation] = useState(userData.permissions.location);

  const handleComplete = () => {
    onNext({ 
      permissions: { calendar, location }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">Final setup</h2>
          <p className="text-gray-600">
            Two quick permissions to enable smart predictions.
          </p>
        </div>
        
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="text-lg">Calendar Access</h3>
                <p className="text-sm text-gray-600">
                  We analyze your schedule to detect high-stress periods 
                  and busy days that might trigger migraines.
                </p>
                
                <Button 
                  onClick={() => setCalendar(!calendar)}
                  className={calendar 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                  }
                >
                  {calendar ? 'Granted ✓' : 'Grant Calendar Access'}
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-indigo-600" />
              </div>
              
              <div className="flex-1 space-y-3">
                <h3 className="text-lg">Location for Weather</h3>
                <p className="text-sm text-gray-600">
                  Weather changes are a major migraine trigger. 
                  We track barometric pressure and temperature shifts.
                </p>
                
                <Button 
                  onClick={() => setLocation(!location)}
                  className={location 
                    ? "bg-green-600 hover:bg-green-700 text-white" 
                    : "bg-purple-600 hover:bg-purple-700 text-white"
                  }
                >
                  {location ? 'Granted ✓' : 'Allow Location'}
                </Button>
              </div>
            </div>
          </Card>

          <Button 
            onClick={handleComplete}
            disabled={!calendar || !location}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            Complete Setup
          </Button>
        </div>
      </div>
    </div>
  );
}
