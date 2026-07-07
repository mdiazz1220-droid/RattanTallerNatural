/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

const WhatsAppButton: React.FC = () => {
  return (
    <a 
      href="https://wa.me/573146185044?text=Hola%20Rattan%20Taller%20Natural%2C%20me%20gustar%C3%ADa%20recibir%20m%C3%A1s%20informaci%C3%B3n%20sobre%20sus%20muebles%20y%20accesorios."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-28 right-8 z-50 bg-[#25D366] text-white w-14 h-14 flex items-center justify-center rounded-full shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
      title="Contáctanos por WhatsApp"
    >
      <span className="absolute right-full mr-3 bg-white text-[#2C2A26] text-xs font-medium px-3 py-1.5 shadow-md whitespace-nowrap rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-[#EBE7DE]">
        Contáctanos por WhatsApp
      </span>
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366]/40 animate-ping opacity-75 pointer-events-none"></span>
      <svg 
        viewBox="0 0 24 24" 
        className="w-7 h-7 fill-current"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008 0c3.202.001 6.212 1.249 8.477 3.517 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.988 3.3 1.488 5.35 1.489 5.468-.002 9.914-4.43 9.918-9.896.002-2.648-1.03-5.138-2.907-7.017C17.133 1.852 14.65 1.8 12.002 1.8 6.533 1.802 2.085 6.23 2.08 11.697c-.001 2.081.547 4.111 1.587 5.903l-1.042 3.81 3.931-1.018c1.8.974 3.424 1.411 4.912 1.411a9.845 9.845 0 0 0 4.111-.856h-.001zM17.115 14c-.278-.14-1.644-.812-1.899-.905-.255-.094-.441-.14-.627.14-.186.279-.718.905-.881 1.09-.163.186-.325.21-.603.07-.279-.14-1.176-.434-2.241-1.385-.828-.739-1.388-1.652-1.55-1.93-.163-.28-.018-.431.122-.571.125-.125.279-.325.418-.489.14-.162.186-.279.279-.465.093-.186.046-.349-.023-.489-.069-.14-.627-1.511-.859-2.07-.227-.546-.456-.473-.627-.473-.162 0-.349-.011-.534-.011-.186 0-.488.07-.743.349-.256.279-.975.953-.975 2.325s1.002 2.686 1.14 2.871c.14.186 1.97 3.01 4.773 4.215.667.287 1.187.458 1.593.587.67.213 1.28.183 1.762.111.537-.08 1.644-.673 1.876-1.322.232-.649.232-1.206.163-1.322-.069-.117-.255-.187-.534-.326z" />
      </svg>
    </a>
  );
};

export default WhatsAppButton;
