import { createContactHandler } from '../../src/lib/contact/handler.mjs';
import { sendSmtp } from '../../src/lib/contact/smtp.mjs';

export default async function contact(request) {
  // The internal function URL must not become a second public entry point.
  if (new URL(request.url).pathname !== '/api/send-contact') {
    return new Response(null, { status: 404, headers: { 'cache-control': 'no-store' } });
  }
  return createContactHandler(process.env, { send: sendSmtp })(request);
}

export const config = {
  path: '/api/send-contact',
  rateLimit: { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' },
};
