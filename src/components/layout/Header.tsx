import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bell, Settings, User, LogOut, Mail } from 'lucide-react';
import Button from '../ui/Button';
import useAuthStore from '../../store/authStore';
import useNotificationStore from '../../store/notificationStore';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, status } = useAuthStore();
  const { unreadCount, fetchNotifications } = useNotificationStore();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  
  React.useEffect(() => {
    if (status === 'authenticated') {
      fetchNotifications();
    }
  }, [status, fetchNotifications]);
  
  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link to="/" className="flex items-center space-x-2">
          <Mail className="h-6 w-6 text-primary" />
          <span className="text-xl font-semibold">AutoReply</span>
        </Link>
        
        {status === 'authenticated' ? (
          <div className="flex items-center space-x-4">
            <Link 
              to="/notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-error text-white text-xs flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </Link>
            
            <Link 
              to="/settings"
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <Settings size={20} />
            </Link>
            
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsProfileOpen(!isProfileOpen)}
              >
                <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  {user?.picture ? (
                    <img src={user.picture} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    <User size={20} className="text-gray-500" />
                  )}
                </div>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-40 border border-gray-200 animate-fade-in">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm font-medium text-text-primary">{user?.name}</p>
                    <p className="text-xs text-text-secondary truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Your Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-text-primary hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={16} className="mr-2" />
                      Settings
                    </Link>
                    <button
                      className="w-full flex items-center px-4 py-2 text-sm text-error hover:bg-gray-100"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} className="mr-2" />
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={() => navigate('/login')}
          >
            Sign In
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;