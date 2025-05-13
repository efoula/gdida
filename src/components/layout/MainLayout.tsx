import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import useAuthStore from '../../store/authStore';

interface MainLayoutProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

const MainLayout: React.FC<MainLayoutProps> = ({ 
  children,
  requireAuth = false
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const { status, isInitialized } = useAuthStore();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isInitialized && requireAuth && status === 'unauthenticated') {
      navigate('/login');
    }
  }, [status, navigate, isInitialized, requireAuth]);
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (requireAuth && (status === 'loading' || status === 'unauthenticated')) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="flex">
        {status === 'authenticated' && (
          <Sidebar 
            isMobile={isMobile} 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)} 
          />
        )}
        
        <main 
          className={`flex-1 transition-all ${!isMobile && status === 'authenticated' ? 'ml-64' : 'ml-0'}`}
        >
          <div className="container mx-auto px-4 py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;