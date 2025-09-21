import { useState, useEffect } from 'react';
import { ArrowLeft, Mic } from 'lucide-react';
import { Button } from './ui/button';

interface AICallScreenProps {
  feeling?: string;
  onNavigate: (screen: string) => void;
}

export function AICallScreen({ feeling, onNavigate }: AICallScreenProps) {
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<'inhale' | 'exhale'>('inhale');
  const [currentMessage, setCurrentMessage] = useState(0);

  // Different messages for the AI
  const messages = [
    {
      main: "Inhale...\nExhale...",
      sub: "Just breathe. I'm here to listen."
    },
    {
      main: "Tell me how you're\nfeeling...",
      sub: "What's been on you mind today?\nNo need to explain, just share."
    }
  ];

  useEffect(() => {
    // Start breathing animation after component mounts
    const timer = setTimeout(() => {
      setIsBreathing(true);
    }, 500);

    // Switch between messages
    const messageTimer = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 8000);

    return () => {
      clearTimeout(timer);
      clearInterval(messageTimer);
    };
  }, []);

  useEffect(() => {
    if (!isBreathing) return;

    // Breathing cycle: 4 seconds inhale, 4 seconds exhale
    const breathingInterval = setInterval(() => {
      setBreathPhase(prev => prev === 'inhale' ? 'exhale' : 'inhale');
    }, 4000);

    return () => clearInterval(breathingInterval);
  }, [isBreathing]);

  const getTitle = () => {
    if (feeling === 'emergency') return 'Emergency Support';
    if (feeling === 'anxious') return 'Managing Anxiety';
    if (feeling === 'stressed') return 'Stress Relief';
    if (feeling === 'panicked') return 'Panic Support';
    if (feeling === 'angry') return 'Anger Management';
    if (feeling === 'depressed') return 'Depression Support';
    if (feeling === 'numb') return 'Reconnecting';
    if (feeling === 'grieving') return 'Grief Support';
    if (feeling === 'fatigued') return 'Energy Restoration';
    if (feeling === 'unsure') return 'Self-Discovery';
    return 'Guided Support';
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col relative">
      {/* Header - Optional back button */}
      {/* <div className="absolute top-6 left-6 z-10">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate('main')}
          className="rounded-full bg-white/10 backdrop-blur-sm"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Button>
      </div> */}

      {/* Central Glowing Circle */}
      <div className="flex-1 flex items-center justify-center px-8">
        <div className="relative">
          {/* Main glowing circle with green color */}
          <div 
            className={`w-64 h-64 rounded-full border-2 border-green-400 shadow-2xl transition-all duration-4000 ease-in-out relative ${
              isBreathing 
                ? breathPhase === 'inhale' 
                  ? 'scale-110' 
                  : 'scale-90'
                : 'scale-100'
            }`}
            style={{
              transitionDuration: '4000ms',
              boxShadow: '0 0 40px rgba(34, 197, 94, 0.3), 0 0 80px rgba(34, 197, 94, 0.1)',
            }}
          >
            {/* Inner glow effect */}
            <div 
              className="absolute inset-4 rounded-full bg-green-400/10 transition-all duration-4000 ease-in-out"
              style={{
                transitionDuration: '4000ms',
                opacity: isBreathing ? (breathPhase === 'inhale' ? 0.3 : 0.1) : 0.2
              }}
            />
            
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="text-lg font-normal leading-relaxed whitespace-pre-line">
                  {messages[currentMessage].main}
                </div>
              </div>
            </div>
          </div>
          
          {/* Outer pulse ring */}
          <div 
            className={`absolute inset-0 w-64 h-64 rounded-full border border-green-400/30 transition-all duration-4000 ease-in-out ${
              isBreathing 
                ? breathPhase === 'inhale' 
                  ? 'scale-125 opacity-20' 
                  : 'scale-75 opacity-40'
                : 'scale-100 opacity-30'
            }`}
            style={{
              transitionDuration: '4000ms',
            }}
          />
        </div>
      </div>

      {/* Bottom message and voice button */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center px-8">
        <p className="text-white/70 text-sm mb-8 leading-relaxed whitespace-pre-line">
          {messages[currentMessage].sub}
        </p>
        
        {/* Voice input button */}
        <Button 
          variant="ghost" 
          size="icon"
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
        >
          <Mic className="h-5 w-5 text-white" />
        </Button>
      </div>

      {/* Tap anywhere overlay */}
      <div 
        className="absolute inset-0 z-0"
        onClick={() => onNavigate('main')}
      />
    </div>
  );
}