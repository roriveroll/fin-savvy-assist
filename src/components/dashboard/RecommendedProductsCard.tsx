
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Landmark, Shield, TrendingUp, ArrowRight, ArrowUpRight, ThumbsUp, Wallet, Info } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const RecommendedProductsCard = () => {
  const products = {
    cards: [
      {
        id: 1,
        name: "Tarjeta Rewards Plus",
        description: "3% cashback en restaurantes, 2% en viajes",
        icon: CreditCard,
        benefits: ["Sin anualidad el primer año", "Programa de puntos", "Seguros de viaje"],
        cta: "Solicitar ahora",
        match: 95,
      },
      {
        id: 2,
        name: "Tarjeta Platinum",
        description: "Tasa preferencial y beneficios exclusivos",
        icon: CreditCard,
        benefits: ["Acceso a salas VIP", "Concierge 24/7", "Seguro de compras"],
        cta: "Más información",
        match: 87,
      }
    ],
    loans: [
      {
        id: 3,
        name: "Préstamo Personal",
        description: "Tasa desde 12.9% anual",
        icon: Wallet,
        benefits: ["Sin comisiones ocultas", "Plazo hasta 60 meses", "Aprobación rápida"],
        cta: "Simular préstamo",
        match: 91,
      }
    ],
    insurance: [
      {
        id: 4,
        name: "Seguro de Vida",
        description: "Protección para ti y tu familia",
        icon: Shield,
        benefits: ["Cobertura amplia", "Pagos mensuales accesibles", "Asistencia 24/7"],
        cta: "Cotizar ahora",
        match: 88,
      }
    ],
    investments: [
      {
        id: 5,
        name: "Fondo de Inversión",
        description: "Rendimiento anual estimado: 8.2%",
        icon: TrendingUp,
        benefits: ["Bajo riesgo", "Retiros flexibles", "Sin monto mínimo"],
        cta: "Comenzar a invertir",
        match: 93,
      }
    ]
  };

  const getActiveTabCards = (tab: string) => {
    switch(tab) {
      case "cards": return products.cards;
      case "loans": return products.loans;
      case "insurance": return products.insurance;
      case "investments": return products.investments;
      default: return products.cards;
    }
  };

  return (
    <Card className="card-shadow card-hover">
      <CardHeader className="px-6 pb-0 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Productos Recomendados</CardTitle>
          <div className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4 text-finance-purple" />
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 text-finance-gray" />
                </TooltipTrigger>
                <TooltipContent className="w-80 p-3 text-sm">
                  <p>Estas recomendaciones están personalizadas según tu perfil financiero, historial crediticio y hábitos de consumo.</p>
                  <p className="mt-2">El porcentaje de "match" indica qué tan adecuado es el producto para tu situación financiera actual. Cuanto más alto sea el porcentaje, más probable es que cumpla con tus necesidades específicas.</p>
                  <p className="mt-2">Todas las recomendaciones se actualizan mensualmente basadas en tus datos más recientes y las mejores ofertas disponibles del mercado.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <p className="text-sm text-finance-gray-dark mt-1">
          Seleccionados especialmente para tu perfil financiero
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <Tabs defaultValue="cards">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="cards" className="text-xs sm:text-sm">Tarjetas</TabsTrigger>
            <TabsTrigger value="loans" className="text-xs sm:text-sm">Préstamos</TabsTrigger>
            <TabsTrigger value="insurance" className="text-xs sm:text-sm">Seguros</TabsTrigger>
            <TabsTrigger value="investments" className="text-xs sm:text-sm">Inversiones</TabsTrigger>
          </TabsList>
          
          {Object.keys(products).map((tab) => (
            <TabsContent key={tab} value={tab} className="space-y-4">
              {getActiveTabCards(tab).map((product) => (
                <div key={product.id} className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="bg-finance-purple-light p-2 rounded-lg">
                      <product.icon className="h-6 w-6 text-finance-purple" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">{product.name}</h3>
                        <div className="bg-finance-blue-light text-finance-blue text-xs font-medium px-2 py-1 rounded-full">
                          {product.match}% match
                        </div>
                      </div>
                      
                      <p className="text-sm text-finance-gray-dark mt-1">{product.description}</p>
                      
                      <ul className="mt-3 space-y-1">
                        {product.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-xs text-finance-gray-dark">
                            <ArrowRight className="h-3 w-3 mr-1 text-finance-blue" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                      
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" className="text-finance-blue border-finance-blue hover:bg-finance-blue-light">
                          {product.cta}
                          <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link to="/recommendations" className="text-finance-blue flex items-center justify-center font-medium">
            Ver todas las recomendaciones
            <ArrowUpRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedProductsCard;
