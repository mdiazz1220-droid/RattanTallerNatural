/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState } from 'react';
import { Logo } from './Logo';

interface FooterProps {
  onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
  onAdminClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onLinkClick, onAdminClick }) => {
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [email, setEmail] = useState('');

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
          <Logo className="h-9 text-[#2C2A26] mb-6" />
          <p className="max-w-xs font-light leading-relaxed mb-4">
            Tejiendo muebles y piezas decorativas 100% colombianas con dedicación, tradición y alma familiar desde Cali.
          </p>
          <div className="space-y-4 pt-2">
            <p className="text-sm font-medium text-[#2C2A26]">Cali, Valle del Cauca, Colombia</p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://www.instagram.com/rattantallernatural" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 text-sm text-[#5D5A53] hover:text-[#2C2A26] transition-colors group"
              >
                <span className="w-6 h-6 flex items-center justify-center border border-[#5D5A53]/30 rounded-full text-[10px] group-hover:border-[#2C2A26] transition-colors">IG</span>
                <span className="font-medium">@rattantallernatural</span>
              </a>
              <a 
                href="https://wa.me/573146185044?text=Hola%20Rattan%20Taller%20Natural,%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20muebles." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-center gap-2.5 text-sm text-[#5D5A53] hover:text-[#2C2A26] transition-colors group"
              >
                <span className="w-6 h-6 flex items-center justify-center border border-[#5D5A53]/30 rounded-full text-[10px] group-hover:border-[#2C2A26] transition-colors">WA</span>
                <span className="font-medium">+57 314 618 5044</span>
              </a>
            </div>
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
