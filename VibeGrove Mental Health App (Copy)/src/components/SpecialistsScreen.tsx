import { Calendar, Clock, Star, MapPin, Phone, Video } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';

interface SpecialistsScreenProps {
  onNavigate: (screen: string, feeling?: string, specialist?: any) => void;
}

const specialists = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    specialty: 'Anxiety & Stress',
    rating: 4.9,
    experience: '8 years',
    nextAvailable: 'Today 2:00 PM',
    location: 'University Health Center',
    isOnline: true,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Dr. Michael Torres',
    specialty: 'Depression & Mood',
    rating: 4.8,
    experience: '12 years',
    nextAvailable: 'Tomorrow 10:30 AM',
    location: 'Campus Wellness',
    isOnline: false,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Dr. Emily Rodriguez',
    specialty: 'Student Life Balance',
    rating: 4.9,
    experience: '6 years',
    nextAvailable: 'Today 4:15 PM',
    location: 'Student Services',
    isOnline: true,
    image: 'https://images.unsplash.com/photo-1594824804732-ca0c68319ee8?w=150&h=150&fit=crop&crop=face'
  }
];

export function SpecialistsScreen({ onNavigate }: SpecialistsScreenProps) {
  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl text-foreground mb-2">Mental Health Specialists</h1>
        <p className="text-muted-foreground">Connect with licensed professionals who understand student life</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-destructive rounded-full flex items-center justify-center">
                <Phone className="w-5 h-5 text-destructive-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Crisis Line</p>
                <p className="text-xs text-muted-foreground">24/7 Support</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <Video className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Video Chat</p>
                <p className="text-xs text-muted-foreground">Online Sessions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Specialists List */}
      <div className="space-y-4">
        {specialists.map((specialist) => (
          <Card key={specialist.id} className="border border-border hover:border-accent/40 transition-colors">
            <CardContent className="p-4">
              <div className="flex space-x-4">
                {/* Profile Image */}
                <div className="relative">
                  <img 
                    src={specialist.image} 
                    alt={specialist.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  {specialist.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background"></div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-foreground">{specialist.name}</h3>
                      <p className="text-sm text-muted-foreground">{specialist.specialty}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-foreground">{specialist.rating}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {specialist.experience}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3 mr-1" />
                      {specialist.location}
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 mr-1" />
                      Next: {specialist.nextAvailable}
                    </div>
                    <Button 
                      size="sm" 
                      className="bg-accent hover:bg-accent/90 text-accent-foreground"
                      onClick={() => onNavigate('session-booking', undefined, specialist)}
                    >
                      Book Session
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Emergency Banner */}
      <Card className="mt-8 bg-destructive/10 border-destructive/20">
        <CardContent className="p-4">
          <div className="text-center">
            <h3 className="font-medium text-destructive mb-1">In Crisis?</h3>
            <p className="text-sm text-muted-foreground mb-3">
              If you're having thoughts of self-harm, reach out immediately
            </p>
            <Button 
              variant="destructive" 
              size="sm"
              className="w-full"
            >
              Call Crisis Hotline: 988
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}