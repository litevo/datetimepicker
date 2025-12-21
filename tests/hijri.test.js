import HijriCalendar from '../src/calendars/hijri.js';
import { test } from './test-runner.js';
import { assert } from './assert.js'; // ← این خط جا افتاده بود

const engine = new HijriCalendar();

test('Hijri: fromTimestamp returns valid structure', () => {
  const ts = engine.toTimestamp({ year: 1446, month: 9, day: 1 });
  const out = engine.fromTimestamp(ts);

  assert(typeof out.year === 'number', 'year invalid');
  assert(typeof out.month === 'number', 'month invalid');
  assert(typeof out.day === 'number', 'day invalid');
});
