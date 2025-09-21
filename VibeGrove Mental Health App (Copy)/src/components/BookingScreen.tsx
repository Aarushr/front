import { useState } from 'react';
import { Plus, Calendar, CheckCircle, Circle, Download, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';

interface BookingScreenProps {
  onNavigate: (screen: string) => void;
}

const bookings = [
  {
    id: 1,
    type: 'Therapy Session',
    therapist: 'Dr. Sarah Johnson',
    date: '2024-09-12',
    time: '2:00 PM',
    status: 'confirmed'
  },
  {
    id: 2,
    type: 'Check-in Call',
    therapist: 'Dr. Sarah Johnson',
    date: '2024-09-19',
    time: '10:30 AM',
    status: 'pending'
  }
];

const homework = [
  {
    id: 1,
    title: 'Daily Mood Journal',
    description: 'Record your mood and energy levels each evening',
    dueDate: '2024-09-15',
    completed: true
  },
  {
    id: 2,
    title: 'Breathing Exercise Practice',
    description: 'Practice 4-7-8 breathing technique twice daily',
    dueDate: '2024-09-14',
    completed: false
  },
  {
    id: 3,
    title: 'Gratitude List',
    description: 'Write down 3 things you are grateful for each day',
    dueDate: '2024-09-16',
    completed: false
  }
];

const reports = [
  {
    id: 1,
    title: 'Weekly Progress Summary',
    date: '2024-09-08',
    type: 'Weekly Report',
    therapist: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'Initial Assessment',
    date: '2024-08-25',
    type: 'Assessment',
    therapist: 'Dr. Sarah Johnson'
  }
];

export function BookingScreen({ onNavigate }: BookingScreenProps) {
  const [completedTasks, setCompletedTasks] = useState<number[]>([1]);

  const toggleTask = (taskId: number) => {
    setCompletedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="p-4">
        <h1 className="text-xl mb-6">My Care Plan</h1>
        
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="homework">Tasks</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Appointments</h2>
              <Button size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Plus className="h-4 w-4 mr-2" />
                Book Session
              </Button>
            </div>

            <div className="space-y-3">
              {bookings.map((booking) => (
                <Card key={booking.id} className="p-4 bg-card border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <Calendar className="h-5 w-5 text-accent mt-1" />
                      <div>
                        <h3 className="font-medium text-foreground">{booking.type}</h3>
                        <p className="text-sm text-muted-foreground">{booking.therapist}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {formatDate(booking.date)} at {booking.time}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={booking.status === 'confirmed' ? 'default' : 'secondary'}
                      className={booking.status === 'confirmed' ? 'bg-accent text-accent-foreground' : ''}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Homework Tab */}
          <TabsContent value="homework" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Assigned Tasks</h2>
              <div className="text-sm text-muted-foreground">
                {completedTasks.length}/{homework.length} completed
              </div>
            </div>

            <div className="space-y-3">
              {homework.map((task) => {
                const isCompleted = completedTasks.includes(task.id);
                return (
                  <Card key={task.id} className="p-4 bg-card border-border/50">
                    <div className="flex items-start space-x-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => toggleTask(task.id)}
                        className="mt-0 p-0 h-6 w-6"
                      >
                        {isCompleted ? (
                          <CheckCircle className="h-5 w-5 text-accent" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground" />
                        )}
                      </Button>
                      <div className="flex-1">
                        <h3 className={`font-medium ${isCompleted ? 'text-muted-foreground line-through' : 'text-foreground'}`}>
                          {task.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          {task.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          Due: {formatDate(task.dueDate)}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg">Progress Reports</h2>
            </div>

            <div className="space-y-3">
              {reports.map((report) => (
                <Card key={report.id} className="p-4 bg-card border-border/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{report.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{report.therapist}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Generated: {formatDate(report.date)}
                      </p>
                      <Badge variant="outline" className="mt-2 border-accent/30 text-accent">
                        {report.type}
                      </Badge>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Download className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}