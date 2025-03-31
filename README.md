📌 Portfolio-API (Frontend)

[![Netlify Status](https://api.netlify.com/api/v1/badges/199bc0eb-62f0-492a-9fa8-d723c45fb127/deploy-status)](https://app.netlify.com/sites/fabien-roy/deploys)

📂 Projet Full-Stack : API Symfony (backend) & Astro (frontend)  
🔗 Frontend : Astro.js – déployé sur Netlify avec un webhook de build automatique  
🔗 Backend : Symfony 7 (API) – hébergé sur un serveur mutualisé ou Heroku  

📖 Table des matières  
🚀 Aperçu du projet  
🛠️ Technologies utilisées  
⚙️ Installation et Configuration  
🔄 Workflow CI/CD (Mise à jour & Déploiement)  
📂 Structure du projet  
✅ Fonctionnalités principales  
📌 To-Do List  
📜 Licence  

🚀 Aperçu du projet  

Le frontend (Astro.js) consomme une API JSON exposée par le backend (Symfony) pour le formulaire de contact.  
Les données sont mises à jour dynamiquement via GitHub et un webhook Netlify.  

🛠️ Technologies utilisées:  

🔹 Frontend (Portfolio) :  
Astro.js – Framework pour générer un site statique  
Tailwind CSS + DaisyUI – Styling moderne et responsive  
Fetch API – Récupération des données du backend  
Netlify – Hébergement et build automatique  

🔹 CI/CD & Hébergement :  
GitHub Actions – Gestion des mises à jour automatiques  
Netlify Build Hooks – Déclenchement automatique du build  
Docker (local) – Conteneurisation de Symfony en dev  

⚙️ Installation et Configuration  

1️⃣ Cloner le projet  

```sh
git clone https://github.com/fabry44/portfolio-astro.git
```  

3️⃣ Frontend : Installation Astro  

```sh
cd ../portfolio-astro
npm install
npm run dev
```  

4️⃣ Commandes disponibles  

| Command                   | Action                                           |  
| :------------------------ | :----------------------------------------------- |  
| `npm install`             | Installs dependencies                            |  
| `npm run dev`             | Starts local dev server at `localhost:4321`      |  
| `npm run build`           | Build your production site to `./dist/`          |  
| `npm run preview`         | Preview your build locally, before deploying     |  
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |  
| `npm run astro -- --help` | Get help using the Astro CLI                     |  

🔄 Workflow CI/CD (Mise à jour & Déploiement)  

🚀 Mise à jour du contenu  

Build à partir du repository main sur GitHub.  
Déclenchement automatique du build Netlify via webhook (Build Hook Netlifly).  

⚡ Commande pour forcer la mise à jour  

```sh
rl -X POST -d {} https://api.netlify.com/build_hooks/LE_TOKEN_NETLIFLY
```  

📂 Structure du projet  

📁 frontend-astro/          # Site Astro.js  
├── src/pages/              # Pages statiques  
├── src/components/         # Composants dynamiques  
├── public/                 # Assets et fichiers statiques  
├── astro.config.mjs        # Config Astro  
├── tsconfig.json           # Configuration TypeScript  
├── tailwind.config.mjs     # Configuration Tailwind CSS  
├── package.json            # Dépendances NPM  

✅ Fonctionnalités principales  

✔️ Formulaire de contact pour envoyer le formulaire de contact et récupérer les soumissions via le frontend Astro  
✔️ Backend sécurisé avec JWT et CORS  
✔️ Stockage des données en JSON pour un rendu ultra rapide en static par le frontend Astro  
✔️ Déploiement automatisé sur Netlify via API GitHub Actions (API GitHub) & Webhooks  
✔️ Utilisation de Docker en dev pour une config standardisée  
✔️ Gestion des styles avec Tailwind  

📌 To-Do List  

Ajouter une fonctionnalité de commentaires sur les projets  

📜 Licence  

Ce projet est sous licence MIT – vous pouvez le modifier et l’utiliser librement.  

🔐 Variables d'environnement  

Les variables suivantes doivent être configurées dans un fichier `.env` en développement ou, pour des raisons de sécurité, comme variables d'environnement sur Netlify en production :  

- `OAUTH_CLIENT_ID` : Client ID pour l'authentification Oauth 2.0 avec l'Api 
- `OAUTH_CLIENT_SECRET` : Secret pour l'authentification Oauth 2.0 avec l'Api 


