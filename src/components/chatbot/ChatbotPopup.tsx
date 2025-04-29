
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ChatInterface from "@/components/chatbot/ChatInterface";

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [apiKeySet, setApiKeySet] = useState(false);

  const handleSubmitApiKey = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      setApiKeySet(true);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          className="fixed bottom-6 right-6 bg-finance-blue text-white p-4 rounded-full shadow-lg hover:bg-finance-blue/90 transition-colors z-50 flex items-center justify-center" 
          aria-label="Abrir asistente financiero"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[400px] max-h-[80vh] p-0 flex flex-col overflow-hidden">
        <DialogHeader className="p-4 bg-finance-blue text-white">
          <DialogTitle className="flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Asistente Financiero
          </DialogTitle>
          <p className="text-xs opacity-80 mt-1 text-left">
            Respuestas personalizadas basadas en tu perfil financiero
          </p>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ChatInterface apiKey={apiKeySet ? apiKey : undefined} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPopup;
