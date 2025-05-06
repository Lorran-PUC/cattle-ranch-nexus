
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Plus, Search, Download, Filter, Trees, ArrowRight } from 'lucide-react';
import PieChart from '@/components/dashboard/PieChart';

// Dados simulados
const mockPastures = [
  { 
    id: 1, 
    name: 'Pastagem Sul', 
    area: 120, 
    capacity: 85, 
    currentUse: 62, 
    status: 'Em uso', 
    lastRotation: '15/03/2025', 
    nextRotation: '15/06/2025',
    grassType: 'Braquiária',
  },
  { 
    id: 2, 
    name: 'Pastagem Norte', 
    area: 95, 
    capacity: 65, 
    currentUse: 65, 
    status: 'Lotada', 
    lastRotation: '01/02/2025', 
    nextRotation: '01/05/2025',
    grassType: 'Mombaça',
  },
  { 
    id: 3, 
    name: 'Pastagem Leste', 
    area: 150, 
    capacity: 100, 
    currentUse: 0, 
    status: 'Em descanso', 
    lastRotation: '10/01/2025', 
    nextRotation: '10/04/2025',
    grassType: 'Tifton',
  },
  { 
    id: 4, 
    name: 'Pastagem Oeste', 
    area: 110, 
    capacity: 75, 
    currentUse: 52, 
    status: 'Em uso', 
    lastRotation: '05/04/2025', 
    nextRotation: '05/07/2025',
    grassType: 'Braquiária',
  },
  { 
    id: 5, 
    name: 'Pastagem Central', 
    area: 80, 
    capacity: 55, 
    currentUse: 0, 
    status: 'Em recuperação', 
    lastRotation: '20/02/2025', 
    nextRotation: '20/07/2025',
    grassType: 'Tifton',
  },
];

// Gráfico de distribuição de pastagens
const pastureDistributionData = {
  title: "Distribuição de Pastagens",
  data: [
    { name: 'Em uso', value: 2 },
    { name: 'Em descanso', value: 1 },
    { name: 'Em recuperação', value: 1 },
    { name: 'Lotada', value: 1 },
  ]
};

const Pastures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Filtro de pastagens
  const filteredPastures = mockPastures.filter(pasture => {
    const matchesSearch = pasture.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || pasture.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pastagens</h1>
          <p className="text-muted-foreground">Gerencie e monitore suas áreas de pastagem</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button className="whitespace-nowrap">
            <Plus className="mr-2 h-4 w-4" />
            Nova Pastagem
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
              Total de Pastagens
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 áreas</div>
            <p className="text-xs text-muted-foreground">
              555 hectares totais
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Capacidade Total
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">380 animais</div>
            <p className="text-xs text-muted-foreground">
              0.68 animais/hectare
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Utilização Atual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">179 animais</div>
            <p className="text-xs text-muted-foreground">
              47% da capacidade total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Próxima Rotação
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10/04/2025</div>
            <p className="text-xs text-muted-foreground">
              Pastagem Leste
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Lista de Pastagens</CardTitle>
            <CardDescription>Detalhes e status de cada área de pastagem</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar pastagens..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon" className="ml-2">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Área (ha)</TableHead>
                    <TableHead>Tipo de Capim</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Próx. Rotação</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPastures.map((pasture) => (
                    <TableRow key={pasture.id}>
                      <TableCell className="font-medium">{pasture.name}</TableCell>
                      <TableCell>{pasture.area}</TableCell>
                      <TableCell>{pasture.grassType}</TableCell>
                      <TableCell>{pasture.currentUse}/{pasture.capacity}</TableCell>
                      <TableCell>
                        <Badge variant={
                          pasture.status === 'Em uso' ? 'outline' : 
                          pasture.status === 'Em descanso' ? 'secondary' : 
                          pasture.status === 'Em recuperação' ? 'destructive' : 
                          'default'
                        }>
                          {pasture.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{pasture.nextRotation}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Detalhes</DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem>Iniciar rotação</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Status das Pastagens</CardTitle>
            <CardDescription>Distribuição atual por status</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart {...pastureDistributionData} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Pastures;
