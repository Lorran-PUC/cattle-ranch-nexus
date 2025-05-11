
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { 
  Settings as SettingsIcon, 
  User, 
  Building, 
  Globe, 
  Users, 
  Bell, 
  ChevronDown
} from 'lucide-react';

// Tipos de usuário
type TipoUsuario = 'admin_sistema' | 'admin_fazenda' | 'veterinario' | 'funcionario';

// Interface do usuário
interface Usuario {
  id: string;
  nome: string;
  email: string;
  tipo: TipoUsuario;
  telefone?: string;
  notificacoes?: {
    email: boolean;
    sms: boolean;
    app: boolean;
  };
  preferencias?: {
    idioma: string;
    unidadeMedida: string;
  };
}

// Interface da fazenda
interface Fazenda {
  id: string;
  nome: string;
  localizacao: string;
  coordenadas: {
    latitude: number;
    longitude: number;
  };
}

// Esquema de validação para dados pessoais
const dadosPessoaisSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  telefone: z.string().optional(),
});

// Esquema de validação para dados da fazenda
const fazendaSchema = z.object({
  nome: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  localizacao: z.string().min(3, { message: "Localização é obrigatória" }),
  latitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Latitude inválida" }),
  longitude: z.string().refine(val => !isNaN(parseFloat(val)), { message: "Longitude inválida" }),
});

// Esquema de validação para preferências
const preferenciasSchema = z.object({
  idioma: z.string(),
  unidadeMedida: z.string(),
});

// Esquema de validação para notificações
const notificacoesSchema = z.object({
  email: z.boolean().default(false),
  sms: z.boolean().default(false),
  app: z.boolean().default(false),
});

const Settings = () => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [fazenda, setFazenda] = useState<Fazenda | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingFazenda, setLoadingFazenda] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Formulários
  const dadosPessoaisForm = useForm<z.infer<typeof dadosPessoaisSchema>>({
    resolver: zodResolver(dadosPessoaisSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
    },
  });

  const fazendaForm = useForm<z.infer<typeof fazendaSchema>>({
    resolver: zodResolver(fazendaSchema),
    defaultValues: {
      nome: "",
      localizacao: "",
      latitude: "",
      longitude: "",
    },
  });

  const preferenciasForm = useForm<z.infer<typeof preferenciasSchema>>({
    resolver: zodResolver(preferenciasSchema),
    defaultValues: {
      idioma: "pt-BR",
      unidadeMedida: "metrico",
    },
  });

  const notificacoesForm = useForm<z.infer<typeof notificacoesSchema>>({
    resolver: zodResolver(notificacoesSchema),
    defaultValues: {
      email: false,
      sms: false,
      app: false,
    },
  });

  // Carregamento dos dados do usuário
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const usuarioData = localStorage.getItem("usuario");

    if (!token) {
      navigate("/login");
      return;
    }

    if (usuarioData) {
      try {
        const userData = JSON.parse(usuarioData);
        setUsuario(userData);

        // Preenche os formulários com os dados existentes
        dadosPessoaisForm.reset({
          nome: userData.nome || "",
          email: userData.email || "",
          telefone: userData.telefone || "",
        });

        if (userData.preferencias) {
          preferenciasForm.reset({
            idioma: userData.preferencias.idioma || "pt-BR",
            unidadeMedida: userData.preferencias.unidadeMedida || "metrico",
          });
        }

        if (userData.notificacoes) {
          notificacoesForm.reset({
            email: userData.notificacoes.email || false,
            sms: userData.notificacoes.sms || false,
            app: userData.notificacoes.app || false,
          });
        }

        // Para administrador de fazenda, carrega os dados da fazenda
        if (userData.tipo === "admin_fazenda") {
          // Simulação - em produção seria uma chamada à API
          setLoadingFazenda(true);
          setTimeout(() => {
            const fazendaData: Fazenda = {
              id: "1",
              nome: "Fazenda Modelo",
              localizacao: "Zona Rural, Cidade - Estado",
              coordenadas: {
                latitude: -15.7801,
                longitude: -47.9292
              }
            };
            setFazenda(fazendaData);
            fazendaForm.reset({
              nome: fazendaData.nome,
              localizacao: fazendaData.localizacao,
              latitude: fazendaData.coordenadas.latitude.toString(),
              longitude: fazendaData.coordenadas.longitude.toString(),
            });
            setLoadingFazenda(false);
          }, 1000);
        }
      } catch (error) {
        console.error("Erro ao parsear dados do usuário:", error);
        toast({
          variant: "destructive",
          title: "Erro ao carregar configurações",
          description: "Não foi possível carregar seus dados. Por favor, faça login novamente.",
        });
        navigate("/login");
      }
    }
  }, [navigate, toast, dadosPessoaisForm, fazendaForm, preferenciasForm, notificacoesForm]);

  // Manipulador para envio do formulário de dados pessoais
  const handleSalvarDadosPessoais = async (data: z.infer<typeof dadosPessoaisSchema>) => {
    setLoading(true);
    try {
      // Simulação - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualiza dados no localStorage para simular persistência
      if (usuario) {
        const usuarioAtualizado = { ...usuario, ...data };
        localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
      }

      toast({
        title: "Sucesso!",
        description: "Dados pessoais atualizados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar seus dados. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manipulador para envio do formulário da fazenda
  const handleSalvarFazenda = async (data: z.infer<typeof fazendaSchema>) => {
    setLoadingFazenda(true);
    try {
      // Simulação - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const fazendaAtualizada: Fazenda = {
        id: fazenda?.id || "1",
        nome: data.nome,
        localizacao: data.localizacao,
        coordenadas: {
          latitude: parseFloat(data.latitude),
          longitude: parseFloat(data.longitude)
        }
      };
      
      setFazenda(fazendaAtualizada);
      
      toast({
        title: "Sucesso!",
        description: "Dados da fazenda atualizados com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar dados da fazenda:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar os dados da fazenda. Tente novamente.",
      });
    } finally {
      setLoadingFazenda(false);
    }
  };

  // Manipulador para envio do formulário de preferências
  const handleSalvarPreferencias = async (data: z.infer<typeof preferenciasSchema>) => {
    setLoading(true);
    try {
      // Simulação - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualiza dados no localStorage
      if (usuario) {
        const usuarioAtualizado = { 
          ...usuario, 
          preferencias: data 
        };
        localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
      }

      toast({
        title: "Sucesso!",
        description: "Preferências atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar preferências:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas preferências. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Manipulador para envio do formulário de notificações
  const handleSalvarNotificacoes = async (data: z.infer<typeof notificacoesSchema>) => {
    setLoading(true);
    try {
      // Simulação - em produção seria uma chamada à API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualiza dados no localStorage
      if (usuario) {
        const usuarioAtualizado = { 
          ...usuario, 
          notificacoes: data 
        };
        localStorage.setItem("usuario", JSON.stringify(usuarioAtualizado));
        setUsuario(usuarioAtualizado);
      }

      toast({
        title: "Sucesso!",
        description: "Preferências de notificação atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Erro ao salvar notificações:", error);
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Não foi possível salvar suas preferências de notificação. Tente novamente.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Verifica se está carregando usuário
  if (!usuario) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="h-16 w-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
            <SettingsIcon className="h-6 w-6" /> Configurações
          </h1>
          <p className="text-muted-foreground">
            Gerencie suas preferências e configurações
          </p>
        </div>
      </div>

      {/* Seção de Dados Pessoais - Comum a todos os usuários */}
      <Collapsible className="w-full">
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" /> Dados Pessoais
              </CardTitle>
              <ChevronDown className="h-5 w-5" />
            </CollapsibleTrigger>
            <CardDescription>
              Gerencie suas informações pessoais
            </CardDescription>
          </CardHeader>
          <CollapsibleContent>
            <CardContent>
              <Form {...dadosPessoaisForm}>
                <form onSubmit={dadosPessoaisForm.handleSubmit(handleSalvarDadosPessoais)} className="space-y-4">
                  <FormField
                    control={dadosPessoaisForm.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome completo</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu nome completo" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={dadosPessoaisForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={dadosPessoaisForm.control}
                    name="telefone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telefone</FormLabel>
                        <FormControl>
                          <Input placeholder="Seu telefone" {...field} />
                        </FormControl>
                        <FormDescription>
                          Usado para comunicações importantes
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                        Salvando...
                      </>
                    ) : (
                      "Salvar dados pessoais"
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>

      {/* Seção de Dados da Fazenda - Apenas para admin_fazenda */}
      {usuario.tipo === "admin_fazenda" && (
        <Collapsible className="w-full">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" /> Dados da Fazenda
                </CardTitle>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CardDescription>
                Gerencie as informações da sua fazenda
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Form {...fazendaForm}>
                  <form onSubmit={fazendaForm.handleSubmit(handleSalvarFazenda)} className="space-y-4">
                    <FormField
                      control={fazendaForm.control}
                      name="nome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nome da Fazenda</FormLabel>
                          <FormControl>
                            <Input placeholder="Nome da fazenda" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={fazendaForm.control}
                      name="localizacao"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Localização</FormLabel>
                          <FormControl>
                            <Input placeholder="Endereço completo" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={fazendaForm.control}
                        name="latitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Latitude</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: -15.7801" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={fazendaForm.control}
                        name="longitude"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Longitude</FormLabel>
                            <FormControl>
                              <Input placeholder="Ex: -47.9292" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button type="submit" disabled={loadingFazenda}>
                      {loadingFazenda ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar dados da fazenda"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Seção de Gerenciamento de Usuários - Apenas para admin_sistema e admin_fazenda */}
      {(usuario.tipo === "admin_sistema" || usuario.tipo === "admin_fazenda") && (
        <Collapsible className="w-full">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" /> Gerenciamento de Usuários
                </CardTitle>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CardDescription>
                {usuario.tipo === "admin_sistema" 
                  ? "Gerencie todos os usuários do sistema" 
                  : "Gerencie os usuários da sua fazenda"}
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Lista de Usuários</h3>
                    <Button size="sm">
                      Adicionar Usuário
                    </Button>
                  </div>
                  
                  {/* Lista simulada de usuários */}
                  <div className="border rounded-md divide-y">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Usuário Exemplo {i}</p>
                          <p className="text-sm text-muted-foreground">usuario{i}@exemplo.com</p>
                          <p className="text-xs bg-secondary inline-block px-2 py-0.5 rounded-full mt-1">
                            {i === 1 ? 'Administrador' : i === 2 ? 'Veterinário' : 'Funcionário'}
                          </p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          {usuario.tipo === "admin_sistema" && (
                            <Button variant="destructive" size="sm">Remover</Button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botão de carregar mais */}
                  <div className="flex justify-center pt-2">
                    <Button variant="ghost">Carregar mais</Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Seção de Criação de Fazendas - Apenas para admin_sistema */}
      {usuario.tipo === "admin_sistema" && (
        <Collapsible className="w-full">
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5" /> Gerenciamento de Fazendas
                </CardTitle>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CardDescription>
                Crie e gerencie as fazendas no sistema
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Lista de Fazendas</h3>
                    <Button size="sm">
                      Adicionar Fazenda
                    </Button>
                  </div>
                  
                  {/* Lista simulada de fazendas */}
                  <div className="border rounded-md divide-y">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">Fazenda Exemplo {i}</p>
                          <p className="text-sm text-muted-foreground">Localização {i}, Região</p>
                          <p className="text-xs text-muted-foreground">{5 + i} usuários</p>
                        </div>
                        <div className="space-x-2">
                          <Button variant="outline" size="sm">Editar</Button>
                          <Button variant="destructive" size="sm">Remover</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Botão de carregar mais */}
                  <div className="flex justify-center pt-2">
                    <Button variant="ghost">Carregar mais</Button>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Seção de Preferências de Idioma - Apenas para funcionario */}
      {usuario.tipo === "funcionario" && (
        <Collapsible className="w-full" defaultOpen>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" /> Preferências de Idioma e Medidas
                </CardTitle>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CardDescription>
                Configure seu idioma preferido e sistema de medidas
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Form {...preferenciasForm}>
                  <form onSubmit={preferenciasForm.handleSubmit(handleSalvarPreferencias)} className="space-y-4">
                    <FormField
                      control={preferenciasForm.control}
                      name="idioma"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Idioma</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o idioma" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="es">Español</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={preferenciasForm.control}
                      name="unidadeMedida"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Sistema de Unidades</FormLabel>
                          <Select 
                            onValueChange={field.onChange} 
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecione o sistema de unidades" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="metrico">Métrico (kg, m)</SelectItem>
                              <SelectItem value="imperial">Imperial (lb, ft)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar preferências"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}

      {/* Seção de Preferências de Notificação - Apenas para veterinario */}
      {usuario.tipo === "veterinario" && (
        <Collapsible className="w-full" defaultOpen>
          <Card className="mb-6">
            <CardHeader className="pb-3">
              <CollapsibleTrigger className="flex items-center justify-between w-full text-left">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" /> Preferências de Notificação
                </CardTitle>
                <ChevronDown className="h-5 w-5" />
              </CollapsibleTrigger>
              <CardDescription>
                Configure como deseja receber notificações
              </CardDescription>
            </CardHeader>
            <CollapsibleContent>
              <CardContent>
                <Form {...notificacoesForm}>
                  <form onSubmit={notificacoesForm.handleSubmit(handleSalvarNotificacoes)} className="space-y-4">
                    <FormField
                      control={notificacoesForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Notificações por E-mail</FormLabel>
                            <FormDescription>
                              Receba alertas importantes sobre vacinações e tratamentos
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificacoesForm.control}
                      name="sms"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Notificações por SMS</FormLabel>
                            <FormDescription>
                              Receba alertas urgentes via mensagem de texto
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificacoesForm.control}
                      name="app"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Notificações no Aplicativo</FormLabel>
                            <FormDescription>
                              Receba notificações dentro do sistema
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={loading}>
                      {loading ? (
                        <>
                          <span className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin mr-2" />
                          Salvando...
                        </>
                      ) : (
                        "Salvar preferências de notificação"
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>
      )}
    </div>
  );
};

export default Settings;
