
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatInterface from "@/components/chatbot/ChatInterface";

const ChatbotPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button 
          className="fixed bottom-6 right-6 bg-finance-blue text-white p-3 rounded-full shadow-lg hover:bg-finance-blue/90 transition-colors z-50"
          aria-label="Abrir asistente financiero"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[500px] p-0">
        <div className="flex flex-col h-full">
          <div className="bg-finance-blue text-white p-4 flex justify-between items-center">
            <h2 className="font-medium">Asistente Financiero</h2>
            <button 
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-hidden">
            <ChatInterface />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPopup;
