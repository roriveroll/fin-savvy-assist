
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Info, ArrowUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Link } from "react-router-dom";

const AccountsOverviewCard = () => {
  const accounts = [
    { type: 'Cuenta de Débito', name: 'Nómina', balance: 17250.75, currency: 'MXN', trend: 'up' },
    { type: 'Cuenta de Ahorros', name: 'Ahorro Vacaciones', balance: 35000, currency: 'MXN', trend: 'up' },
    { type: 'Inversión', name: 'CETES', balance: 50000, currency: 'MXN', trend: 'up' },
    { type: 'Tarjeta de Crédito', name: 'Platinum', balance: -24500, currency: 'MXN', trend: 'down' },
  ];
  
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(amount);
  };
  
  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="px-6 pb-0 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Cuentas Activas</CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="h-4 w-4 text-finance-gray" />
              </TooltipTrigger>
              <TooltipContent className="w-80 p-3 text-sm">
                <p>En esta sección encontrarás un resumen de todas tus cuentas bancarias y de inversión activas, así como tus tarjetas de crédito.</p>
                <p className="mt-2">Puedes ver el saldo actual de cada cuenta, su tendencia reciente y el tipo de cuenta. Esta información te ayudará a tener una visión general de tu situación financiera.</p>
                <p className="mt-2">Mantener diversas cuentas financieras te permite organizar mejor tus finanzas y aprovechar diferentes beneficios según tus necesidades.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {accounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <div className="text-sm text-finance-gray-dark">{account.type}</div>
                <div className="font-medium">{account.name}</div>
              </div>
              
              <div className="text-right">
                <div className={`font-semibold ${account.balance < 0 ? 'text-finance-red' : 'text-finance-gray-dark'}`}>
                  {formatCurrency(Math.abs(account.balance), account.currency)}
                </div>
                <div className={`text-xs ${account.trend === 'up' ? 'text-finance-green' : 'text-finance-red'} flex items-center justify-end`}>
                  {account.trend === 'up' ? '+2.4%' : '-1.8%'}
                  <ArrowUpRight className={`h-3 w-3 ml-1 ${account.trend === 'down' ? 'transform rotate-90' : ''}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-100">
          <Link to="/accounts" className="text-finance-blue flex items-center justify-center font-medium">
            Ver todas las cuentas
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsOverviewCard;
