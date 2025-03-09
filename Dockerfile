# Utiliser une image de base Node.js
FROM node:20

# Installer wkhtmltopdf
RUN apt-get update && apt-get install -y wkhtmltopdf

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances nécessaires pour Chromium
RUN apt-get update && apt-get install -y \
    gnupg \
    wget \
    ca-certificates \
    && wget --quiet --output-document=chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb \
    && apt-get install -y ./chrome.deb \
    && rm chrome.deb

# Copier package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Installer Puppeteer
# RUN npm install puppeteer

# Exécuter le script et construire le projet
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0"]
# CMD ["sh", "-c", "node generate-resume.js && npm run build"]
