// 📌 src/pages/api/callback.ts
import type { APIRoute } from "astro";

export const prerender = false

export const POST: APIRoute = async ({ cookies }) => {
  try {
    console.log("🔑 Récupération du token OAuth2...");

    const tokenResponse = await fetch("https://127.0.0.1:8000/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "client_credentials",
        client_id: import.meta.env.OAUTH2_CLIENT_ID,
        client_secret: import.meta.env.OAUTH2_CLIENT_SECRET,
        scope: "portfolio",
      }),
    });

    if (!tokenResponse.ok) {
      console.error("❌ Erreur d'authentification OAuth2");
      return new Response(JSON.stringify({ error: "Failed to retrieve token" }), {
        status: tokenResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    cookies.set("access_token", accessToken, {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    console.log("📂 Récupération des données du portfolio...");

    const portfolioResponse = await fetch("https://127.0.0.1:8000/api/portfolio", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!portfolioResponse.ok) {
      console.error("⚠️ Erreur de récupération du portfolio.");
      return new Response(JSON.stringify({ error: "Failed to fetch portfolio data" }), {
        status: portfolioResponse.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const portfolioData = await portfolioResponse.json();
    console.log("✅ Données portfolio récupérées :", portfolioData);

    return new Response(
      JSON.stringify({ portfolio: portfolioData }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("🔥 Erreur dans callback.ts :", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
