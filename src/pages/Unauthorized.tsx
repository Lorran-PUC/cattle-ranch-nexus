
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, LogIn } from 'lucide-react';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md animate-fade-in">
        <CardHeader className="text-center pb-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center mb-4">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Acesso Negado</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            Você precisa estar autenticado para acessar esta página.
          </p>
          <p>
            Por favor, faça login para continuar navegando no sistema.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center pb-6">
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="gap-2"
          >
            <LogIn className="h-5 w-5" />
            Ir para o Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Unauthorized;
