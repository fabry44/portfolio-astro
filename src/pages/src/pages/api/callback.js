// src/pages/api/auth.js

/**
 * Cet endpoint gère l'authentification.
 * Il attend une requête POST contenant un JSON avec { email, password }.
 * Il appelle ensuite votre API d'authentification et, en cas de succès,
 * renvoie le résultat (par exemple, un token et/ou d'autres données).
 */

export async function post({ request, cookies }) {
  try {
    // Récupérer les identifiants depuis la requête
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: 'Missing email or password' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Appeler votre API backend pour authentifier l'utilisateur
    // Remplacez l'URL par celle de votre API
    const apiResponse = await fetch('https://votre-api-domain.com/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!apiResponse.ok) {
      // Si l'authentification échoue côté API, renvoyer l'erreur
      const errorData = await apiResponse.json();
      return new Response(
        JSON.stringify({ error: 'Authentication failed', details: errorData }),
        { status: apiResponse.status, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Récupérer la réponse de l'API (par exemple un token et des infos utilisateur)
    const data = await apiResponse.json();

    // Optionnel : enregistrer le token dans un cookie sécurisé pour les futures requêtes
    cookies.set('access_token', data.access_token, {
      path: '/',
      httpOnly: true,
      secure: true, // assurez-vous d'utiliser HTTPS en production
      sameSite: 'strict'
    });

    // Appel de l'API pour récupérer
    // des données supplémentaires en utilisant le token obtenu.
    // Exemple :
    const portfolioResponse = await fetch('https://127.0.0.1:8000/api/portfolio-data', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${data.access_token}`,
        'Content-Type': 'application/json'
      }
    });
    const portfolioData = await portfolioResponse.json();
    data.portfolio = portfolioData;

    // Retourner le résultat (token, utilisateur, etc.) au front
    return new Response(
      JSON.stringify(data),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erreur dans l\'endpoint auth:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
