/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useState, useEffect } from 'react';
import { Product } from '../types';

interface ProductDetailProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onBack, onAddToCart }) => {
  const [selectedFinish, setSelectedFinish] = useState<string | null>('Natural');
  const gallery = product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl];
  const [activeImage, setActiveImage] = useState<string>(gallery[0]);

  useEffect(() => {
    setActiveImage((product.gallery && product.gallery.length > 0 ? product.gallery : [product.imageUrl])[0]);
  }, [product]);
  
  const finishes = ['Natural', 'Dorado', 'Rústico'];
  const showFinishes = product.category === 'Sillas y Salas' || product.category === 'Mesas y Comedores';

  return (
    <div className="pt-24 min-h-screen bg-[#F5F2EB] animate-fade-in-up">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 pb-24">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack}
          className="group flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A8A29E] hover:text-[#2C2A26] transition-colors mb-8"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 group-hover:-translate-x-1 transition-transform">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          Volver a la Tienda
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          
          {/* Left: Main Image + Gallery Thumbnails */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-[4/5] bg-[#EBE7DE] overflow-hidden">
              <img 
                src={activeImage} 
                alt={product.name} 
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover animate-fade-in-up"
              />
            </div>
            {gallery.length > 1 && (
              <div className="grid grid-cols-5 gap-3">
                {gallery.map((url, idx) => (
                  <button
                    key={url + idx}
                    onClick={() => setActiveImage(url)}
                    className={`aspect-square overflow-hidden border-2 transition-colors ${
                      activeImage === url ? 'border-[#2C2A26]' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Details */}
          <div className="flex flex-col justify-center max-w-xl">
             <span className="text-sm font-medium text-[#A8A29E] uppercase tracking-widest mb-2">{product.category}</span>
             <h1 className="text-4xl md:text-5xl font-serif text-[#2C2A26] mb-4">{product.name}</h1>
             <span className="text-2xl font-light text-[#2C2A26] mb-8">${product.price.toLocaleString('es-CO')} COP</span>
             
             <p className="text-[#5D5A53] leading-relaxed font-light text-lg mb-8 border-b border-[#D6D1C7] pb-8">
               {product.longDescription || product.description}
             </p>

             {showFinishes && (
                <div className="mb-8">
                  <span className="block text-xs font-bold uppercase tracking-widest text-[#2C2A26] mb-4">Seleccionar Acabado</span>
                  <div className="flex gap-4">
                    {finishes.map(finish => (
                      <button 
                        key={finish}
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-4 py-2 text-xs font-medium uppercase tracking-widest border transition-all duration-300 ${
                          selectedFinish === finish 
                            ? 'border-[#2C2A26] bg-[#2C2A26] text-[#F5F2EB]' 
                            : 'border-[#D6D1C7] text-[#5D5A53] hover:border-[#2C2A26]'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
             )}

             <div className="flex flex-col gap-4">
               <button 
                 onClick={() => onAddToCart(product)}
                 className="w-full py-5 bg-[#2C2A26] text-[#F5F2EB] uppercase tracking-widest text-sm font-medium hover:bg-[#433E38] transition-colors"
               >
                 Añadir al Carrito — ${product.price.toLocaleString('es-CO')} COP
               </button>
               <ul className="mt-8 space-y-2 text-sm text-[#5D5A53]">
                 {product.features.map((feature, idx) => (
                   <li key={idx} className="flex items-center gap-3">
                     <span className="w-1 h-1 bg-[#2C2A26] rounded-full"></span>
                     {feature}
                   </li>
                 ))}
               </ul>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
