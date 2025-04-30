
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import ChatbotPopup from "@/components/chatbot/ChatbotPopup";

const Profile = () => {
  const { currentUser } = useAuth();
  
  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Perfil Personal</h1>
        <p className="text-finance-gray-dark">Gestiona tu información personal y preferencias</p>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16 bg-finance-blue-light text-finance-blue">
              <AvatarFallback>{currentUser?.name ? getInitials(currentUser.name) : "U"}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle>{currentUser?.name}</CardTitle>
              <CardDescription>{currentUser?.email}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-sm text-finance-gray-dark">ID de Cliente</h3>
                <p>{currentUser?.id}</p>
              </div>
              
              <div>
                <h3 className="font-medium text-sm text-finance-gray-dark">Puntuación Crediticia</h3>
                <p>{currentUser?.financialInfo.creditScore}</p>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <h3 className="font-medium mb-2">Resumen Financiero</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-finance-gray-dark">Saldo de Cuenta</dt>
                    <dd className="font-medium">${currentUser?.financialInfo.accountBalance.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-finance-gray-dark">Ahorros</dt>
                    <dd className="font-medium">${currentUser?.financialInfo.savingsBalance.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-finance-gray-dark">Saldo de Préstamos</dt>
                    <dd className="font-medium">${currentUser?.financialInfo.loanBalance.toLocaleString()}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-finance-gray-dark">Saldo de Tarjeta de Crédito</dt>
                    <dd className="font-medium">${currentUser?.financialInfo.creditCardBalance.toLocaleString()}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <ChatbotPopup />
    </div>
  );
};

export default Profile;
