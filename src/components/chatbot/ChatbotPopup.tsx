
import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatInterface from "@/components/chatbot/ChatInterface";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

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
      <DialogContent className="sm:max-w-[500px] h-[600px] p-0">
        <div className="flex flex-col h-full">
          <div className="bg-finance-blue text-white p-4 flex justify-between items-center">
            <h2 className="font-medium flex items-center">
              <MessageCircle className="h-5 w-5 mr-2" />
              Asistente Financiero
            </h2>
            <div className="flex items-center gap-2">
              {!apiKeySet && (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 bg-white/20 border-white/40 text-white hover:bg-white/30 hover:text-white">
                      Conectar AI
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-4">
                    <h3 className="font-medium mb-2">Conectar a un servicio de IA</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Ingresa tu API key para conectar con un servicio externo como OpenAI, Perplexity, etc.
                    </p>
                    <form onSubmit={handleSubmitApiKey} className="space-y-2">
                      <Input
                        type="password"
                        placeholder="Ingresa tu API key aquí"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                      <Button type="submit" className="w-full">Conectar</Button>
                    </form>
                  </PopoverContent>
                </Popover>
              )}
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
          <ScrollArea className="flex-1 overflow-auto">
            <div className="p-4">
              <ChatInterface apiKey={apiKeySet ? apiKey : undefined} />
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ChatbotPopup;
