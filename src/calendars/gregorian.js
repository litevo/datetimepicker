// src/calendars/gregorian.js

import CalendarEngine from './calendar.interface.js';

export default class GregorianCalendar extends CalendarEngine {

  /**
   * Convert UTC timestamp to Gregorian calendar date
   * @param {number} timestamp
   * @returns {{year:number, month:number, day:number}}
   */
  fromTimestamp(timestamp) {
    const d = new Date(timestamp);

    return {
      year: d.getUTCFullYear(),
      month: d.getUTCMonth() + 1, // 1..12
      day: d.getUTCDate()
    };
  }

  /**
   * Convert Gregorian calendar date to UTC timestamp
   * Time is set to 00:00:00.000 UTC
   * @param {{year:number, month:number, day:number}} date
   * @returns {number}
   */
  toTimestamp(date) {
    return Date.UTC(
      date.year,
      date.month - 1, // JS Date month is 0-based
      date.day,
      0, 0, 0, 0
    );
  }

  /**
   * Get number of days in a Gregorian month
   * @param {number} year
   * @param {number} month // 1..12
   * @returns {number}
   */
  getMonthLength(year, month) {
    // Trick: day 0 of next month = last day of this month
    return new Date(Date.UTC(year, month, 0)).getUTCDate();
  }

  /**
   * Determine if Gregorian year is leap
   * @param {number} year
   * @returns {boolean}
   */
  isLeapYear(year) {
    if (year % 4 !== 0) return false;
    if (year % 100 !== 0) return true;
    return year % 400 === 0;
  }

  /**
   * Get ISO weekday for a given Gregorian date
   * ISO: 1 (Mon) .. 7 (Sun)
   * @param {{year:number, month:number, day:number}} date
   * @returns {number}
   */
  getWeekday(date) {
    const ts = this.toTimestamp(date);
    const d = new Date(ts);

    const jsDay = d.getUTCDay(); // 0 (Sun) .. 6 (Sat)

    // Convert JS weekday to ISO
    return jsDay === 0 ? 7 : jsDay;
  }

  /**
   * Get month metadata for rendering
   * @param {number} year
   * @param {number} month // 1..12
   * @returns {{year:number, month:number, days:number, firstWeekday:number}}
   */
  getMonth(year, month) {
    const days = this.getMonthLength(year, month);

    const firstDay = {
      year,
      month,
      day: 1
    };

    const firstWeekday = this.getWeekday(firstDay);

    return {
      year,
      month,
      days,
      firstWeekday
    };
  }
}
