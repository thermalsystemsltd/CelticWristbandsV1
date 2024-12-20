import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="bg-celtic-green text-celtic-gold shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {!logoError ? (
              <img 
                src="/celtic-logo.png" 
                alt="Celtic Wristbands - Unite with the Ancient Past" 
                className="h-20 md:h-24"
                style={{ maxWidth: 'none' }}
                onError={() => setLogoError(true)}
              />
            ) : (
              <span className="text-2xl font-bold">Celtic Wristbands</span>
            )}
          </Link>
          
          <nav className={`${isMenuOpen ? 'block' : 'hidden'} md:block absolute md:relative top-full left-0 w-full md:w-auto bg-celtic-green md:bg-transparent z-50`}>
            <div className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
              <Link to="/" className="py-2 md:py-0 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/about" className="py-2 md:py-0 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="py-2 md:py-0 hover:text-white transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="hover:text-white transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};