import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, Target, Zap } from "lucide-react";

const achievements = [
  { id: 1, title: "First Expense Logged", icon: Star, earned: true, color: "text-gold" },
  { id: 2, title: "Week Streak", icon: Zap, earned: true, color: "text-accent" },
  { id: 3, title: "Budget Master", icon: Target, earned: false, color: "text-muted-foreground" },
  { id: 4, title: "Investment Explorer", icon: Trophy, earned: false, color: "text-muted-foreground" },
];

const GamificationPanel = () => {
  const points = 450;
  const level = 3;
  const nextLevelPoints = 500;
  const progress = (points / nextLevelPoints) * 100;

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Your Progress</h3>
          <div className="px-3 py-1 rounded-full gradient-accent text-accent-foreground text-sm font-medium">
            Level {level}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">SmartSaver Points</span>
            <span className="font-semibold">{points} / {nextLevelPoints}</span>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {nextLevelPoints - points} points to Level {level + 1}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium flex items-center gap-2">
          <Trophy className="w-4 h-4 text-gold" />
          Achievements
        </h4>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className={`p-3 rounded-lg border-2 transition-smooth ${
                  achievement.earned
                    ? "border-gold bg-gold/5"
                    : "border-border bg-muted/30"
                }`}
              >
                <Icon className={`w-6 h-6 mb-2 ${achievement.color}`} />
                <p className="text-xs font-medium">{achievement.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Global Rank</span>
          <span className="font-semibold gradient-primary text-gradient">#1,247</span>
        </div>
      </div>
    </Card>
  );
};

export default GamificationPanel;
