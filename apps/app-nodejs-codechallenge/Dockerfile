# Usa la imagen oficial de Node.js como base
FROM node:16

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos package.json y package-lock.json del monorepo
COPY ../../package*.json ./

# Instala las dependencias del monorepo
RUN npm install

# Copia el código fuente del servicio específico
COPY . .

# Compilar el código TypeScript
RUN npm run build

# Expone el puerto solo si es necesario para acceder externamente
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["node", "dist/main"]