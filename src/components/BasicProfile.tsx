import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { UserData } from '../App';

interface BasicProfileProps {
  onNext: (data: Partial<UserData>) => void;
  userData: UserData;
}

export default function BasicProfile({ onNext, userData }: BasicProfileProps) {
  const [name, setName] = useState(userData.name || 'Sarah Chen');
  const [age, setAge] = useState(userData.age || '32');
  const [gender, setGender] = useState(userData.gender || 'Female');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNext({ name, age, gender });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 max-w-2xl mx-auto">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h2 className="text-3xl">Let's get to know you</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-2xl shadow-lg">
          <div className="space-y-2">
            <Label htmlFor="name">What's your name?</Label>
            <Input 
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="age">How old are you?</Label>
            <Input 
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger>
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Non-binary">Non-binary</SelectItem>
                <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <p className="text-sm text-gray-600">
            Age and gender help us understand your migraine patterns better.
          </p>
          
          <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}
