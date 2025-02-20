// 📌 src/pages/api/rebuild.ts
import type { APIRoute } from "astro";
import { exec } from "child_process";

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  try {
    // Vérification du secret
    const secret = request.headers.get("X-API-SECRET");
    if (secret !== import.meta.env.REBUILD_SECRET) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 403,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("⚡ Rebuild demandé...");

    exec("npm run build", (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Erreur de build: ${stderr}`);
        return;
      }
      console.log(`✅ Build réussi : ${stdout}`);
    });

    return new Response(
      JSON.stringify({ message: "Rebuild déclenché !" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("🔥 Erreur dans rebuild.ts :", error);
    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
