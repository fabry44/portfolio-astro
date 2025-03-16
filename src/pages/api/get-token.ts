export const prerender = false; // ✅ Désactive la pré-rendérisation statique
import type { APIContext } from "astro";

export async function POST({ request }: APIContext) {
    if (request.method !== "POST") {
        return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
    }

    // Vérifier l'origine pour bloquer les requêtes externes
    const allowedOrigins = [  // En production
        "https://backoffice.fabien-roy.fr"
    ]; // Astro frontend
    const requestOrigin = request.headers.get("Origin") ?? request.headers.get("Referer");

    if (!requestOrigin || !requestOrigin.startsWith(allowedOrigins[0])) {
        return new Response(JSON.stringify({ error: "Unauthorized origin" }), { status: 403 });
    }

    // Récupérer les credentials depuis .env (Astro backend)
    const clientId = import.meta.env.OAUTH_CLIENT_ID;
    const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
        return new Response(JSON.stringify({ error: "Missing OAuth credentials" }), { status: 500 });
    }

    try {
        // Requête OAuth2 vers le backend Symfony
        const response = await fetch("https://backoffice.fabien-roy.fr/token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                grant_type: "client_credentials",
                client_id: clientId,
                client_secret: clientSecret,
                scope: "portfolio",
            }),
        });

        if (!response.ok) {
            return new Response(JSON.stringify({ error: "OAuth2 token retrieval failed" }), { status: 500 });
        }

        const tokenData = await response.json();
        return new Response(JSON.stringify({
            access_token: tokenData.access_token,
            expires_in: tokenData.expires_in
        }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
    }
}
