
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingCart, LogOut, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
  
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-semibold text-primary">
            Elevate
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/#features" className="text-foreground/80 hover:text-primary transition-colors">
              Features
            </Link>
            <Link to="/#pricing" className="text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>
            <Link to="/#testimonials" className="text-foreground/80 hover:text-primary transition-colors">
              Testimonials
            </Link>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="h-5 w-5 text-foreground/80 hover:text-primary transition-colors" />
            </Link>
            
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <div className="text-sm font-medium">
                  {currentUser.email}
                </div>
                <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <>
                <Button variant="ghost" onClick={() => navigate('/login')} className="text-foreground/80 hover:text-primary">
                  Sign In
                </Button>
                <Button onClick={() => navigate('/register')}>
                  Get Started
                </Button>
              </>
            )}
          </div>
          
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground/80" />
            ) : (
              <Menu className="h-6 w-6 text-foreground/80" />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link 
                to="/#features" 
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Features
              </Link>
              <Link 
                to="/#pricing" 
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Pricing
              </Link>
              <Link 
                to="/#testimonials" 
                className="text-foreground/80 hover:text-primary transition-colors py-2"
                onClick={toggleMenu}
              >
                Testimonials
              </Link>
              
              {currentUser ? (
                <div className="pt-4 border-t">
                  <div className="text-sm font-medium mb-2">
                    {currentUser.email}
                  </div>
                  <Button variant="ghost" onClick={handleLogout} className="flex items-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button variant="ghost" onClick={() => { navigate('/login'); toggleMenu(); }}>
                    Sign In
                  </Button>
                  <Button onClick={() => { navigate('/register'); toggleMenu(); }}>
                    Get Started
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
