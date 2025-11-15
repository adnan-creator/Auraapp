import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Apple, Activity, Check, AlertTriangle } from 'lucide-react';
import { UserData } from '../App';

interface ConnectDevicesProps {
  onNext: (data: Partial<UserData>) => void;
  onSkip: () => void;
  userData: UserData;
}

export default function ConnectDevices({ onNext, onSkip, userData }: ConnectDevicesProps) {
  const [appleHealth, setAppleHealth] = useState(userData.connectedDevices.appleHealth);
  const [fitbit, setFitbit] = useState(userData.connectedDevices.fitbit);
  const [showWarning, setShowWarning] = useState(false);

  const handleSkip = () => {
    setShowWarning(true);
  };

  const handleContinue = () => {
    if (!appleHealth && !fitbit) {
      setShowWarning(true);
    } else {
      onNext({ 
        connectedDevices: { appleHealth, fitbit }
      });
    }
  };

  const confirmSkip = () => {
    onNext({ 
      connectedDevices: { appleHealth, fitbit }
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">Connect your devices</h2>
          <p className="text-gray-600">
            Aura works best with data from your wearables. 
            This is essential for accurate predictions.
          </p>
        </div>
        
        <div className="space-y-4">
          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                <Apple className="w-7 h-7 text-white" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg">Apple Health</h3>
                  <p className="text-sm text-gray-600">Sleep, Heart Rate, HRV, Activity</p>
                </div>
                
                {appleHealth ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Connected</span>
                    </div>
                    <p className="text-xs text-gray-500">Last synced: 2 minutes ago</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setAppleHealth(false)}
                    >
                      Manage
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Not Connected</p>
                    <Button 
                      onClick={() => setAppleHealth(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Connect to Apple Health
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                <Activity className="w-7 h-7 text-white" />
              </div>
              
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-lg">Fitbit</h3>
                  <p className="text-sm text-gray-600">Sleep, Heart Rate, HRV, Activity</p>
                </div>
                
                {fitbit ? (
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-green-600 text-sm">
                      <Check className="w-4 h-4" />
                      <span>Connected</span>
                    </div>
                    <p className="text-xs text-gray-500">Last synced: 2 minutes ago</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setFitbit(false)}
                    >
                      Manage
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">Not Connected</p>
                    <Button 
                      onClick={() => setFitbit(true)}
                      className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                      Connect to Fitbit
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Card>

          {showWarning && !appleHealth && !fitbit && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1 space-y-3">
                <p className="text-sm text-amber-800">
                  Predictions will be less accurate without wearable data
                </p>
                <div className="flex gap-2">
                  <Button 
                    size="sm"
                    variant="outline"
                    onClick={() => setShowWarning(false)}
                  >
                    Go Back
                  </Button>
                  <Button 
                    size="sm"
                    onClick={confirmSkip}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    Continue Anyway
                  </Button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4">
            <Button 
              onClick={handleContinue}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
            >
              Continue
            </Button>
            {!showWarning && (
              <button
                type="button"
                onClick={handleSkip}
                className="text-gray-600 hover:text-gray-800 text-sm"
              >
                I'll connect later
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
