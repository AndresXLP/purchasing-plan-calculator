# Dockerfile para ChatterHub Frontend - Railway
# Basado en el Dockerfile que funciona
FROM node:22-bookworm-slim

WORKDIR /app

# Copia package.json
COPY package.json .

# Instala dependencias
RUN npm install

# Instala serve globalmente
RUN npm i -g serve

# Copia el resto del código
COPY . .

# Construye la aplicación
RUN npm run build

# Railway usa puerto dinámico, pero exponemos uno por defecto
EXPOSE $PORT

# Comando para Railway con puerto dinámico
CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]