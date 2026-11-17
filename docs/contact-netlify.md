# Contact Netlify : configuration et recette

Cette chaîne n’utilise ni l’ancienne API Symfony, ni son authentification, ni son stockage. Le code est fermé par défaut : les tests locaux ne configurent pas les comptes et n’envoient aucun message réel.

## Variables

| Variable | Portée | Rôle |
| --- | --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Build, publique | Clé du widget propre au portfolio ; absente = bouton désactivé et alternative email |
| `CONTACT_FORM_ENABLED` | Function | Doit être exactement `true` pour autoriser le traitement |
| `CONTACT_ALLOWED_ORIGIN` | Function | Origine canonique exacte, sans chemin ni slash final ; fournit aussi le hostname Turnstile attendu |
| `TURNSTILE_SECRET_KEY` | Function, secrète | Secret du widget ; jamais dans une variable `PUBLIC_*` |
| `SMTP_HOST`, `SMTP_PORT` | Function | Serveur SMTP ; uniquement 465 (TLS direct) ou 587 (STARTTLS exigé) |
| `SMTP_USER`, `SMTP_PASSWORD` | Function, identifiants | Authentification de la boîte d’envoi autorisée |
| `CONTACT_FROM_EMAIL` | Function | Adresse expéditrice fixe autorisée par le fournisseur |
| `CONTACT_TO_EMAIL` | Function | Destinataire fixe ; aucune liste et aucun choix fourni par le visiteur |

Le modèle `.env.example` contient les noms, pas les identifiants. Renseigner les secrets par le mécanisme sécurisé du fournisseur, jamais dans Git, une capture ou une conversation. La copie d’une configuration d’un autre site n’est pas nécessaire.

Une seule origine est admise. Une éventuelle variante `www` et les previews doivent avoir un routage canonique ou une configuration distincte validée ; pas de joker. Ne pas utiliser la configuration de production pour des essais automatiques.

## Contrat et protections

- Entrée publique : `POST /api/send-contact`, JSON. La route interne `/.netlify/functions/contact` est refusée en 404 par le code.
- Champs obligatoires : `firstName`, `lastName`, `email`, `message`, `rgpd: true`, `turnstileToken`. `phone` est facultatif ; le champ piège `website` doit rester vide.
- Limites serveur : corps 16 Kio effectivement lus, noms 80 caractères chacun, email 254, téléphone 40, message 5000, jeton 2048. Validation de la forme et refus des injections d’en-tête.
- Origine comparée exactement ; pas d’en-têtes CORS permissifs. L’origine seule n’est pas la protection anti-bot : elle est complétée par Turnstile et le contrôle de débit.
- Siteverify avant SMTP ; `success === true`, domaine et action `contact` exigés. Validation à chaque demande ; la détection des jetons expirés ou rejoués relève de Siteverify, pas d’une mémoire locale présentée comme partagée.
- Délai Siteverify de 5 s ; délais SMTP de connexion, accueil et socket bornés. Aucun retry automatique d’envoi.
- Texte brut envoyé à l’adresse configurée, `Reply-To` visiteur uniquement. Accès aux fichiers/URLs désactivé dans le transport. Aucun accusé automatique au visiteur.
- Réponses de la fonction en `Cache-Control: no-store`. Un succès signifie acceptation SMTP, pas remise finale dans la boîte du destinataire.
- Configuration Netlify : maximum déclaré de 5 requêtes par fenêtre de 60 s et par combinaison IP/domaine. Ce contrôle est assuré par la plateforme, pas par un compteur en mémoire. Son application réelle doit être vérifiée sur une cible Netlify autorisée.
- Côté navigateur : pas d’envoi sans jeton, renouvellement après tentative, bouton bloqué pendant l’envoi, absence de faux succès, saisie conservée en cas de refus/panne. Alternative email sans JavaScript ; aucune soumission GET avec les données dans l’URL.

## Réponses utiles

| Statut | Sens |
| --- | --- |
| 200 + `ok: true` | Accepté par le transport configuré |
| 400 | Champs, JSON ou corps invalides |
| 403 | Origine ou vérification Turnstile refusée |
| 404 | Entrée interne non autorisée |
| 405 | Méthode non prévue |
| 413 | Corps trop volumineux |
| 415 | Type de contenu non accepté |
| 429 | Limite Netlify ; patienter, pas de nouvelle tentative automatique |
| 502 | Envoi non confirmé ; pas de promesse d’échec définitif ni de nouvelle soumission automatique |
| 503 | Configuration absente ou service de vérification indisponible |

## Avant une activation réelle

1. Faire valider les mises à niveau de sécurité nécessaires et une revue du candidat ; les tests verts ne valent pas autorisation de publication.
2. Valider le widget du portfolio, son domaine, l’expéditeur, le destinataire et le fournisseur SMTP ; vérifier les capacités d’envoi et les règles de la boîte. Ne pas reprendre de secret historique.
3. Finaliser l’information des personnes : base légale, utilité des champs et de la case, destinataires, transferts, conservation, suppression, journaux, droits et services de polices. Les pages juridiques de ce candidat restent des brouillons, pas une garantie de conformité.
4. Contrôler la commande de build effective du compte Netlify : `npm run build`, jamais l’ancien générateur. Ne pas présumer que la configuration du dépôt a déjà modifié celle du compte.
5. Sur une cible expressément autorisée, vérifier le routage, le refus de l’URL interne, les erreurs, le débit 429, les caches réels, le PDF et les domaines canoniques.
6. Après autorisation distincte, envoyer un unique message fictif au destinataire prévu et vérifier sa réception ainsi que l’absence de notification au visiteur. Ne pas appeler un transport 2xx une preuve de réception.
7. Confirmer les droits de diffusion du PDF et l’absence de CV non prévu. Aucun ancien cache navigateur immutable n’est purgé par une modification du dépôt.

## Références officielles consultées le 10 novembre 2026

- Cloudflare, validation serveur Turnstile : https://developers.cloudflare.com/turnstile/get-started/server-side-validation/ (page indiquant une mise à jour le 22 octobre 2026).
- Netlify, API des Functions : https://docs.netlify.com/build/functions/api/ ; rate limiting : https://docs.netlify.com/manage/security/secure-access-to-sites/rate-limiting/.
- CNIL, exemples à adapter de mentions d’information : https://www.cnil.fr/fr/passer-laction/rgpd-exemples-de-mentions-dinformation. Cette référence n’est pas une validation juridique du site.
