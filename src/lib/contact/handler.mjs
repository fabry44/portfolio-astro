const UNAVAILABLE = 'Le formulaire est temporairement indisponible. Utilisez le lien email.';

const emailValid = (value) => typeof value === 'string' && value.length <= 254 && /^[^\s@<>(),;:"\\]+@[^\s@<>(),;:"\\]+\.[^\s@<>(),;:"\\]+$/.test(value);
const textValid = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max && !/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value);

function configuration(env) {
  const required = ['TURNSTILE_SECRET_KEY', 'SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD'];
  if (env.CONTACT_FORM_ENABLED !== 'true' || required.some((key) => !env[key]?.trim())) return null;
  if (!emailValid(env.CONTACT_FROM_EMAIL) || !emailValid(env.CONTACT_TO_EMAIL)) return null;
  const port = Number(env.SMTP_PORT || 587);
  if (![465, 587].includes(port)) return null;
  try {
    const url = new URL(env.CONTACT_ALLOWED_ORIGIN);
    if (url.origin !== env.CONTACT_ALLOWED_ORIGIN || (url.protocol !== 'https:' && url.hostname !== 'localhost')) return null;
    return { origin: url.origin, hostname: url.hostname, to: env.CONTACT_TO_EMAIL, from: env.CONTACT_FROM_EMAIL,
      host: env.SMTP_HOST, port, user: env.SMTP_USER, password: env.SMTP_PASSWORD, secret: env.TURNSTILE_SECRET_KEY };
  } catch { return null; }
}

async function readJson(request) {
  const limit = 16 * 1024;
  const length = request.headers.get('content-length');
  if (length && (!/^\d+$/.test(length) || Number(length) > limit)) throw 413;
  if (!request.body) throw 400;
  const reader = request.body.getReader();
  let size = 0;
  const chunks = [];
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) { await reader.cancel(); throw 413; }
      chunks.push(value);
    }
    const bytes = new Uint8Array(size);
    let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
  } finally { reader.releaseLock(); }
}

function validPayload(data) {
  return data && !Array.isArray(data) && typeof data === 'object'
    && textValid(data.firstName, 80) && !/[\r\n]/.test(data.firstName)
    && textValid(data.lastName, 80) && !/[\r\n]/.test(data.lastName)
    && emailValid(data.email) && textValid(data.message, 5000) && data.rgpd === true
    && (data.phone === undefined || (typeof data.phone === 'string' && data.phone.length <= 40 && /^[+()\d .-]*$/.test(data.phone)))
    && (data.website === undefined || data.website === '')
    && textValid(data.turnstileToken, 2048);
}

const json = (body, status) => new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

export function createContactHandler(env, { fetcher = fetch, send } = {}) {
  const config = configuration(env);
  return async (request) => {
    if (request.method !== 'POST') return json({ error: 'Méthode non autorisée.' }, 405);
    if (!config) return json({ error: UNAVAILABLE }, 503);
    if (request.headers.get('origin') !== config.origin) return json({ error: 'Origine non autorisée.' }, 403);
    if (request.headers.get('content-type')?.split(';')[0].trim().toLowerCase() !== 'application/json') return json({ error: 'Format non accepté.' }, 415);
    let data;
    try { data = await readJson(request); } catch (error) {
      return json({ error: 'Demande invalide ou trop volumineuse.' }, error === 413 ? 413 : 400);
    }
    if (!validPayload(data)) return json({ error: 'Vérifiez les champs et la vérification anti-spam.' }, 400);
    let result;
    try {
      const verification = await fetcher('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST', signal: AbortSignal.timeout(5000),
        body: new URLSearchParams({ secret: config.secret, response: data.turnstileToken }),
      });
      if (!verification.ok) return json({ error: UNAVAILABLE }, 503);
      result = await verification.json();
    } catch { return json({ error: UNAVAILABLE }, 503); }
    if (result?.success !== true || result.hostname !== config.hostname || result.action !== 'contact') {
      return json({ error: 'Vérification expirée ou refusée. Réessayez.' }, 403);
    }
    try {
      await send(config, {
        replyTo: data.email,
        text: `${data.firstName.trim()} ${data.lastName.trim()}\nEmail : ${data.email}\nTéléphone : ${data.phone || 'Non renseigné'}\n\n${data.message.trim()}`,
      });
    } catch { return json({ error: "L’envoi n’a pas été confirmé. Utilisez le lien email avant de réessayer." }, 502); }
    return json({ ok: true }, 200);
  };
}
