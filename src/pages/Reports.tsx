
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ArrowRight, Calendar as CalendarIcon, Download, FileText, Printer, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import PieChart from '@/components/dashboard/PieChart';
import BarChart from '@/components/dashboard/BarChart';

// Dados simulados para gráficos
const animalDistributionData = {
  title: "Distribuição do Rebanho",
  data: [
    { name: "Bezerros", value: 45 },
    { name: "Novilhas", value: 65 },
    { name: "Bois", value: 87 },
    { name: "Vacas", value: 50 }
  ]
};

const weightGainData = {
  title: "Ganho de Peso (kg/mês)",
  data: [
    { name: "Jan", atual: 12, anterior: 10 },
    { name: "Fev", atual: 15, anterior: 12 },
    { name: "Mar", atual: 14, anterior: 14 },
    { name: "Abr", atual: 18, anterior: 15 },
    { name: "Mai", atual: 17, anterior: 13 }
  ],
  dataKey: "atual"
};

const Reports = () => {
  const [reportType, setReportType] = useState('animals');
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 0, 1),
    to: new Date()
  });
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">Visualize e exporte dados do seu rebanho</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Gerador de Relatórios</CardTitle>
          <CardDescription>Selecione um tipo de relatório e o período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3 space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Tipo de Relatório</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="animals">Relatório de Animais</SelectItem>
                    <SelectItem value="weight">Relatório de Pesagens</SelectItem>
                    <SelectItem value="vaccination">Relatório de Vacinação</SelectItem>
                    <SelectItem value="breeding">Relatório de Reprodução</SelectItem>
                    <SelectItem value="pasture">Relatório de Pastagens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Período</label>
                <div className="grid gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "dd/MM/yyyy", {locale: ptBR})} -{" "}
                              {format(dateRange.to, "dd/MM/yyyy", {locale: ptBR})}
                            </>
                          ) : (
                            format(dateRange.from, "dd/MM/yyyy", {locale: ptBR})
                          )
                        ) : (
                          <span>Selecionar período</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange as any}
                        numberOfMonths={2}
                        locale={ptBR}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              <Button className="w-full">
                Gerar Relatório
                <FileText className="ml-2 h-4 w-4" />
              </Button>
            </div>
            
            <div className="w-full md:w-2/3 bg-muted/30 rounded-md p-4 min-h-[300px] flex items-center justify-center">
              <div className="text-center space-y-2">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/70" />
                <p>Selecione um tipo de relatório e clique em "Gerar Relatório"</p>
                <p className="text-sm text-muted-foreground">Os dados serão exibidos aqui</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="animals">Rebanho</TabsTrigger>
          <TabsTrigger value="weight">Pesagens</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Distribuição do Rebanho</CardTitle>
                <CardDescription>Composição atual por categoria</CardDescription>
              </CardHeader>
              <CardContent>
                <PieChart {...animalDistributionData} />
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Ganho de Peso</CardTitle>
                <CardDescription>Comparativo com período anterior</CardDescription>
              </CardHeader>
              <CardContent>
                <BarChart {...weightGainData} />
              </CardContent>
            </Card>
          </div>
            
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Indicadores de Saúde</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Vacinações em dia</span>
                    <span className="font-medium">95%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de mortalidade</span>
                    <span className="font-medium">1.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Animais em tratamento</span>
                    <span className="font-medium">3</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Indicadores Reprodutivos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Taxa de concepção</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Gestações ativas</span>
                    <span className="font-medium">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Nascimentos (últimos 30 dias)</span>
                    <span className="font-medium">8</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Indicadores Financeiros</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Custo por animal/dia</span>
                    <span className="font-medium">R$ 4,80</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Custo com alimentação</span>
                    <span className="font-medium">R$ 18.750</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Margem bruta</span>
                    <span className="font-medium">R$ 45.320</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="animals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Animais</CardTitle>
              <CardDescription>Relatório detalhado do rebanho</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Conteúdo do relatório de animais</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="weight" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatório de Pesagens</CardTitle>
              <CardDescription>Histórico e evolução de peso</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Conteúdo do relatório de pesagens</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Financeiro</CardTitle>
              <CardDescription>Análise de custos e receitas</CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <p className="text-muted-foreground">Conteúdo do relatório financeiro</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reports;
