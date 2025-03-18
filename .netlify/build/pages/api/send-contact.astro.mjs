export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Méthode non autorisée" }), { status: 405 });
  }
  try {
    const formData = await request.json();
    const oauthResponse = await fetch("https://backoffice.fabien-roy.fr/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: "f32777b993d5b244d7b62259a3a44326",
        // ⚠️ Stocké en .env
        client_secret: "1c694e3b8c99ffe9badf60cc374edaee07925d3ab17c4591720b34fdc2dec21e1ca6688c6bae20cb4de746162dd254dbdb21b2a31dfb7eb3475dc6f0fec977fd",
        // ⚠️ Stocké en .env
        scope: "portfolio"
      })
    });
    const oauthData = await oauthResponse.json();
    if (!oauthResponse.ok) {
      return new Response(JSON.stringify({ error: "Échec d'authentification OAuth2" }), { status: 500 });
    }
    const accessToken = oauthData.access_token;
    const apiResponse = await fetch("https://backoffice.fabien-roy.fr/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
        // ✅ Authentification sécurisée
      },
      body: JSON.stringify(formData)
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
