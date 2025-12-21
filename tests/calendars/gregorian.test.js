import GregorianCalendar from '../../src/calendars/gregorian.js';
import anchors from '../datasets/gregorian-anchor.js';
import { test } from '../test-runner.js';
import { assert, assertDateEqual } from '../assert.js';

const gregorian = new GregorianCalendar();

/* --------------------------------------------------
 * Anchor Tests (timestamp correctness)
 * -------------------------------------------------- */

test('Gregorian anchor dates', () => {
  for (const row of anchors) {
    const ts = gregorian.toTimestamp(row.gregorian);

    assert(
      ts === row.timestamp,
      `Timestamp mismatch for ${row.gregorian.year}-${row.gregorian.month}-${row.gregorian.day}`
    );
  }
});

/* --------------------------------------------------
 * fromTimestamp correctness
 * -------------------------------------------------- */

test('Gregorian fromTimestamp correctness', () => {
  for (const row of anchors) {
    const out = gregorian.fromTimestamp(row.timestamp);

    assertDateEqual(
      out,
      row.gregorian,
      'fromTimestamp mismatch'
    );
  }
});

/* --------------------------------------------------
 * Leap year rules
 * -------------------------------------------------- */

test('Gregorian leap year rules', () => {
  const leapYears = [2000, 2004, 2024];
  const nonLeapYears = [1900, 2100, 2023];

  for (const y of leapYears) {
    assert(gregorian.isLeapYear(y), `${y} should be leap`);
  }

  for (const y of nonLeapYears) {
    assert(!gregorian.isLeapYear(y), `${y} should NOT be leap`);
  }
});

/* --------------------------------------------------
 * February length
 * -------------------------------------------------- */

test('Gregorian February length', () => {
  const febLeap = gregorian.getMonth(2024, 2);
  const febNormal = gregorian.getMonth(2023, 2);

  assert(febLeap.days === 29, 'Feb 2024 should be 29 days');
  assert(febNormal.days === 28, 'Feb 2023 should be 28 days');
});

/* --------------------------------------------------
 * Month length invariant
 * -------------------------------------------------- */

test('Gregorian month length invariant', () => {
  for (let y = 1990; y <= 2030; y++) {
    for (let m = 1; m <= 12; m++) {
      const month = gregorian.getMonth(y, m);

      assert(
        month.days >= 28 && month.days <= 31,
        `Invalid month length ${month.days} for ${y}/${m}`
      );
    }
  }
});
