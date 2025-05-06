
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Filter, Calendar as CalendarIcon, ArrowUpDown, Search } from 'lucide-react';
import LineChart from '@/components/dashboard/LineChart';

const Weights = () => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [selectedTab, setSelectedTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pesagens</h1>
          <p className="text-muted-foreground">
            Registro e controle de pesagens do rebanho
          </p>
        </div>
        <Button className="sm:w-auto w-full">
          <PlusCircle className="mr-2 h-4 w-4" />
          Nova Pesagem
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
              <Label className="block mb-2">Categoria</Label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas as categorias</SelectItem>
                  <SelectItem value="calf">Bezerros</SelectItem>
                  <SelectItem value="heifer">Novilhas</SelectItem>
                  <SelectItem value="bull">Touros</SelectItem>
                  <SelectItem value="cow">Vacas</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="block mb-2">Lote</Label>
              <Select defaultValue="all">
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Todos os lotes" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os lotes</SelectItem>
                  <SelectItem value="lot1">Lote 1</SelectItem>
                  <SelectItem value="lot2">Lote 2</SelectItem>
                  <SelectItem value="lot3">Lote 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="block mb-2">Data da Pesagem</Label>
              <div className="mt-2">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="border rounded-md p-2"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Main content */}
        <div className="md:col-span-9 space-y-6">
          <Tabs defaultValue="all" onValueChange={setSelectedTab}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="pending">Aguardando Pesagem</TabsTrigger>
                <TabsTrigger value="recent">Pesagens Recentes</TabsTrigger>
              </TabsList>
              
              <div className="relative">
                <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Buscar animal..." 
                  className="pl-9 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="all">
              <Card>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Button variant="ghost" className="p-0 hover:bg-transparent">
                            <span>Identificação</span>
                            <ArrowUpDown className="ml-2 h-3 w-3" />
                          </Button>
                        </TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Última Pesagem</TableHead>
                        <TableHead>Peso Atual (kg)</TableHead>
                        <TableHead>Ganho Diário (kg)</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">#1201</TableCell>
                        <TableCell>Vaca</TableCell>
                        <TableCell>Lote 1</TableCell>
                        <TableCell>01/05/2025</TableCell>
                        <TableCell>420</TableCell>
                        <TableCell>0.8</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1352</TableCell>
                        <TableCell>Novilha</TableCell>
                        <TableCell>Lote 2</TableCell>
                        <TableCell>28/04/2025</TableCell>
                        <TableCell>280</TableCell>
                        <TableCell>0.6</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1458</TableCell>
                        <TableCell>Bezerro</TableCell>
                        <TableCell>Lote 3</TableCell>
                        <TableCell>03/05/2025</TableCell>
                        <TableCell>120</TableCell>
                        <TableCell>0.5</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1089</TableCell>
                        <TableCell>Touro</TableCell>
                        <TableCell>Lote 1</TableCell>
                        <TableCell>25/04/2025</TableCell>
                        <TableCell>680</TableCell>
                        <TableCell>0.9</TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">Detalhes</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Animais Aguardando Pesagem</CardTitle>
                  <CardDescription>Animais com pesagem programada para hoje</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Identificação</TableHead>
                        <TableHead>Categoria</TableHead>
                        <TableHead>Lote</TableHead>
                        <TableHead>Última Pesagem</TableHead>
                        <TableHead>Dias Desde Última</TableHead>
                        <TableHead>Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">#1102</TableCell>
                        <TableCell>Vaca</TableCell>
                        <TableCell>Lote 3</TableCell>
                        <TableCell>04/04/2025</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>
                          <Button variant="default" size="sm">Registrar Peso</Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">#1348</TableCell>
                        <TableCell>Bezerro</TableCell>
                        <TableCell>Lote 2</TableCell>
                        <TableCell>04/04/2025</TableCell>
                        <TableCell>30</TableCell>
                        <TableCell>
                          <Button variant="default" size="sm">Registrar Peso</Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recent">
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução de Peso - Últimos 6 meses</CardTitle>
                    <CardDescription>Ganho médio diário por categoria animal</CardDescription>
                  </CardHeader>
                  <CardContent className="h-80">
                    <LineChart />
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Histórico de Pesagens Recentes</CardTitle>
                    <CardDescription>Últimas pesagens registradas no sistema</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Data</TableHead>
                          <TableHead>Lote</TableHead>
                          <TableHead>Qtd. Animais</TableHead>
                          <TableHead>Peso Médio (kg)</TableHead>
                          <TableHead>GMD Médio (kg/dia)</TableHead>
                          <TableHead>Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell>05/05/2025</TableCell>
                          <TableCell>Lote 1</TableCell>
                          <TableCell>45</TableCell>
                          <TableCell>420</TableCell>
                          <TableCell>0.75</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>03/05/2025</TableCell>
                          <TableCell>Lote 3</TableCell>
                          <TableCell>28</TableCell>
                          <TableCell>320</TableCell>
                          <TableCell>0.65</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>01/05/2025</TableCell>
                          <TableCell>Lote 2</TableCell>
                          <TableCell>35</TableCell>
                          <TableCell>380</TableCell>
                          <TableCell>0.70</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
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

export default Weights;
