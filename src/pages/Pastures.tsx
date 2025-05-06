
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { PlusCircle, Filter } from 'lucide-react';
import PieChart from '@/components/dashboard/PieChart';

const Pastures = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pastagens</h1>
          <p className="text-muted-foreground">
            Gerenciamento de pastagens e rotação de animais
          </p>
        </div>
        <Button className="sm:w-auto w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Pastagem
        </Button>
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
              <label className="text-sm font-medium block mb-2">Status</label>
              <select className="cattle-input w-full">
                <option value="all">Todos</option>
                <option value="active">Em uso</option>
                <option value="resting">Em descanso</option>
                <option value="maintenance">Em manutenção</option>
              </select>
            </div>
            
            <div>
              <label className="text-sm font-medium block mb-2">Calendário</label>
              <Calendar 
                mode="single" 
                selected={date}
                onSelect={setDate}
                className="border rounded-md p-2"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Main content */}
        <div className="md:col-span-9 space-y-6">
          <Tabs defaultValue="list">
            <TabsList>
              <TabsTrigger value="list">Lista de Pastagens</TabsTrigger>
              <TabsTrigger value="rotation">Rotação</TabsTrigger>
              <TabsTrigger value="analytics">Análises</TabsTrigger>
            </TabsList>
            
            <TabsContent value="list" className="space-y-6">
              <Card>
                <CardContent className="p-0 overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Nome</TableHead>
                        <TableHead>Área (ha)</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Animais</TableHead>
                        <TableHead>Capacidade</TableHead>
                        <TableHead>Dias em Uso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Pastagem A</TableCell>
                        <TableCell>12</TableCell>
                        <TableCell><span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">Em uso</span></TableCell>
                        <TableCell>45</TableCell>
                        <TableCell>60</TableCell>
                        <TableCell>12</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pastagem B</TableCell>
                        <TableCell>8</TableCell>
                        <TableCell><span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs">Em descanso</span></TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>40</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Pastagem C</TableCell>
                        <TableCell>15</TableCell>
                        <TableCell><span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs">Em manutenção</span></TableCell>
                        <TableCell>0</TableCell>
                        <TableCell>80</TableCell>
                        <TableCell>0</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="rotation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Plano de Rotação</CardTitle>
                  <CardDescription>Planejamento de movimentação do rebanho entre pastagens</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left font-medium">Pastagem</th>
                          <th className="px-4 py-3 text-center font-medium">Maio</th>
                          <th className="px-4 py-3 text-center font-medium">Junho</th>
                          <th className="px-4 py-3 text-center font-medium">Julho</th>
                          <th className="px-4 py-3 text-center font-medium">Agosto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="px-4 py-3 font-medium">Pastagem A</td>
                          <td className="px-4 py-3 text-center bg-green-100">Em uso</td>
                          <td className="px-4 py-3 text-center bg-green-100">Em uso</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3 font-medium">Pastagem B</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                          <td className="px-4 py-3 text-center bg-green-100">Em uso</td>
                          <td className="px-4 py-3 text-center bg-green-100">Em uso</td>
                        </tr>
                        <tr className="border-b">
                          <td className="px-4 py-3 font-medium">Pastagem C</td>
                          <td className="px-4 py-3 text-center bg-red-100">Manutenção</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                          <td className="px-4 py-3 text-center bg-amber-100">Descanso</td>
                          <td className="px-4 py-3 text-center bg-green-100">Em uso</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Uso de Pastagens</CardTitle>
                    <CardDescription>Distribuição atual de uso</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-80">
                      <PieChart />
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Capacidade x Ocupação</CardTitle>
                    <CardDescription>Comparativo por pastagem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Pastagem A</span>
                          <span>45/60 animais</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '75%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Pastagem B</span>
                          <span>0/40 animais</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">Pastagem C</span>
                          <span>0/80 animais</span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2.5">
                          <div className="bg-primary h-2.5 rounded-full" style={{ width: '0%' }}></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Pastures;
