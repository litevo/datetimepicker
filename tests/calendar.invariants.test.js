import JalaliCalendar from '../src/calendars/jalali.js';
import HijriCalendar from '../src/calendars/hijri.js';
import { test } from './test-runner.js';
import { assert } from './assert.js';

const engines = [
  new JalaliCalendar(),
  new HijriCalendar()
];

engines.forEach(engine => {
  test(`${engine.constructor.name}: month invariants`, () => {
    for (let y = 1400; y <= 1410; y++) {
      for (let m = 1; m <= 12; m++) {
        const month = engine.getMonth(y, m);

        assert(month.days >= 29 && month.days <= 31,
          `Invalid days count: ${month.days} at ${y}/${m}`
        );

        assert(month.firstWeekday >= 1 && month.firstWeekday <= 7,
          `Invalid weekday at ${y}/${m}`
        );
      }
    }
  });
});
