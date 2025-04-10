
import ChatInterface from "@/components/chatbot/ChatInterface";

const Chatbot = () => {
  return (
    <div className="h-[calc(100vh-128px)] animate-fade-in">
      <div className="mb-4">
        <h1 className="text-2xl font-bold mb-1">Asistente Financiero</h1>
        <p className="text-finance-gray-dark">Tu asesor personal para resolver todas tus dudas financieras</p>
      </div>
      
      <div className="h-[calc(100%-4rem)] bg-white rounded-lg shadow-sm">
        <ChatInterface />
      </div>
    </div>
  );
};

export default Chatbot;
