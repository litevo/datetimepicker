import JalaliCalendar from '../src/calendars/jalali.js';
import { test } from './test-runner.js';
import { assert, assertDateEqual } from './assert.js';

const engine = new JalaliCalendar();

/**
 * Anchor test: Nowruz
 */
test('Jalali: 1403/01/01 must equal 2024-03-20', () => {
  const input = { year: 1403, month: 1, day: 1 };
  const ts = engine.toTimestamp(input);
  const d = new Date(ts);

  assertDateEqual(
    {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1,
      day: d.getUTCDate()
    },
    { year: 2024, month: 3, day: 20 },
    'Nowruz 1403 conversion failed'
  );
});

/**
 * Round-trip identity
 */
test('Jalali: round-trip consistency', () => {
  const input = { year: 1402, month: 7, day: 15 };
  const ts = engine.toTimestamp(input);
  const out = engine.fromTimestamp(ts);

  assertDateEqual(
    out,
    input,
    'Jalali round-trip failed'
  );
});

/**
 * Month length invariants
 */
test('Jalali: month length rules', () => {
  for (let m = 1; m <= 6; m++) {
    const month = engine.getMonth(1403, m);
    assert(
      month.days === 31,
      `Month ${m} should have 31 days, got ${month.days}`
    );
  }

  for (let m = 7; m <= 11; m++) {
    const month = engine.getMonth(1403, m);
    assert(
      month.days === 30,
      `Month ${m} should have 30 days, got ${month.days}`
    );
  }
});
