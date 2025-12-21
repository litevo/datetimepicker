import GregorianCalendar from '../src/calendars/gregorian.js';
import { test } from './test-runner.js';
import { assert, assertDateEqual } from './assert.js';

const engine = new GregorianCalendar();

test('Gregorian: round-trip identity', () => {
  const input = { year: 2025, month: 3, day: 21 };
  const ts = engine.toTimestamp(input);
  const out = engine.fromTimestamp(ts);

  assertDateEqual(
    out,
    input,
    'Gregorian round-trip failed'
  );
});

test('Gregorian: February leap year correctness', () => {
  const m = engine.getMonth(2024, 2);
  assert(
    m.days === 29,
    `Gregorian leap year failed: expected 29, got ${m.days}`
  );
});
