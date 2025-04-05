
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Search, Plus, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Dados simulados para vacinações
const mockVaccinations = [
  { 
    id: 1, 
    animal: 'BOV-2023-0045', 
    name: 'Mimosa',
    vaccine: 'Febre Aftosa', 
    date: new Date(2023, 9, 15), 
    nextDate: new Date(2024, 3, 15), 
    status: 'Aplicada'
  },
  { 
    id: 2, 
    animal: 'BOV-2023-0089', 
    name: 'Estrela',
    vaccine: 'Brucelose', 
    date: new Date(2023, 10, 5), 
    nextDate: new Date(2024, 4, 5), 
    status: 'Pendente'
  },
  { 
    id: 3, 
    animal: 'BOV-2022-0123', 
    name: 'Trovão',
    vaccine: 'Raiva', 
    date: new Date(2023, 8, 20), 
    nextDate: new Date(2024, 2, 20), 
    status: 'Aplicada'
  },
  { 
    id: 4, 
    animal: 'BOV-2022-0078', 
    name: 'Bonanza',
    vaccine: 'Carbúnculo', 
    date: new Date(2023, 11, 8), 
    nextDate: new Date(2024, 5, 8), 
    status: 'Atrasada'
  },
  { 
    id: 5, 
    animal: 'BOV-2021-0034', 
    name: 'Valente',
    vaccine: 'Botulismo', 
    date: new Date(2023, 7, 22), 
    nextDate: new Date(2024, 1, 22), 
    status: 'Aplicada'
  },
];

const Vaccination = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Filtrar vacinações com base nos filtros aplicados
  const filteredVaccinations = mockVaccinations.filter(vacc => {
    const matchesSearch = 
      vacc.animal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vacc.vaccine.toLowerCase().includes(searchTerm.toLowerCase());
    
      const matchesStatus = filterStatus === 'todos' || vacc.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Vacinação</h1>
          <p className="text-muted-foreground">Gerencie as vacinações do seu rebanho</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Nova Vacina
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Calendário de Vacinação</CardTitle>
          <CardDescription>Visualize e planeje as próximas vacinações do seu rebanho</CardDescription>
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
            <h3 className="font-medium">Próximas Vacinações</h3>
            <div className="space-y-2">
              {date && mockVaccinations
                .filter(v => v.nextDate.toDateString() === date.toDateString())
                .map((vacc) => (
                  <div key={vacc.id} className="flex justify-between items-center p-3 border rounded-md">
                    <div>
                      <p className="font-medium">{vacc.name} ({vacc.animal})</p>
                      <p className="text-sm text-muted-foreground">{vacc.vaccine}</p>
                    </div>
                    <Button variant="outline" size="sm">Registrar</Button>
                  </div>
                ))}
              {date && !mockVaccinations.some(v => v.nextDate.toDateString() === date.toDateString()) && (
                <p className="text-muted-foreground text-sm">Nenhuma vacinação programada para esta data</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Histórico de Vacinações</CardTitle>
          <CardDescription>Consulte o registro completo de vacinações</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <div className="flex items-center relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por animal, vacina..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Aplicada">Aplicada</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Atrasada">Atrasada</SelectItem>
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
                  <TableHead>Animal</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Vacina</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Próxima Dose</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredVaccinations.map((vacc) => (
                  <TableRow key={vacc.id}>
                    <TableCell className="font-medium">{vacc.animal}</TableCell>
                    <TableCell>{vacc.name}</TableCell>
                    <TableCell>{vacc.vaccine}</TableCell>
                    <TableCell>
                      {format(vacc.date, 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      {format(vacc.nextDate, 'dd/MM/yyyy', { locale: ptBR })}
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        vacc.status === 'Aplicada' ? 'outline' : 
                        vacc.status === 'Pendente' ? 'secondary' : 'destructive'
                      }>
                        {vacc.status}
                      </Badge>
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

export default Vaccination;
