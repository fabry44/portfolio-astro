import test from 'node:test';
import assert from 'node:assert/strict';
import { getProfileAge } from '../src/lib/profile-age.mjs';

test('âge du profil : le changement intervient le 16 septembre, heure de Paris', () => {
  for (const [instant, expected] of [
    ['2026-09-15T21:59:59Z', 41],
    ['2026-09-15T22:00:00Z', 42],
    ['2026-11-16T12:00:00Z', 42],
    ['2027-09-15T21:59:59Z', 42],
    ['2027-09-15T22:00:00Z', 43],
    ['2028-02-29T12:00:00Z', 43],
    ['2028-09-16T12:00:00Z', 44],
  ]) {
    assert.equal(getProfileAge(new Date(instant)), expected, instant);
  }
});
