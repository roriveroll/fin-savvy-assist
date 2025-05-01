
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { Info } from "lucide-react";
import { Tooltip as UITooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
  
    return percent > 0.05 ? (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    ) : null;
  };

  return (
    <Card className="card-shadow">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Análisis de Gastos</CardTitle>
          <UITooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p>Desglose de tus gastos mensuales por categoría. Te ayuda a identificar dónde estás gastando más dinero y a planificar tu presupuesto de manera más efectiva.</p>
            </TooltipContent>
          </UITooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-full md:w-1/2 h-[240px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => `€${value}`} />
                <Legend 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: "15px" }}
                  formatter={(value) => <span style={{ fontSize: '12px' }}>{value}</span>}
                />
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
                        style={{ backgroundColor: COLORS[expenseData.findIndex(e => e.name === expense.name) % COLORS.length] }}
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
