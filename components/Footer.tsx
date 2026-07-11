/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { BRAND_NAME } from '../constants';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onAdminClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');
  const [logoError, setLogoError] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribeStatus('loading');
    setTimeout(() => {
      setSubscribeStatus('success');
      setEmail('');
    }, 1500);
  };

  return (
    <footer className="bg-[#EBE7DE] pt-24 pb-12 px-6 text-[#5D5A53]">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4">
          {!logoError ? (
            <img 
              src="/assets/images/logo_1783286277414.png" 
              alt={BRAND_NAME} 
              onError={() => setLogoError(true)} 
              className="h-12 w-auto object-contain mb-6 transition-all duration-300"
            />
          ) : (
            <h4 className="text-2xl font-serif text-[#2C2A26] mb-6">{BRAND_NAME}</h4>
          )}
          <p className="max-w-xs font-light leading-relaxed mb-4">
            Tejiendo muebles y piezas decorativas 100% colombianas con dedicación, tradición y alma familiar desde Cali.
          </p>
          <p className="text-sm font-medium text-[#2C2A26] mb-2">Cali, Valle del Cauca, Colombia</p>
          <p className="text-xs mb-4">Sígannos en redes sociales para ver procesos de fabricación y novedades:</p>
          <div className="flex items-center gap-4">
            <a 
              href="https://www.instagram.com/rattantallernatural" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#D6D1C7]/30 hover:bg-[#D6D1C7]/60 flex items-center justify-center text-[#2C2A26] transition-all"
              title="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a 
              href="https://wa.me/573146185044?text=Hola%20Rattan%20Taller%20Natural%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20muebles%20y%20accesorios." 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-[#D6D1C7]/30 hover:bg-[#D6D1C7]/60 flex items-center justify-center text-[#2C2A26] transition-all"
              title="WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-medium text-[#2C2A26] mb-6 tracking-wide text-sm uppercase">Líneas</h4>
          <ul className="space-y-4 font-light">
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Sillas y Salas</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Mesas y Comedores</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Accesorios</a></li>
            <li><a href="#products" onClick={(e) => onLinkClick(e, 'products')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Pets y Nidos</a></li>
          </ul>
        </div>
        
        <div className="md:col-span-2">
          <h4 className="font-medium text-[#2C2A26] mb-6 tracking-wide text-sm uppercase">Taller</h4>
          <ul className="space-y-4 font-light">
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Sobre Nosotros</a></li>
            <li><a href="#about" onClick={(e) => onLinkClick(e, 'about')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Nuestra Historia</a></li>
            <li><a href="#journal" onClick={(e) => onLinkClick(e, 'journal')} className="hover:text-[#2C2A26] transition-colors underline-offset-4 hover:underline">Saberes y Consejos</a></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-medium text-[#2C2A26] mb-6 tracking-wide text-sm uppercase">Novedades del Taller</h4>
          <div className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="tu@correo.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={subscribeStatus === 'loading' || subscribeStatus === 'success'}
              className="bg-transparent border-b border-[#A8A29E] py-2 text-lg outline-none focus:border-[#2C2A26] transition-colors placeholder-[#A8A29E]/70 text-[#2C2A26] disabled:opacity-50" 
            />
            <button 
              onClick={handleSubscribe}
              disabled={subscribeStatus !== 'idle' || !email}
              className="self-start text-sm font-medium uppercase tracking-widest mt-2 hover:text-[#2C2A26] disabled:cursor-default disabled:hover:text-[#5D5A53] disabled:opacity-50 transition-opacity"
            >
              {subscribeStatus === 'idle' && 'Suscribirse'}
              {subscribeStatus === 'loading' && 'Suscribiéndose...'}
              {subscribeStatus === 'success' && '¡Suscrito!'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t border-[#D6D1C7] flex flex-col md:flex-row justify-between items-center text-xs uppercase tracking-widest opacity-60">
        <p>Rattan Taller Natural Cali — © 2026. Mano de obra 100% Colombiana.</p>
        <button 
          onClick={onAdminClick}
          className="mt-4 md:mt-0 hover:text-[#2C2A26] transition-colors underline underline-offset-4 cursor-pointer"
        >
          Acceso Administrativo
        </button>
      </div>
    </footer>
  );
};

export default Footer;