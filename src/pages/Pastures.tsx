
import React from 'react';
import { Plus, Download, Leaf, Droplets, Timer, Zap, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import PieChart from "@/components/dashboard/PieChart";

// Dados simulados para pastagens
const pastureData = [
  { id: 1, name: 'Pasto A', area: 12.5, capacity: 25, current: 20, status: 'Ótimo', lastRotation: new Date(2024, 2, 1) },
  { id: 2, name: 'Pasto B', area: 8.2, capacity: 15, current: 15, status: 'Bom', lastRotation: new Date(2024, 1, 15) },
  { id: 3, name: 'Pasto C', area: 15.0, capacity: 30, current: 5, status: 'Em Recuperação', lastRotation: new Date(2024, 0, 10) },
  { id: 4, name: 'Pasto D', area: 10.8, capacity: 20, current: 18, status: 'Regular', lastRotation: new Date(2024, 2, 5) },
];

// Dados para distribuição de pastagens
const pastureDistribution = [
  { name: 'Ótimo', value: 12.5 },
  { name: 'Bom', value: 8.2 },
  { name: 'Em Recuperação', value: 15.0 },
  { name: 'Regular', value: 10.8 },
];

const waterSources = [
  { id: 1, name: 'Açude Principal', type: 'Açude', capacity: 15000, current: 12000, status: 'Adequado' },
  { id: 2, name: 'Rio Norte', type: 'Rio', capacity: null, current: null, status: 'Adequado' },
  { id: 3, name: 'Poço Central', type: 'Poço', capacity: 5000, current: 2000, status: 'Baixo' },
];

const pastureAlerts = [
  { id: 1, pasture: 'Pasto B', message: 'Lotação máxima atingida', severity: 'warning', date: new Date() },
  { id: 2, pasture: 'Pasto C', message: 'Período de recuperação necessário', severity: 'info', date: new Date(2024, 0, 10) },
  { id: 3, pasture: 'Poço Central', message: 'Nível de água baixo', severity: 'alert', date: new Date() },
];

const Pastures = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Pastagens</h1>
          <p className="text-muted-foreground">Gestão de pastagens e recursos hídricos</p>
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

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distribuição de Pastagens</CardTitle>
            <CardDescription>Área total: 46.5 hectares</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <PieChart 
                data={pastureDistribution} 
                colors={['#2D6A4F', '#40916C', '#74C69D', '#B7E4C7']} 
              />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alertas</CardTitle>
            <CardDescription>Notificações importantes sobre áreas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pastureAlerts.map(alert => (
                <div key={alert.id} className="flex items-start gap-2 p-3 border rounded-md">
                  {alert.severity === 'alert' ? (
                    <AlertTriangle className="h-5 w-5 text-destructive flex-shrink-0" />
                  ) : alert.severity === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  ) : (
                    <Timer className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{alert.pasture}</p>
                    <p className="text-sm text-muted-foreground">{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pastagens" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="pastagens">Pastagens</TabsTrigger>
          <TabsTrigger value="agua">Fontes de Água</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pastagens">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Pastagens</CardTitle>
              <CardDescription>Informações sobre áreas de pastagem e lotação</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Área (ha)</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Ocupação Atual</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Última Rotação</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastureData.map((item) => {
                    const occupationPercentage = (item.current / item.capacity) * 100;
                    
                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.area}</TableCell>
                        <TableCell>{item.capacity} animais</TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>{item.current} animais</span>
                              <span>{Math.round(occupationPercentage)}%</span>
                            </div>
                            <Progress 
                              value={occupationPercentage} 
                              className={`h-2 ${
                                occupationPercentage > 90 ? 'bg-red-200' : 
                                occupationPercentage > 75 ? 'bg-yellow-200' : 
                                'bg-emerald-200'
                              }`}
                            />
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            item.status === 'Ótimo' ? 'outline' : 
                            item.status === 'Bom' ? 'default' : 
                            item.status === 'Regular' ? 'secondary' : 
                            'destructive'
                          }>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Intl.DateTimeFormat('pt-BR').format(item.lastRotation)}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">Gerenciar Rotação</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="agua">
          <Card>
            <CardHeader>
              <CardTitle>Fontes de Água</CardTitle>
              <CardDescription>Recursos hídricos disponíveis para o rebanho</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Capacidade</TableHead>
                    <TableHead>Volume Atual</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {waterSources.map((source) => {
                    const capacityPercentage = source.capacity ? (source.current! / source.capacity) * 100 : null;
                    
                    return (
                      <TableRow key={source.id}>
                        <TableCell className="font-medium">{source.name}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1.5">
                            {source.type === 'Açude' ? (
                              <Droplets className="h-4 w-4 text-blue-500" />
                            ) : source.type === 'Rio' ? (
                              <Zap className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Droplets className="h-4 w-4 text-blue-500" />
                            )}
                            {source.type}
                          </div>
                        </TableCell>
                        <TableCell>{source.capacity ? `${source.capacity} m³` : 'Natural'}</TableCell>
                        <TableCell>
                          {capacityPercentage !== null ? (
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between text-sm">
                                <span>{source.current} m³</span>
                                <span>{Math.round(capacityPercentage!)}%</span>
                              </div>
                              <Progress 
                                value={capacityPercentage} 
                                className={`h-2 ${
                                  capacityPercentage < 30 ? 'bg-red-200' : 
                                  capacityPercentage < 50 ? 'bg-yellow-200' : 
                                  'bg-blue-200'
                                }`}
                              />
                            </div>
                          ) : (
                            'Fluxo Contínuo'
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge variant={
                            source.status === 'Adequado' ? 'default' : 
                            source.status === 'Baixo' ? 'destructive' : 'outline'
                          }>
                            {source.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button variant="outline" size="sm">Adicionar Fonte</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Pastures;
