/**
 * @typedef {number} Timestamp
 */

export default class OutputAdapter {

  /**
   * Convert core timestamp to output format
   * @param {Timestamp} timestamp
   * @returns {*}
   */
  format(timestamp) {
    throw new Error('Not implemented');
  }
}
