
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast"; // Updated import
import { Loader2, CheckCircle, XCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("carlos@example.com");
  const [password, setPassword] = useState("carlos123");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      const success = await login(email, password);
      
      if (success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a tu panel financiero",
          // Remove the icon prop as it doesn't exist on the Toast type
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Error de autenticación",
          description: "Correo o contraseña incorrectos",
          variant: "destructive",
          // Remove the icon prop as it doesn't exist on the Toast type
        });
      }
    } catch (error) {
      toast({
        title: "Error inesperado",
        description: "No se pudo procesar la solicitud",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-finance-gray-light p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-gradient-to-r from-finance-blue to-finance-purple p-2 rounded">
                <span className="text-white font-bold text-xl">Fin</span>
              </span>
              <span className="font-semibold text-2xl text-finance-blue-dark">SavvyAssist</span>
            </div>
          </div>
          <CardTitle className="text-center">Inicio de sesión</CardTitle>
          <CardDescription className="text-center">
            Accede a tu panel financiero personal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Correo electrónico
              </label>
              <Input
                id="email"
                type="email"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Contraseña
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="p-4 bg-finance-blue-light/20 rounded-lg border border-finance-blue-light">
              <h3 className="font-medium text-sm mb-2">Usuarios de demostración:</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>carlos@example.com</span>
                  <span>carlos123</span>
                </li>
                <li className="flex justify-between">
                  <span>ana@example.com</span>
                  <span>ana123</span>
                </li>
                <li className="flex justify-between">
                  <span>miguel@example.com</span>
                  <span>miguel123</span>
                </li>
              </ul>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-finance-blue hover:bg-finance-blue/90" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                "Iniciar sesión"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
