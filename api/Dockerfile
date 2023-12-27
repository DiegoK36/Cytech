# Usamos la versión 14 que es una versión LTS (Long Term Support).
FROM node:14

# Este será el directorio donde se ubica la aplicación
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia los archivos y directorios restantes al directorio de trabajo
COPY . .

# Puerto de la Aplicación
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD ["node", "app.js"]
