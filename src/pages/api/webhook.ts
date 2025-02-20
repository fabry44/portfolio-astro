import type { APIRoute } from "astro";

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    const secret = request.headers.get("X-API-SECRET");
    const receivedSecret = (request.headers.get("X-API-SECRET") || "").trim();

    console.log("🚀 Secret reçu:", `"${secret}"`);  // 🔍 Vérifier s'il y a des espaces ou des différences

    if (receivedSecret !== "9ffa89b83de02d7c70a29ced0f17556222adbbdb558218ebb28b5bb47011871c") {

      console.error("❌ Mauvais secret reçu !");
      return new Response(JSON.stringify({ error1: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("📡 Webhook accepté: Démarrage du processus...");

    // 🔹 Appel au callback
    const callbackResponse = await fetch("http://localhost:4322/api/callback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!callbackResponse.ok) {
      console.error("⚠️ Erreur dans callback.ts :", await callbackResponse.text());
      return new Response(
        JSON.stringify({ error: "Failed to fetch data from callback" }),
        { status: callbackResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Callback exécuté avec succès !");

    // 🔹 Déclencher le rebuild Astro
    const rebuildResponse = await fetch("http://localhost:4322/api/rebuild", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-SECRET": "9ffa89b83de02d7c70a29ced0f17556222adbbdb558218ebb28b5bb47011871c",
      },
    });

    if (!rebuildResponse.ok) {
      console.error("🚨 Erreur dans rebuild.ts :", await rebuildResponse.text());
      return new Response(
        JSON.stringify({ error: "Failed to rebuild Astro" }),
        { status: rebuildResponse.status, headers: { "Content-Type": "application/json" } }
      );
    }

    console.log("✅ Rebuild exécuté avec succès !");
    return new Response(
      JSON.stringify({ message: "Webhook traité avec succès !" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("🔥 Erreur dans webhook.ts :", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
