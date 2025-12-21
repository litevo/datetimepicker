import JalaliCalendar from '../../src/calendars/jalali.js';
import GregorianCalendar from '../../src/calendars/gregorian.js';
import { test } from '../test-runner.js';
import { assert } from '../assert.js';

const j = new JalaliCalendar();
const g = new GregorianCalendar();

test('Jalali ↔ Gregorian consistency', () => {
  const ts = j.toTimestamp({ year: 1403, month: 1, day: 1 });
  const gr = g.fromTimestamp(ts);

  assert(
    gr.year === 2024 && gr.month === 3,
    'Cross-calendar mismatch'
  );
});
