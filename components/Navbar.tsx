/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { BRAND_NAME } from '../constants';
import { Instagram, MessageCircle } from 'lucide-react';

interface NavbarProps {
  onNavClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavClick, cartCount, onOpenCart }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    setMobileMenuOpen(false);
    onNavClick(e, targetId);
  };

  const handleCartClick = (e: React.MouseEvent) => {
      e.preventDefault();
      setMobileMenuOpen(false);
      onOpenCart();
  }

  // Determine text color based on state
  const textColorClass = (scrolled || mobileMenuOpen) ? 'text-[#2C2A26]' : 'text-[#F5F2EB]';

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-in-out ${
          scrolled || mobileMenuOpen ? 'bg-[#F5F2EB]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-8'
        }`}
      >
        <div className="max-w-[1800px] mx-auto px-8 flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#" 
            onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                onNavClick(e, ''); // Pass empty string to just reset to home
            }}
            className="z-50 relative flex items-center"
          >
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt={BRAND_NAME} 
                onError={(e) => {
                  const img = e.currentTarget;
                  if (img.src.endsWith('/logo.png')) {
                    img.src = '/logo.svg';
                  } else if (img.src.endsWith('/logo.svg')) {
                    img.src = '/logo.jpg';
                  } else if (img.src.endsWith('/logo.jpg')) {
                    img.src = '/logo.webp';
                  } else {
                    setLogoError(true);
                  }
                }} 
                className="h-10 md:h-12 w-auto object-contain transition-all duration-500"
              />
            ) : (
              <span className={`text-3xl font-serif font-medium tracking-tight transition-colors duration-500 ${textColorClass}`}>
                {BRAND_NAME}
              </span>
            )}
          </a>
          
          {/* Center Links - Desktop */}
          <div className={`hidden md:flex items-center gap-12 text-sm font-medium tracking-widest uppercase transition-colors duration-500 ${textColorClass}`}>
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:opacity-60 transition-opacity">Colección</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:opacity-60 transition-opacity">Nosotros</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:opacity-60 transition-opacity">Saberes</a>
          </div>

          {/* Right Actions */}
          <div className={`flex items-center gap-6 z-50 relative transition-colors duration-500 ${textColorClass}`}>
            <a 
              href="https://www.instagram.com/rattantallernatural" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity flex items-center"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/573146185044?text=Hola%20Rattan%20Taller%20Natural%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20muebles%20y%20accesorios." 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:opacity-60 transition-opacity flex items-center"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
            <button 
              onClick={handleCartClick}
              className="text-sm font-medium uppercase tracking-widest hover:opacity-60 transition-opacity hidden sm:block border-l border-current pl-6"
            >
              Carrito ({cartCount})
            </button>
            
            {/* Mobile Menu Toggle */}
            <button 
              className={`block md:hidden focus:outline-none transition-colors duration-500 ${textColorClass}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
               {mobileMenuOpen ? (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                 </svg>
               )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 bg-[#F5F2EB] z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-10 pointer-events-none'
      }`}>
          <div className="flex flex-col items-center space-y-8 text-xl font-serif font-medium text-[#2C2A26]">
            <a href="#products" onClick={(e) => handleLinkClick(e, 'products')} className="hover:opacity-60 transition-opacity">Colección</a>
            <a href="#about" onClick={(e) => handleLinkClick(e, 'about')} className="hover:opacity-60 transition-opacity">Nosotros</a>
            <a href="#journal" onClick={(e) => handleLinkClick(e, 'journal')} className="hover:opacity-60 transition-opacity">Saberes</a>
            <button 
                onClick={handleCartClick} 
                className="hover:opacity-60 transition-opacity text-base uppercase tracking-widest font-sans mt-8"
            >
                Carrito ({cartCount})
            </button>
            <div className="flex items-center gap-8 pt-12 border-t border-[#D6D1C7]/30 w-32 justify-center">
              <a 
                href="https://www.instagram.com/rattantallernatural" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity text-[#2C2A26]"
                title="Instagram"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://wa.me/573146185044?text=Hola%20Rattan%20Taller%20Natural%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20muebles%20y%20accesorios." 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:opacity-60 transition-opacity text-[#2C2A26]"
                title="WhatsApp"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
            </div>
          </div>
      </div>
    </>
  );
};

export default Navbar;
