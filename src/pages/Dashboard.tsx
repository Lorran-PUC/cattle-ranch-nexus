
import React from 'react';
import { Users, Activity, Syringe, Baby, Scale, Heart } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import PieChart from '@/components/dashboard/PieChart';
import CalendarEvents from '@/components/dashboard/CalendarEvents';

// Dados simulados
const weightData = [
  { name: 'Jan', value: 420 },
  { name: 'Fev', value: 435 },
  { name: 'Mar', value: 450 },
  { name: 'Abr', value: 470 },
  { name: 'Mai', value: 480 },
  { name: 'Jun', value: 495 },
];

const birthRateData = [
  { name: '2019', value: 85 },
  { name: '2020', value: 88 },
  { name: '2021', value: 91 },
  { name: '2022', value: 87 },
  { name: '2023', value: 92 },
  { name: '2024', value: 90 },
];

const breedData = [
  { name: 'Nelore', value: 45, color: '#2D6A4F' },
  { name: 'Angus', value: 25, color: '#40916C' },
  { name: 'Brahman', value: 15, color: '#D4A373' },
  { name: 'Gir', value: 10, color: '#95D5B2' },
  { name: 'Outros', value: 5, color: '#E9EDC9' },
];

const calfData = [
  { name: 'Jan', value: 8 },
  { name: 'Fev', value: 12 },
  { name: 'Mar', value: 5 },
  { name: 'Abr', value: 9 },
  { name: 'Mai', value: 14 },
  { name: 'Jun', value: 10 },
];

const calendarEvents = [
  {
    id: '1',
    title: 'Vacina Febre Aftosa - Lote 3',
    date: new Date(2025, 3, 5, 9, 0), // 5 de abril de 2025, 9h
    type: 'vaccination' as const,
  },
  {
    id: '2',
    title: 'Pesagem - Bezerros',
    date: new Date(2025, 3, 8, 8, 0), // 8 de abril de 2025, 8h
    type: 'weight' as const,
  },
  {
    id: '3',
    title: 'Parto Programado - #1245',
    date: new Date(2025, 3, 5, 14, 0), // 5 de abril de 2025, 14h
    type: 'reproduction' as const,
  },
  {
    id: '4',
    title: 'Rotação de Pastagens',
    date: new Date(2025, 3, 10, 7, 0), // 10 de abril de 2025, 7h
    type: 'other' as const,
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <div className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total de Animais"
          value="254"
          description="Última contagem"
          icon={<Users size={18} />}
          trend={{ value: 3.2, isPositive: true }}
        />
        <StatCard
          title="Peso Médio"
          value="495 kg"
          description="Últimos 30 dias"
          icon={<Scale size={18} />}
          trend={{ value: 1.8, isPositive: true }}
        />
        <StatCard
          title="Taxa de Natalidade"
          value="92%"
          description="Este ano"
          icon={<Baby size={18} />}
          trend={{ value: 2.1, isPositive: true }}
        />
        <StatCard
          title="Vacinas Pendentes"
          value="12"
          description="Próximos 15 dias"
          icon={<Syringe size={18} />}
          trend={{ value: 5, isPositive: false }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <LineChart
          title="Evolução do Peso Médio (kg)"
          data={weightData}
          dataKey="value"
          stroke="#40916C"
        />
        <BarChart
          title="Taxa de Natalidade (%)"
          data={birthRateData}
          dataKey="value"
          fill="#2D6A4F"
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <PieChart
          title="Distribuição por Raça"
          data={breedData}
          className="md:col-span-1"
        />
        <BarChart
          title="Nascimentos por Mês"
          data={calfData}
          dataKey="value"
          fill="#D4A373"
          className="md:col-span-2"
        />
      </div>

      <CalendarEvents events={calendarEvents} />
    </div>
  );
};

export default Dashboard;
