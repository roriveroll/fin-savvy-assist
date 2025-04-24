import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  return <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="fixed bottom-6 right-6 bg-finance-blue text-white p-4 rounded-full shadow-lg hover:bg-finance-blue/90 transition-colors z-50 flex items-center justify-center" aria-label="Abrir asistente financiero">
          <MessageCircle className="h-6 w-6" />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] h-[600px] p-0 mx-auto">
        <div className="flex flex-col h-full max-w-[500px] mx-auto">
          
          <div className="flex-1 overflow-hidden">
            <ChatInterface apiKey={apiKeySet ? apiKey : undefined} />
          </div>
        </div>
      </DialogContent>
    </Dialog>;
};
export default ChatbotPopup;