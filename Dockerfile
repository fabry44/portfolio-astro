# Utilisation d'une image Node.js légère
FROM node:18-alpine

# Définir le répertoire de travail
WORKDIR /app

# Copier uniquement les fichiers nécessaires pour l’installation des dépendances
COPY package.json package-lock.json ./

# Installer les dépendances
RUN npm install --production

# Copier le reste du projet après installation des dépendances
COPY . .

# Construire le projet (uniquement en mode production)
RUN npm run build

# Exposer le port utilisé par Astro
EXPOSE 4321

# Démarrer le serveur en mode preview (production)
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
