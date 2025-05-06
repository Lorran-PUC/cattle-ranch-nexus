
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: any | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificar se o usuário já está autenticado (tem tokens salvos)
  useEffect(() => {
    const checkAuth = () => {
      const accessToken = localStorage.getItem('access_token');
      
      if (accessToken) {
        // Em uma implementação real, aqui faríamos uma validação do token
        // Por enquanto estamos apenas verificando se existe
        setIsAuthenticated(true);
        setUser({ name: 'Usuário Demo', email: 'demo@example.com' });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulação de autenticação - seria substituído pela chamada real à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação de sucesso
      localStorage.setItem('access_token', 'simulated_access_token');
      localStorage.setItem('refresh_token', 'simulated_refresh_token');
      setIsAuthenticated(true);
      setUser({ name: 'Usuário Demo', email });
      
      toast({
        title: "Login bem-sucedido",
        description: "Bem-vindo ao sistema de gestão de rebanho.",
      });
      
      navigate('/');
    } catch (error) {
      console.error('Erro ao fazer login', error);
      toast({
        variant: "destructive",
        title: "Erro de autenticação",
        description: "Ocorreu um erro ao tentar fazer login.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Função de logout
  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/');
    
    toast({
      title: "Logout realizado",
      description: "Você saiu do sistema com sucesso.",
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
