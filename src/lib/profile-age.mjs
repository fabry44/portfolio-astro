// Birth date supplied by the portfolio owner; never rendered as a visible date.
const birthDate = { year: 1984, month: 9, day: 16 };
const calendar = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit',
});

export function getProfileAge(now = new Date()) {
  const parts = Object.fromEntries(calendar.formatToParts(now).map(({ type, value }) => [type, value]));
  const year = Number(parts.year);
  const month = Number(parts.month);
  const day = Number(parts.day);
  const beforeBirthday = month < birthDate.month || (month === birthDate.month && day < birthDate.day);
  return year - birthDate.year - Number(beforeBirthday);
}
