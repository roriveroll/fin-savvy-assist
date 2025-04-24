import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";
const CreditScoreCard = () => {
  const score = 715;
  const maxScore = 850;
  const percentage = score / maxScore * 100;
  const getScoreCategory = (score: number) => {
    if (score >= 750) return {
      label: "Excelente",
      color: "bg-finance-green"
    };
    if (score >= 700) return {
      label: "Bueno",
      color: "bg-finance-blue"
    };
    if (score >= 650) return {
      label: "Aceptable",
      color: "bg-finance-yellow"
    };
    if (score >= 600) return {
      label: "Regular",
      color: "bg-finance-yellow-dark"
    };
    return {
      label: "Baja",
      color: "bg-finance-red"
    };
  };
  const scoreInfo = getScoreCategory(score);
  return <Card className="card-shadow card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">Score Crediticio</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-finance-gray" />
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-64">Este indicador muestra tu puntaje actual del buró de crédito, calculado con base en tu historial financiero y comportamiento de pagos. Un score alto puede ayudarte a obtener mejores condiciones en préstamos, tarjetas de crédito y otros productos financieros.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center justify-center my-6">
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute text-3xl font-bold text-finance-blue">{score}</div>
            <svg className="w-32 h-32 transform -rotate-90">
              <circle className="text-finance-gray-light" strokeWidth="8" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
              <circle className={scoreInfo.color} strokeWidth="8" strokeDasharray={`${percentage * 3.51} 351`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="56" cx="64" cy="64" />
            </svg>
          </div>
        </div>
        
        <div className="flex justify-between text-sm text-finance-gray-dark">
          <span>0</span>
          <span className={`font-medium ${scoreInfo.color.replace('bg-', 'text-')}`}>
            {scoreInfo.label}
          </span>
          <span>{maxScore}</span>
        </div>
        
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xs text-finance-gray">Last updated:</span>
          <span className="text-xs font-medium">Abril 8, 2025</span>
        </div>
      </CardContent>
    </Card>;
};
export default CreditScoreCard;