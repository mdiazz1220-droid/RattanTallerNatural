/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PRODUCTS } from '../constants';

const getSystemInstruction = () => {
  let activeProducts = PRODUCTS;
  try {
    const saved = localStorage.getItem('rattan_products');
    if (saved) {
      activeProducts = JSON.parse(saved);
    }
  } catch (e) {
    // Fail-safe for non-browser/SSR environments
  }

  const productContext = activeProducts.map(p => 
    `- ${p.name} ($${p.price.toLocaleString('es-CO')} COP): ${p.description}. Características: ${p.features.join(', ')}`
  ).join('\n');

  return `Eres el Asistente Virtual para "Rattan Taller Natural", un taller familiar tradicional en Cali, Colombia que teje hermosos muebles y accesorios de rattan y mimbre.
  Tu tono debe ser muy cálido, acogedor, respetuoso y servicial. Habla siempre en ESPAÑOL.
  Destaca que nuestros productos son tejidos 100% a mano en Cali y que coordinamos envíos en Cali (gratis) y a nivel nacional, definiendo los cojines y acabados personalizados por WhatsApp.
  
  Aquí está nuestro catálogo actual:
  ${productContext}
  
  Responde preguntas sobre acabados (Natural, Dorado, Rústico), mantenimiento de fibras naturales, características o la historia familiar del taller liderada por José Lidier Salazar.
  Mantén tus respuestas breves y acogedoras (normalmente de 2 a 3 oraciones) para que quepan bien en el chat.`;
};

export const sendMessageToGemini = async (history: {role: string, text: string}[], newMessage: string): Promise<string> => {
  try {
    const response = await fetch("/api/gemini/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        history,
        message: newMessage,
        systemInstruction: getSystemInstruction(),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error del servidor HTTP! Código: ${response.status}`);
    }

    const data = await response.json();
    return data.text;

  } catch (error) {
    console.error("Gemini API Client Error:", error);
    return "Lo lamento, pero en este momento tengo problemas para conectar con el asistente virtual. Por favor, inténtalo de nuevo más tarde o contáctanos por WhatsApp.";
  }
};
