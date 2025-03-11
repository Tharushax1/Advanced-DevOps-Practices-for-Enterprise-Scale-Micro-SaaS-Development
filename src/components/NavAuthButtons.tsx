
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut, LogIn } from 'lucide-react';

const NavAuthButtons = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to log out');
    }
  };

  const handleLogin = () => {
    navigate('/login');
  };

  if (currentUser) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm hidden md:inline-block">
          {currentUser.email}
        </span>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleLogout}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden md:inline-block">Sign Out</span>
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={handleLogin}
      className="flex items-center gap-2"
    >
      <LogIn className="h-4 w-4" />
      <span>Sign In</span>
    </Button>
  );
};

export default NavAuthButtons;
