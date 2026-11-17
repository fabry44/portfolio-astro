export async function sendSmtp(config, message, transportFactory) {
  const factory = transportFactory || (await import('nodemailer')).default.createTransport;
  const transport = factory({
    host: config.host, port: config.port, secure: config.port === 465, requireTLS: true,
    auth: { user: config.user, pass: config.password },
    dnsTimeout: 5000, connectionTimeout: 5000, greetingTimeout: 5000, socketTimeout: 10000,
    disableFileAccess: true, disableUrlAccess: true,
  });
  try {
    const result = await transport.sendMail({
      from: config.from, to: config.to, replyTo: message.replyTo,
      subject: 'Contact depuis le portfolio de Fabien Roy', text: message.text,
      disableFileAccess: true, disableUrlAccess: true,
    });
    if (!result.accepted?.includes(config.to) || result.rejected?.length) throw new Error('SMTP not accepted');
  } finally { transport.close(); }
}
