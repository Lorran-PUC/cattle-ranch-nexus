
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/dashboard/StatCard";
import BarChart from "@/components/dashboard/BarChart";
import LineChart from "@/components/dashboard/LineChart";
import PieChart from "@/components/dashboard/PieChart";
import CalendarEvents from "@/components/dashboard/CalendarEvents";
import { ArrowRight, Beef, Weight, Calendar, Syringe, Baby, Trees } from "lucide-react";

const Dashboard = () => {
  const mockLineChartData = {
    title: "Crescimento mensal do rebanho",
    data: [
      { name: "Jan", value: 150 },
      { name: "Fev", value: 158 },
      { name: "Mar", value: 165 },
      { name: "Abr", value: 170 },
      { name: "Mai", value: 182 },
      { name: "Jun", value: 190 },
      { name: "Jul", value: 201 },
      { name: "Ago", value: 220 },
      { name: "Set", value: 230 },
      { name: "Out", value: 235 },
      { name: "Nov", value: 240 },
      { name: "Dez", value: 247 }
    ],
    dataKey: "value"
  };

  const mockPieChartData = {
    title: "Distribuição por Categoria",
    data: [
      { name: "Bezerros", value: 45 },
      { name: "Novilhas", value: 65 },
      { name: "Bois", value: 87 },
      { name: "Vacas", value: 50 }
    ]
  };

  const mockBarChartData = {
    title: "Indicadores de Produção",
    data: [
      { name: "Produção", atual: 85, meta: 100 },
      { name: "Consumo", atual: 65, meta: 60 },
      { name: "Ganho", atual: 90, meta: 80 },
      { name: "Conversão", atual: 75, meta: 85 }
    ],
    dataKey: "atual"
  };

  const mockCalendarEvents = {
    events: [
      { id: "1", date: "2025-05-10", title: "Vacinação - 12 Animais", type: "vaccination" },
      { id: "2", date: "2025-05-15", title: "Pesagem - Lote 2", type: "weight" },
      { id: "3", date: "2025-05-20", title: "Rotação de Pastagem", type: "pasture" },
      { id: "4", date: "2025-05-25", title: "Inseminação - 5 Vacas", type: "reproduction" }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Bem-vindo ao sistema de gestão de rebanho.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            Novo Animal
          </Button>
          <Button variant="outline">
            Exportar Relatório
          </Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard 
          title="Total de Animais" 
          value="247" 
          description="Aumento de 9%" 
          trend="up" 
          icon={<Beef />} 
        />
        <StatCard 
          title="Peso Médio" 
          value="320 kg" 
          description="Aumento de 2.5%" 
          trend="up" 
          icon={<Weight />} 
        />
        <StatCard 
          title="Vacinações Pendentes" 
          value="12" 
          description="Aumento de 5%" 
          trend="none" 
          icon={<Syringe />} 
        />
        <StatCard 
          title="Gestações Ativas" 
          value="18" 
          description="Aumento de 3%" 
          trend="up" 
          icon={<Baby />} 
        />
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Evolução do Rebanho</CardTitle>
              <CardDescription>Crescimento mensal no último ano</CardDescription>
            </div>
            <Tabs defaultValue="quantity">
              <TabsList>
                <TabsTrigger value="quantity">Quantidade</TabsTrigger>
                <TabsTrigger value="weight">Peso</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardHeader>
          <CardContent>
            <LineChart {...mockLineChartData} />
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Distribuição por Categoria</CardTitle>
            <CardDescription>Composição atual do rebanho</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart {...mockPieChartData} />
          </CardContent>
          <CardFooter className="flex justify-between text-sm text-muted-foreground">
            <div>Total: 247 animais</div>
            <Button variant="ghost" size="sm" className="gap-1">
              Detalhes <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Eventos
            </CardTitle>
            <CardDescription>Calendário de atividades</CardDescription>
          </CardHeader>
          <CardContent>
            <CalendarEvents events={mockCalendarEvents.events} />
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Ver Calendário Completo</Button>
          </CardFooter>
        </Card>

        <Card className="md:col-span-4">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Indicadores de Produção</CardTitle>
              <CardDescription>Desempenho do último trimestre</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <BarChart {...mockBarChartData} />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1.5">
              <Syringe className="h-4 w-4" /> Vacinação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 pendentes</div>
            <p className="text-xs text-muted-foreground">
              5 animais com vacinas vencidas
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1 w-full">
              Ver Vacinações <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1.5">
              <Weight className="h-4 w-4" /> Pesagens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15 agendadas</div>
            <p className="text-xs text-muted-foreground">
              Para os próximos 7 dias
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1 w-full">
              Ver Pesagens <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-medium flex items-center gap-1.5">
              <Trees className="h-4 w-4" /> Pastagens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 em uso</div>
            <p className="text-xs text-muted-foreground">
              1 em período de rotação
            </p>
          </CardContent>
          <CardFooter>
            <Button variant="ghost" size="sm" className="gap-1 w-full">
              Ver Pastagens <ArrowRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
