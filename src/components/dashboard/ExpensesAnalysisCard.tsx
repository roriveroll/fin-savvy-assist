
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ExpensesAnalysisCardProps {
  expenses?: Record<string, number>;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const ExpensesAnalysisCard = ({ expenses = {} }: ExpensesAnalysisCardProps) => {
  // Use provided expenses or default if empty
  const expenseData = Object.keys(expenses).length > 0
    ? Object.entries(expenses).map(([name, value]) => ({ name, value }))
    : [
        { name: "Alimentación", value: 450 },
        { name: "Vivienda", value: 800 },
        { name: "Transporte", value: 200 },
        { name: "Entretenimiento", value: 150 },
        { name: "Servicios", value: 350 },
        { name: "Otros", value: 100 }
      ];

  const totalExpenses = expenseData.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Análisis de Gastos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `€${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="w-full md:w-1/2 space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <p className="text-sm text-gray-500">Gastos Totales Mensuales</p>
              <p className="text-2xl font-semibold text-finance-blue">
                €{totalExpenses.toLocaleString()}
              </p>
            </div>
            
            <div className="space-y-2">
              {expenseData
                .sort((a, b) => b.value - a.value)
                .slice(0, 3)
                .map((expense, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      ></div>
                      <span>{expense.name}</span>
                    </div>
                    <span className="font-medium">€{expense.value}</span>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesAnalysisCard;
