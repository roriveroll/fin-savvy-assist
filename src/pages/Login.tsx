
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth, mockUsers } from "@/contexts/AuthContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { AlertCircle, User, KeyRound } from "lucide-react";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email es requerido" })
    .email({ message: "Email inválido" }),
  password: z
    .string()
    .min(1, { message: "Contraseña es requerida" })
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    try {
      const success = await login(data.email, data.password);
      
      if (success) {
        toast({
          title: "Inicio de sesión exitoso",
          description: "Bienvenido a tu panel financiero.",
        });
        navigate("/dashboard");
      } else {
        toast({
          variant: "destructive",
          title: "Error de inicio de sesión",
          description: "Email o contraseña incorrectos.",
          icon: <AlertCircle className="h-5 w-5" />
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Ha ocurrido un error. Por favor, inténtelo de nuevo.",
        icon: <AlertCircle className="h-5 w-5" />
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-finance-gray-light to-white p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-lg border-finance-blue/10">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="bg-gradient-to-r from-finance-blue to-finance-purple p-3 rounded-lg">
                <span className="text-2xl text-white font-bold">Fin</span>
                <span className="text-2xl text-finance-blue-dark font-semibold">SavvyAssist</span>
              </div>
            </div>
            <CardTitle className="text-2xl text-center">Iniciar Sesión</CardTitle>
            <CardDescription className="text-center">
              Ingresa tus credenciales para acceder a tu panel financiero
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="tu@email.com"
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contraseña</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <KeyRound className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                          <Input
                            type="password"
                            placeholder="••••••••"
                            className="pl-10"
                            {...field}
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-sm text-muted-foreground mt-4">
              <p className="font-medium">Cuentas de demostración:</p>
              <ul className="mt-2 space-y-1">
                {mockUsers.map((user) => (
                  <li key={user.id} className="text-xs">
                    <strong>{user.name}:</strong> {user.email} / {user.password}
                  </li>
                ))}
              </ul>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
