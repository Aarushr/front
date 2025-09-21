import { Button } from './ui/button';
import { UserPlus } from 'lucide-react';
import homeScreenImage from 'figma:asset/d2f8a241ace6d213273bf63edb1b67892a21b422.png';

interface MainScreenProps {
  onNavigate: (screen: string, feeling?: string) => void;
}

const feelingOptions = [
  { id: 'anxious', label: 'Anxious' },
  { id: 'stressed', label: 'Stressed' },
  { id: 'angry', label: 'Angry' },
  { id: 'sad', label: 'Sad' },
  { id: 'fatigues', label: 'Fatigues' },
  { id: 'unsure', label: 'Unsure' },
];

export function MainScreen({ onNavigate }: MainScreenProps) {
  const handleFeelingClick = (feelingId: string) => {
    onNavigate('ai-call', feelingId);
  };

  const handleFirstAidClick = () => {
    onNavigate('ai-call', 'emergency');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col px-6 py-8">
      {/* Header with Greeting */}
      <div className="mb-8">
        <div className="bg-blue-100 rounded-2xl p-4 mb-6 flex items-start space-x-4 relative">
          {/* Character - positioned on the right side like in design */}
          <div className="flex-1">
            <p className="text-foreground text-base leading-relaxed">
              Today might be rough, but you passed it! How you'd feel, Mala?
            </p>
          </div>
          <div className="flex-shrink-0 w-24 h-20 relative">
            {/* Green character with tree on head from the design */}
            <div className="w-full h-full bg-accent rounded-2xl flex items-center justify-center relative">
              {/* Simple character representation matching the design */}
              <div className="relative">
                {/* Character face */}
                <div className="w-12 h-12 bg-accent rounded-full relative flex items-center justify-center">
                  {/* Eyes */}
                  <div className="absolute top-3 left-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                  <div className="absolute top-3 right-2 w-1.5 h-1.5 bg-black rounded-full"></div>
                  {/* Smile */}
                  <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 border-b-2 border-black rounded-full"></div>
                </div>
                {/* Tree on head */}
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <div className="w-4 h-6 bg-orange-400 rounded-sm"></div>
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-6 h-4 bg-green-600 rounded-full"></div>
                </div>
                {/* Arm/branch */}
                <div className="absolute top-6 -right-4 w-8 h-1 bg-accent rounded-full transform rotate-12"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Question */}
      <div className="mb-8">
        <h1 className="text-xl text-foreground">How are you feeling today?</h1>
      </div>

      {/* Feeling Options Grid - 3x2 layout like in design */}
      <div className="w-full mb-8">
        <div className="grid grid-cols-2 gap-3">
          {feelingOptions.map((feeling) => (
            <Button
              key={feeling.id}
              onClick={() => handleFeelingClick(feeling.id)}
              className="h-12 rounded-full bg-accent hover:bg-accent/90 text-white border-0 shadow-sm transition-all duration-200 hover:scale-[1.02]"
            >
              {feeling.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Emergency Button */}
      <div className="w-full mb-12">
        <Button
          onClick={handleFirstAidClick}
          className="w-full h-14 rounded-2xl bg-destructive hover:bg-destructive/90 text-destructive-foreground shadow-lg transition-all duration-200 hover:scale-[1.02] text-lg"
        >
          Instant Help +
        </Button>
      </div>

      {/* Refer a Friend Section */}
      <div className="mt-auto">
        <div className="flex items-center justify-between">
          <span className="text-foreground">Refer a friend</span>
          <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
            {/* Small tree character icon */}
            <div className="w-6 h-6 relative">
              <div className="w-3 h-2 bg-orange-400 rounded-sm mx-auto"></div>
              <div className="w-4 h-2 bg-green-600 rounded-full mx-auto -mt-1"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}