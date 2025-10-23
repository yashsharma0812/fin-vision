import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  MessageSquare, 
  PiggyBank, 
  Trophy, 
  Sparkles,
  BarChart3,
  LogIn
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Check if user is logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (session) {
        navigate("/dashboard");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

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
                  onClick={() => navigate("/auth")}
                >
                  <LogIn className="w-5 h-5 mr-2" />
                  Get Started Free
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => navigate("/auth")}
                >
                  Login
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

      {/* CTA Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <Card className="p-12 gradient-hero text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Master Your Finances?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of students building better financial habits with FinVision
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              onClick={() => navigate("/auth")}
              className="shadow-lg"
            >
              <LogIn className="w-5 h-5 mr-2" />
              Create Free Account
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
