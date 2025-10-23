import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, 
  MessageSquare, 
  PiggyBank, 
  Trophy, 
  Sparkles,
  BarChart3,
  Target,
  Zap
} from "lucide-react";
import ExpenseTracker from "@/components/ExpenseTracker";
import AIChat from "@/components/AIChat";
import InvestmentLearning from "@/components/InvestmentLearning";
import GamificationPanel from "@/components/GamificationPanel";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-10" />
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">AI-Powered Financial Mentor</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                Master Your
                <span className="gradient-primary text-gradient"> Finances</span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-lg">
                Track expenses, learn about investments, and build smart money habits with AI guidance. 
                Built for students and young adults starting their financial journey.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="gradient-primary shadow-glow"
                  onClick={() => setActiveTab("chat")}
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Chat with AI Mentor
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => setActiveTab("expenses")}
                >
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Track Expenses
                </Button>
              </div>
              
              <div className="flex items-center gap-8 pt-4">
                <div>
                  <div className="text-3xl font-bold gradient-success text-gradient">10K+</div>
                  <div className="text-sm text-muted-foreground">Students Learning</div>
                </div>
                <div>
                  <div className="text-3xl font-bold gradient-accent text-gradient">95%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-full" />
              <img 
                src={heroImage} 
                alt="Financial growth visualization" 
                className="relative rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Tracking</h3>
              <p className="text-sm text-muted-foreground">
                Analyze spending patterns and get personalized insights
              </p>
            </Card>

            <Card className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg gradient-success flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-secondary-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Investment Learning</h3>
              <p className="text-sm text-muted-foreground">
                Understand SIPs, mutual funds, and smart investment strategies
              </p>
            </Card>

            <Card className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg gradient-accent flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Mentor</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers to all your financial questions
              </p>
            </Card>

            <Card className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center mb-4">
                <Trophy className="w-6 h-6 text-gold-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Gamification</h3>
              <p className="text-sm text-muted-foreground">
                Earn rewards and compete as you build better habits
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 h-auto p-1">
              <TabsTrigger value="overview" className="flex flex-col gap-1 py-3">
                <Target className="w-5 h-5" />
                <span className="text-xs">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="expenses" className="flex flex-col gap-1 py-3">
                <PiggyBank className="w-5 h-5" />
                <span className="text-xs">Expenses</span>
              </TabsTrigger>
              <TabsTrigger value="invest" className="flex flex-col gap-1 py-3">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs">Invest</span>
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex flex-col gap-1 py-3">
                <MessageSquare className="w-5 h-5" />
                <span className="text-xs">AI Chat</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Your Financial Dashboard</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Get a complete view of your financial journey. Track expenses, learn about investments, 
                  and chat with our AI mentor anytime.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <GamificationPanel />
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-accent" />
                    Quick Actions
                  </h3>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("expenses")}
                    >
                      <PiggyBank className="w-5 h-5 mr-2" />
                      Log New Expense
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("chat")}
                    >
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Ask AI About SIPs
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => setActiveTab("invest")}
                    >
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Explore Investments
                    </Button>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="expenses">
              <ExpenseTracker />
            </TabsContent>

            <TabsContent value="invest">
              <InvestmentLearning />
            </TabsContent>

            <TabsContent value="chat">
              <AIChat />
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Index;
