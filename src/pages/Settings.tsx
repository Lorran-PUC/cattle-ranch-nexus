
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/AuthContext";

// Simplifying the Usuario interface by removing preferencias and notificacoes
interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  telefone?: string;
}

enum TipoUsuario {
  ADMIN = "admin",
  USUARIO = "usuario"
}

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast()
  const [usuario, setUsuario] = useState<Usuario>({
    id: '',
    nome: '',
    email: '',
    tipo: TipoUsuario.USUARIO,
    telefone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Use stored token from localStorage if available
        const token = localStorage.getItem('token');
        
        if (!token) {
          throw new Error('No authentication token available');
        }
        
        const response = await fetch('/api/usuarios/me/', {
          headers: {
            'Authorization': `JWT ${token}`
          }
        });
        if (!response.ok) {
          throw new Error('Não foi possível obter os dados do usuário');
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do usuário.",
          variant: "destructive"
        });
      }
    };

    fetchUsuario();
  }, [toast]);

  const handleUpdateUsuario = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      
      // Get token from localStorage
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token available');
      }
      
      // Make API call here
      await fetch('/api/usuarios/me/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        },
        body: JSON.stringify({ 
          nome: usuario.nome,
          telefone: usuario.telefone 
        })
      });
      
      toast({
        title: "Informações atualizadas",
        description: "Seus dados foram salvos com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas informações.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Configurações do Usuário</CardTitle>
          <CardDescription>Gerencie suas informações pessoais.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpdateUsuario} className="space-y-6">
            {/* Informações do Usuário */}
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="nome">Nome</Label>
                <Input 
                  type="text" 
                  id="nome" 
                  value={usuario.nome}
                  onChange={(e) => setUsuario({...usuario, nome: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" value={usuario.email} disabled />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="telefone">Telefone</Label>
                <Input 
                  type="tel" 
                  id="telefone" 
                  value={usuario.telefone || ''}
                  onChange={(e) => setUsuario({...usuario, telefone: e.target.value})}
                />
              </div>
            </div>

            {/* Ações */}
            <div className="flex justify-end">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
