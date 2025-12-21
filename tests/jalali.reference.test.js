import JalaliCalendar from '../src/calendars/jalali.js';
import { test } from './test-runner.js';
import { assertDateEqual } from './assert.js';

const engine = new JalaliCalendar();

/**
 * Known correct historical anchors
 */
const cases = [
  {
    jalali: { year: 1399, month: 1, day: 1 },
    gregorian: { year: 2020, month: 3, day: 20 }
  },
  {
    jalali: { year: 1400, month: 1, day: 1 },
    gregorian: { year: 2021, month: 3, day: 21 }
  },
  {
    jalali: { year: 1403, month: 1, day: 1 },
    gregorian: { year: 2024, month: 3, day: 20 }
  }
];

cases.forEach(c => {
  test(`Jalali anchor ${c.jalali.year}/1/1`, () => {
    const ts = engine.toTimestamp(c.jalali);
    const d = new Date(ts);

    assertDateEqual(
      {
        year: d.getUTCFullYear(),
        month: d.getUTCMonth() + 1,
        day: d.getUTCDate()
      },
      c.gregorian,
      `Jalali → Gregorian failed for ${c.jalali.year}/1/1`
    );
  });
});
