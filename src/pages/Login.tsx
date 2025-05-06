
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { LogIn, User, Key, AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Schema para validação do formulário de login
const loginSchema = z.object({
  email: z.string().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "A senha deve ter no mínimo 6 caracteres" }),
  rememberMe: z.boolean().default(false),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [loginError, setLoginError] = React.useState<string | null>(null);

  // Inicializar o formulário com React Hook Form + Zod
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const handleSubmit = (values: LoginFormValues) => {
    setIsLoading(true);
    setLoginError(null);

    // Simulação de autenticação - seria substituído pela integração com API
    setTimeout(() => {
      setIsLoading(false);
      
      // Simular login bem-sucedido
      if (values.email && values.password) {
        // Simular armazenamento de tokens JWT
        localStorage.setItem('access_token', 'simulated_access_token');
        localStorage.setItem('refresh_token', 'simulated_refresh_token');
        
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao sistema de gestão de rebanho.",
        });
        
        navigate('/');
      } else {
        setLoginError("E-mail ou senha incorretos.");
        toast({
          variant: "destructive",
          title: "Erro de autenticação",
          description: "E-mail ou senha incorretos.",
        });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-4 animate-fade-in">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">
            <span className="text-primary">Cattle</span>
            <span>Manager</span>
          </h1>
          <p className="text-muted-foreground mt-2">Sistema de Gestão de Rebanho</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Digite suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <CardContent className="space-y-4">
                {loginError && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{loginError}</AlertDescription>
                  </Alert>
                )}
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        E-mail
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder="nome@fazenda.com"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <div className="flex items-center justify-between">
                        <FormLabel className="flex items-center gap-2">
                          <Key className="h-4 w-4" />
                          Senha
                        </FormLabel>
                        <a 
                          href="#" 
                          className="text-xs text-primary hover:underline"
                        >
                          Esqueceu a senha?
                        </a>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="rememberMe"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <Checkbox 
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal cursor-pointer">
                        Lembrar-me
                      </FormLabel>
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardFooter className="flex flex-col">
                <Button 
                  className="w-full" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin" />
                      Carregando...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <LogIn className="h-5 w-5" />
                      Entrar
                    </span>
                  )}
                </Button>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  Para fins de demonstração, você pode entrar com qualquer e-mail e senha
                </div>
                <div className="mt-4 text-center">
                  <Button 
                    variant="link" 
                    onClick={() => navigate('/')}
                    className="text-sm"
                  >
                    Voltar para página inicial
                  </Button>
                </div>
              </CardFooter>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
