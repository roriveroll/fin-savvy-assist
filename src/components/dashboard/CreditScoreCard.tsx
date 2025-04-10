
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Info } from "lucide-react";

const CreditScoreCard = () => {
  const score = 715;
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;
  
  const getScoreCategory = (score: number) => {
    if (score >= 750) return { label: "Excelente", color: "bg-finance-green" };
    if (score >= 700) return { label: "Bueno", color: "bg-finance-blue" };
    if (score >= 650) return { label: "Aceptable", color: "bg-finance-yellow" };
    if (score >= 600) return { label: "Regular", color: "bg-finance-yellow-dark" };
    return { label: "Baja", color: "bg-finance-red" };
  };
  
  const scoreInfo = getScoreCategory(score);

  return (
    <Card className="card-shadow card-hover">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-lg">Score Crediticio</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-finance-gray" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3 text-sm">
                <p>En esta sección encontrarás tu Calificación Crediticia y cada uno de los factores que la componen. Esta calificación tiene el nombre de BC Score® y es calculada por Buró de Crédito (la sociedad de información crediticia más importante en México).</p>
                <p className="mt-2">Tu calificación o BC Score puede ir de 456 a los 760 puntos (mientras más alto, es mejor) e indica en un solo número tu comportamiento crediticio. Sirve para que cuando solicites un nuevo crédito las instituciones financieras sepan si eres un buen o mal pagador.</p>
                <p className="mt-2">Una baja calificación puede causar que te den las tasas de interés más altas o incluso te nieguen un crédito. Una calificación alta te permitirá acceder a más opciones de créditos y con las tasas más bajas.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex items-center justify-center my-6">
          <div className="relative flex flex-col items-center justify-center">
            <div className="absolute text-3xl font-bold text-finance-blue">{score}</div>
            <svg className="w-32 h-32 transform -rotate-90">
              <circle 
                className="text-finance-gray-light"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
              <circle
                className={scoreInfo.color}
                strokeWidth="8"
                strokeDasharray={`${percentage * 3.51} 351`}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="56"
                cx="64"
                cy="64"
              />
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
    </Card>
  );
};

export default CreditScoreCard;
