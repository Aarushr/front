import { Settings, Bell, Shield, HelpCircle, Heart, Award, TrendingUp, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Switch } from './ui/switch';

interface ProfileScreenProps {
  onNavigate: (screen: string) => void;
}

export function ProfileScreen({ onNavigate }: ProfileScreenProps) {
  const streakDays = 14;
  const totalSessions = 28;
  const wellnessScore = 78;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🌱</span>
        </div>
        <h1 className="text-xl text-foreground">Mala</h1>
        <p className="text-muted-foreground">Your VibeGrove Journey</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <TrendingUp className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-2xl font-medium text-foreground">{streakDays}</p>
            <p className="text-xs text-muted-foreground">Day Streak</p>
          </CardContent>
        </Card>

        <Card className="bg-accent/10 border-accent/20">
          <CardContent className="p-4 text-center">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center mx-auto mb-2">
              <Calendar className="w-4 h-4 text-accent-foreground" />
            </div>
            <p className="text-2xl font-medium text-foreground">{totalSessions}</p>
            <p className="text-xs text-muted-foreground">Check-ins</p>
          </CardContent>
        </Card>
      </div>

      {/* Wellness Score */}
      <Card className="mb-8 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Wellness Score</CardTitle>
            <div className="flex items-center space-x-1">
              <Heart className="w-4 h-4 text-destructive" />
              <span className="text-sm text-foreground">{wellnessScore}%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <Progress value={wellnessScore} className="h-2 mb-2" />
          <p className="text-xs text-muted-foreground">
            You're doing great! Keep nurturing your mental health.
          </p>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="mb-8">
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Award className="w-4 h-4 mr-2 text-yellow-500" />
            Recent Achievements
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-yellow-500/10 rounded-full flex items-center justify-center">
                <span className="text-sm">🌟</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Two Week Streak</p>
                <p className="text-xs text-muted-foreground">Consistent daily check-ins</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-green-500/10 rounded-full flex items-center justify-center">
                <span className="text-sm">🌱</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">Tree Caretaker</p>
                <p className="text-xs text-muted-foreground">Watered your tree 10 times</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="space-y-4">
        <h2 className="font-medium text-foreground">Settings</h2>
        
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Daily Reminders</span>
                </div>
                <Switch defaultChecked />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">Privacy Mode</span>
                </div>
                <Switch />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Menu Options */}
        <div className="space-y-2">
          <Button variant="ghost" className="w-full justify-start h-12">
            <HelpCircle className="w-4 h-4 mr-3" />
            Help & Support
          </Button>
          
          <Button variant="ghost" className="w-full justify-start h-12">
            <Settings className="w-4 h-4 mr-3" />
            Account Settings
          </Button>
        </div>
      </div>
    </div>
  );
}