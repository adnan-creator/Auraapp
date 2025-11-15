import { useState } from 'react';
import { Home, Clock, Settings } from 'lucide-react';
import HomeScreen from './HomeScreen';
import TimelineScreen from './TimelineScreen';
import SettingsScreen from './SettingsScreen';
import { UserData } from '../App';

type Tab = 'home' | 'timeline' | 'settings';

interface MainAppProps {
  userData: UserData;
}

export default function MainApp({ userData }: MainAppProps) {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {activeTab === 'home' && <HomeScreen userData={userData} />}
      {activeTab === 'timeline' && <TimelineScreen userData={userData} />}
      {activeTab === 'settings' && <SettingsScreen userData={userData} />}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-lg mx-auto flex justify-around">
          <button
            onClick={() => setActiveTab('home')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'home' 
                ? 'text-purple-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Home className="w-6 h-6" />
            <span className="text-xs">Home</span>
          </button>
          
          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'timeline' 
                ? 'text-purple-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Clock className="w-6 h-6" />
            <span className="text-xs">Timeline</span>
          </button>
          
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === 'settings' 
                ? 'text-purple-600' 
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </button>
        </div>
      </div>
    </div>
  );
}
