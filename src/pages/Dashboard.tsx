import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LogOut,
  TrendingUp, 
  MessageSquare, 
  PiggyBank, 
  Target,
  User,
  Shield
} from "lucide-react";
import ExpenseTracker from "@/components/ExpenseTracker";
import AIChat from "@/components/AIChat";
import InvestmentLearning from "@/components/InvestmentLearning";
import GamificationPanel from "@/components/GamificationPanel";
import AdminPanel from "@/components/AdminPanel";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [userRole, setUserRole] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else {
        fetchUserProfile(session.user.id);
        fetchUserRole(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      } else if (event === 'SIGNED_IN') {
        // Defer Supabase calls to avoid deadlock
        setTimeout(() => {
          fetchUserProfile(session.user.id);
          fetchUserRole(session.user.id);
        }, 0);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching profile:', error);
    } else {
      setProfile(data);
    }
  };

  const fetchUserRole = async (userId: string) => {
    const { data, error } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .maybeSingle();
    
    if (error) {
      console.error('Error fetching role:', error);
    } else {
      setUserRole(data?.role || 'user');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast.error("Error logging out");
    } else {
      toast.success("Logged out successfully");
      navigate("/");
    }
  };

  if (!session) {
    return null; // Loading state while checking auth
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-primary text-gradient">FinVision</h1>
              {userRole === 'admin' && (
                <span className="px-3 py-1 rounded-full bg-gold/10 text-gold text-sm font-medium flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium">{profile?.full_name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{session.user.email}</p>
              </div>
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className={`grid w-full max-w-2xl mx-auto ${userRole === 'admin' ? 'grid-cols-5' : 'grid-cols-4'} h-auto p-1`}>
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
              {userRole === 'admin' && (
                <TabsTrigger value="admin" className="flex flex-col gap-1 py-3">
                  <Shield className="w-5 h-5" />
                  <span className="text-xs">Admin</span>
                </TabsTrigger>
              )}
            </TabsList>

            <TabsContent value="overview" className="space-y-8">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Welcome back, {profile?.full_name?.split(' ')[0]}!</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Track your progress and continue building smart financial habits.
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <GamificationPanel />
                <Card className="p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary" />
                    Quick Stats
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">Account Status</span>
                      <span className="font-semibold text-secondary">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                      <span className="text-sm text-muted-foreground">Member Since</span>
                      <span className="font-semibold">
                        {new Date(profile?.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    {userRole && (
                      <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                        <span className="text-sm text-muted-foreground">Role</span>
                        <span className="font-semibold capitalize">{userRole}</span>
                      </div>
                    )}
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

            {userRole === 'admin' && (
              <TabsContent value="admin">
                <AdminPanel />
              </TabsContent>
            )}
          </Tabs>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
