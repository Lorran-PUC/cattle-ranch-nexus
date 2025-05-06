
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Search, Plus, Download, Filter, CalendarIcon, ArrowRight, Baby, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dados simulados para reprodução
const mockBreedings = [
  { 
    id: 1, 
    cow: 'BOV-F-2021-0034', 
    cowName: 'Mimosa',
    bull: 'BOV-M-2020-0012',
    bullName: 'Sultão',
    date: new Date(2025, 2, 15), 
    method: 'Monta Natural', 
    status: 'Confirmada', 
    estimatedBirth: new Date(2025, 11, 25),
  },
  { 
    id: 2, 
    cow: 'BOV-F-2022-0089', 
    cowName: 'Estrela',
    bull: 'BOV-M-2020-0025',
    bullName: 'Rei',
    date: new Date(2025, 3, 5), 
    method: 'Inseminação', 
    status: 'Aguardando Confirmação', 
    estimatedBirth: new Date(2026, 0, 15),
  },
  { 
    id: 3, 
    cow: 'BOV-F-2021-0067', 
    cowName: 'Beleza',
    bull: 'BOV-M-2021-0003',
    bullName: 'Valente',
    date: new Date(2025, 3, 20), 
    method: 'Inseminação', 
    status: 'Confirmada', 
    estimatedBirth: new Date(2026, 0, 30),
  },
  { 
    id: 4, 
    cow: 'BOV-F-2020-0023', 
    cowName: 'Princesa',
    bull: 'BOV-M-2020-0012',
    bullName: 'Sultão',
    date: new Date(2025, 1, 10), 
    method: 'Monta Natural', 
    status: 'Confirmada', 
    estimatedBirth: new Date(2025, 10, 20),
  },
];

const mockBirths = [
  {
    id: 1,
    mother: 'BOV-F-2020-0023',
    motherName: 'Princesa',
    father: 'BOV-M-2020-0012',
    fatherName: 'Sultão',
    date: new Date(2025, 4, 1),
    calves: 1,
    calfId: 'BOV-2025-0001',
    gender: 'Fêmea',
    weight: 32,
    status: 'Saudável'
  },
  {
    id: 2,
    mother: 'BOV-F-2019-0015',
    motherName: 'Flor',
    father: 'BOV-M-2020-0025',
    fatherName: 'Rei',
    date: new Date(2025, 3, 12),
    calves: 1,
    calfId: 'BOV-2025-0002',
    gender: 'Macho',
    weight: 35,
    status: 'Saudável'
  },
  {
    id: 3,
    mother: 'BOV-F-2020-0042',
    motherName: 'Lua',
    father: 'BOV-M-2021-0003',
    fatherName: 'Valente',
    date: new Date(2025, 3, 18),
    calves: 2,
    calfId: 'BOV-2025-0003/0004',
    gender: 'Ambos',
    weight: 58,
    status: 'Saudável'
  },
];

// Dados de preparos e estados
const reproductiveStats = {
  totalPregnancies: 18,
  awaitingConfirmation: 5,
  expectedBirths: 3,
  recentBirths: 8,
};

const Reproduction = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Filtro
  const filteredBreedings = mockBreedings.filter(breeding => {
    const matchesSearch = 
      breeding.cow.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breeding.cowName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breeding.bull.toLowerCase().includes(searchTerm.toLowerCase()) ||
      breeding.bullName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || breeding.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reprodução</h1>
          <p className="text-muted-foreground">Gerencie o ciclo reprodutivo do seu rebanho</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Nova Cobertura
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
              Gestações Ativas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reproductiveStats.totalPregnancies}</div>
            <p className="text-xs text-muted-foreground">
              Em diversos estágios
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Aguardando Confirmação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reproductiveStats.awaitingConfirmation}</div>
            <p className="text-xs text-muted-foreground">
              Coberturas recentes
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Nascimentos Previstos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reproductiveStats.expectedBirths}</div>
            <p className="text-xs text-muted-foreground">
              Próximos 30 dias
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Nascimentos Recentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{reproductiveStats.recentBirths}</div>
            <p className="text-xs text-muted-foreground">
              Últimos 30 dias
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendário Reprodutivo</CardTitle>
          <CardDescription>Acompanhe os eventos reprodutivos programados</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1 md:col-span-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border shadow p-3 w-full"
              locale={ptBR}
            />
          </div>
          <div className="space-y-4">
            <h3 className="font-medium">Eventos na data selecionada</h3>
            <div className="space-y-2">
              {date && mockBreedings
                .filter(b => format(b.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                .map((breeding) => (
                  <div key={breeding.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{breeding.cowName} ({breeding.cow})</p>
                      <p className="text-sm text-muted-foreground">{breeding.method}</p>
                    </div>
                    <Badge variant={breeding.status === 'Confirmada' ? 'outline' : 'secondary'}>
                      {breeding.status}
                    </Badge>
                  </div>
                ))}
              {date && mockBirths
                .filter(b => format(b.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                .map((birth) => (
                  <div key={birth.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{birth.motherName} ({birth.mother})</p>
                      <p className="text-sm text-muted-foreground">Nascimento - {birth.calves} {birth.calves > 1 ? 'bezerros' : 'bezerro'}</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      Nascimento
                    </Badge>
                  </div>
                ))}
              {date && !mockBreedings.some(b => format(b.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) && 
                !mockBirths.some(b => format(b.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) && (
                <p className="text-muted-foreground text-sm">Nenhum evento reprodutivo nesta data</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="breedings" className="w-full">
        <TabsList>
          <TabsTrigger value="breedings">Coberturas</TabsTrigger>
          <TabsTrigger value="births">Nascimentos</TabsTrigger>
        </TabsList>
        
        <TabsContent value="breedings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Coberturas</CardTitle>
              <CardDescription>Histórico e status de coberturas realizadas</CardDescription>
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
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Todos</SelectItem>
                      <SelectItem value="Confirmada">Confirmada</SelectItem>
                      <SelectItem value="Aguardando Confirmação">Aguardando Confirmação</SelectItem>
                      <SelectItem value="Não Confirmada">Não Confirmada</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vaca</TableHead>
                      <TableHead>Touro</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Método</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Nasc. Previsto</TableHead>
                      <TableHead>Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBreedings.map((breeding) => (
                      <TableRow key={breeding.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{breeding.cowName}</div>
                            <div className="text-sm text-muted-foreground">{breeding.cow}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{breeding.bullName}</div>
                            <div className="text-sm text-muted-foreground">{breeding.bull}</div>
                          </div>
                        </TableCell>
                        <TableCell>{format(breeding.date, 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                        <TableCell>{breeding.method}</TableCell>
                        <TableCell>
                          <Badge variant={
                            breeding.status === 'Confirmada' ? 'outline' : 
                            breeding.status === 'Aguardando Confirmação' ? 'secondary' : 'destructive'
                          }>
                            {breeding.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{format(breeding.estimatedBirth, 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <ArrowRight className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="births" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Nascimentos</CardTitle>
              <CardDescription>Histórico de nascimentos e informações dos bezerros</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="flex items-center relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Buscar por animal..."
                    className="pl-8"
                  />
                </div>
                <div className="flex gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[180px] justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        <span>Filtrar por data</span>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="range"
                        defaultMonth={new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Mãe</TableHead>
                      <TableHead>Pai</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Bezerros</TableHead>
                      <TableHead>ID</TableHead>
                      <TableHead>Sexo</TableHead>
                      <TableHead>Peso (kg)</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockBirths.map((birth) => (
                      <TableRow key={birth.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{birth.motherName}</div>
                            <div className="text-sm text-muted-foreground">{birth.mother}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{birth.fatherName}</div>
                            <div className="text-sm text-muted-foreground">{birth.father}</div>
                          </div>
                        </TableCell>
                        <TableCell>{format(birth.date, 'dd/MM/yyyy', { locale: ptBR })}</TableCell>
                        <TableCell>{birth.calves}</TableCell>
                        <TableCell>{birth.calfId}</TableCell>
                        <TableCell>{birth.gender}</TableCell>
                        <TableCell>{birth.weight} kg</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={
                            birth.status === 'Saudável' ? 'text-green-500 border-green-200 bg-green-50' : 
                            'text-red-500 border-red-200 bg-red-50'
                          }>
                            {birth.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Reproduction;
