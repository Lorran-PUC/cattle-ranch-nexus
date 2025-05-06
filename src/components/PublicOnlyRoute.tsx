
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface PublicOnlyRouteProps {
  children?: React.ReactNode;
}

const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  // Mostrar um loading state enquanto verificamos a autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }
  
  // Redirecionar para o dashboard se já estiver autenticado
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Renderizar o componente filho ou o outlet para rotas aninhadas
  return children ? <>{children}</> : <Outlet />;
};

export default PublicOnlyRoute;
