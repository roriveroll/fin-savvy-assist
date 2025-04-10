
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-finance-gray-light">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-finance-blue mb-4">404</h1>
        <p className="text-xl text-finance-gray-dark mb-6">Página no encontrada</p>
        <p className="text-finance-gray mb-8">
          La página que estás buscando no existe o ha sido movida.
        </p>
        <Link to="/">
          <Button className="bg-finance-blue hover:bg-finance-blue-dark">
            <Home className="mr-2 h-4 w-4" />
            Volver al Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
