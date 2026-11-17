import test from 'node:test';
import assert from 'node:assert/strict';

test('SMTP exige TLS, impose from/to et ne charge aucune ressource externe', async () => {
  const { sendSmtp } = await import('../src/lib/contact/smtp.mjs');
  let observed;
  const factory = (options) => {
    assert.equal(options.requireTLS, true);
    assert.equal(options.dnsTimeout, 5000);
    assert.equal(options.secure, false);
    assert.equal(options.disableFileAccess, true);
    assert.equal(options.disableUrlAccess, true);
    assert.ok(options.socketTimeout <= 10000);
    return { sendMail: async (message) => { observed = message; return { accepted: ['owner@example.com'], rejected: [] }; }, close() {} };
  };
  await sendSmtp({ host: 'smtp.example', port: 587, user: 'test', password: 'test',
    from: 'sender@example.com', to: 'owner@example.com' }, { text: 'Message test', replyTo: 'visitor@example.com' }, factory);
  assert.equal(observed.to, 'owner@example.com');
  assert.equal(observed.from, 'sender@example.com');
  assert.equal(observed.replyTo, 'visitor@example.com');
  assert.equal(observed.html, undefined);
});

test('le paquet Nodemailer installé compose réellement le message, sans réseau SMTP', async () => {
  const { sendSmtp } = await import('../src/lib/contact/smtp.mjs');
  const nodemailer = (await import('nodemailer')).default;
  const config = { host: 'smtp.example', port: 465, user: 'test', password: 'test', from: 'sender@example.com', to: 'owner@example.com' };
  let serialized;
  const factory = (options) => {
    assert.equal(options.secure, true);
    const transport = nodemailer.createTransport({ ...options, streamTransport: true, buffer: true });
    return { sendMail: async (mail) => {
      const result = await transport.sendMail(mail);
      serialized = result.message.toString();
      assert.deepEqual(result.envelope.to, ['owner@example.com']);
      return { accepted: ['owner@example.com'], rejected: [] };
    }, close: () => transport.close() };
  };
  await sendSmtp(config, { replyTo: 'visitor@example.com', text: 'Message fictif sans envoi.' }, factory);
  assert.match(serialized, /To: owner@example.com/);
  assert.match(serialized, /Reply-To: visitor@example.com/);
  assert.match(serialized, /Content-Type: text\/plain/);
  assert.doesNotMatch(serialized, /Bcc:/);
});
