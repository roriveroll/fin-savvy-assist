
import { useState, useRef, useEffect } from "react";
import { Send, User, Bot, PlusCircle, CreditCard, ArrowRight, Wallet, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  type: "user" | "bot";
  text: string;
  options?: {
    title: string;
    description: string;
    icon: React.ElementType;
  }[];
  products?: {
    name: string;
    description: string;
    match: number;
  }[];
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      type: "bot",
      text: "¡Hola! Soy tu asistente financiero. ¿En qué puedo ayudarte hoy?"
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (input.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      type: "user",
      text: input
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      let botResponse: Message;

      if (input.toLowerCase().includes("tarjeta") || input.toLowerCase().includes("crédito")) {
        botResponse = {
          id: messages.length + 2,
          type: "bot",
          text: "Basado en tu perfil financiero, te recomiendo estas tarjetas de crédito:",
          products: [
            {
              name: "Tarjeta Rewards Plus",
              description: "3% cashback en restaurantes, 2% en viajes",
              match: 95
            },
            {
              name: "Tarjeta Platinum",
              description: "Tasa preferencial y beneficios exclusivos",
              match: 87
            }
          ]
        };
      } else if (input.toLowerCase().includes("ahorro") || input.toLowerCase().includes("ahorrar")) {
        botResponse = {
          id: messages.length + 2,
          type: "bot",
          text: "Aquí hay algunos consejos para mejorar tus hábitos de ahorro:",
          options: [
            {
              title: "Regla 50/30/20",
              description: "Destina 50% a necesidades, 30% a deseos y 20% a ahorro.",
              icon: Wallet
            },
            {
              title: "Ahorro automático",
              description: "Configura transferencias automáticas a tu cuenta de ahorro cada quincena.",
              icon: ArrowRight
            }
          ]
        };
      } else if (input.toLowerCase().includes("préstamo") || input.toLowerCase().includes("crédito auto")) {
        botResponse = {
          id: messages.length + 2,
          type: "bot",
          text: "Con tu score crediticio de 715, podrías calificar para un crédito automotriz con una tasa desde 9.9% anual. ¿Te gustaría hacer una simulación personalizada?",
        };
      } else {
        botResponse = {
          id: messages.length + 2,
          type: "bot",
          text: "Puedo ayudarte con información sobre tus finanzas, recomendaciones de productos, consejos de ahorro o simulaciones de crédito. ¿Sobre qué tema específico te gustaría saber más?",
        };
      }

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleProductSelect = (productName: string) => {
    toast({
      title: "Producto seleccionado",
      description: `Has seleccionado ${productName}. Un asesor se pondrá en contacto contigo pronto.`,
    });
  };

  const suggestedQuestions = [
    "¿Cómo puedo mejorar mi score crediticio?",
    "¿Qué tarjeta de crédito me recomiendas?",
    "Consejos para ahorrar dinero",
    "¿Califico para un crédito automotriz?"
  ];

  return (
    <div className="h-full flex flex-col rounded-lg overflow-hidden bg-white">
      <div className="bg-finance-blue px-6 py-4 text-white">
        <div className="flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          <h2 className="font-medium">Asistente Financiero</h2>
        </div>
        <p className="text-xs opacity-80 mt-1">
          Respuestas personalizadas basadas en tu perfil financiero
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
          >
            <div 
              className={`max-w-[80%] rounded-2xl p-3 ${
                message.type === "user" 
                  ? "bg-finance-blue text-white rounded-tr-none" 
                  : "bg-finance-gray-light text-finance-gray-dark rounded-tl-none"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.type === "bot" && (
                  <div className="mt-1">
                    <Bot className="h-4 w-4 text-finance-blue" />
                  </div>
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  
                  {message.options && (
                    <div className="mt-3 space-y-2">
                      {message.options.map((option, index) => (
                        <Card key={index} className="border-finance-blue border-opacity-20">
                          <CardContent className="p-3">
                            <div className="flex gap-2">
                              <div className="mt-1">
                                <option.icon className="h-4 w-4 text-finance-blue" />
                              </div>
                              <div>
                                <h4 className="text-sm font-medium">{option.title}</h4>
                                <p className="text-xs text-finance-gray-dark">{option.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                  
                  {message.products && (
                    <div className="mt-3 space-y-3">
                      {message.products.map((product, index) => (
                        <Card key={index} className="bg-white">
                          <CardContent className="p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="text-sm font-medium">{product.name}</h4>
                                <p className="text-xs text-finance-gray-dark">{product.description}</p>
                              </div>
                              <Badge className="bg-finance-blue-light text-finance-blue">{product.match}% match</Badge>
                            </div>
                            <div className="mt-2 flex justify-end">
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="text-xs h-8 text-finance-blue border-finance-blue hover:bg-finance-blue-light"
                                onClick={() => handleProductSelect(product.name)}
                              >
                                Más info
                                <ChevronRight className="h-3 w-3 ml-1" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
                {message.type === "user" && (
                  <div className="mt-1">
                    <User className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-finance-gray-light text-finance-gray-dark rounded-2xl rounded-tl-none p-3 max-w-[80%]">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-finance-blue" />
                <div className="flex gap-1">
                  <div className="h-2 w-2 rounded-full bg-finance-gray-dark animate-bounce"></div>
                  <div className="h-2 w-2 rounded-full bg-finance-gray-dark animate-bounce delay-100"></div>
                  <div className="h-2 w-2 rounded-full bg-finance-gray-dark animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="mb-3 flex items-center gap-2 overflow-x-auto pb-2">
          {suggestedQuestions.map((question, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="whitespace-nowrap text-xs"
              onClick={() => {
                setInput(question);
              }}
            >
              {question}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu pregunta..."
            className="flex-1"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} className="bg-finance-blue hover:bg-finance-blue-dark">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
