
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CreditUsageCardProps {
  totalCredit: number;
  usedCredit: number;
}

const CreditUsageCard = ({ totalCredit, usedCredit }: CreditUsageCardProps) => {
  const usagePercentage = Math.round((usedCredit / totalCredit) * 100);
  const availableCredit = totalCredit - usedCredit;
  
  // Determine color based on usage percentage
  const getProgressColor = () => {
    if (usagePercentage <= 30) return "bg-green-500";
    if (usagePercentage <= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Uso de Crédito</CardTitle>
            <CardDescription>Balance y disponibilidad de tu crédito</CardDescription>
          </div>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent side="left" className="max-w-xs">
              <p>El uso de crédito muestra cuánto del crédito disponible estás utilizando actualmente. Mantener el uso por debajo del 30% de tu límite es recomendado para un buen puntaje crediticio.</p>
            </TooltipContent>
          </Tooltip>
        </div>
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
            indicatorClassName={getProgressColor()}
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
