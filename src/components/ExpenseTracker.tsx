import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { PlusCircle, TrendingDown, TrendingUp, DollarSign } from "lucide-react";
import { toast } from "sonner";

interface Expense {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

const categories = [
  "Food & Dining",
  "Transportation",
  "Shopping",
  "Entertainment",
  "Bills & Utilities",
  "Education",
  "Healthcare",
  "Other"
];

const ExpenseTracker = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", amount: 45, category: "Food & Dining", description: "Lunch with friends", date: "2025-10-20" },
    { id: "2", amount: 120, category: "Shopping", description: "New textbooks", date: "2025-10-19" },
    { id: "3", amount: 30, category: "Transportation", description: "Weekly metro pass", date: "2025-10-18" },
  ]);
  
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const avgExpense = expenses.length > 0 ? totalExpenses / expenses.length : 0;

  const handleAddExpense = () => {
    if (!amount || !category || !description) {
      toast.error("Please fill in all fields");
      return;
    }

    const newExpense: Expense = {
      id: Date.now().toString(),
      amount: parseFloat(amount),
      category,
      description,
      date: new Date().toISOString().split('T')[0]
    };

    setExpenses([newExpense, ...expenses]);
    setAmount("");
    setCategory("");
    setDescription("");
    toast.success("Expense added successfully!");
  };

  const categoryTotals = expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold">Expense Tracker</h2>
        <p className="text-muted-foreground">Track your spending and identify savings opportunities</p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-3xl font-bold gradient-primary text-gradient">
                ${totalExpenses.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Average Transaction</p>
              <p className="text-3xl font-bold gradient-success text-gradient">
                ${avgExpense.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-secondary" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Top Category</p>
              <p className="text-xl font-bold">
                {topCategory ? topCategory[0] : "N/A"}
              </p>
              <p className="text-sm text-muted-foreground">
                ${topCategory ? topCategory[1].toFixed(2) : "0.00"}
              </p>
            </div>
            <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-accent" />
            </div>
          </div>
        </Card>
      </div>

      {/* Add Expense Form */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Add New Expense</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="What did you buy?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          
          <div className="flex items-end">
            <Button onClick={handleAddExpense} className="w-full gradient-primary">
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </Card>

      {/* Expense List */}
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">Recent Expenses</h3>
        <div className="space-y-3">
          {expenses.map((expense) => (
            <div 
              key={expense.id} 
              className="flex items-center justify-between p-4 bg-muted/30 rounded-lg transition-smooth hover:bg-muted/50"
            >
              <div className="flex-1">
                <p className="font-medium">{expense.description}</p>
                <p className="text-sm text-muted-foreground">{expense.category}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold text-lg">${expense.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{expense.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ExpenseTracker;
