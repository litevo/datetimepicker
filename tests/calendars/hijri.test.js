import HijriCalendar from '../../src/calendars/hijri.js';
import GregorianCalendar from '../../src/calendars/gregorian.js';
import anchors from '../datasets/hijri-anchor.js';
import { test } from '../test-runner.js';
import { assert, assertDateEqual } from '../assert.js';

const hijri = new HijriCalendar();
const gregorian = new GregorianCalendar();

/* --------------------------------------------------
 * Anchor Tests
 * -------------------------------------------------- */

test('Hijri anchor dates (tabular)', () => {
  for (const row of anchors) {
    const ts = hijri.toTimestamp(row.hijri);
    const g = gregorian.fromTimestamp(ts);

    // چون Hijri ممکن است ±1 روز اختلاف داشته باشد:
    const delta =
      Math.abs(
        Date.UTC(g.year, g.month - 1, g.day) -
        Date.UTC(
          row.gregorian.year,
          row.gregorian.month - 1,
          row.gregorian.day
        )
      ) / 86400000;

    assert(
      delta <= 1,
      `Hijri anchor mismatch >1 day for ${row.hijri.year}/${row.hijri.month}/${row.hijri.day}`
    );
  }
});

/* --------------------------------------------------
 * Structure Test
 * -------------------------------------------------- */

test('Hijri fromTimestamp returns valid structure', () => {
  const d = hijri.fromTimestamp(Date.UTC(2024, 0, 1));

  assert(typeof d.year === 'number', 'year missing');
  assert(typeof d.month === 'number', 'month missing');
  assert(typeof d.day === 'number', 'day missing');

  assert(d.month >= 1 && d.month <= 12, 'invalid month');
  assert(d.day >= 1 && d.day <= 30, 'invalid day');
});

/* --------------------------------------------------
 * Month Length Invariants
 * -------------------------------------------------- */

test('Hijri month length invariant', () => {
  for (let y = 1400; y <= 1500; y++) {
    for (let m = 1; m <= 12; m++) {
      const month = hijri.getMonth(y, m);
      assert(
        month.days === 29 || month.days === 30,
        `Invalid Hijri month length ${month.days} at ${y}/${m}`
      );
    }
  }
});
