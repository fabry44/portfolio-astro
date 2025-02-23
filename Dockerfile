FROM node:18-alpine

WORKDIR /app

# # Copier seulement ce qui est nécessaire pour installer les dépendances
# COPY package.json package-lock.json ./



# Copier le reste du code
COPY . .

RUN npm install 

# Build du projet
# RUN npm run build

# Le port de "npm run preview"
EXPOSE 4321

# Lancement du serveur Astro
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]