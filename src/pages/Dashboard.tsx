import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { ArrowUpRight, CalendarIcon, LineChart, Users, Weight, Syringe, Beef } from 'lucide-react';
import { ptBR } from 'date-fns/locale';

// Dados simulados para o dashboard
const weightData = [
  { month: 'Jan', weight: 320 },
  { month: 'Fev', weight: 340 },
  { month: 'Mar', weight: 355 },
  { month: 'Abr', weight: 370 },
  { month: 'Mai', weight: 390 },
  { month: 'Jun', weight: 410 },
];

const animalsByCategory = [
  { category: 'Bezerros', count: 45 },
  { category: 'Novilhas', count: 32 },
  { category: 'Vacas', count: 78 },
  { category: 'Touros', count: 12 },
  { category: 'Bois', count: 65 },
];

const recentActivities = [
  { id: 1, type: 'vaccination', description: 'Vacinação contra Febre Aftosa', date: '2024-05-15', animals: 45 },
  { id: 2, type: 'weight', description: 'Pesagem do Lote 3', date: '2024-05-14', animals: 28 },
  { id: 3, type: 'birth', description: 'Nascimento de bezerro', date: '2024-05-12', animals: 1 },
  { id: 4, type: 'pasture', description: 'Mudança de pasto - Lote 2', date: '2024-05-10', animals: 35 },
];

// Eventos do calendário
const calendarEvents = [
  { 
    id: "event-1", 
    date: "2024-05-20", 
    title: "Vacinação contra Febre Aftosa", 
    type: "vaccination" as const 
  },
  { 
    id: "event-2", 
    date: "2024-05-22", 
    title: "Pesagem do Rebanho", 
    type: "weight" as const 
  },
  { 
    id: "event-3", 
    date: "2024-05-25", 
    title: "Mudança de Pasto", 
    type: "pasture" as const 
  },
  { 
    id: "event-4", 
    date: "2024-05-15", 
    title: "Inseminação", 
    type: "reproduction" as const 
  },
  { 
    id: "event-5", 
    date: "2024-05-28", 
    title: "Visita Veterinária", 
    type: "other" as const 
  },
];

// Componente para renderizar os eventos do calendário
const CalendarEvent = ({ event }: { event: typeof calendarEvents[0] }) => {
  const getEventColor = (type: string) => {
    switch (type) {
      case 'vaccination': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'weight': return 'bg-green-100 text-green-800 border-green-300';
      case 'pasture': return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'reproduction': return 'bg-purple-100 text-purple-800 border-purple-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className={`p-2 mb-2 rounded-md border ${getEventColor(event.type)}`}>
      <p className="text-sm font-medium">{event.title}</p>
      <p className="text-xs">{event.date}</p>
    </div>
  );
};

// Componente para renderizar os ícones das atividades recentes
const ActivityIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'vaccination':
      return <div className="p-2 rounded-full bg-blue-100"><Syringe className="h-4 w-4 text-blue-600" /></div>;
    case 'weight':
      return <div className="p-2 rounded-full bg-green-100"><Weight className="h-4 w-4 text-green-600" /></div>;
    case 'birth':
      return <div className="p-2 rounded-full bg-purple-100"><Beef className="h-4 w-4 text-purple-600" /></div>;
    case 'pasture':
      return <div className="p-2 rounded-full bg-amber-100"><ArrowUpRight className="h-4 w-4 text-amber-600" /></div>;
    default:
      return <div className="p-2 rounded-full bg-gray-100"><CalendarIcon className="h-4 w-4 text-gray-600" /></div>;
  }
};

const Dashboard = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Filtrar eventos para a data selecionada
  const eventsForSelectedDate = date 
    ? calendarEvents.filter(event => event.date === date.toISOString().split('T')[0])
    : [];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Visão geral do seu rebanho</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button>
            <LineChart className="mr-2 h-4 w-4" />
            Gerar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Animais</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">232</div>
            <p className="text-xs text-muted-foreground">
              +4 no último mês
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Médio (kg)</CardTitle>
            <Weight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">410</div>
            <p className="text-xs text-muted-foreground">
              +20kg desde a última pesagem
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vacinações Pendentes</CardTitle>
            <Syringe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Próxima em 5 dias
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nascimentos</CardTitle>
            <Beef className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +3 no último mês
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Análises</TabsTrigger>
          <TabsTrigger value="calendar">Calendário</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Evolução de Peso</CardTitle>
                <CardDescription>
                  Média de peso do rebanho nos últimos 6 meses
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={weightData}>
                    <XAxis
                      dataKey="month"
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#888888"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `${value}kg`}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="weight"
                      fill="currentColor"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Distribuição do Rebanho</CardTitle>
                <CardDescription>
                  Quantidade de animais por categoria
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {animalsByCategory.map((category) => (
                    <div key={category.category} className="flex items-center">
                      <div className="w-1/3 text-sm font-medium">
                        {category.category}
                      </div>
                      <div className="w-full">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                            <div
                              className="h-full bg-primary"
                              style={{
                                width: `${(category.count / 232) * 100}%`,
                              }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {category.count}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Atividades Recentes</CardTitle>
              <CardDescription>
                Últimas ações registradas no sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <ActivityIcon type={activity.type} />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString('pt-BR')} • {activity.animals} animais
                      </p>
                    </div>
                    <Button variant="ghost" size="sm">
                      Detalhes
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Análises Detalhadas</CardTitle>
              <CardDescription>
                Métricas avançadas do seu rebanho
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[450px] flex items-center justify-center">
              <p className="text-muted-foreground">
                Módulo de análises em desenvolvimento
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="calendar" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Calendário de Eventos</CardTitle>
              <CardDescription>
                Planeje e visualize as atividades do seu rebanho
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x">
                <div className="p-4">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                    locale={ptBR}
                  />
                </div>
                <div className="p-4 md:col-span-2">
                  <h3 className="font-medium mb-2">
                    Eventos para {date?.toLocaleDateString('pt-BR')}
                  </h3>
                  {eventsForSelectedDate.length > 0 ? (
                    <div className="space-y-2">
                      {eventsForSelectedDate.map((event) => (
                        <CalendarEvent key={event.id} event={event} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-sm">
                      Nenhum evento programado para esta data.
                    </p>
                  )}
                  <div className="mt-4">
                    <Button variant="outline" size="sm">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      Adicionar Evento
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
