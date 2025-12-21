import HijriCalendar from '../src/calendars/hijri.js';
import { test } from './test-runner.js';
import { assertDateEqual } from './assert.js';

const engine = new HijriCalendar();

test('Hijri → Gregorian diagnostic', () => {
  const input = { year: 1445, month: 9, day: 1 };
  const ts = engine.toTimestamp(input);
  const d = new Date(ts);

  assertDateEqual(
    {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate()
    },
    { year: 2024, month: 3, day: 11 },
    'Hijri Ramadan 1445 conversion error'
  );
});
