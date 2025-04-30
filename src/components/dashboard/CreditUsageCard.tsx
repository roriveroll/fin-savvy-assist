
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface CreditUsageCardProps {
  totalCredit?: number;
  usedCredit?: number;
}

const CreditUsageCard = ({ 
  totalCredit = 5000, 
  usedCredit = 1500 
}: CreditUsageCardProps) => {
  // Calculate percentage of credit used
  const usagePercentage = Math.round((usedCredit / totalCredit) * 100);
  const availableCredit = totalCredit - usedCredit;
  
  // Determine status color based on usage
  const getStatusColor = () => {
    if (usagePercentage <= 30) return "bg-green-500";
    if (usagePercentage <= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Uso de Crédito</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Uso</span>
              <span className="font-medium">{usagePercentage}%</span>
            </div>
            <Progress value={usagePercentage} className="h-2" indicatorClassName={getStatusColor()} />
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Disponible</p>
              <p className="text-lg font-semibold text-green-600">€{availableCredit.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg text-center">
              <p className="text-sm text-gray-500">Límite</p>
              <p className="text-lg font-semibold">€{totalCredit.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="bg-finance-blue-light rounded-lg p-3">
            <p className="text-sm font-medium text-finance-blue">
              {usagePercentage <= 30 ? (
                "Excelente uso de tu crédito. Mantén un uso bajo para mejorar tu puntaje."
              ) : usagePercentage <= 60 ? (
                "Buen manejo de crédito. Considera reducir ligeramente para optimizar tu puntaje."
              ) : (
                "Alto uso de crédito. Intenta reducirlo por debajo del 30% para mejorar tu puntaje."
              )}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditUsageCard;
