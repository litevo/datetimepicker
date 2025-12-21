// Integer-based Persian epoch (civil)
const PERSIAN_EPOCH = 1948321;

/* ---------------- Gregorian <-> JDN ---------------- */

function gregorianToJdn(y, m, d) {
  const a = Math.floor((14 - m) / 12);
  const y2 = y + 4800 - a;
  const m2 = m + 12 * a - 3;

  return d
    + Math.floor((153 * m2 + 2) / 5)
    + 365 * y2
    + Math.floor(y2 / 4)
    - Math.floor(y2 / 100)
    + Math.floor(y2 / 400)
    - 32045;
}

function jdnToGregorian(jdn) {
  const a = jdn + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor(146097 * b / 4);

  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor(1461 * d / 4);
  const m = Math.floor((5 * e + 2) / 153);

  return {
    year: 100 * b + d - 4800 + Math.floor(m / 10),
    month: m + 3 - 12 * Math.floor(m / 10),
    day: e - Math.floor((153 * m + 2) / 5) + 1
  };
}

/* ---------------- Jalali <-> JDN ---------------- */

function jalaliToJdn(jy, jm, jd) {
  const epbase = jy - (jy >= 0 ? 474 : 473);
  const epyear = 474 + (epbase % 2820);

  return jd
    + (jm <= 7 ? (jm - 1) * 31 : (jm - 1) * 30 + 6)
    + Math.floor((epyear * 682 - 110) / 2816)
    + (epyear - 1) * 365
    + Math.floor(epbase / 2820) * 1029983
    + (PERSIAN_EPOCH - 1);
}

function jdnToJalali(jdn) {
  const depoch = jdn - jalaliToJdn(475, 1, 1);
  const cycle = Math.floor(depoch / 1029983);
  const cyear = depoch % 1029983;

  let ycycle;
  if (cyear === 1029982) {
    ycycle = 2820;
  } else {
    const aux1 = Math.floor(cyear / 366);
    const aux2 = cyear % 366;
    ycycle =
      Math.floor((2134 * aux1 + 2816 * aux2 + 2815) / 1028522)
      + aux1 + 1;
  }

  const jy = ycycle + 2820 * cycle + 474;
  const yday = jdn - jalaliToJdn(jy, 1, 1) + 1;

  const jm = yday <= 186
    ? Math.ceil(yday / 31)
    : Math.ceil((yday - 6) / 30);

  const jd = jdn - jalaliToJdn(jy, jm, 1) + 1;

  return { year: jy, month: jm, day: jd };
}

/* ---------------- Engine ---------------- */

export default class JalaliCalendar {

  toTimestamp({ year, month, day }) {
    const jdn = jalaliToJdn(year, month, day);
    const g = jdnToGregorian(jdn);
    return Date.UTC(g.year, g.month - 1, g.day);
  }

  fromTimestamp(ts) {
    const d = new Date(ts);
    const jdn = gregorianToJdn(
      d.getUTCFullYear(),
      d.getUTCMonth() + 1,
      d.getUTCDate()
    );
    return jdnToJalali(jdn);
  }

  getMonth(year, month) {
    let days = month <= 6 ? 31 : 30;
    if (month === 12 && !this.isLeapYear(year)) days = 29;

    return {
      year,
      month,
      days,
      firstWeekday: 1
    };
  }

  isLeapYear(year) {
    return (
      jalaliToJdn(year + 1, 1, 1) -
      jalaliToJdn(year, 1, 1)
    ) === 366;
  }
}
