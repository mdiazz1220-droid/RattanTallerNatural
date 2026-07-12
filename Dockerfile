FROM node:20-alpine AS builder
WORKDIR /app
# Variables de Supabase necesarias en tiempo de BUILD (Vite las incrusta en el bundle)
ARG VITE_SUPABASE_URL
ARG VITE_SUPABASE_ANON_KEY
ARG GEMINI_API_KEY
ENV VITE_SUPABASE_URL=$VITE_SUPABASE_URL
ENV VITE_SUPABASE_ANON_KEY=$VITE_SUPABASE_ANON_KEY
ENV GEMINI_API_KEY=$GEMINI_API_KEY
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

# Rompe-caché: fuerza que este paso SIEMPRE se ejecute de nuevo,
# para que las variables de entorno más recientes queden incluidas.
ARG CACHEBUST=1
RUN npm run build
FROM caddy:alpine
COPY --from=builder /app/dist /srv
EXPOSE 80
CMD ["caddy", "file-server", "--root", "/srv", "--listen", ":80"]
