import { ShoppingCart, Menu, X, Phone, Mail, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
}

function SoloPharmaLogo({ className = '' }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="SoloPharma Logo"
      className={`${className} object-contain`}
    />
  );
}

export function Header({ cartItemsCount, onCartClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { name: 'Home', to: '/' },
    { name: 'Shop', to: '/products' },
    { name: 'About', to: '/about' },
    { name: 'Contact', to: '/contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? 'glass shadow-lg shadow-slate-200/60' : 'bg-white/95'
      }`}
    >
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#022047] via-[#0077b6] to-[#00b4d8] text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/201000889707"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +201000889707
            </a>
            <a
              href="mailto:info@esolopharma.com"
              className="hidden sm:flex items-center gap-1.5 hover:text-sky-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              info@esolopharma.com
            </a>
          </div>
          <span className="text-sky-100 font-medium hidden sm:block">
            ✨ Free shipping on orders over 500 EGP
          </span>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" aria-label="SoloPharma Home">
            <SoloPharmaLogo className="h-24 md:h-28 w-auto max-w-[280px] py-1" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-2 font-medium text-sm transition-colors duration-200 rounded-lg hover:bg-sky-50 group ${
                    isActive ? 'text-[#0077b6]' : 'text-slate-700 hover:text-[#0077b6]'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    <span
                      className={`absolute bottom-1 left-4 right-4 h-0.5 bg-gradient-to-r from-[#0077b6] to-[#00b4d8] rounded-full transition-transform origin-left ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onCartClick}
              className="relative p-2.5 rounded-xl bg-gradient-to-br from-[#0077b6] to-[#00b4d8] text-white hover:shadow-lg hover:shadow-sky-300/40 transition-all duration-200 hover:-translate-y-0.5"
              aria-label={`Cart (${cartItemsCount} items)`}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate(isAuthenticated ? '/profile' : '/login')}
              className="p-2.5 rounded-xl bg-slate-100 text-[#022047] hover:bg-sky-50 hover:text-[#0077b6] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
              aria-label={isAuthenticated ? 'Your Profile' : 'Login'}
            >
              <User className="w-5 h-5" />
            </button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile nav */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <nav className="flex flex-col gap-1 pb-4 border-t pt-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-4 py-3 font-medium rounded-xl transition-colors ${
                    isActive
                      ? 'text-[#0077b6] bg-sky-50'
                      : 'text-slate-700 hover:text-[#0077b6] hover:bg-sky-50'
                  }`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
