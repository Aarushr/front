import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, MapPin, Video, MessageCircle, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface SessionBookingScreenProps {
  onNavigate: (screen: string) => void;
  specialist?: {
    id: number;
    name: string;
    specialty: string;
    image: string;
  };
}

const timeSlots = [
  { id: '1', time: '9:00 AM', available: true },
  { id: '2', time: '10:30 AM', available: true },
  { id: '3', time: '2:00 PM', available: false },
  { id: '4', time: '3:30 PM', available: true },
  { id: '5', time: '4:15 PM', available: true },
  { id: '6', time: '5:00 PM', available: true }
];

const sessionTypes = [
  {
    id: 'video',
    name: 'Video Session',
    duration: '50 minutes',
    price: 'Covered by Student Health',
    icon: Video,
    description: 'Face-to-face video call from anywhere on campus'
  },
  {
    id: 'inperson',
    name: 'In-Person Session',
    duration: '50 minutes', 
    price: 'Covered by Student Health',
    icon: MapPin,
    description: 'Meet at the University Health Center'
  },
  {
    id: 'chat',
    name: 'Chat Session',
    duration: '30 minutes',
    price: 'Covered by Student Health',
    icon: MessageCircle,
    description: 'Text-based session for quick support'
  }
];

export function SessionBookingScreen({ onNavigate, specialist }: SessionBookingScreenProps) {
  const [selectedDate, setSelectedDate] = useState('2024-03-15');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [notes, setNotes] = useState('');
  const [isBooked, setIsBooked] = useState(false);

  const handleBooking = () => {
    if (selectedTime && selectedType) {
      setIsBooked(true);
      // Here you would typically send the booking data to your backend
      setTimeout(() => {
        onNavigate('specialists');
      }, 2000);
    }
  };

  if (isBooked) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl text-foreground mb-2">Session Booked!</h1>
          <p className="text-muted-foreground mb-6">
            Your appointment with {specialist?.name || 'the specialist'} has been confirmed.
          </p>
          <div className="bg-card rounded-xl p-4 border border-border mb-6">
            <p className="text-sm text-muted-foreground mb-1">Your Session</p>
            <p className="text-foreground">{selectedDate} at {timeSlots.find(t => t.id === selectedTime)?.time}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {sessionTypes.find(t => t.id === selectedType)?.name}
            </p>
          </div>
          <Button onClick={() => onNavigate('specialists')} className="w-full">
            Return to Specialists
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => onNavigate('specialists')}
          className="rounded-full"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-lg font-medium">Book Session</h1>
        <div className="w-10" /> {/* Spacer */}
      </div>

      <div className="p-6 space-y-6">
        {/* Specialist Info */}
        {specialist && (
          <Card>
            <CardContent className="p-4">
              <div className="flex space-x-4">
                <img 
                  src={specialist.image} 
                  alt={specialist.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-foreground">{specialist.name}</h3>
                  <p className="text-sm text-muted-foreground">{specialist.specialty}</p>
                  <Badge variant="secondary" className="mt-2 text-xs">
                    Available Today
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Session Type Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Choose Session Type</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <RadioGroup value={selectedType} onValueChange={setSelectedType}>
              <div className="space-y-3">
                {sessionTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <div key={type.id} className="flex items-center space-x-3 p-3 rounded-lg border border-border hover:border-accent/40 transition-colors">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <div className="flex items-center space-x-3 flex-1">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <Icon className="w-5 h-5 text-accent" />
                        </div>
                        <div className="flex-1">
                          <Label htmlFor={type.id} className="text-sm font-medium cursor-pointer">
                            {type.name}
                          </Label>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs text-muted-foreground">{type.duration}</span>
                            <span className="text-xs">•</span>
                            <span className="text-xs text-accent">{type.price}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Date Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              Select Date
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {[
                { date: '2024-03-15', day: 'Today', dayName: 'Fri' },
                { date: '2024-03-16', day: 'Tomorrow', dayName: 'Sat' },
                { date: '2024-03-18', day: '18', dayName: 'Mon' },
                { date: '2024-03-19', day: '19', dayName: 'Tue' },
                { date: '2024-03-20', day: '20', dayName: 'Wed' }
              ].map((dateOption) => (
                <Button
                  key={dateOption.date}
                  variant={selectedDate === dateOption.date ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedDate(dateOption.date)}
                  className="flex-shrink-0 flex flex-col h-auto py-2 px-3"
                >
                  <span className="text-xs">{dateOption.dayName}</span>
                  <span className="text-sm">{dateOption.day}</span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Time Selection */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Available Times
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <RadioGroup value={selectedTime} onValueChange={setSelectedTime}>
              <div className="grid grid-cols-2 gap-3">
                {timeSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center space-x-2">
                    <RadioGroupItem 
                      value={slot.id} 
                      id={slot.id} 
                      disabled={!slot.available}
                    />
                    <Label 
                      htmlFor={slot.id} 
                      className={`text-sm cursor-pointer ${
                        !slot.available ? 'text-muted-foreground line-through' : ''
                      }`}
                    >
                      {slot.time}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Notes */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Session Notes (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <Textarea
              placeholder="Is there anything specific you'd like to discuss?"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-20"
            />
          </CardContent>
        </Card>

        {/* Book Button */}
        <Button 
          onClick={handleBooking}
          disabled={!selectedTime || !selectedType}
          className="w-full h-12"
        >
          Book Session
        </Button>

        {/* Privacy Note */}
        <p className="text-xs text-muted-foreground text-center">
          Your session details are confidential and protected by student health privacy policies.
        </p>
      </div>
    </div>
  );
}