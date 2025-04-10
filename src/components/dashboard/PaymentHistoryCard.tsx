
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PaymentHistoryCard = () => {
  const paymentData = {
    onTime: 11,
    late: 1,
    total: 12
  };
  
  const onTimePercentage = Math.round((paymentData.onTime / paymentData.total) * 100);
  
  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="px-6 pb-0 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Historial de Pagos</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-finance-gray" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3 text-sm">
                <p>En esta sección podrás ver un resumen de tu historial de pagos, que es uno de los factores más importantes para tu score crediticio.</p>
                <p className="mt-2">Aquí puedes ver cuántas veces has realizado tus pagos a tiempo y cuántos pagos han estado fuera de tiempo. Mantener un buen historial de pagos es fundamental para mejorar tu calificación crediticia y obtener mejores condiciones en futuros créditos.</p>
                <p className="mt-2">Recuerda que los pagos tardíos pueden permanecer en tu historial crediticio hasta por 72 meses.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <CheckCircle className="h-12 w-12 text-finance-green mr-4" />
            <div>
              <div className="text-3xl font-bold">{paymentData.onTime}</div>
              <div className="text-sm text-finance-gray-dark">Pagos a tiempo</div>
            </div>
          </div>
          
          <div className="flex items-center">
            <XCircle className="h-12 w-12 text-finance-red mr-4" />
            <div>
              <div className="text-3xl font-bold">{paymentData.late}</div>
              <div className="text-sm text-finance-gray-dark">Pagos tardíos</div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center items-center">
          <div className="text-center">
            <div className="text-4xl font-bold text-finance-blue">{onTimePercentage}%</div>
            <div className="text-sm text-finance-gray-dark">Pagos realizados a tiempo</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistoryCard;
