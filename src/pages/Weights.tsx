
import React from 'react';
import { 
  Plus, 
  Download, 
  Search, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Scale
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LineChart from '@/components/dashboard/LineChart';


// Dados simulados para pesagens
const mockWeights = [
  { id: 1, animal: 'BOV-2023-0045', name: 'Mimosa', category: 'Vaca', weight: 520, date: new Date(2024, 2, 15), change: 15 },
  { id: 2, animal: 'BOV-2023-0089', name: 'Estrela', category: 'Novilha', weight: 330, date: new Date(2024, 2, 10), change: -5 },
  { id: 3, animal: 'BOV-2022-0123', name: 'Trovão', category: 'Boi', weight: 620, date: new Date(2024, 2, 5), change: 25 },
  { id: 4, animal: 'BOV-2022-0078', name: 'Bonanza', category: 'Bezerro', weight: 180, date: new Date(2024, 1, 28), change: 10 },
  { id: 5, animal: 'BOV-2021-0034', name: 'Valente', category: 'Touro', weight: 850, date: new Date(2024, 1, 20), change: 0 },
];

// Dados para o gráfico
const weightChartData = [
  { name: 'Jan', touro: 830, vaca: 490, novilho: 310, bezerro: 150 },
  { name: 'Fev', touro: 840, vaca: 500, novilho: 320, bezerro: 160 },
  { name: 'Mar', touro: 850, vaca: 520, novilho: 330, bezerro: 180 },
  { name: 'Abr', touro: 855, vaca: 525, novilho: 335, bezerro: 190 },
  { name: 'Mai', touro: 860, vaca: 530, novilho: 340, bezerro: 200 },
];

const Weights = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pesagens</h1>
          <p className="text-muted-foreground">Monitore o desenvolvimento e ganho de peso do seu rebanho</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Nova Pesagem
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Médio (Kg)</CardTitle>
            <Scale className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">498.5</div>
            <p className="text-xs text-muted-foreground mt-1">+2.1% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Maior Ganho</CardTitle>
            <TrendingUp className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25 Kg</div>
            <p className="text-xs text-muted-foreground mt-1">Trovão (BOV-2022-0123)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pesagens</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground mt-1">+14% em relação ao mês passado</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peso Total (Kg)</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,500</div>
            <p className="text-xs text-muted-foreground mt-1">+3.2% em relação ao mês passado</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Evolução de Peso por Categoria</CardTitle>
          <CardDescription>Acompanhe o ganho de peso por tipo de animal</CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            title="Evolução de peso - Touros"
            data={weightChartData}
            dataKey="touro"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <Tabs defaultValue="recentes">
            <div className="flex items-center justify-between">
              <CardTitle>Histórico de Pesagens</CardTitle>
              <TabsList>
                <TabsTrigger value="recentes">Recentes</TabsTrigger>
                <TabsTrigger value="todos">Todos</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="flex items-center relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por animal..."
              className="pl-8 max-w-sm"
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Peso (Kg)</TableHead>
                  <TableHead>Variação</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockWeights.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.animal}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>{item.weight}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {item.change > 0 ? (
                          <>
                            <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-500">+{item.change}</span>
                          </>
                        ) : item.change < 0 ? (
                          <>
                            <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                            <span className="text-red-500">{item.change}</span>
                          </>
                        ) : (
                          <span>0</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      {format(item.date, 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Weights;
