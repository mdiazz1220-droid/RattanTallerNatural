import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const phoneNumber = '573146185044'; // Colombia prefix +57, then 314 618 5044
  const message = encodeURIComponent('Hola Rattan Taller Natural, me gustaría recibir más información sobre sus muebles.');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 left-8 z-50 flex items-center gap-2 bg-[#25D366] text-white px-5 py-3.5 rounded-full shadow-2xl hover:bg-[#20ba5a] hover:scale-105 active:scale-95 transition-all duration-300 group"
      aria-label="Contactar por WhatsApp"
      id="whatsapp-floating-button"
    >
      <MessageCircle className="w-5 h-5 fill-current" />
      <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-in-out font-medium text-sm tracking-wide whitespace-nowrap">
        Preguntar en WhatsApp
      </span>
      <span className="hidden sm:inline font-medium text-sm tracking-wide">
        WhatsApp
      </span>
    </a>
  );
};

export default WhatsAppButton;
