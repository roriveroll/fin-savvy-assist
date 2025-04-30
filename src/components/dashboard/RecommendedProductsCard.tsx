
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Landmark, PiggyBank } from "lucide-react";

interface RecommendedProductsCardProps {
  creditScore?: number;
}

const RecommendedProductsCard = ({ creditScore = 750 }: RecommendedProductsCardProps) => {
  // Define product recommendations based on credit score
  const getRecommendations = () => {
    if (creditScore >= 800) {
      return [
        {
          title: "Tarjeta Premium",
          description: "Nuestra tarjeta exclusiva con beneficios premium y las tasas más bajas.",
          apr: "12.99%",
          icon: CreditCard,
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        },
        {
          title: "Préstamo Personal Elite",
          description: "Préstamo con la tasa más favorable y opciones de pago flexibles.",
          apr: "5.49%",
          icon: Landmark,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        },
        {
          title: "Cuenta de Ahorro Premium",
          description: "Maximiza tus ahorros con nuestra cuenta de alto rendimiento.",
          apr: "3.75%",
          icon: PiggyBank,
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        },
      ];
    } else if (creditScore >= 700) {
      return [
        {
          title: "Tarjeta Recompensas Plus",
          description: "Acumula puntos en todas tus compras con excelentes beneficios.",
          apr: "15.99%",
          icon: CreditCard,
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        },
        {
          title: "Préstamo Personal Optimizado",
          description: "Excelentes condiciones para tus proyectos personales.",
          apr: "7.49%",
          icon: Landmark,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        },
        {
          title: "Cuenta de Ahorro Crecimiento",
          description: "Haz crecer tus ahorros con intereses competitivos.",
          apr: "3.25%",
          icon: PiggyBank,
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        },
      ];
    } else {
      return [
        {
          title: "Tarjeta Construcción de Crédito",
          description: "Ideal para mejorar tu historial crediticio con beneficios básicos.",
          apr: "19.99%",
          icon: CreditCard,
          iconBg: "bg-purple-100",
          iconColor: "text-purple-600",
        },
        {
          title: "Préstamo de Consolidación",
          description: "Simplifica tus deudas y mejora tu puntaje crediticio.",
          apr: "10.99%",
          icon: Landmark,
          iconBg: "bg-blue-100",
          iconColor: "text-blue-600",
        },
        {
          title: "Cuenta de Ahorro Inicial",
          description: "Comienza a ahorrar con una cuenta sin comisiones mensuales.",
          apr: "2.50%",
          icon: PiggyBank,
          iconBg: "bg-green-100",
          iconColor: "text-green-600",
        },
      ];
    }
  };

  const recommendations = getRecommendations();

  return (
    <Card className="card-shadow">
      <CardHeader>
        <CardTitle>Productos Recomendados</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((product, index) => (
            <Card key={index} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`p-3 rounded-full ${product.iconBg}`}>
                    <product.icon className={`h-6 w-6 ${product.iconColor}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                  </div>
                  <div className="bg-gray-50 w-full p-2 rounded-md">
                    <p className="text-xs text-gray-500">APR desde</p>
                    <p className="font-semibold text-lg">{product.apr}</p>
                  </div>
                  <Button variant="outline" className="w-full">Más información</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendedProductsCard;
