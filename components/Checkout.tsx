/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Product } from '../types';

interface CheckoutProps {
  items: Product[];
  onBack: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ items, onBack }) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    lastName: '',
    address: '',
    city: 'Cali',
    whatsapp: '',
    dept: '',
    notes: ''
  });

  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-32 pb-24 px-6 bg-[#F5F2EB] flex items-center justify-center animate-fade-in-up">
        <div className="max-w-md w-full bg-white p-12 text-center border border-[#D6D1C7] shadow-xl">
          <div className="w-16 h-16 bg-[#2C2A26] text-[#F5F2EB] rounded-full flex items-center justify-center mx-auto mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-3xl font-serif text-[#2C2A26] mb-4">¡Cotización Recibida!</h2>
          <p className="text-[#5D5A53] font-light leading-relaxed mb-8">
            Muchas gracias por elegir Rattan Taller Natural. Hemos registrado tu solicitud de cotización. <span className="font-semibold text-[#2C2A26]">${total.toLocaleString('es-CO')} COP</span>.
          </p>
          <p className="text-[#5D5A53] font-light leading-relaxed mb-8 text-sm">
            Uno de nuestros artesanos se comunicará contigo vía WhatsApp al número <span className="font-semibold text-[#2C2A26]">{formData.whatsapp}</span> para finalizar el diseño, acordar detalles de entrega en Cali (o envío nacional) y coordinar el pago.
          </p>
          <button 
            onClick={onBack}
            className="w-full py-4 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-xs font-semibold hover:bg-[#433E38] transition-colors"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    );
  }

  const isFormValid = formData.email && formData.name && formData.lastName && formData.address && formData.whatsapp;

  return (
    <div className="min-h-screen pt-36 md:pt-40 pb-24 px-6 bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-12"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver a la Tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left Column: Form */}
          <div>
            <h1 className="text-3xl font-serif text-[#2C2A26] mb-4">Solicitar Cotización</h1>
            <p className="text-sm text-[#5D5A53] mb-12">
              Ingresa tus datos para coordinar la fabricación, entrega y pago directamente por WhatsApp con el taller en Cali.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-12">
              {/* Section 1: Contact */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Información de Contacto</h2>
                <div className="space-y-4">
                   <input 
                     type="email" 
                     placeholder="Correo electrónico" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                   />
                </div>
              </div>

              {/* Section 2: Shipping */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">Detalles de Entrega</h2>
                <div className="space-y-4">
                   <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Nombre" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                      <input 
                        type="text" 
                        placeholder="Apellido" 
                        required
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                   </div>
                   <input 
                     type="text" 
                     placeholder="Dirección completa" 
                     required
                     value={formData.address}
                     onChange={(e) => setFormData({...formData, address: e.target.value})}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                   />
                   <div className="grid grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="Ciudad (ej. Cali)" 
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                      <input 
                        type="text" 
                        placeholder="Departamento (ej. Valle)" 
                        value={formData.dept}
                        onChange={(e) => setFormData({...formData, dept: e.target.value})}
                        className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                      />
                   </div>
                </div>
              </div>

               {/* Section 3: Contact details (WhatsApp) */}
              <div>
                <h2 className="text-xl font-serif text-[#2C2A26] mb-6">WhatsApp y Notas de Fabricación</h2>
                <div className="p-6 border border-[#D6D1C7] bg-white/50 space-y-4">
                   <p className="text-xs text-[#5D5A53] mb-2">Ingresa tu número de WhatsApp. El taller te enviará fotos de los acabados de fibra y opciones de cojines.</p>
                   <input 
                     type="tel" 
                     placeholder="Número de WhatsApp (ej. 3151234567)" 
                     required
                     value={formData.whatsapp}
                     onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors" 
                   />
                   <textarea 
                     placeholder="Notas especiales (ej. 'quiero cojines color verde oliva', 'acabado rústico')" 
                     value={formData.notes}
                     rows={3}
                     onChange={(e) => setFormData({...formData, notes: e.target.value})}
                     className="w-full bg-transparent border-b border-[#D6D1C7] py-3 text-[#2C2A26] placeholder-[#A8A29E] outline-none focus:border-[#2C2A26] transition-colors resize-none" 
                   />
                </div>
              </div>

              <div>
                <button 
                  type="submit"
                  disabled={!isFormValid}
                  className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Solicitar por WhatsApp
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Summary */}
          <div className="lg:pl-12 lg:border-l border-[#D6D1C7]">
            <h2 className="text-xl font-serif text-[#2C2A26] mb-8">Resumen de Cotización</h2>
            
            <div className="space-y-6 mb-8">
               {items.map((item, idx) => (
                 <div key={idx} className="flex gap-4">
                    <div className="w-16 h-16 bg-[#EBE7DE] relative">
                       <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                       <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#2C2A26] text-white text-[10px] flex items-center justify-center rounded-full">1</span>
                    </div>
                    <div className="flex-1">
                       <h3 className="font-serif text-[#2C2A26] text-base">{item.name}</h3>
                       <p className="text-xs text-[#A8A29E]">{item.category}</p>
                    </div>
                    
                 </div>
               ))}
            </div>

            <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
              <div className="border-t border-[#D6D1C7] pt-6 space-y-2">
  <div className="flex justify-between text-sm text-[#5D5A53]">
     <span>Envío</span>
     <span className="italic">Por acordar (Gratis en Cali)</span>
  </div>
</div>

<p className="text-xs text-[#A8A29E] mt-6 pt-6 border-t border-[#D6D1C7]">
  El precio final depende de los acabados y personalización elegidos. Uno de nuestros artesanos te enviará la cotización exacta por WhatsApp.
</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
