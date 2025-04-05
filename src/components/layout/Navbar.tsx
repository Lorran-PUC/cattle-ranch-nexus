
import React, { useEffect, useState } from 'react';
import { Menu, Bell, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/useTheme';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface NavbarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isSidebarOpen, toggleSidebar }) => {
  const { theme, setTheme } = useTheme();

  return (
    <header className="h-16 bg-background border-b border-border flex items-center justify-between px-4 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="mr-4"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="font-semibold text-lg text-foreground flex items-center">
          <span className="text-primary">Cattle</span>
          <span className="ml-1">Manager</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cattle-danger"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="px-4 py-3 font-medium border-b">Notificações</div>
            <div className="py-2 px-4 text-sm text-muted-foreground">
              <div className="mb-2 pb-2 border-b">
                <p className="font-medium text-foreground">Vacina Pendente</p>
                <p>5 animais precisam da vacina contra Febre Aftosa</p>
                <p className="text-xs text-muted-foreground mt-1">Hoje</p>
              </div>
              <div className="mb-2 pb-2 border-b">
                <p className="font-medium text-foreground">Animal em Gestação</p>
                <p>Vaca #1235 está em período final de gestação</p>
                <p className="text-xs text-muted-foreground mt-1">Ontem</p>
              </div>
              <div>
                <p className="font-medium text-foreground">Pesagem Agendada</p>
                <p>Lembrete de pesagem para o lote 3</p>
                <p className="text-xs text-muted-foreground mt-1">3 dias atrás</p>
              </div>
            </div>
            <DropdownMenuItem className="justify-center font-medium cursor-pointer">
              Ver todas as notificações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
