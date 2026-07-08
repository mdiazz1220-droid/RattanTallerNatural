/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-[#EBE7DE]">
      
      {/* Introduction / Story */}
      <div className="py-24 px-6 md:px-12 max-w-[1800px] mx-auto flex flex-col md:flex-row items-start gap-16 md:gap-32">
        <div className="md:w-1/3">
          <h2 className="text-4xl md:text-6xl font-serif text-[#2C2A26] leading-tight">
            Tejido a mano, <br/> con el alma.
          </h2>
        </div>
        <div className="md:w-2/3 max-w-2xl">
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            En Rattan Taller Natural tejemos más que muebles: tejemos historias, momentos y sueños. Somos un taller familiar colombiano que combina la tradición artesanal con el diseño natural para crear piezas que llenan los espacios de vida, calidez y autenticidad.
          </p>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Nuestra historia comenzó en Cali en 2016, en un taller en casa y con un propósito claro: dignificar el trabajo artesanal en rattan y convertirlo en piezas de alto valor. Desde esos primeros días, nuestro hogar se transformó en un espacio de creación, donde artesanos expertos trabajan con dedicación, disciplina y respeto por el oficio tradicional.
          </p>
          <p className="text-lg md:text-xl text-[#5D5A53] font-light leading-relaxed mb-8">
            Hoy, conservamos ese origen cercano y humano, combinándolo con una estructura de alta calidad, procesos de curado muy cuidadosos de la fibra y un compromiso constante con la excelencia. Seguimos creando cada pieza a mano en Cali, liderados por nuestro fundador José Lidier Salazar.
          </p>
          <img 
            src="/assets/images/manos_tejiendo_rattan_1783278946075.jpg" 
            alt="Artesano tejiendo rattan a mano" 
            referrerPolicy="no-referrer"
            className="w-full h-[400px] object-cover grayscale-[0.05] contrast-[0.95] brightness-100 mt-12"
          />
          <p className="text-sm font-medium uppercase tracking-widest text-[#A8A29E] mt-4">
            Taller Natural, Cali, Colombia
          </p>
        </div>
      </div>

      {/* Philosophy Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="order-2 lg:order-1 relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="/assets/images/textura_tejido_rattan_1783278957328.jpg" 
             alt="Textura de fibra de rattan tejida" 
             referrerPolicy="no-referrer"
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
           />
        </div>
        <div className="order-1 lg:order-2 flex flex-col justify-center p-12 lg:p-24 bg-[#D6D1C7]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#5D5A53] mb-6">Artesanía Viva</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#2C2A26] leading-tight">
             Fibras seleccionadas <br/> y manos expertas.
           </h3>
           <p className="text-lg text-[#5D5A53] font-light leading-relaxed mb-12 max-w-md">
             Creemos en el valor de lo hecho a mano. Cada una de nuestras piezas es elaborada por tejedor@s expert@s, mujeres y hombres que dominan el arte del rattan y transforman fibras naturales en muebles únicos, llenos de historia y dedicación.
           </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        <div className="flex flex-col justify-center p-12 lg:p-24 bg-[#2C2A26] text-[#F5F2EB]">
           <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#A8A29E] mb-6">El Propósito</span>
           <h3 className="text-4xl md:text-5xl font-serif mb-8 text-[#F5F2EB] leading-tight">
             Calidez y alma natural.
           </h3>
           <p className="text-lg text-[#A8A29E] font-light leading-relaxed mb-12 max-w-md">
             Trabajamos de manera artesanal, respetando cada proceso de secado y moldeado de la vara de rattan, cuidando cada detalle para ofrecer piezas auténticas, duraderas y que conectan tus espacios con el bienestar natural.
           </p>
        </div>
        <div className="relative h-[500px] lg:h-auto overflow-hidden group">
           <img 
             src="/assets/images/hero_rattan_living_room_1783278779115.jpg" 
             alt="Hogar minimalista con madera y mimbre" 
             referrerPolicy="no-referrer"
             className="absolute inset-0 w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105 brightness-95"
           />
        </div>
      </div>
    </section>
  );
};

export default About;
