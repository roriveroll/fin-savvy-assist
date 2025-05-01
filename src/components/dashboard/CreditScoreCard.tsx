
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface CreditScoreCardProps {
  score?: number;
}

const CreditScoreCard = ({ score = 750 }: CreditScoreCardProps) => {
  // Credit score rating logic
  const getRating = () => {
    if (score >= 800) return { text: "Excelente", color: "text-green-600" };
    if (score >= 740) return { text: "Muy Bueno", color: "text-green-500" };
    if (score >= 670) return { text: "Bueno", color: "text-yellow-500" };
    if (score >= 580) return { text: "Regular", color: "text-orange-500" };
    return { text: "Necesita Mejorar", color: "text-red-500" };
  };

  const rating = getRating();
  const percentage = Math.min(Math.max((score / 850) * 100, 0), 100);

  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Puntaje Crediticio</CardTitle>
          <Tooltip>
            <TooltipTrigger>
              <Info className="h-5 w-5 text-gray-400" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>El puntaje crediticio es una calificación que representa tu historial de crédito. Varía de 300 a 850, donde un puntaje más alto indica un mejor historial crediticio.</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center pt-2">
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* SVG circle background */}
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e6e6e6"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="url(#creditGradient)"
                strokeWidth="8"
                strokeDasharray={`${percentage * 2.83}, 283`}
                strokeLinecap="round"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="creditGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#4338ca" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-bold">{score}</span>
              <span className={`text-sm font-medium ${rating.color}`}>
                {rating.text}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 w-full mt-6 text-sm">
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Mínimo</p>
              <p className="font-semibold">300</p>
            </div>
            <div className="text-center p-2 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Máximo</p>
              <p className="font-semibold">850</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditScoreCard;
