
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Filter, Download, FileText, FileUp, Printer } from 'lucide-react';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';

const Reports = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Relatórios</h1>
          <p className="text-muted-foreground">
            Relatórios gerenciais e análises do rebanho
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Printer className="h-4 w-4" />
            <span className="hidden sm:inline">Imprimir</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar / Filtering */}
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium block mb-2">Tipo de Relatório</label>
              <select className="cattle-input w-full">
                <option value="all">Todos os Relatórios</option>
                <option value="finance">Financeiro</option>
                <option value="production">Produção</option>
                <option value="health">Saúde Animal</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Período</label>
              <select className="cattle-input w-full mb-2">
                <option value="month">Mês Atual</option>
                <option value="quarter">Último Trimestre</option>
                <option value="year">Ano Atual</option>
                <option value="custom">Personalizado</option>
              </select>
              
              <div className="mt-4">
                <Calendar 
                  mode="range" 
                  selected={{
                    from: new Date(2025, 4, 1),
                    to: new Date(2025, 4, 31)
                  }}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content */}
        <div className="md:col-span-9 space-y-6">
          <Tabs defaultValue="overview">
            <TabsList>
              <TabsTrigger value="overview">Visão Geral</TabsTrigger>
              <TabsTrigger value="production">Produção</TabsTrigger>
              <TabsTrigger value="financial">Financeiro</TabsTrigger>
              <TabsTrigger value="health">Saúde</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Distribuição do Rebanho</CardTitle>
                    <CardDescription>Por categoria animal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução do Rebanho</CardTitle>
                    <CardDescription>Últimos 12 meses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <BarChart />
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    Relatórios Recentes
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome do Relatório</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Tamanho</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Resumo Mensal - Maio/2025</TableCell>
                        <TableCell>Gerencial</TableCell>
                        <TableCell>05/05/2025</TableCell>
                        <TableCell>245 KB</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Vacinação - 1º Trimestre 2025</TableCell>
                        <TableCell>Sanitário</TableCell>
                        <TableCell>01/04/2025</TableCell>
                        <TableCell>180 KB</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Análise Financeira - Q1 2025</TableCell>
                        <TableCell>Financeiro</TableCell>
                        <TableCell>15/03/2025</TableCell>
                        <TableCell>320 KB</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="production" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Produção por Categoria Animal</CardTitle>
                  <CardDescription>Desempenho produtivo do rebanho</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="financial" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Financeira</CardTitle>
                  <CardDescription>Receitas e despesas do período</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <BarChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="health" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Indicadores de Saúde</CardTitle>
                  <CardDescription>Status sanitário do rebanho</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <PieChart />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Reports;
