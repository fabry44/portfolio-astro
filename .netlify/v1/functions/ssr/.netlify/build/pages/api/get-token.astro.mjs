export { renderers } from '../../renderers.mjs';

const prerender = false;
async function POST({ request }) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), { status: 405 });
  }
  const allowedOrigins = [
    // En production
    "https://backoffice.fabien-roy.fr"
  ];
  const requestOrigin = request.headers.get("Origin") ?? request.headers.get("Referer");
  if (!requestOrigin || !requestOrigin.startsWith(allowedOrigins[0])) {
    return new Response(JSON.stringify({ error: "Unauthorized origin" }), { status: 403 });
  }
  const clientId = "f32777b993d5b244d7b62259a3a44326";
  const clientSecret = "1c694e3b8c99ffe9badf60cc374edaee07925d3ab17c4591720b34fdc2dec21e1ca6688c6bae20cb4de746162dd254dbdb21b2a31dfb7eb3475dc6f0fec977fd";
  try {
    const response = await fetch("https://backoffice.fabien-roy.fr/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        grant_type: "client_credentials",
        client_id: clientId,
        client_secret: clientSecret,
        scope: "portfolio"
      })
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

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    POST,
    prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
