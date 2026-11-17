# Portfolio de Fabien Roy

Portfolio développé avec **Astro, React et Tailwind CSS**, prévu pour Netlify.
Cette version génère les pages à partir de fichiers locaux versionnés. Elle ne dépend plus de Portfolio-API, conservé séparément comme réalisation historique.

## Fonctionnement

- Pages, projets et parcours : `src/pages/`, `src/components/`, `src/data/data.json`.
- CV développeur : PDF officiel dans `public/cv/`, proposé sans JavaScript. Aucun générateur de CV dans le build.
- Contact : `POST /api/send-contact` → Netlify Function → validation Turnstile côté serveur → SMTP.
- Envoi désactivé par défaut ; alternative email visible. Aucun accusé automatique au visiteur ni base applicative de contacts.
- Matomo retiré du chargement ; certaines polices sont encore chargées depuis Google Fonts.

## Développement local

Utiliser **Node 24** et le verrou de dépendances :

Le socle utilise Astro 7 et l’intégration React correspondante. Tailwind CSS reste en version 3, compilé par `postcss.config.mjs` sans l’ancienne intégration Astro. `public/robots.txt` est un fichier statique, sans générateur supplémentaire.

```sh
npm ci --include=dev --ignore-scripts
npm run dev
```

Le serveur Astro développe uniquement le frontend ; il n’émule pas les Functions Netlify.

| Commande | Usage |
| --- | --- |
| `npm test` | Tests serveur avec doublures, sans envoi réel |
| `npm run check` | Diagnostics Astro/TypeScript |
| `npm run build` | Génération statique dans `dist/` |
| `npm run preview` | Aperçu statique Astro |
| `npm run dev:contact` | Aperçu du build sur `127.0.0.1:4321` ; contact toujours fermé, POST en 503 |
| `npm run test:browser` | Parcours Chromium sur cet aperçu ; widget et envois simulés |
| `npm audit` / `npm audit --omit=dev` | Avis de sécurité connus, à vérifier pour toutes les dépendances et pour la production |

### Vérification navigateur

Après le build, installer le navigateur de test puis lancer `npm run dev:contact` dans un premier terminal :

```sh
PLAYWRIGHT_BROWSERS_PATH=qa-local/browser-cache npx playwright install chromium
```

Dans un autre terminal :

```sh
PLAYWRIGHT_BROWSERS_PATH=qa-local/browser-cache npm run test:browser
```

Les captures et résultats sont écrits dans `qa-local/`, ignoré par Git. Les tests couvrent desktop/mobile, sans JavaScript, CV, clavier, images, états de contact et double soumission. Les scénarios d’envoi sont des doublures explicites, pas une preuve de réception SMTP ou de fonctionnement en production.

## Configuration Netlify

`netlify.toml` définit le build, `dist/`, Node 24 et `netlify/functions/`. Les pages et PDF sont revalidés ; seuls les fichiers versionnés de `/_astro/` utilisent le cache immutable.

Le modèle `.env.example` ne contient aucune valeur secrète. Seule `PUBLIC_TURNSTILE_SITE_KEY` est publique et utilisée au build ; les autres variables restent côté serveur. La fonction exige `CONTACT_FORM_ENABLED=true` et une configuration complète avant tout envoi. L’aperçu local ne charge pas ces secrets et reste fermé.

Voir `docs/contact-netlify.md` pour les paramètres, les contrôles et la recette à prévoir avant activation. Configurer un compte, publier ou envoyer un message réel sont des opérations distinctes des tests locaux.

La préparation de publication, le paquet local vérifié et le retour arrière sont décrits dans [`docs/publication-netlify.md`](docs/publication-netlify.md). `python3 scripts/prepare-netlify-release.py` archive le candidat déjà testé, sans publier ni installer d'outil. Le ZIP statique ne contient pas les Functions : ce n'est pas un paquet de déploiement complet.

### Médias du profil et du portfolio

`node scripts/prepare-profile-images.mjs` recrée les variantes du portrait à partir de l'original conservé, sans retouche du visage. Après un build, `node scripts/capture-portfolio-project.mjs` capture réellement l'accueil et le contact de l'aperçu local ; refaire un build après la capture pour intégrer les nouveaux fichiers. Le contact reste fermé. Avec le navigateur QA disponible, `node scripts/verify-media.mjs` contrôle le portrait aux densités 1×/2×/3×, la galerie, les thèmes et les petits écrans. Ces outils écrivent leurs preuves dans `qa-local/` ; ils ne lancent ni serveur ni publication.

## Docker

Le Dockerfile prépare uniquement un aperçu statique sous Node 24, sans Chrome ni générateur PDF. Il n’émule pas les Functions. Ne pas l’utiliser comme preuve de recette Netlify ; ne jamais inclure de secrets dans le contexte de build.

## Licence

Voir `LICENSE` (MIT). Les contenus personnels et crédits doivent être examinés avant toute réutilisation.


