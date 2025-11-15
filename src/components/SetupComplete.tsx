import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { CheckCircle } from 'lucide-react';

interface SetupCompleteProps {
  onNext: () => void;
}

export default function SetupComplete({ onNext }: SetupCompleteProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className={`w-full max-w-md space-y-8 text-center transition-all duration-1000 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle className="w-20 h-20 text-white" />
          </div>
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl">You're all set!</h1>
          
          <p className="text-gray-600 max-w-lg mx-auto">
            Aura is now collecting data in the background. 
            Your Migraine Genome will become more accurate 
            over the next 1-2 weeks as we learn your patterns.
          </p>
          
          <p className="text-sm text-gray-500 max-w-lg mx-auto">
            We'll notify you when we have enough data to 
            start making predictions.
          </p>
        </div>
        
        <Button 
          onClick={onNext}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white mt-8"
        >
          Go to Home
        </Button>
      </div>
    </div>
  );
}
