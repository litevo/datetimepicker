// src/calendars/hijri.js

import CalendarEngine from './calendar.interface.js';

/*
 * ---- Hijri (Islamic) Calendar Utilities ----
 * Tabular Islamic Calendar (30-year cycle)
 */

function div(a, b) {
  return Math.floor(a / b);
}

function mod(a, b) {
  return a - Math.floor(a / b) * b;
}

// Gregorian to Julian Day Number
function gregorianToJdn(gy, gm, gd) {
  let d =
    div((gy + div(gm - 8, 6) + 100100) * 1461, 4) +
    div(153 * mod(gm + 9, 12) + 2, 5) +
    gd -
    34840408;
  d -= div(div(gy + 100100 + div(gm - 8, 6), 100) * 3, 4);
  return d;
}

// Julian Day Number to Gregorian
function jdnToGregorian(jdn) {
  let j = 4 * jdn + 139361631;
  j += div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908;
  let i = div(mod(j, 1461), 4) * 5 + 308;
  let gd = div(mod(i, 153), 5) + 1;
  let gm = mod(div(i, 153), 12) + 1;
  let gy = div(j, 1461) - 100100 + div(8 - gm, 6);
  return { gy, gm, gd };
}

// Hijri year leap check (30-year cycle)
function isHijriLeapYear(hy) {
  const cycleYear = mod(hy - 1, 30) + 1;
  return [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29].includes(cycleYear);
}

// Hijri to JDN
function hijriToJdn(hy, hm, hd) {
  return (
    hd +
    Math.ceil(29.5 * (hm - 1)) +
    (hy - 1) * 354 +
    div(3 + 11 * hy, 30) +
    1948440 - 1
  );
}

// JDN to Hijri
function jdnToHijri(jdn) {
  let hy = div(30 * (jdn - 1948440) + 10646, 10631);
  let hm = Math.min(
    12,
    Math.ceil((jdn - hijriToJdn(hy, 1, 1) + 1) / 29.5) + 1
  );
  let hd = jdn - hijriToJdn(hy, hm, 1) + 1;

  return { hy, hm, hd };
}

/*
 * ---- Hijri Calendar Engine ----
 */

export default class HijriCalendar extends CalendarEngine {

  fromTimestamp(timestamp) {
    const d = new Date(timestamp);

    const gy = d.getUTCFullYear();
    const gm = d.getUTCMonth() + 1;
    const gd = d.getUTCDate();

    const jdn = gregorianToJdn(gy, gm, gd);
    const h = jdnToHijri(jdn);

    return {
      year: h.hy,
      month: h.hm,
      day: h.hd
    };
  }

  toTimestamp(date) {
    const jdn = hijriToJdn(date.year, date.month, date.day);
    const g = jdnToGregorian(jdn);

    return Date.UTC(
      g.gy,
      g.gm - 1,
      g.gd,
      0, 0, 0, 0
    );
  }

  getMonthLength(year, month) {
    if (month === 12) {
      return isHijriLeapYear(year) ? 30 : 29;
    }
    return month % 2 === 1 ? 30 : 29;
  }

  isLeapYear(year) {
    return isHijriLeapYear(year);
  }

  getWeekday(date) {
    const ts = this.toTimestamp(date);
    const d = new Date(ts);
    const jsDay = d.getUTCDay(); // 0..6
    return jsDay === 0 ? 7 : jsDay; // ISO weekday
  }

  getMonth(year, month) {
    const days = this.getMonthLength(year, month);
    const firstWeekday = this.getWeekday({
      year,
      month,
      day: 1
    });

    return {
      year,
      month,
      days,
      firstWeekday
    };
  }
}
