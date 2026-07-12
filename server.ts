import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Route for Gemini Chat
  app.post("/api/gemini/chat", express.json(), async (req, res) => {
    try {
      const { history, message, systemInstruction } = req.body;

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        console.error("GEMINI_API_KEY environment variable is not defined");
        return res.status(500).json({ error: "No se ha configurado la clave API de Gemini en el servidor." });
      }

      // Initialize GoogleGenAI with custom User-Agent for telemetry as required
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Use the recommended 'gemini-3.5-flash' model for basic conversation tasks
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        config: {
          systemInstruction: systemInstruction || "Eres un asistente virtual servicial.",
        },
        history: (history || []).map((h: any) => ({
          role: h.role,
          parts: [{ text: h.text }],
        })),
      });

      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error: any) {
      console.error("Server-side Gemini Error:", error);
      res.status(500).json({ error: error.message || "Error al comunicarse con Gemini en el servidor." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
