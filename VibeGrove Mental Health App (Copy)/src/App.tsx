import { useState, useEffect } from 'react';
import { MainScreen } from './components/MainScreen';
import { AICallScreen } from './components/AICallScreen';
import { TreeScreen } from './components/TreeScreen';
import { ForestScreen } from './components/ForestScreen';
import { SpecialistsScreen } from './components/SpecialistsScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { SessionBookingScreen } from './components/SessionBookingScreen';
import { BottomNavigation } from './components/BottomNavigation';

type Screen = 'main' | 'ai-call' | 'tree' | 'forest' | 'specialists' | 'profile' | 'session-booking';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('main');
  const [selectedFeeling, setSelectedFeeling] = useState<string | undefined>();
  const [selectedSpecialist, setSelectedSpecialist] = useState<any>(null);
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleNavigate = (screen: string, feeling?: string, specialist?: any) => {
    setCurrentScreen(screen as Screen);
    setSelectedFeeling(feeling);
    if (specialist) {
      setSelectedSpecialist(specialist);
    }
  };

  // Handle touch events for swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStart({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const minSwipeDistance = 50;

    // Only handle swipes on main and tree screens
    if (currentScreen === 'main') {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          // Swipe down - show tree screen
          setCurrentScreen('tree');
        } else {
          // Swipe up - show specialists screen (was resource hub)
          setCurrentScreen('specialists');
        }
      }
    } else if (currentScreen === 'tree') {
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX < 0) {
          // Swipe left - show forest screen
          setCurrentScreen('forest');
        } else if (deltaX > 0) {
          // Swipe right - show profile screen (was booking)
          setCurrentScreen('profile');
        }
      } else if (deltaY < 0 && Math.abs(deltaY) > minSwipeDistance) {
        // Swipe up - back to main
        setCurrentScreen('main');
      }
    }

    setTouchStart(null);
  };

  // Add keyboard navigation for desktop testing
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentScreen === 'main') {
        switch (e.key) {
          case 'ArrowDown':
            setCurrentScreen('tree');
            break;
          case 'ArrowUp':
            setCurrentScreen('specialists');
            break;
        }
      } else if (currentScreen === 'tree') {
        switch (e.key) {
          case 'ArrowLeft':
            setCurrentScreen('forest');
            break;
          case 'ArrowRight':
            setCurrentScreen('profile');
            break;
          case 'ArrowUp':
            setCurrentScreen('main');
            break;
        }
      } else if (e.key === 'Escape') {
        setCurrentScreen('main');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentScreen]);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main':
        return <MainScreen onNavigate={handleNavigate} />;
      case 'ai-call':
        return <AICallScreen feeling={selectedFeeling} onNavigate={handleNavigate} />;
      case 'tree':
        return <TreeScreen onNavigate={handleNavigate} />;
      case 'forest':
        return <ForestScreen onNavigate={handleNavigate} />;
      case 'specialists':
        return <SpecialistsScreen onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfileScreen onNavigate={handleNavigate} />;
      case 'session-booking':
        return <SessionBookingScreen onNavigate={handleNavigate} specialist={selectedSpecialist} />;
      default:
        return <MainScreen onNavigate={handleNavigate} />;
    }
  };

  // Don't show bottom navigation on AI Call screen and session booking for immersive experience
  const showBottomNav = currentScreen !== 'ai-call' && currentScreen !== 'session-booking';

  return (
    <div 
      className={`min-h-screen bg-background text-foreground light ${
        currentScreen === 'forest' ? 'touch-pan-x touch-pan-y' : 'touch-pan-y'
      }`}
      onTouchStart={currentScreen !== 'forest' ? handleTouchStart : undefined}
      onTouchEnd={currentScreen !== 'forest' ? handleTouchEnd : undefined}
    >
      {/* Debug info for desktop */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-2 right-2 z-50 bg-card/80 backdrop-blur-sm text-xs p-2 rounded border border-border">
          Current: {currentScreen}
          <br />
          Use arrow keys to navigate
        </div>
      )}
      
      {/* Main content with bottom padding when nav is visible (except forest screen which handles its own layout) */}
      <div className={showBottomNav && currentScreen !== 'forest' ? 'pb-20' : ''}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      {showBottomNav && (
        <BottomNavigation 
          currentScreen={currentScreen} 
          onNavigate={handleNavigate} 
        />
      )}
    </div>
  );
}