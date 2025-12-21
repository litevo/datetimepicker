import JalaliCalendar from '../src/calendars/jalali.js';
import { test } from './test-runner.js';
import { assert } from './assert.js';

const engine = new JalaliCalendar();

test('Jalali range drift test (365 days)', () => {
  const start = { year: 1402, month: 1, day: 1 };
  let ts = engine.toTimestamp(start);

  for (let i = 0; i < 365; i++) {
    const back = engine.fromTimestamp(ts);

    const delta =
      Math.abs(
        engine.toTimestamp(back) - ts
      );

    assert(
      delta === 0,
      `Drift detected at day ${i}: ${JSON.stringify(back)}`
    );

    ts += 24 * 60 * 60 * 1000;
  }
});
