import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, MessageSquare, BarChart2, History, Settings } from 'lucide-react';

interface SidebarProps {
  isMobile: boolean;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isMobile, isOpen, onClose }) => {
  const navItems = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/rules', icon: <MessageSquare size={20} />, label: 'Reply Rules' },
    { to: '/history', icon: <History size={20} />, label: 'Reply History' },
    { to: '/analytics', icon: <BarChart2 size={20} />, label: 'Analytics' },
    { to: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];
  
  const baseClasses = 'fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out';
  const mobileClasses = isMobile ? (isOpen ? 'translate-x-0' : '-translate-x-full') : 'translate-x-0';
  
  return (
    <>
      {isMobile && isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20"
          onClick={onClose}
        />
      )}
      
      <aside className={`${baseClasses} ${mobileClasses} pt-16`}>
        <nav className="px-2 py-4">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => `
                    flex items-center px-4 py-3 text-sm font-medium rounded-md transition-colors
                    ${isActive 
                      ? 'bg-primary/10 text-primary' 
                      : 'text-text-secondary hover:bg-gray-100 hover:text-text-primary'
                    }
                  `}
                  onClick={isMobile ? onClose : undefined}
                >
                  <span className="mr-3">{item.icon}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;