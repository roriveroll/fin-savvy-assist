
import CreditScoreCard from "@/components/dashboard/CreditScoreCard";
import PaymentHistoryCard from "@/components/dashboard/PaymentHistoryCard";
import CreditUsageCard from "@/components/dashboard/CreditUsageCard";
import AccountsOverviewCard from "@/components/dashboard/AccountsOverviewCard";
import ExpensesAnalysisCard from "@/components/dashboard/ExpensesAnalysisCard";
import RecommendedProductsCard from "@/components/dashboard/RecommendedProductsCard";
import ChatbotPopup from "@/components/chatbot/ChatbotPopup";

const Dashboard = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold mb-1">Dashboard Financiero</h1>
        <p className="text-finance-gray-dark">Bienvenido a tu centro de control financiero</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <CreditScoreCard />
        <PaymentHistoryCard />
        <CreditUsageCard />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AccountsOverviewCard />
        <ExpensesAnalysisCard />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <RecommendedProductsCard />
      </div>
      
      <ChatbotPopup />
    </div>
  );
};

export default Dashboard;
