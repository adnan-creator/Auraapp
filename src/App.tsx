import { useState } from 'react';
import Welcome from './components/Welcome';
import BasicProfile from './components/BasicProfile';
import MigraineHistory from './components/MigraineHistory';
import KnownTriggers from './components/KnownTriggers';
import RecentMigraines from './components/RecentMigraines';
import ConnectDevices from './components/ConnectDevices';
import Permissions from './components/Permissions';
import SetupComplete from './components/SetupComplete';
import MainApp from './components/MainApp';

export type OnboardingStep = 
  | 'welcome'
  | 'basicProfile'
  | 'migraineHistory'
  | 'knownTriggers'
  | 'recentMigraines'
  | 'connectDevices'
  | 'permissions'
  | 'setupComplete'
  | 'complete';

export interface UserData {
  name: string;
  age: string;
  gender: string;
  migraineDuration: string;
  daysPerMonth: number;
  recognizeWarnings: string;
  triggers: Record<string, number>;
  recentMigraines: Array<{
    date: string;
    severity: number;
    duration: string;
  }>;
  connectedDevices: {
    appleHealth: boolean;
    fitbit: boolean;
  };
  permissions: {
    calendar: boolean;
    location: boolean;
  };
}

export default function App() {
  const [currentStep, setCurrentStep] = useState<OnboardingStep>('welcome');
  const [userData, setUserData] = useState<UserData>({
    name: '',
    age: '',
    gender: '',
    migraineDuration: '',
    daysPerMonth: 8,
    recognizeWarnings: '',
    triggers: {},
    recentMigraines: [],
    connectedDevices: {
      appleHealth: false,
      fitbit: false,
    },
    permissions: {
      calendar: false,
      location: false,
    },
  });

  const handleNext = (step: OnboardingStep, data?: Partial<UserData>) => {
    if (data) {
      setUserData({ ...userData, ...data });
    }
    setCurrentStep(step);
  };

  if (currentStep === 'complete') {
    return <MainApp userData={userData} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {currentStep === 'welcome' && (
        <Welcome onNext={() => handleNext('basicProfile')} />
      )}
      {currentStep === 'basicProfile' && (
        <BasicProfile 
          onNext={(data) => handleNext('migraineHistory', data)} 
          userData={userData}
        />
      )}
      {currentStep === 'migraineHistory' && (
        <MigraineHistory 
          onNext={(data) => handleNext('knownTriggers', data)} 
          userData={userData}
        />
      )}
      {currentStep === 'knownTriggers' && (
        <KnownTriggers 
          onNext={(data) => handleNext('recentMigraines', data)} 
          userData={userData}
        />
      )}
      {currentStep === 'recentMigraines' && (
        <RecentMigraines 
          onNext={(data) => handleNext('connectDevices', data)}
          onSkip={() => handleNext('connectDevices')}
          userData={userData}
        />
      )}
      {currentStep === 'connectDevices' && (
        <ConnectDevices 
          onNext={(data) => handleNext('permissions', data)}
          onSkip={() => handleNext('permissions')}
          userData={userData}
        />
      )}
      {currentStep === 'permissions' && (
        <Permissions 
          onNext={(data) => handleNext('setupComplete', data)} 
          userData={userData}
        />
      )}
      {currentStep === 'setupComplete' && (
        <SetupComplete onNext={() => handleNext('complete')} />
      )}
    </div>
  );
}
