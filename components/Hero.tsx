/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const Hero: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      // Manual scroll calculation to account for fixed header
      const headerOffset = 85;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      
      // Update URL hash without jumping, safely ignoring errors in sandboxed environments
      try {
        window.history.pushState(null, '', `#${targetId}`);
      } catch (err) {
        // Ignore SecurityError in restricted environments
      }
    }
  };

  return (
    <section className="relative w-full h-screen min-h-[800px] overflow-hidden bg-[#D6D1C7]">
      
      {/* Background Image - Serene Rattan and Home Interior */}
      <div className="absolute inset-0 w-full h-full">
        <img 
            src="/src/assets/images/hero_rattan_living_room_1783278779115.jpg" 
            alt="Interiores con rattan y mimbre" 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover grayscale-[0.05] contrast-[0.9] brightness-[0.85] animate-[pulse_15s_ease-in-out_infinite_alternate]"
        />
        {/* Warmer Brown Overlay for Richness */}
        <div className="absolute inset-0 bg-[#433E38]/30 mix-blend-multiply"></div>
        {/* Deep Sepia Tone for Shadow Depth */}
        <div className="absolute inset-0 bg-[#313030]/15"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-start text-left md:items-center md:text-center px-6">
        <div className="animate-fade-in-up w-full md:w-auto">
          <span className="block text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-white/95 mb-6 backdrop-blur-sm bg-black/20 px-5 py-2.5 rounded-full mx-0 md:mx-auto w-fit border border-white/10">
            Diseño & Tradición Familiar
          </span>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-serif font-normal text-white tracking-tight mb-8 drop-shadow-sm">
            Rattan Taller <span className="italic text-[#F5F2EB]">Natural</span>
          </h1>
          <p className="max-w-2xl mx-0 md:mx-auto text-lg md:text-xl text-white/95 font-light leading-relaxed mb-12 text-shadow-sm">
            Piezas únicas, tejidas con el alma. <br/>
            Mano de obra 100% Colombiana desde Cali para llenar de calidez tu hogar.
          </p>
          
          <a 
            href="#products" 
            onClick={(e) => handleNavClick(e, 'products')}
            className="group relative px-10 py-4 bg-[#F5F2EB] text-[#2C2A26] rounded-full text-sm font-semibold uppercase tracking-widest hover:bg-white transition-all duration-500 overflow-hidden shadow-lg hover:shadow-xl inline-block"
          >
            <span className="relative z-10 group-hover:text-[#2C2A26]">Ver Colección</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
