import { useState } from 'react';
import { Send, Plus, MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

interface ForestScreenProps {
  onNavigate: (screen: string) => void;
}

// Generate a larger forest with more trees distributed across a wider area
const generateForestTrees = () => {
  const trees = [];
  const treeCount = 40; // Adjusted number of trees
  
  for (let i = 1; i <= treeCount; i++) {
    trees.push({
      id: i,
      x: Math.random() * 85 + 7.5, // 7.5% to 92.5% to avoid edges
      y: Math.random() * 85 + 7.5, // 7.5% to 92.5% to avoid edges
      hasMessage: Math.random() < 0.35, // 35% chance of having a message
      growth: Math.floor(Math.random() * 40) + 60, // Growth between 60-100% for healthier look
    });
  }
  
  // Add some specific trees with messages for demo purposes
  trees[0] = { id: 1, x: 25, y: 35, hasMessage: true, growth: 85 };
  trees[1] = { id: 2, x: 50, y: 55, hasMessage: true, growth: 75 };
  trees[2] = { id: 3, x: 70, y: 30, hasMessage: true, growth: 90 };
  trees[3] = { id: 4, x: 35, y: 65, hasMessage: true, growth: 80 };
  
  return trees;
};

const communityTrees = generateForestTrees();

const presetReplies = [
  "I understand 💚",
  "You're not alone",
  "One day at a time",
  "Sending strength",
  "It's okay to feel this"
];

export function ForestScreen({ onNavigate }: ForestScreenProps) {
  const [inputText, setInputText] = useState('');
  const [selectedTree, setSelectedTree] = useState<number | null>(null);

  const handleSendMessage = () => {
    if (inputText.trim()) {
      // Here you would typically send the message to the community
      console.log('Sending message:', inputText);
      setInputText('');
    }
  };

  const handlePresetReply = (reply: string) => {
    setInputText(reply);
  };

  const handleTreeClick = (treeId: number) => {
    setSelectedTree(selectedTree === treeId ? null : treeId);
  };

  const getTreeColor = (growth: number) => {
    if (growth > 85) return 'from-green-500 to-green-400';
    if (growth > 75) return 'from-green-600 to-green-500';
    return 'from-green-700 to-green-600';
  };

  const getTreeMessage = (treeId: number) => {
    const messages = [
      "Taking a few deep breaths before my exam helped me feel more centered. Small moments matter.",
      "Found peace watching the sunset from my dorm window. Sometimes it's the simple things.",
      "A warm cup of tea and 5 minutes of quiet time in the library corner was perfect.",
      "Went for a short walk between classes. Fresh air always helps clear my mind.",
      "Listened to my favorite song and let myself feel the emotions. Music heals.",
      "Called my friend when I was struggling. Talking really helped me feel less alone.",
      "Did some stretching in my room. My body and mind both felt so much better.",
      "Wrote down three things I'm grateful for today. Gratitude shifts everything.",
      "Took a few minutes to pet a campus dog. Animals bring such pure joy.",
      "Made myself a healthy meal instead of ordering takeout. Self-care in action.",
      "Meditated for just 5 minutes between study sessions. Small practices, big impact.",
      "Watched the clouds from my window. Nature's patterns are so calming.",
      "Organized my desk space. A tidy environment helps my thoughts feel clearer.",
      "Practiced saying 'no' to something that would drain my energy. Boundaries matter.",
      "Sent a kind message to someone I care about. Connection is everything."
    ];
    return messages[treeId % messages.length] || messages[0];
  };

  return (
    <div className="h-screen bg-background relative overflow-hidden">
      {/* Fixed Header - Today's Reflection */}
      <div className="absolute top-0 left-0 right-0 z-30 bg-background/80 backdrop-blur-sm">
        <div className="p-4">
          <div className="bg-card/50 rounded-xl p-4 border border-accent/20">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Today's reflection</p>
                <p className="text-sm text-foreground">
                  "What's one small thing that brought you peace today?"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Forest View - Multi-directional scrolling */}
      <div 
        className="absolute inset-0 overflow-auto bg-gradient-to-br from-background via-background to-accent/8" 
        style={{ 
          top: '100px', // Space for fixed header
          bottom: '160px', // Space for fixed input section
          scrollBehavior: 'smooth', 
          touchAction: 'pan-x pan-y',
          overscrollBehavior: 'contain'
        }}
      >
        {/* Large forest container - 2x2 viewport size for exploration */}
        <div className="relative select-none" style={{ width: '200vw', height: '200vh', minHeight: '800px' }}>
          {/* Community Trees - Small uniform size like in the design */}
          {communityTrees.map((tree) => {
            const treeColor = getTreeColor(tree.growth);
            
            return (
              <div
                key={tree.id}
                className="absolute cursor-pointer transition-transform duration-200 hover:scale-110"
                style={{
                  left: `${tree.x}%`,
                  top: `${tree.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => handleTreeClick(tree.id)}
              >
                {/* Small Tree - uniform size like in UI mockup */}
                <div className="relative flex flex-col items-center">
                  {/* Tree canopy - multiple circular shapes to mimic the UI design */}
                  <div className="relative">
                    {/* Main canopy circles */}
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${treeColor} shadow-sm`} />
                    <div className={`w-6 h-6 rounded-full bg-gradient-to-br ${treeColor} shadow-sm absolute -top-1 -right-1`} />
                    <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${treeColor} shadow-sm absolute -top-1 -left-1`} />
                    
                    {/* Pink flowers/dots - like in the design */}
                    {tree.growth > 80 && (
                      <>
                        <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-pink-300 rounded-full" />
                        <div className="absolute top-0 left-2 w-1 h-1 bg-pink-400 rounded-full" />
                      </>
                    )}
                    
                    {/* Message bubble indicator */}
                    {tree.hasMessage && (
                      <div className="absolute -top-2 -right-3 w-4 h-3 bg-pink-300 rounded-full border border-pink-400 flex items-center justify-center opacity-80">
                        <div className="w-1 h-1 bg-pink-600 rounded-full" />
                      </div>
                    )}
                  </div>
                  
                  {/* Small trunk */}
                  <div className="w-1 h-3 bg-yellow-800 rounded-b-sm -mt-1" />
                </div>

                {/* Tree message popup */}
                {selectedTree === tree.id && tree.hasMessage && (
                  <Card className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-card border-accent/20 shadow-lg z-20 w-56">
                    <p className="text-xs text-foreground leading-relaxed">
                      {getTreeMessage(tree.id)}
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">
                      Anonymous • {Math.floor(Math.random() * 12) + 1}h ago
                    </div>
                    
                    {/* Quick response buttons */}
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                        You're not alone
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs h-6 px-2">
                        Sending strength
                      </Button>
                    </div>
                  </Card>
                )}
              </div>
            );
          })}

          {/* Scroll hint for exploration */}
          <div className="absolute top-4 left-4 bg-card/60 backdrop-blur-sm rounded-lg px-3 py-2 border border-accent/20">
            <p className="text-xs text-muted-foreground">
              🌲 Scroll around to explore
            </p>
          </div>
        </div>
      </div>

      {/* Fixed Bottom - Share Your Echoes Input */}
      <div className="absolute bottom-0 left-0 right-0 z-30 p-4 bg-background/95 backdrop-blur-sm border-t border-border/50">
        {/* Share Your Echoes Title */}
        <div className="mb-3">
          <p className="text-sm font-medium text-foreground">Share Your Echoes</p>
        </div>
        
        {/* Input Field */}
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Share something peaceful from your day..."
            className="flex-1 bg-input border-border/50 focus:border-accent"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Quick responses */}
        <div className="flex flex-wrap gap-2 mt-3">
          {presetReplies.slice(0, 3).map((reply, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              onClick={() => handlePresetReply(reply)}
              className="text-xs border-accent/30 hover:border-accent hover:bg-accent/10"
            >
              {reply}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}