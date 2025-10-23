import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, DollarSign, PieChart, BookOpen } from "lucide-react";

const investments = [
  {
    title: "Systematic Investment Plan (SIP)",
    description: "Invest a fixed amount regularly in mutual funds. Perfect for building wealth over time with disciplined investing.",
    icon: TrendingUp,
    color: "primary",
    benefits: ["Start with ₹500/month", "Rupee cost averaging", "Power of compounding"]
  },
  {
    title: "Mutual Funds",
    description: "Pool money with other investors to invest in diversified portfolios managed by professionals.",
    icon: PieChart,
    color: "secondary",
    benefits: ["Professional management", "Diversification", "Liquidity"]
  },
  {
    title: "Fixed Deposits",
    description: "Safe investment option with guaranteed returns. Ideal for short to medium term goals.",
    icon: DollarSign,
    color: "accent",
    benefits: ["Guaranteed returns", "Low risk", "Tax benefits available"]
  },
  {
    title: "Financial Literacy",
    description: "Learn the fundamentals of personal finance, budgeting, and wealth creation strategies.",
    icon: BookOpen,
    color: "gold",
    benefits: ["Budget planning", "Tax saving", "Retirement planning"]
  }
];

const InvestmentLearning = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Investment Education</h2>
        <p className="text-muted-foreground">Learn the basics and start your investment journey</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {investments.map((investment, index) => {
          const Icon = investment.icon;
          const gradientClass = investment.color === "primary" ? "gradient-primary" :
                               investment.color === "secondary" ? "gradient-success" :
                               investment.color === "accent" ? "gradient-accent" :
                               "bg-gradient-to-br from-gold to-gold/60";
          
          return (
            <Card key={index} className="p-6 transition-smooth hover:shadow-lg hover:-translate-y-1">
              <div className={`w-14 h-14 rounded-xl ${gradientClass} flex items-center justify-center mb-4`}>
                <Icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{investment.title}</h3>
              <p className="text-muted-foreground mb-4">{investment.description}</p>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm font-medium">Key Benefits:</p>
                <ul className="space-y-1">
                  {investment.benefits.map((benefit, i) => (
                    <li key={i} className="text-sm text-muted-foreground flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
              
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </Card>
          );
        })}
      </div>

      {/* Investment Calculator Preview */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">SIP Calculator Preview</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Monthly Investment</p>
            <p className="text-2xl font-bold">₹5,000</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Expected Return (12% p.a.)</p>
            <p className="text-2xl font-bold gradient-success text-gradient">₹11.6L</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Time Period</p>
            <p className="text-2xl font-bold">10 Years</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-4 text-center">
          This is an illustrative example. Actual returns may vary based on market conditions.
        </p>
      </Card>
    </div>
  );
};

export default InvestmentLearning;
