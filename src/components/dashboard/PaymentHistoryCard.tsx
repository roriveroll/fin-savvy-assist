
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

interface Payment {
  date: string;
  amount: number;
  concept: string;
  status: "paid" | "pending" | "late";
}

interface PaymentHistoryCardProps {
  history?: Payment[];
}

const PaymentHistoryCard = ({ history = [] }: PaymentHistoryCardProps) => {
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "paid":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "late":
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "paid":
        return "Pagado";
      case "pending":
        return "Pendiente";
      case "late":
        return "Atrasado";
      default:
        return "";
    }
  };

  const displayHistory = history.length > 0 
    ? history 
    : [
        { date: "2025-04-15", amount: 500, concept: "Préstamo personal", status: "paid" },
        { date: "2025-03-15", amount: 500, concept: "Préstamo personal", status: "paid" },
        { date: "2025-02-15", amount: 500, concept: "Préstamo personal", status: "late" }
      ];

  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Historial de Pagos</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {displayHistory.slice(0, 4).map((payment, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-full">
                  {getStatusIcon(payment.status)}
                </div>
                <div>
                  <p className="font-medium">{payment.concept}</p>
                  <p className="text-sm text-gray-500">{formatDate(payment.date)}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">€{payment.amount}</p>
                <p className={`text-sm ${
                  payment.status === "paid" ? "text-green-500" : 
                  payment.status === "pending" ? "text-yellow-500" : "text-red-500"
                }`}>
                  {getStatusText(payment.status)}
                </p>
              </div>
            </div>
          ))}
          
          {displayHistory.length === 0 && (
            <div className="text-center py-4 text-gray-500">
              No hay historial de pagos disponible
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentHistoryCard;
