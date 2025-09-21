import { Home, TreePine, Users, Stethoscope, User } from 'lucide-react';
import { Button } from './ui/button';

type Screen = 'main' | 'tree' | 'forest' | 'specialists' | 'profile';

interface BottomNavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: string) => void;
}

const navigationItems = [
  {
    id: 'main',
    label: 'Home',
    icon: Home,
  },
  {
    id: 'tree',
    label: 'Tree',
    icon: TreePine,
  },
  {
    id: 'forest',
    label: 'Forest',
    icon: Users,
  },
  {
    id: 'specialists',
    label: 'Specialists',
    icon: Stethoscope,
  },
  {
    id: 'profile',
    label: 'Profile',
    icon: User,
  },
];

export function BottomNavigation({ currentScreen, onNavigate }: BottomNavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-card/98 backdrop-blur-sm border-t border-border shadow-lg">
      <div className="flex items-center justify-around py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 transition-colors duration-200 ${
                isActive 
                  ? 'text-accent hover:text-accent' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon 
                className={`h-5 w-5 transition-all duration-200 ${
                  isActive ? 'scale-110' : 'scale-100'
                }`} 
              />
              <span className={`text-xs transition-all duration-200 ${
                isActive ? 'font-medium' : 'font-normal'
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-accent rounded-full absolute -bottom-1" />
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
}