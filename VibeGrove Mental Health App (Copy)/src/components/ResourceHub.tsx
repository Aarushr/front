import { useState } from 'react';
import { Phone, MapPin, Play, Book, Heart, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface ResourceHubProps {
  onNavigate: (screen: string) => void;
}

const helplines = [
  {
    id: 1,
    name: 'National Suicide Prevention Lifeline',
    number: '988',
    description: '24/7 crisis support',
    type: 'emergency'
  },
  {
    id: 2,
    name: 'Crisis Text Line',
    number: 'Text HOME to 741741',
    description: 'Free 24/7 support via text',
    type: 'crisis'
  },
  {
    id: 3,
    name: 'Campus Counseling Center',
    number: '(555) 123-4567',
    description: 'On-campus mental health services',
    type: 'campus'
  },
  {
    id: 4,
    name: 'Student Health Services',
    number: '(555) 123-4568',
    description: 'Medical and mental health support',
    type: 'campus'
  }
];

const guidedExercises = [
  {
    id: 1,
    title: '4-7-8 Breathing Technique',
    duration: '5 min',
    category: 'Anxiety Relief',
    description: 'A powerful breathing pattern to reduce anxiety and promote calm',
    difficulty: 'Beginner'
  },
  {
    id: 2,
    title: 'Progressive Muscle Relaxation',
    duration: '15 min',
    category: 'Stress Relief',
    description: 'Systematic tensing and relaxing of muscle groups',
    difficulty: 'Beginner'
  },
  {
    id: 3,
    title: 'Mindful Body Scan',
    duration: '10 min',
    category: 'Mindfulness',
    description: 'Gentle awareness meditation for the whole body',
    difficulty: 'Intermediate'
  },
  {
    id: 4,
    title: 'Grounding 5-4-3-2-1 Technique',
    duration: '3 min',
    category: 'Panic Support',
    description: 'Use your senses to ground yourself in the present moment',
    difficulty: 'Beginner'
  },
  {
    id: 5,
    title: 'Loving-Kindness Meditation',
    duration: '12 min',
    category: 'Self-Compassion',
    description: 'Cultivate feelings of goodwill toward yourself and others',
    difficulty: 'Intermediate'
  },
  {
    id: 6,
    title: 'Sleep Story: Forest Walk',
    duration: '20 min',
    category: 'Sleep',
    description: 'Guided visualization to help you fall asleep peacefully',
    difficulty: 'Beginner'
  }
];

export function ResourceHub({ onNavigate }: ResourceHubProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Anxiety Relief', 'Stress Relief', 'Mindfulness', 'Panic Support', 'Self-Compassion', 'Sleep'];

  const filteredExercises = selectedCategory === 'all' 
    ? guidedExercises 
    : guidedExercises.filter(exercise => exercise.category === selectedCategory);

  const getHelplineIcon = (type: string) => {
    switch (type) {
      case 'emergency':
        return <Heart className="h-5 w-5 text-red-400" />;
      case 'crisis':
        return <Phone className="h-5 w-5 text-orange-400" />;
      case 'campus':
        return <MapPin className="h-5 w-5 text-accent" />;
      default:
        return <Phone className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-900/30 text-green-400 border-green-400/30';
      case 'Intermediate':
        return 'bg-yellow-900/30 text-yellow-400 border-yellow-400/30';
      case 'Advanced':
        return 'bg-red-900/30 text-red-400 border-red-400/30';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => onNavigate('main')}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl">Resource Hub</h1>
            <p className="text-sm text-muted-foreground">Resources for Punjab Region</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Emergency Helplines Section */}
        <section>
          <h2 className="text-lg mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2 text-accent" />
            Emergency & Support Lines
          </h2>
          <div className="space-y-3">
            {helplines.map((helpline) => (
              <Card key={helpline.id} className="p-4 bg-card border-border/50">
                <div className="flex items-start space-x-3">
                  {getHelplineIcon(helpline.type)}
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{helpline.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{helpline.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2 border-accent/30 hover:border-accent hover:bg-accent/10"
                      onClick={() => window.open(`tel:${helpline.number.replace(/\D/g, '')}`, '_self')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      {helpline.number}
                    </Button>
                  </div>
                  {helpline.type === 'emergency' && (
                    <Badge className="bg-red-900/30 text-red-400 border-red-400/30">
                      Emergency
                    </Badge>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Guided Exercises Section */}
        <section>
          <h2 className="text-lg mb-4 flex items-center">
            <Book className="h-5 w-5 mr-2 text-accent" />
            Guided Exercises
          </h2>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-4">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category 
                  ? "bg-accent text-accent-foreground" 
                  : "border-accent/30 hover:border-accent hover:bg-accent/10"
                }
              >
                {category === 'all' ? 'All' : category}
              </Button>
            ))}
          </div>

          {/* Exercise Cards */}
          <div className="space-y-3">
            {filteredExercises.map((exercise) => (
              <Card key={exercise.id} className="p-4 bg-card border-border/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="font-medium text-foreground">{exercise.title}</h3>
                      <Badge variant="outline" className={getDifficultyColor(exercise.difficulty)}>
                        {exercise.difficulty}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{exercise.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <Play className="h-3 w-3 mr-1" />
                        {exercise.duration}
                      </span>
                      <Badge variant="outline" className="border-accent/30 text-accent text-xs">
                        {exercise.category}
                      </Badge>
                    </div>
                  </div>
                  <Button 
                    size="icon" 
                    className="ml-4 bg-accent hover:bg-accent/90 text-accent-foreground"
                    onClick={() => {
                      // Here you would typically start the guided exercise
                      console.log('Starting exercise:', exercise.title);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}