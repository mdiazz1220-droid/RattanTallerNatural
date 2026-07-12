/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import { GoogleGenAI } from "@google/genai";
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
    let apiKey: string | undefined;
    
    // Robustly attempt to get the API key, handling ReferenceError if process is not defined
    try {
      apiKey = process.env.API_KEY;
    } catch (e) {
      // process is likely not defined in this environment
      console.warn("Accessing process.env failed");
    }
    
    if (!apiKey) {
      return "I'm sorry, I cannot connect to the server right now. (Missing API Key)";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    const chat = ai.chats.create({
      model: 'gemini-3.5-flash',
      config: {
        systemInstruction: getSystemInstruction(),
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }]
      }))
    });

    const result = await chat.sendMessage({ message: newMessage });
    return result.text;

  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I apologize, but I seem to be having trouble reaching our archives at the moment.";
  }
};
