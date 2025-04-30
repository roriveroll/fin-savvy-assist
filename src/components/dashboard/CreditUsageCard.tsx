
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CreditUsageCardProps {
  totalCredit: number;
  usedCredit: number;
}

const CreditUsageCard = ({ totalCredit, usedCredit }: CreditUsageCardProps) => {
  const usagePercentage = Math.round((usedCredit / totalCredit) * 100);
  const availableCredit = totalCredit - usedCredit;
  
  // Determine color based on usage percentage
  const getUsageColor = () => {
    if (usagePercentage <= 30) return "bg-green-500";
    if (usagePercentage <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Uso de Crédito</CardTitle>
        <CardDescription>Balance y disponibilidad de tu crédito</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-finance-gray-dark">Utilizado ({usagePercentage}%)</span>
            <span className="text-sm font-medium">${usedCredit.toLocaleString()}</span>
          </div>
          
          <Progress 
            value={usagePercentage} 
            className="h-2 bg-gray-200" 
            // Fix: Remove the indicatorClassName prop
          />
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-finance-gray-dark">Disponible</span>
            <span className="text-sm font-medium">${availableCredit.toLocaleString()}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full p-3 bg-finance-blue-light rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm text-finance-gray-dark">Total</span>
            <span className="font-semibold">${totalCredit.toLocaleString()}</span>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CreditUsageCard;
