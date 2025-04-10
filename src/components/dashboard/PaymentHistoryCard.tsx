
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const PaymentHistoryCard = () => {
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
  
  // Status: 1 = on time, 0 = late, 2 = pending
  const paymentHistory = [
    { month: 'ENE', status: 1 },
    { month: 'FEB', status: 1 },
    { month: 'MAR', status: 1 },
    { month: 'ABR', status: 0 },
    { month: 'MAY', status: 1 },
    { month: 'JUN', status: 1 },
    { month: 'JUL', status: 1 },
    { month: 'AGO', status: 1 },
    { month: 'SEP', status: 1 },
    { month: 'OCT', status: 1 },
    { month: 'NOV', status: 1 },
    { month: 'DIC', status: 2 },
  ];
  
  const onTimePayments = paymentHistory.filter(p => p.status === 1).length;
  const totalCompletedPayments = paymentHistory.filter(p => p.status !== 2).length;
  const onTimePercentage = Math.round((onTimePayments / totalCompletedPayments) * 100);
  
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
              <TooltipContent>
                <p>Un buen historial de pagos mejora tu score crediticio.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-12 gap-1 mb-6">
          {paymentHistory.map((payment, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="mb-2">
                {payment.status === 1 ? (
                  <CheckCircle className="h-6 w-6 text-finance-green" />
                ) : payment.status === 0 ? (
                  <XCircle className="h-6 w-6 text-finance-red" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-finance-gray" />
                )}
              </div>
              <span className="text-xs font-medium">{payment.month}</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-finance-green" />
              <span className="text-sm">A tiempo: <strong>{onTimePayments}</strong></span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-3 h-3 rounded-full bg-finance-red" />
              <span className="text-sm">Tardíos: <strong>{totalCompletedPayments - onTimePayments}</strong></span>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-3xl font-bold text-finance-blue">{onTimePercentage}%</div>
            <div className="text-xs text-finance-gray">Pagos a tiempo</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistoryCard;
