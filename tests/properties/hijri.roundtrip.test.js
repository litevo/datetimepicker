import HijriCalendar from '../../src/calendars/hijri.js';
import { test } from '../test-runner.js';
import { assertDateEqual } from '../assert.js';

const hijri = new HijriCalendar();

test('Hijri round-trip consistency', () => {
  for (let i = 0; i < 100; i++) {
    const input = {
      year: 1400 + Math.floor(Math.random() * 100),
      month: 1 + Math.floor(Math.random() * 12),
      day: 1 + Math.floor(Math.random() * 29)
    };

    const out = hijri.fromTimestamp(hijri.toTimestamp(input));

    assertDateEqual(
      out,
      input,
      'Hijri round-trip failed'
    );
  }
});
