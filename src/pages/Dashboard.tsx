
import { useAuth } from "@/contexts/AuthContext";
import CreditScoreCard from "@/components/dashboard/CreditScoreCard";
import PaymentHistoryCard from "@/components/dashboard/PaymentHistoryCard";
import CreditUsageCard from "@/components/dashboard/CreditUsageCard";
import AccountsOverviewCard from "@/components/dashboard/AccountsOverviewCard";
import ExpensesAnalysisCard from "@/components/dashboard/ExpensesAnalysisCard";
import RecommendedProductsCard from "@/components/dashboard/RecommendedProductsCard";
import ChatbotPopup from "@/components/chatbot/ChatbotPopup";

const Dashboard = () => {
  const { currentUser } = useAuth();
  const financialInfo = currentUser?.financialInfo || {
    creditScore: 0,
    accountBalance: 0,
    savingsBalance: 0,
    loanBalance: 0,
    creditCardBalance: 0,
    paymentHistory: [],
    expenseCategories: {}
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard Financiero</h1>
        <p className="text-finance-gray-dark">Bienvenido {currentUser?.name} a tu centro de control financiero</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CreditScoreCard score={financialInfo.creditScore} />
        <PaymentHistoryCard history={financialInfo.paymentHistory} />
        <CreditUsageCard 
          totalCredit={financialInfo.creditCardBalance + 2000} 
          usedCredit={financialInfo.creditCardBalance} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountsOverviewCard 
          checking={financialInfo.accountBalance}
          savings={financialInfo.savingsBalance}
          loans={financialInfo.loanBalance}
        />
        <ExpensesAnalysisCard expenses={financialInfo.expenseCategories} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecommendedProductsCard creditScore={financialInfo.creditScore} />
      </div>
      
      <ChatbotPopup />
    </div>
  );
};

export default Dashboard;
