import React, { useState, useRef, useCallback, useEffect } from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import treeImage from 'figma:asset/4d3aa262d4614b8b4ca2ba52ce40f80f3eda1598.png';
import orangeCharacter from 'figma:asset/cd46d4947065eba93a4aacfcb032712eb4c0f577.png';

interface TreeScreenProps {
  onNavigate: (screen: string) => void;
}

export function TreeScreen({ onNavigate }: TreeScreenProps) {
  const [waterLevel, setWaterLevel] = useState(65);
  const [showChatBubble, setShowChatBubble] = useState(true);
  const [bucketPosition, setBucketPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [isWatering, setIsWatering] = useState(false);
  const [showWaterDrops, setShowWaterDrops] = useState(false);
  const [isRecentlyWatered, setIsRecentlyWatered] = useState(false);
  const bucketRef = useRef<HTMLDivElement>(null);
  const treeRef = useRef<HTMLDivElement>(null);
  
  // Progress indicators - Updated labels to match UI
  const treeGrowth = 78;
  const treeHealth = 85; // Changed from happiness to health
  const waterLevelProgress = waterLevel;

  const handleWaterTree = () => {
    if (waterLevel < 100) {
      setWaterLevel(Math.min(100, waterLevel + 10));
      setIsWatering(true);
      setShowWaterDrops(true);
      setIsRecentlyWatered(true);
      
      // Show watering animation
      setTimeout(() => {
        setIsWatering(false);
        setShowWaterDrops(false);
      }, 1500);
      
      // Keep the watered state for color change
      setTimeout(() => {
        setIsRecentlyWatered(false);
      }, 5000);
    }
  };

  const checkBucketOverTree = useCallback(() => {
    if (!bucketRef.current || !treeRef.current) return false;
    
    const bucketRect = bucketRef.current.getBoundingClientRect();
    const treeRect = treeRef.current.getBoundingClientRect();
    
    // Check if bucket is over the tree (with some tolerance)
    const bucketCenterX = bucketRect.left + bucketRect.width / 2;
    const bucketCenterY = bucketRect.top + bucketRect.height / 2;
    
    return (
      bucketCenterX >= treeRect.left - 20 &&
      bucketCenterX <= treeRect.right + 20 &&
      bucketCenterY >= treeRect.top - 20 &&
      bucketCenterY <= treeRect.bottom + 20
    );
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = bucketRef.current?.getBoundingClientRect();
    if (rect) {
      setBucketPosition({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
    }
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    
    setBucketPosition({
      x: e.clientX - 24, // Half bucket width
      y: e.clientY - 24  // Half bucket height
    });
    
    // Check if bucket is over tree while dragging
    setTimeout(() => {
      if (checkBucketOverTree() && waterLevel < 100) {
        // Auto-water when hovering over tree
        handleWaterTree();
      }
    }, 100);
  }, [isDragging, checkBucketOverTree, waterLevel]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    // Reset bucket position
    setBucketPosition({ x: 0, y: 0 });
  }, []);

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    const touch = e.touches[0];
    const rect = bucketRef.current?.getBoundingClientRect();
    if (rect) {
      setBucketPosition({
        x: touch.clientX - rect.left - rect.width / 2,
        y: touch.clientY - rect.top - rect.height / 2
      });
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    
    const touch = e.touches[0];
    setBucketPosition({
      x: touch.clientX - 24,
      y: touch.clientY - 24
    });
    
    setTimeout(() => {
      if (checkBucketOverTree() && waterLevel < 100) {
        handleWaterTree();
      }
    }, 100);
  }, [isDragging, checkBucketOverTree, waterLevel]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setBucketPosition({ x: 0, y: 0 });
  }, []);

  // Global event listeners
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  const handleChatBubbleClick = () => {
    setShowChatBubble(false);
    // Here you would typically show a modal or navigate to a reflection prompt
  };

  return (
    <div className="min-h-screen bg-background p-6 relative overflow-hidden">
      {/* Background gradient for nature feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-accent/20" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center">
        
        {/* Top Question Prompt */}
        <div className="w-full max-w-sm mb-8 mt-4">
          <div className="bg-accent/10 rounded-xl p-4 text-center border border-accent/20">
            <p className="text-foreground">How are you feeling today?</p>
          </div>
        </div>
        
        {/* Tree Container */}
        <div className="relative mb-8 flex-1 flex items-center justify-center">
          {/* Chat Bubble - Removed as it's not in the new design */}
          
          {/* Tree Illustration */}
          <div ref={treeRef} className="w-64 h-80 relative flex items-center justify-center">
            {/* Beautiful Tree Image */}
            <div className="relative">
              {/* Base tree image */}
              <img 
                src={treeImage} 
                alt="Beautiful tree with green foliage and pink flowers"
                className={`w-48 h-48 object-contain transition-all duration-500 ${
                  treeGrowth > 70 ? 'scale-110' : treeGrowth > 40 ? 'scale-100' : 'scale-90'
                }`}
              />
              
              {/* Cute orange mascot character near the tree */}
              <div className="absolute -bottom-8 -left-8 w-12 h-12 rounded-full overflow-hidden flex items-center justify-center transform rotate-12 shadow-lg bg-orange-100/20">
                <img 
                  src={orangeCharacter} 
                  alt="Orange character"
                  className="w-10 h-10 object-contain"
                />
              </div>
              
              {/* Organic tree-shaped watering effect */}
              {(isWatering || isRecentlyWatered) && (
                <>
                  {/* Main tree glow - shaped like the tree canopy */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-700"
                    style={{
                      top: '10%',
                      left: '20%',
                      width: '60%',
                      height: '65%',
                      background: `radial-gradient(ellipse 100% 90% at center 20%, 
                        rgba(155, 181, 154, ${isWatering ? '0.4' : '0.25'}) 0%, 
                        rgba(155, 181, 154, ${isWatering ? '0.3' : '0.15'}) 30%, 
                        rgba(155, 181, 154, ${isWatering ? '0.2' : '0.1'}) 60%, 
                        transparent 90%)`,
                      filter: `blur(${isWatering ? '3px' : '2px'})`,
                      opacity: isWatering ? 1 : 0.7,
                      transform: `scale(${isWatering ? '1.08' : '1.03'})`,
                      mixBlendMode: 'soft-light',
                      borderRadius: '50% 50% 45% 45%',
                      animation: isWatering ? 'tree-glow 2s ease-in-out infinite' : 'none'
                    }}
                  />
                  
                  {/* Trunk glow effect */}
                  <div 
                    className="absolute pointer-events-none transition-all duration-500"
                    style={{
                      bottom: '5%',
                      left: '45%',
                      width: '10%',
                      height: '35%',
                      background: `linear-gradient(to top, 
                        rgba(139, 115, 85, ${isWatering ? '0.3' : '0.2'}) 0%, 
                        rgba(139, 115, 85, ${isWatering ? '0.15' : '0.1'}) 50%, 
                        transparent 100%)`,
                      filter: `blur(${isWatering ? '2px' : '1px'})`,
                      opacity: isWatering ? 0.8 : 0.5,
                      mixBlendMode: 'multiply'
                    }}
                  />
                  
                  {/* Shimmer effect for active watering */}
                  {isWatering && (
                    <div 
                      className="absolute pointer-events-none"
                      style={{
                        top: '15%',
                        left: '25%',
                        width: '50%',
                        height: '55%',
                        background: `linear-gradient(45deg, 
                          transparent 30%, 
                          rgba(255, 255, 255, 0.3) 50%, 
                          transparent 70%)`,
                        backgroundSize: '200% 200%',
                        borderRadius: '50% 50% 40% 40%',
                        opacity: 0.6,
                        animation: 'tree-shimmer 3s ease-in-out infinite'
                      }}
                    />
                  )}
                </>
              )}
              
              {/* Water drops animation overlay */}
              {showWaterDrops && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-70"
                      style={{
                        left: `${15 + Math.random() * 70}%`,
                        top: `${10 + Math.random() * 30}%`,
                        animationDelay: `${i * 150}ms`,
                        animationDuration: '1.2s'
                      }}
                    />
                  ))}
                </div>
              )}
              
              {/* Sparkle effects for very mature tree */}
              {treeGrowth > 80 && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={`sparkle-${i}`}
                      className="absolute w-1 h-1 bg-white rounded-full animate-pulse opacity-60"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${15 + Math.random() * 40}%`,
                        animationDelay: `${i * 800 + 200}ms`,
                        animationDuration: '2s'
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Draggable Water Bucket - positioned like in the UI */}
            <div
              ref={bucketRef}
              className={`absolute cursor-grab active:cursor-grabbing transition-all duration-200 ${
                isDragging ? 'z-50 scale-110' : 'z-20'
              } ${waterLevel >= 100 ? 'opacity-50 cursor-not-allowed' : 'hover:scale-110'}`}
              style={{
                bottom: isDragging ? 'auto' : '-32px',
                right: isDragging ? 'auto' : '32px',
                left: isDragging ? `${bucketPosition.x}px` : 'auto',
                top: isDragging ? `${bucketPosition.y}px` : 'auto',
                position: isDragging ? 'fixed' : 'absolute'
              }}
              onMouseDown={waterLevel < 100 ? handleMouseDown : undefined}
              onTouchStart={waterLevel < 100 ? handleTouchStart : undefined}
            >
              {/* Bucket SVG */}
              <div className={`w-12 h-12 relative ${isDragging && checkBucketOverTree() ? 'animate-pulse' : ''}`}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Bucket body */}
                  <path
                    d="M6 8L8 20H16L18 8H6Z"
                    fill="#8B7355"
                    stroke="#654321"
                    strokeWidth="1"
                  />
                  {/* Bucket rim */}
                  <ellipse
                    cx="12"
                    cy="8"
                    rx="6"
                    ry="1"
                    fill="#A0896B"
                    stroke="#654321"
                    strokeWidth="1"
                  />
                  {/* Bucket handle */}
                  <path
                    d="M8 8C8 6 10 4 12 4C14 4 16 6 16 8"
                    fill="none"
                    stroke="#654321"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  {/* Water inside bucket */}
                  {waterLevel > 0 && (
                    <ellipse
                      cx="12"
                      cy="8.5"
                      rx="5"
                      ry="0.7"
                      fill="#4A90E2"
                      opacity="0.8"
                    />
                  )}
                  {/* Water drops when dragging over tree */}
                  {isDragging && checkBucketOverTree() && (
                    <>
                      <circle cx="10" cy="21" r="0.5" fill="#4A90E2" opacity="0.6" />
                      <circle cx="12" cy="22" r="0.5" fill="#4A90E2" opacity="0.6" />
                      <circle cx="14" cy="21.5" r="0.5" fill="#4A90E2" opacity="0.6" />
                    </>
                  )}
                </svg>
              </div>
            </div>
            
            {/* Small text below bucket */}
            <div className="absolute -bottom-16 right-8 text-xs text-muted-foreground text-center">
              Water your plant
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="w-full max-w-sm space-y-4 mb-8">
          {/* Growth */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Growth</span>
              <span className="text-sm text-accent">{treeGrowth}%</span>
            </div>
            <Progress value={treeGrowth} className="h-2" />
          </div>

          {/* Health */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Health</span>
              <span className="text-sm text-accent">{treeHealth}%</span>
            </div>
            <Progress value={treeHealth} className="h-2" />
          </div>

          {/* Water Level */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Water Level</span>
              <span className={`text-sm transition-colors duration-300 ${
                isRecentlyWatered ? 'text-blue-300' : 'text-blue-400'
              }`}>
                {waterLevel}%
              </span>
            </div>
            <div className="relative">
              <Progress 
                value={waterLevel} 
                className={`h-2 transition-all duration-500 ${
                  isRecentlyWatered ? 'shadow-lg shadow-blue-400/30' : ''
                }`} 
              />
              {isRecentlyWatered && (
                <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}