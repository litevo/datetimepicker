/**
 * @typedef {number} Timestamp
 *
 * @typedef {Object} CalendarDate
 * @property {number} year   // full year (e.g. 1403, 2025, 1447)
 * @property {number} month  // 1-12
 * @property {number} day    // 1-31
 *
 * @typedef {Object} CalendarMonth
 * @property {number} year
 * @property {number} month          // 1-12
 * @property {number} days           // month length
 * @property {number} firstWeekday   // ISO: 1 (Mon) .. 7 (Sun)
 */

/**
 * Calendar Engine Interface
 */
export default class CalendarEngine {

  /**
   * Convert UTC timestamp to calendar-specific date
   * @param {Timestamp} timestamp
   * @returns {CalendarDate}
   */
  fromTimestamp(timestamp) {
    throw new Error('Not implemented')
  }

  /**
   * Convert calendar-specific date to UTC timestamp
   * Time part is NOT included here
   * @param {CalendarDate} date
   * @returns {Timestamp}
   */
  toTimestamp(date) {
    throw new Error('Not implemented')
  }

  /**
   * Get number of days in a given month
   * @param {number} year
   * @param {number} month // 1-12
   * @returns {number}
   */
  getMonthLength(year, month) {
    throw new Error('Not implemented')
  }

  /**
   * Determine if year is leap in this calendar
   * @param {number} year
   * @returns {boolean}
   */
  isLeapYear(year) {
    throw new Error('Not implemented')
  }

  /**
   * Get ISO weekday of a given calendar date
   * @param {CalendarDate} date
   * @returns {number} // 1 (Mon) .. 7 (Sun)
   */
  getWeekday(date) {
    throw new Error('Not implemented')
  }

  /**
   * Get month metadata for rendering
   * @param {number} year
   * @param {number} month
   * @returns {CalendarMonth}
   */
  getMonth(year, month) {
    throw new Error('Not implemented')
  }
}
