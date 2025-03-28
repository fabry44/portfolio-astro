export const prerender = false; // ✅ Assure que ce fichier est exécuté côté serveur
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Méthode non autorisée" }), { status: 405 });
    }

    try {
        const formData = await request.json();

        // 🔐 Récupérer un token sécurisé
        const oauthResponse = await fetch("https://dashboard.fabien-roy.fr/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: import.meta.env.OAUTH_CLIENT_ID, // ⚠️ Stocké en variable d'environnement netlify
                client_secret: import.meta.env.OAUTH_CLIENT_SECRET, // ⚠️ Stocké en variable d'environnement netlify
                scope: "portfolio",
            }),
        });

        const oauthData = await oauthResponse.json();
        if (!oauthResponse.ok) {
            return new Response(JSON.stringify({ error: "Échec d'authentification OAuth2" }), { status: 500 });
        }

        const accessToken = oauthData.access_token;

        // 📩 Envoyer le formulaire sécurisé à Symfony
        const apiResponse = await fetch("https://dashboard.fabien-roy.fr/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}` // ✅ Authentification sécurisée
            },
            body: JSON.stringify(formData),
        });

        const apiResult = await apiResponse.json();
        if (!apiResponse.ok) {
            return new Response(JSON.stringify({ error: apiResult.error || "Échec de l'envoi" }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: "Message envoyé avec succès !" }), { status: 200 });

    } catch (error) {
        return new Response(JSON.stringify({ error: "Erreur serveur" }), { status: 500 });
    }
}
