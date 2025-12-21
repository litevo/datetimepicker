import JalaliCalendar from '../../src/calendars/jalali.js';
import { test } from '../test-runner.js';
import { assertDateEqual } from '../assert.js';

const jalali = new JalaliCalendar();

test('Jalali year boundary', () => {
  const end = { year: 1402, month: 12, day: 29 };
  const next = jalali.fromTimestamp(
    jalali.toTimestamp(end) + 86400000
  );

  assertDateEqual(
    next,
    { year: 1403, month: 1, day: 1 },
    'Year boundary failed'
  );
});
