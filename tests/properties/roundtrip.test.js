import GregorianCalendar from '../../src/calendars/gregorian.js';
import JalaliCalendar from '../../src/calendars/jalali.js';
import HijriCalendar from '../../src/calendars/hijri.js';
import { test } from '../test-runner.js';
import { assertDateEqual } from '../assert.js';

const gregorian = new GregorianCalendar();
const jalali = new JalaliCalendar();
const hijri = new HijriCalendar();

/* --------------------- Jalali --------------------- */
test('Jalali round-trip random', () => {
  for (let i = 0; i < 100; i++) {
    const input = {
      year: 1300 + Math.floor(Math.random() * 200),
      month: 1 + Math.floor(Math.random() * 12),
      day: 1 + Math.floor(Math.random() * 28)
    };

    const out = jalali.fromTimestamp(jalali.toTimestamp(input));
    assertDateEqual(out, input, 'Jalali round-trip failed');
  }
});

/* -------------------- Gregorian ------------------ */
test('Gregorian round-trip identity', () => {
  for (let i = 0; i < 100; i++) {
    const input = {
      year: 1970 + Math.floor(Math.random() * 100),
      month: 1 + Math.floor(Math.random() * 12),
      day: 1 + Math.floor(Math.random() * 28)
    };

    const out = gregorian.fromTimestamp(gregorian.toTimestamp(input));
    assertDateEqual(out, input, 'Gregorian round-trip failed');
  }
});

/* --------------------- Hijri ---------------------- */
test('Hijri round-trip random', () => {
  for (let i = 0; i < 100; i++) {
    const input = {
      year: 1400 + Math.floor(Math.random() * 100),
      month: 1 + Math.floor(Math.random() * 12),
      day: 1 + Math.floor(Math.random() * 29)
    };

    const out = hijri.fromTimestamp(hijri.toTimestamp(input));
    assertDateEqual(out, input, 'Hijri round-trip failed');
  }
});
