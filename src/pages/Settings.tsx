import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/context/AuthContext";

// Adjust the Usuario interface to make the fields consistent
interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  telefone?: string;
  preferencias: {
    idioma: string;
    unidadeMedida: string;
  };
  notificacoes: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
}

enum TipoUsuario {
  ADMIN = "admin",
  USUARIO = "usuario"
}

interface PreferenciasFormValues {
  idioma: string;
  unidadeMedida: string;
}

interface NotificacoesFormValues {
  email: boolean;
  sms: boolean;
  app: boolean;
}

const Settings = () => {
  const { token } = useAuth();
  const { toast } = useToast()
  const [usuario, setUsuario] = useState<Usuario>({
    id: '',
    nome: '',
    email: '',
    tipo: TipoUsuario.USUARIO,
    preferencias: {
      idioma: 'pt-BR',
      unidadeMedida: 'kg'
    },
    notificacoes: {
      email: true,
      sms: false,
      app: true
    }
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
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
  }, [token, toast]);

  const handleUpdatePreferencias = async (data: PreferenciasFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Make API call here
      await fetch('/api/usuarios/me/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        },
        body: JSON.stringify({ preferencias: data })
      });
      
      // Update local state ensuring required fields are set
      setUsuario({
        ...usuario,
        preferencias: {
          idioma: data.idioma || usuario.preferencias.idioma,
          unidadeMedida: data.unidadeMedida || usuario.preferencias.unidadeMedida
        }
      });
      
      toast({
        title: "Preferências atualizadas",
        description: "Suas preferências foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar preferências:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas preferências.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateNotificacoes = async (data: NotificacoesFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Make API call here
      await fetch('/api/usuarios/me/', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${token}`
        },
        body: JSON.stringify({ notificacoes: data })
      });
      
      // Update local state ensuring required fields are set
      setUsuario({
        ...usuario,
        notificacoes: {
          email: data.email !== undefined ? data.email : usuario.notificacoes.email,
          sms: data.sms !== undefined ? data.sms : usuario.notificacoes.sms,
          app: data.app !== undefined ? data.app : usuario.notificacoes.app
        }
      });
      
      toast({
        title: "Notificações atualizadas",
        description: "Suas preferências de notificações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao atualizar notificações:", error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar suas preferências de notificações.",
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
          <CardDescription>Gerencie suas informações e preferências.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">

          {/* Informações do Usuário */}
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input type="text" id="name" defaultValue={usuario.nome} disabled />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" defaultValue={usuario.email} disabled />
          </div>

          {/* Preferências */}
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Preferências</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="idioma">Idioma</Label>
                <Select defaultValue={usuario.preferencias.idioma} onValueChange={(value) => handleUpdatePreferencias({ ...usuario.preferencias, idioma: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione o idioma" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                    <SelectItem value="en-US">Inglês (Estados Unidos)</SelectItem>
                    <SelectItem value="es-ES">Espanhol (Espanha)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="unidadeMedida">Unidade de Medida</Label>
                <Select defaultValue={usuario.preferencias.unidadeMedida} onValueChange={(value) => handleUpdatePreferencias({ ...usuario.preferencias, unidadeMedida: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione a unidade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilogramas (kg)</SelectItem>
                    <SelectItem value="lb">Libras (lb)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Notificações */}
          <div className="grid gap-4">
            <h2 className="text-lg font-semibold">Notificações</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="emailNotifications">Email</Label>
                <Switch
                  id="emailNotifications"
                  checked={usuario.notificacoes.email}
                  onCheckedChange={(checked) => handleUpdateNotificacoes({ ...usuario.notificacoes, email: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="smsNotifications">SMS</Label>
                <Switch
                  id="smsNotifications"
                  checked={usuario.notificacoes.sms}
                  onCheckedChange={(checked) => handleUpdateNotificacoes({ ...usuario.notificacoes, sms: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="appNotifications">App</Label>
                <Switch
                  id="appNotifications"
                  checked={usuario.notificacoes.app}
                  onCheckedChange={(checked) => handleUpdateNotificacoes({ ...usuario.notificacoes, app: checked })}
                />
              </div>
            </div>
          </div>

          {/* Ações */}
          <div className="flex justify-end">
            <Button disabled={isSubmitting}>
              Salvar Alterações
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
