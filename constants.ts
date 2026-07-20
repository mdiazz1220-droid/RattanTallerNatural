/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React from 'react';
import { Product, JournalArticle } from './types';

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Silla Acapulco Rattan',
    tagline: 'Comodidad clásica.',
    description: 'Diseño ergonómico tejido 100% a mano con fibras de rattan natural seleccionadas.',
    longDescription: 'La Silla Acapulco Rattan es una reinterpretación de un clásico del diseño, adaptado con la calidez del rattan natural. Su estructura arqueada de hierro lacado ofrece estabilidad, mientras que el tejido artesanal abraza el cuerpo de manera cómoda y fresca. Perfecta para un rincón de lectura en tu sala o terrazas cubiertas.',
    price: 380000,
    category: 'Sillas y Salas',
    imageUrl: '/assets/images/silla_acapulco_rattan_1783278756646.jpg',
    gallery: [
      '/assets/images/silla_acapulco_rattan_1783278756646.jpg'
    ],
    features: ['Tejido 100% artesanal', 'Estructura de hierro resistente', 'Diseño ergonómico y fresco']
  },
  {
    id: 'p2',
    name: 'Sofá Nido Familiar',
    tagline: 'El centro de tu hogar.',
    description: 'Un sofá escultural de forma orgánica, perfecto para crear espacios de tranquilidad.',
    longDescription: 'Inspirado en las formas fluidas de la naturaleza, el Sofá Nido combina un marco sólido de madera con un intrincado tejido trenzado de rattan premium. Diseñado en Cali por artesanos expertos, ofrece un espacio amplio y acogedor para compartir momentos inolvidables en familia.',
    price: 1450000,
    category: 'Sillas y Salas',
    imageUrl: '/assets/images/sofa_nido_rattan_1783278806581.jpg',
    gallery: [
      '/assets/images/sofa_nido_rattan_1783278806581.jpg'
    ],
    features: ['Rattan premium curado', 'Incluye cojines confortables', 'Sello de origen familiar en Cali']
  },
  {
    id: 'p3',
    name: 'Butaco Alto Baruma',
    tagline: 'Estilo a otra altura.',
    description: 'Butaco estilizado con estructura híbrida de metal y rattan natural tejido.',
    longDescription: 'El Butaco Alto Baruma aporta un toque rústico moderno a barras de cocina, barras de café o comedores altos. El contraste entre el hierro oscuro y la calidez de la fibra natural tejida a mano crea un balance estético perfecto y una alta durabilidad.',
    price: 290000,
    category: 'Sillas y Salas',
    imageUrl: '/assets/images/butaco_bar_rattan_1783278787660.jpg',
    gallery: [
      '/assets/images/butaco_bar_rattan_1783278787660.jpg'
    ],
    features: ['Ideal para barras y mesones', 'Tejido tupido de alta durabilidad', 'Protectores para pisos delicados']
  },
  {
    id: 'p4',
    name: 'Mesa de Centro Olas',
    tagline: 'Fluidez y calidez.',
    description: 'Mesa circular con base orgánica tejida en espiral y superficie de vidrio templado.',
    longDescription: 'La Mesa de Centro Olas evoca el movimiento sutil del agua. Su base esculpida de rattan natural en espiral sostiene una elegante superficie redonda de vidrio templado, permitiendo apreciar el trabajo artesanal desde todos los ángulos y aportando amplitud visual al espacio.',
    price: 650000,
    category: 'Mesas y Comedores',
    imageUrl: '/assets/images/mesa_centro_olas_1783278820244.jpg',
    gallery: [
      '/assets/images/mesa_centro_olas_1783278820244.jpg'
    ],
    features: ['Vidrio templado incluido', 'Diseño de base espiral autoportante', 'Acabado natural de alta protección']
  },
  {
    id: 'p5',
    name: 'Comedor Esencia',
    tagline: 'Historias alrededor de la mesa.',
    description: 'Mesa de comedor para 4 o 6 puestos con estructura robusta de madera y acabados en rattan.',
    longDescription: 'El Comedor Esencia está diseñado para resistir generaciones. La cubierta de madera maciza se complementa con patas y detalles laterales tejidos con finas varas de rattan natural. Una pieza imponente que une la solidez del bosque con la delicadeza del tejido tradicional.',
    price: 2200000,
    category: 'Mesas y Comedores',
    imageUrl: '/assets/images/comedor_esencia_1783278796849.jpg',
    gallery: [
      '/assets/images/comedor_esencia_1783278796849.jpg'
    ],
    features: ['Capacidad para 4-6 personas', 'Madera maciza de origen sostenible', 'Tejido reforzado en los bordes']
  },
  {
    id: 'p6',
    name: 'Lámpara Colgante Trébol',
    tagline: 'Luz que respira.',
    description: 'Pantalla tejida para lámpara que proyecta un patrón de sombras cálidas y relajantes.',
    longDescription: 'Creada para transformar la iluminación de tus espacios. La Lámpara Colgante Trébol filtra la luz de manera suave a través de su tejido abierto de rattan, creando un acogedor juego de sombras que remite a la tranquilidad de los bosques nativos de Colombia.',
    price: 185000,
    category: 'Accesorios',
    imageUrl: '/assets/images/lampara_colgante_trebol_1783278829523.jpg',
    gallery: [
      '/assets/images/lampara_colgante_trebol_1783278829523.jpg'
    ],
    features: ['Proyección de sombras decorativas', 'Incluye kit eléctrico básico', 'Ligera y fácil de instalar']
  },
  {
    id: 'p7',
    name: 'Cesta Organizadora Palma',
    tagline: 'Orden natural.',
    description: 'Cesta multiusos tejida con asas de cuero, ideal para mantas, plantas o juguetes.',
    longDescription: 'Nuestra Cesta Palma es la fusión perfecta de utilidad y belleza natural. Tejida con fibra seleccionada y asas de cuero genuino colombiano, es ideal para organizar tu sala, habitación, o utilizarla como un elegante macetero.',
    price: 120000,
    category: 'Accesorios',
    imageUrl: '/assets/images/cesta_palma_organizadora_1783278839691.jpg',
    gallery: [
      '/assets/images/cesta_palma_organizadora_1783278839691.jpg'
    ],
    features: ['Asas de cuero legítimo', 'Fibra flexible y resistente', 'Multiusos decorativo']
  },
  {
    id: 'p8',
    name: 'Nido Pet Confort',
    tagline: 'Para los consentidos.',
    description: 'Cama circular de rattan para perros y gatos, con colchón acolchado desmontable.',
    longDescription: 'Tus mascotas también merecen la frescura y elegancia de los materiales naturales. El Nido Pet Confort es una cama tejida con bordes elevados que proporcionan seguridad y resguardo. Su colchón acolchado está forrado con tela lavable de algodón orgánico.',
    price: 240000,
    category: 'Pets y Nidos',
    imageUrl: '/assets/images/nido_pet_confort_1783278849305.jpg',
    gallery: [
      '/assets/images/nido_pet_confort_1783278849305.jpg'
    ],
    features: ['Colchón lavable incluido', 'Tejido ventilado anti-olores', 'Estructura ligera y lavable']
  },
  {
    id: 'p9',
    name: 'Nido Colgante Mimbre',
    tagline: 'Diversión y descanso.',
    description: 'Nido colgante para gatos y mascotas pequeñas, diseñado para mecerse suavemente.',
    longDescription: 'Un refugio colgante moderno para los felinos de la casa. El Nido Colgante Mimbre se suspende de un soporte resistente o techo, brindando a tu gato la altura que ama combinada con un balanceo relajante. Una pieza única que es tanto juego como decoración.',
    price: 320000,
    category: 'Pets y Nidos',
    imageUrl: '/assets/images/nido_colgante_mimbre_1783278859908.jpg',
    gallery: [
      '/assets/images/nido_colgante_mimbre_1783278859908.jpg'
    ],
    features: ['Soporte de suspensión seguro', 'Aislante de temperatura fría', 'Tejido semi-abierto interactivo']
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 1,
    title: "El Arte del Rattan y su Cuidado Natural",
    date: "Julio 5, 2026",
    excerpt: "Guía práctica para mantener tus muebles de fibra natural siempre brillantes y resistentes.",
    image: "/assets/images/nido.jpge",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 first-letter:text-5xl first-letter:font-serif first-letter:mr-3 first-letter:float-left text-[#5D5A53]" },
        "Las fibras naturales como el rattan y el mimbre traen la frescura del bosque directamente a tu sala de estar. Son materiales vivos, flexibles y extremadamente duraderos, pero requieren de un cuidado amoroso para mantener su elasticidad y brillo característico."
      ),
      React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
        "Para mantener el rattan en óptimo estado, es clave evitar la resequedad extrema. Limpiarlo regularmente con un paño húmedo y aplicar un aceite natural (como aceite de linaza) una vez al año es el secreto mejor guardado de los ebanistas para preservar su tono dorado original."
      ),
      React.createElement("blockquote", { className: "border-l-2 border-[#2C2A26] pl-6 italic text-xl text-[#2C2A26] my-10 font-serif" },
        "\"La madera y las fibras no mueren en el taller; maduran con las historias que vives sobre ellas.\""
      ),
      React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
        "En Taller Natural tratamos cada vara de rattan con aceites protectores ecológicos no tóxicos. De esta manera, aseguramos un mueble libre de plagas, resistente a la humedad de nuestro clima de Cali, y completamente seguro para toda la familia."
      )
    )
  },
  {
    id: 2,
    title: "Tejiendo Sueños desde Cali",
    date: "Junio 28, 2026",
    excerpt: "Una conversación íntima con José Lidier Salazar, CEO de Rattan Taller Natural, sobre nuestro origen familiar.",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=1000",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
        "El origen de cada pieza es tan importante como su destino. En el corazón de Cali, nuestro taller familiar late con el ritmo pausado del tejido a mano, una tradición que dignifica el trabajo de artesanos colombianos."
      ),
      React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
        "\"Comenzamos en 2016 en un pequeño garaje en casa,\" nos cuenta José Lidier Salazar con una sonrisa. \"Nuestra visión nunca fue fabricar en masa, sino crear muebles únicos que contaran una historia y tuvieran alma natural. Cada artesano que se une a nosotros aporta disciplina, experiencia y un toque personal único.\""
      ),
      React.createElement("div", { className: "my-12 p-8 bg-[#EBE7DE] font-serif text-[#2C2A26] italic text-center" },
        React.createElement("p", null, "La fibra se dobla con fuerza"),
        React.createElement("p", null, "El artesano la guía con calma."),
        React.createElement("p", null, "Un nudo tras otro nace el mueble,"),
        React.createElement("p", null, "Hecho con el alma de Cali."),
        React.createElement("p", null, "Esta es nuestra herencia,"),
        React.createElement("p", null, "Tejer historias para tu hogar.")
      ),
      React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
        "Hoy, con procesos organizados y envíos a nivel nacional, conservamos esa misma cercanía del primer día. Cada cliente es un miembro más de esta gran familia que valora el diseño natural y colombiano."
      )
    )
  },
  {
    id: 3,
    title: "La Magia de los Nidos para Mascotas",
    date: "Junio 15, 2026",
    excerpt: "Nuestra nueva línea nido redefine el descanso y diversión de tus gatos y perros.",
    image: "/assets/images/nido.jpge",
    content: React.createElement(React.Fragment, null,
      React.createElement("p", { className: "mb-6 text-[#5D5A53]" },
        "Nuestras mascotas buscan instintivamente espacios circulares y orgánicos para dormir. En la naturaleza, un nido es sinónimo de protección, frescura y cobijo. De allí nace nuestra nueva línea de nidos colgantes y camas circulares."
      ),
      React.createElement("p", { className: "mb-8 text-[#5D5A53]" },
        "Utilizando mimbre de bajo peso y alta flexibilidad, creamos nidos colgantes que permiten un mecer sutil. Esto no solo estimula el juego en los gatos, sino que reduce su ansiedad gracias a la sensación de suspensión que imita a las ramas de los árboles."
      )
    )
  }
];

export const BRAND_NAME = 'Taller Natural';
export const PRIMARY_COLOR = 'amber-900';
export const ACCENT_COLOR = 'stone-600';
