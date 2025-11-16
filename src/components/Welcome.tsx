import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeProps {
  onNext: () => void;
}

export default function Welcome({ onNext }: WelcomeProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative w-64 h-64 mx-auto mb-8">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1636741971502-b41b8fc12a2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdsb3dpbmclMjBzcGhlcmUlMjBsaWdodHxlbnwxfHx8fDE3NjMyMjE3NTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Aura visualization"
            className="w-full h-full object-cover rounded-3xl"
          />
          <h1 className="absolute bottom-12 left-1/2 -translate-x-1/2 text-6xl font-bold tracking-tight text-white">
            Kleara
          </h1>
        </div>
        
        <div className="space-y-4">
          <h2 className="text-3xl tracking-tight text-gray-900">
            Predict. Prevent. Live freely.
          </h2>
          
          <p className="text-gray-600 max-w-lg mx-auto">
            Kleara uses AI to forecast your migraines days in advance, 
            helping you plan for the moments that matter most.
          </p>
        </div>
        
        <Button 
          onClick={onNext}
          size="lg"
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white mt-8"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
