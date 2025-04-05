
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Plus, Search, FileDown, Filter, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Dados simulados para os animais
const mockAnimals = [
  {
    id: '1001',
    name: 'Estrela',
    tag: 'EST-1001',
    breed: 'Nelore',
    gender: 'Fêmea',
    birthDate: '10/05/2020',
    weight: 450,
    status: 'Ativo',
    category: 'Matriz',
  },
  {
    id: '1002',
    name: 'Sultão',
    tag: 'SUL-1002',
    breed: 'Angus',
    gender: 'Macho',
    birthDate: '22/07/2019',
    weight: 680,
    status: 'Ativo',
    category: 'Reprodutor',
  },
  {
    id: '1003',
    name: 'Aurora',
    tag: 'AUR-1003',
    breed: 'Nelore',
    gender: 'Fêmea',
    birthDate: '15/03/2021',
    weight: 410,
    status: 'Ativo',
    category: 'Matriz',
  },
  {
    id: '1004',
    name: 'Trovão',
    tag: 'TRO-1004',
    breed: 'Brahman',
    gender: 'Macho',
    birthDate: '30/11/2020',
    weight: 620,
    status: 'Ativo',
    category: 'Reprodutor',
  },
  {
    id: '1005',
    name: 'Luna',
    tag: 'LUN-1005',
    breed: 'Gir',
    gender: 'Fêmea',
    birthDate: '05/08/2022',
    weight: 320,
    status: 'Ativo',
    category: 'Novilha',
  },
  {
    id: '1006',
    name: 'Nobre',
    tag: 'NOB-1006',
    breed: 'Nelore',
    gender: 'Macho',
    birthDate: '12/01/2022',
    weight: 380,
    status: 'Ativo',
    category: 'Novilho',
  },
];

const Animals = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [gender, setGender] = useState('all');
  const [activeTab, setActiveTab] = useState('lista');

  // Filtragem dos animais
  const filteredAnimals = mockAnimals.filter(animal => {
    const matchesSearch = 
      animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      animal.tag.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === 'all' || animal.category === category;
    const matchesGender = gender === 'all' || animal.gender === gender;
    
    return matchesSearch && matchesCategory && matchesGender;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Animais</h1>
        <Button onClick={() => navigate('/animals/new')} className="bg-cattle-primary hover:bg-cattle-primary/90">
          <Plus size={16} className="mr-2" /> 
          Novo Animal
        </Button>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Rebanho</CardTitle>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter size={16} className="mr-2" />
                  Filtros
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Filtros</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="status">Status</Label>
                    <Select defaultValue="ativo">
                      <SelectTrigger id="status">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ativo">Ativo</SelectItem>
                        <SelectItem value="vendido">Vendido</SelectItem>
                        <SelectItem value="morto">Morto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="breed">Raça</Label>
                    <Select defaultValue="all">
                      <SelectTrigger id="breed">
                        <SelectValue placeholder="Selecione a raça" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas</SelectItem>
                        <SelectItem value="nelore">Nelore</SelectItem>
                        <SelectItem value="angus">Angus</SelectItem>
                        <SelectItem value="brahman">Brahman</SelectItem>
                        <SelectItem value="gir">Gir</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="minWeight">Peso Mínimo (kg)</Label>
                      <Input id="minWeight" type="number" placeholder="0" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="maxWeight">Peso Máximo (kg)</Label>
                      <Input id="maxWeight" type="number" placeholder="1000" />
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline">Limpar Filtros</Button>
                    <Button>Aplicar Filtros</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mt-4">
            <div className="w-full md:w-96 relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome, identificação..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full md:w-auto">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas Categorias</SelectItem>
                  <SelectItem value="Matriz">Matriz</SelectItem>
                  <SelectItem value="Reprodutor">Reprodutor</SelectItem>
                  <SelectItem value="Novilha">Novilha</SelectItem>
                  <SelectItem value="Novilho">Novilho</SelectItem>
                  <SelectItem value="Bezerro">Bezerro</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Ambos</SelectItem>
                  <SelectItem value="Macho">Macho</SelectItem>
                  <SelectItem value="Fêmea">Fêmea</SelectItem>
                </SelectContent>
              </Select>
              
              <Button variant="outline" size="icon" title="Exportar">
                <FileDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead>Raça</TableHead>
                  <TableHead className="hidden sm:table-cell">Categoria</TableHead>
                  <TableHead className="hidden md:table-cell">Sexo</TableHead>
                  <TableHead className="hidden lg:table-cell">Data Nasc.</TableHead>
                  <TableHead className="text-right">Peso (kg)</TableHead>
                  <TableHead className="w-[100px] text-center">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAnimals.map((animal) => (
                  <TableRow key={animal.id}>
                    <TableCell className="font-medium">{animal.tag}</TableCell>
                    <TableCell>{animal.name}</TableCell>
                    <TableCell>{animal.breed}</TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Badge variant="outline">
                        {animal.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{animal.gender}</TableCell>
                    <TableCell className="hidden lg:table-cell">{animal.birthDate}</TableCell>
                    <TableCell className="text-right">{animal.weight}</TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" title="Ver detalhes">
                        <Eye className="h-4 w-4" />
                      </Button>
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

export default Animals;
