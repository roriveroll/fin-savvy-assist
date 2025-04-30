
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, PiggyBank, Landmark } from "lucide-react";

interface AccountsOverviewCardProps {
  checking?: number;
  savings?: number;
  loans?: number;
}

const AccountsOverviewCard = ({ 
  checking = 4500, 
  savings = 12000, 
  loans = 25000 
}: AccountsOverviewCardProps) => {
  const totalAssets = checking + savings;
  const netWorth = totalAssets - loans;
  
  const accounts = [
    {
      name: "Cuenta Corriente",
      balance: checking,
      icon: Wallet,
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "Cuenta de Ahorro",
      balance: savings,
      icon: PiggyBank,
      color: "bg-green-100 text-green-700",
    },
    {
      name: "Préstamos",
      balance: loans,
      icon: Landmark,
      color: "bg-red-100 text-red-700",
      isDebt: true,
    },
  ];

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Resumen de Cuentas</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Activos Totales</p>
            <p className="text-2xl font-semibold text-green-600">
              €{totalAssets.toLocaleString()}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Patrimonio Neto</p>
            <p className={`text-2xl font-semibold ${netWorth >= 0 ? "text-green-600" : "text-red-600"}`}>
              €{netWorth.toLocaleString()}
            </p>
          </div>
        </div>

        <div className="divide-y">
          {accounts.map((account, index) => (
            <div key={index} className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${account.color}`}>
                  <account.icon className="h-5 w-5" />
                </div>
                <span>{account.name}</span>
              </div>
              <span className={`font-medium ${account.isDebt ? "text-red-600" : ""}`}>
                {account.isDebt ? "-" : ""}€{account.balance.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountsOverviewCard;
