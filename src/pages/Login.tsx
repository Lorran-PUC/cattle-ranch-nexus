
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (
    checked: boolean
  ) => {
    setFormData(prev => ({ ...prev, rememberMe: checked }));
  };

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de autenticação - seria substituído pela integração com Django REST
    setTimeout(() => {
      setIsLoading(false);
      
      // Simular login bem-sucedido, simplesmente navegando para o dashboard
      // Em um cenário real, validaríamos as credenciais com o backend
      if (formData.email && formData.password) {
        toast({
          title: "Login bem-sucedido",
          description: "Bem-vindo ao sistema de gestão de rebanho.",
        });
        navigate('/');
      } else {
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
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-mail</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="nome@fazenda.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Senha</Label>
                  <a 
                    href="#" 
                    className="text-xs text-primary hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="rememberMe" 
                  checked={formData.rememberMe}
                  onCheckedChange={handleCheckboxChange} 
                />
                <Label 
                  htmlFor="rememberMe"
                  className="text-sm font-normal"
                >
                  Lembrar-me
                </Label>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                className="w-full" 
                type="submit" 
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Button>
              <div className="mt-4 text-center text-sm text-muted-foreground">
                Para fins de demonstração, você pode entrar com qualquer e-mail e senha
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
