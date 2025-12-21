import JalaliCalendar from '../../src/calendars/jalali.js';
import anchors from '../datasets/jalali-anchor.js';
import { test } from '../test-runner.js';
import { assertDateEqual } from '../assert.js';

const jalali = new JalaliCalendar();

test('Jalali anchor dates', () => {
  for (const row of anchors) {
    const ts = jalali.toTimestamp(row.jalali);
    const d = new Date(ts);

    assertDateEqual(
      { year: d.getUTCFullYear(), month: d.getUTCMonth() + 1, day: d.getUTCDate() },
      row.gregorian,
      'Anchor mismatch'
    );
  }
});
