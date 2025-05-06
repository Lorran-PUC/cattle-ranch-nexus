import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Download, Plus, Search, Filter, CalendarIcon, ArrowUpRight, ArrowDownRight, Weight } from 'lucide-react';
import { cn } from '@/lib/utils';
import LineChart from '@/components/dashboard/LineChart';

// Dados simulados para pesagens
const mockWeights = [
  {
    id: 1,
    animal: 'BOV-2023-0045',
    name: 'Mimosa',
    date: new Date(2025, 4, 1),
    weight: 345,
    previousWeight: 332,
    difference: 13,
    dailyGain: 0.87,
    category: 'Vaca',
  },
  {
    id: 2,
    animal: 'BOV-2023-0089',
    name: 'Estrela',
    date: new Date(2025, 4, 2),
    weight: 310,
    previousWeight: 302,
    difference: 8,
    dailyGain: 0.53,
    category: 'Novilha',
  },
  {
    id: 3,
    animal: 'BOV-2022-0123',
    name: 'Trovão',
    date: new Date(2025, 4, 3),
    weight: 520,
    previousWeight: 505,
    difference: 15,
    dailyGain: 1.0,
    category: 'Boi',
  },
  {
    id: 4,
    animal: 'BOV-2022-0078',
    name: 'Bonanza',
    date: new Date(2025, 4, 5),
    weight: 480,
    previousWeight: 482,
    difference: -2,
    dailyGain: -0.13,
    category: 'Boi',
  },
  {
    id: 5,
    animal: 'BOV-2021-0034',
    name: 'Valente',
    date: new Date(2025, 4, 6),
    weight: 560,
    previousWeight: 547,
    difference: 13,
    dailyGain: 0.87,
    category: 'Boi',
  },
];

// Dados do gráfico
const weightEvolutionData = {
  title: "Evolução de Peso (kg)",
  data: [
    { name: "Jan", bezerros: 150, novilhas: 280, bois: 450, vacas: 410 },
    { name: "Fev", bezerros: 170, novilhas: 290, bois: 460, vacas: 415 },
    { name: "Mar", bezerros: 190, novilhas: 305, bois: 475, vacas: 420 },
    { name: "Abr", bezerros: 210, novilhas: 315, bois: 490, vacas: 425 },
    { name: "Mai", bezerros: 230, novilhas: 325, bois: 500, vacas: 430 },
  ],
  dataKey: "bois"
};

// Dados de pesagem agendada
const scheduledWeighings = [
  { id: 1, date: new Date(2025, 4, 15), batch: 'Lote 1', quantity: 45, type: 'Rotina' },
  { id: 2, date: new Date(2025, 4, 20), batch: 'Lote 2', quantity: 38, type: 'Avaliação' },
  { id: 3, date: new Date(2025, 4, 25), batch: 'Lote 3', quantity: 52, type: 'Rotina' },
];

const Weights = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  
  const filteredWeights = mockWeights.filter(weight => {
    const matchesSearch = 
      weight.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      weight.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = categoryFilter === 'all' || weight.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pesagens</h1>
          <p className="text-muted-foreground">Registre e analise o peso do seu rebanho</p>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Peso Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">385 kg</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">2.5%</span> desde o mês anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Ganho Diário Médio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0.78 kg/dia</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <ArrowUpRight className="mr-1 h-3 w-3 text-green-500" />
              <span className="text-green-500">0.12 kg</span> comparado ao anterior
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Pesagens Realizadas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Pesagem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15/05/2025</div>
            <p className="text-xs text-muted-foreground">
              Lote 1 - 45 animais
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Evolução de Peso</CardTitle>
            <CardDescription>Acompanhamento por categoria</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart {...weightEvolutionData} />
          </CardContent>
        </Card>
        
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Pesagens Agendadas</CardTitle>
            <CardDescription>Próximas pesagens programadas</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {scheduledWeighings.map((weighing) => (
              <div key={weighing.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{format(weighing.date, 'dd/MM/yyyy')}</p>
                  <p className="text-sm text-muted-foreground">{weighing.batch} - {weighing.quantity} animais</p>
                </div>
                <Badge variant={weighing.type === 'Rotina' ? 'outline' : 'secondary'}>
                  {weighing.type}
                </Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full">
              Agendar Nova Pesagem
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Histórico de Pesagens</CardTitle>
          <CardDescription>Consulte os registros de pesagem dos animais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por animal..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  <SelectItem value="Bezerro">Bezerro</SelectItem>
                  <SelectItem value="Novilha">Novilha</SelectItem>
                  <SelectItem value="Boi">Boi</SelectItem>
                  <SelectItem value="Vaca">Vaca</SelectItem>
                </SelectContent>
              </Select>
              
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon">
                    <CalendarIcon className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Animal</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Peso (kg)</TableHead>
                  <TableHead>Diferença</TableHead>
                  <TableHead>GMD (kg/dia)</TableHead>
                  <TableHead>Categoria</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWeights.map((weight) => (
                  <TableRow key={weight.id}>
                    <TableCell className="font-medium">{weight.animal}</TableCell>
                    <TableCell>{weight.name}</TableCell>
                    <TableCell>{format(weight.date, 'dd/MM/yyyy')}</TableCell>
                    <TableCell>{weight.weight}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {weight.difference > 0 ? (
                          <ArrowUpRight className="mr-1 h-4 w-4 text-green-500" />
                        ) : weight.difference < 0 ? (
                          <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
                        ) : null}
                        <span className={weight.difference > 0 ? 'text-green-500' : weight.difference < 0 ? 'text-red-500' : ''}>
                          {weight.difference > 0 ? '+' : ''}{weight.difference} kg
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className={weight.dailyGain > 0 ? 'text-green-500' : weight.dailyGain < 0 ? 'text-red-500' : ''}>
                      {weight.dailyGain.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{weight.category}</Badge>
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
