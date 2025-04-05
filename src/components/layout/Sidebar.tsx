
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Home, 
  Users, 
  Calendar, 
  Activity, 
  Heart, 
  Leaf, 
  FileText, 
  Settings,
  Menu,
  LogOut,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface SidebarProps {
  isSidebarOpen: boolean;
}

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isSidebarOpen: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon: Icon, label, isSidebarOpen }) => {
  return (
    <li>
      {isSidebarOpen ? (
        <NavLink 
          to={to} 
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors",
            isActive && "bg-sidebar-accent/20 font-medium"
          )}
        >
          <Icon size={20} />
          <span>{label}</span>
        </NavLink>
      ) : (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink 
              to={to} 
              className={({ isActive }) => cn(
                "flex items-center justify-center h-10 w-10 rounded-md text-sidebar-foreground hover:bg-sidebar-accent/20 transition-colors mx-auto",
                isActive && "bg-sidebar-accent/20"
              )}
            >
              <Icon size={24} />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            {label}
          </TooltipContent>
        </Tooltip>
      )}
    </li>
  );
};

const AppSidebar: React.FC<SidebarProps> = ({ isSidebarOpen }) => {
  return (
    <div className={cn(
      "fixed left-0 top-16 bottom-0 bg-sidebar z-40 transition-all duration-200 border-r border-sidebar-border",
      isSidebarOpen ? "w-64" : "w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className="py-4 flex-1 overflow-y-auto">
          <nav>
            <ul className={cn(
              "space-y-2",
              !isSidebarOpen && "px-3"
            )}>
              <NavItem to="/" icon={Home} label="Dashboard" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/animals" icon={Users} label="Animais" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/vaccination" icon={Calendar} label="Vacinação" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/weights" icon={Activity} label="Pesagens" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/reproduction" icon={Heart} label="Reprodução" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/pastures" icon={Leaf} label="Pastagens" isSidebarOpen={isSidebarOpen} />
              <NavItem to="/reports" icon={FileText} label="Relatórios" isSidebarOpen={isSidebarOpen} />
            </ul>
          </nav>
          
          {isSidebarOpen && (
            <div className="mt-8 px-4">
              <h3 className="text-xs uppercase text-sidebar-foreground/60 font-medium mb-2">Administração</h3>
            </div>
          )}
          
          <ul className={cn(
            "mt-2 space-y-2",
            !isSidebarOpen && "px-3"
          )}>
            <NavItem to="/settings" icon={Settings} label="Configurações" isSidebarOpen={isSidebarOpen} />
          </ul>
        </div>
        
        <div className="border-t border-sidebar-border py-4">
          <div className={cn(
            "flex items-center text-sidebar-foreground cursor-pointer hover:bg-sidebar-accent/20 transition-colors rounded-md",
            isSidebarOpen ? "px-4 py-2 mx-2" : "justify-center py-2"
          )}>
            {isSidebarOpen ? (
              <>
                <div className="w-8 h-8 rounded-full bg-sidebar-accent/30 flex items-center justify-center">
                  <User size={16} />
                </div>
                <div className="ml-2">
                  <p className="text-sm font-medium">Administrador</p>
                  <p className="text-xs text-sidebar-foreground/60">Perfil</p>
                </div>
              </>
            ) : (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="w-10 h-10 rounded-full bg-sidebar-accent/30 flex items-center justify-center">
                    <User size={20} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Perfil do Usuário
                </TooltipContent>
              </Tooltip>
            )}
          </div>
          
          <div className={cn(
            "flex items-center text-sidebar-foreground/80 cursor-pointer hover:bg-sidebar-accent/20 transition-colors rounded-md mt-2",
            isSidebarOpen ? "px-4 py-2 mx-2" : "justify-center py-2"
          )}>
            {isSidebarOpen ? (
              <>
                <LogOut size={20} />
                <span className="ml-2">Sair</span>
              </>
            ) : (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <div className="flex items-center justify-center">
                    <LogOut size={24} />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">
                  Sair
                </TooltipContent>
              </Tooltip>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSidebar;
