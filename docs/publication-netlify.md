# Préparation de publication Netlify — portfolio

## Verdict et périmètre

Ce guide décrit la préparation et la qualification d’une publication ; il ne constitue pas à lui seul une autorisation d’exécution. L’accord du propriétaire et les preuves effectives sont conservés dans le suivi du projet. Ne pas assimiler une référence Git, les sources testées, le build, la preview et la version en production.

Chemin recommandé : candidat local figé → validation visuelle → commit/push/PR autorisés → build Netlify hors production → recette → publication expressément autorisée → observation publique. Aucun de ces derniers actes n'est lancé par le script de préparation. Une branche poussée n'est pas forcément construite ; vérifier les réglages effectifs avant de pousser. Vérifier les déclenchements automatiques avant de fusionner la branche de production.

## Paquet local

Depuis la racine, avec Python 3.11+ : `python3 scripts/prepare-netlify-release.py`.

Sortie : `qa-local/netlify-release-20261117/` :
- `portfolio-source.zip` : sources et verrou de dépendances, sans compte Netlify, `.env` réel, cache, dépendances installées, historique Git ni rapports privés ; `.env.example` est uniquement le modèle public ;
- `portfolio-static-review.zip` : copie du `dist/` testé, **inspection statique uniquement** ; les Functions ne sont pas incluses ; ne pas le déposer manuellement en production en pensant déployer le contact ;
- `release-manifest.json` et `SHA256SUMS` : empreintes et inventaires des octets archivés, état Git et statut des contrôles locaux.

Le script n'installe rien, ne construit rien, ne lit aucun identifiant et n'appelle ni Git distant ni Netlify. Il vérifie les rapports existants et leur empreinte de source : après un changement applicatif, refaire les tests/build et recréer le paquet. Ne pas remettre des secrets dans ces archives.

## Réglages à lire et confirmer dans le projet Netlify existant

| Élément | Candidat local | Preuve distante attendue |
| --- | --- | --- |
| Dépôt/projet et branche de production | `fabry44/portfolio-astro`, projet `fabien-roy`, production `main` | Relire la référence du candidat et le déploiement public avant promotion |
| Base / package directory | Racine du projet | Absence d'une base ou d'une configuration monorepo incompatible |
| Build | `npm run build` | Journal du candidat : aucun ancien générateur PDF/API |
| Publication / Functions | `dist` / `netlify/functions` | Pages et fonction `contact` effectivement construites |
| Build Node | `NODE_VERSION=24`, engines `24.x` | Version Node du journal, installation conforme au lock |
| Function Node | Attendu Node 24 | Runtime effectif ; vérifier tout override `AWS_LAMBDA_JS_RUNTIME` dans le compte, jamais dans TOML |
| Canonique | `https://fabien-roy.fr` | Domaine primaire et redirections des variantes HTTP/HTTPS et www/non-www, chemin et query conservés |
| Cache | HTML/PDF revalidés ; `/_astro/*` immutable | En-têtes réellement servis par Netlify |
| Préproduction | Preview privée Tailscale déjà distincte | Netlify : accès borné et non-indexation avant utilisation, sans secrets de production |

`netlify.toml` prévaut sur les paramètres UI correspondants ; un contexte plus spécifique peut le surcharger. Lire la configuration résolue, pas seulement une capture d'un réglage. La compilation Astro locale ne prouve ni le bundling Netlify des Functions, ni le routage, ni le rate limiting fournisseur. L'émulation/bundling Netlify n'a pas été exécuté localement.

## Paramètres de contact — aucune valeur à envoyer en conversation

Référence unique : [contact-netlify.md](contact-netlify.md).

- État sûr initial : `CONTACT_FORM_ENABLED=false` dans le contexte visé et `PUBLIC_TURNSTILE_SITE_KEY` absente ; le lien email reste disponible. Lire les noms et portées des variables du compte avant activation, sans exposer leurs valeurs secrètes.
- Isoler les contextes ; pas de réutilisation des secrets SMTP/Turnstile de production dans une preview.
- Si activation demandée : widget portfolio, domaines/action `contact`, variables secrètes à portée Functions, origine canonique exacte, expéditeur/destinataire validés et test réel explicitement autorisé.
- La clé publique est injectée au build : un changement requiert un nouveau build. Un token de test ou une doublure navigateur n'est pas une recette Cloudflare/SMTP.
- La réception du message doit être confirmée ; un succès SMTP seul ne suffit pas. Vérifier 429 réel Netlify et 404 de l'entrée interne.

## Conditions avant GO de publication

1. **Validation visuelle de Fabien** : portrait, deux captures portfolio, mobile/desktop, clair/sombre, PDF et textes. Les captures réduisent les artefacts de mise à l'échelle ; le piquetage exact de la capture fournie n'était pas reproduit dans Chromium de l'agent. Confirmer le résultat sur le navigateur concerné.
2. **Anciennes expositions d'identifiants** : confirmation propriétaire de leur révocation/remplacement ; ne jamais rouvrir les anciens secrets pour les vérifier.
3. **Informations de publication** : conserver l’éditeur personnel Fabien Roy, la boîte destinataire confirmée et la conservation des demandes sans suite de 12 mois après le dernier échange, avec suppression manuelle par le responsable. Vérifier les prestataires d’envoi effectivement configurés et leurs conditions ; la QA technique n’est pas une certification juridique.
4. **Recette Netlify du candidat** : build et Function réels, refus internes, méthodes, caches, pages et assets, console, PDF identique, URLs anciennes nécessaires/404 et domaines. Le formulaire peut rester fermé pour une première publication si Fabien accepte explicitement cette limite ; sinon la recette réelle de contact est une condition supplémentaire.
5. **Traçabilité/repli** : relever l'identifiant et le permalink du dernier déploiement public sain avant toute publication ; vérifier qu'il reste disponible. Noter l'identifiant du nouveau candidat et sa révision.
6. **Autorisation précise** : commit/push, PR/merge, déploiement hors production, publication et envoi réel restent des permissions distinctes. Aucun compte, secret, DNS ou domaine modifié par cette préparation.

## Recette après publication autorisée

Observer depuis une connexion ordinaire extérieure à Tailscale : TLS, `https://fabien-roy.fr/`, variantes canoniques, une page juridique, URL manquante 404, CSS/JS/fonts/images, portrait sélectionné au bon DPR, nouvelle galerie et CV. Contrôler robots/sitemaps et absence de `noindex` de recette en production. Vérifier la fermeture du formulaire ou son fonctionnement selon le mode autorisé, sans multiplier les messages réels.

Conserver déploiement, révision, heure, statuts et empreintes utiles ; aucune valeur secrète ou contenu de demande dans la preuve.

## Retour arrière

- Publication : depuis le projet Netlify, choisir le déploiement public sain préalablement enregistré puis **Publish Deploy** après autorisation de repli. Cette publication réutilise un ancien déploiement atomique disponible ; vérifier ensuite les domaines/HTML/assets/PDF.
- Attention aux publications Git automatiques qui pourraient remplacer le repli. Ne modifier le verrouillage/publication automatique qu'avec autorisation.
- Restaurer séparément les paramètres de contact selon leur état préalablement enregistré : ne pas présumer qu'un rollback d'artefact annule un changement de variables ou révoque des identifiants.
- Correction locale du présent lot : copies dans `qa-local/media-20261117/baseline/`, restauration limitée à ce delta. Ne jamais réinitialiser les autres travaux ni retirer des médias avant d'en avoir vérifié les références.

## Sources officielles relues le 17 novembre 2026

- Configuration et priorité : https://docs.netlify.com/build/configure-builds/file-based-configuration/
- Functions et runtime : https://docs.netlify.com/build/functions/optional-configuration/
- Deploy Previews : https://docs.netlify.com/deploy/deploy-types/deploy-previews/
- Repli et publications automatiques : https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/

Les possibilités documentées ne prouvent ni le plan commercial du compte ni ses protections actives.
