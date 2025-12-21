import { createOutputAdapter } from '../output/factory.js';

import GregorianCalendar from '../calendars/gregorian.js';
import JalaliCalendar from '../calendars/jalali.js';
import HijriCalendar from '../calendars/hijri.js';

const CALENDAR_ENGINES = {
  gregorian: new GregorianCalendar(),
  jalali: new JalaliCalendar(),
  hijri: new HijriCalendar()
};

export default class DateTimePickerController {

  constructor(options = {}) {
    this.options = options;

    this.state = this._initState(options);
    this.outputAdapter = createOutputAdapter(options.outputFormat || 'timestamp');

    this._syncViewWithCore();
  }

  /* ------------------------------------------------------------------
   * Initialization
   * ------------------------------------------------------------------ */

  _initState(options) {
    const now = Date.now();

    const initialTimestamp =
      typeof options.initialTimestamp === 'number'
        ? options.initialTimestamp
        : now;

    const date = new Date(initialTimestamp);

    return {
      coreTimestamp: initialTimestamp,

      displayCalendar: options.displayCalendar || 'gregorian',

      view: {
        year: null,
        month: null
      },

      time: {
        hour: date.getUTCHours(),
        minute: date.getUTCMinutes()
      }
    };
  }

  _getEngine() {
    return CALENDAR_ENGINES[this.state.displayCalendar];
  }

  _syncViewWithCore() {
    const engine = this._getEngine();
    const calendarDate = engine.fromTimestamp(this.state.coreTimestamp);

    this.state.view.year = calendarDate.year;
    this.state.view.month = calendarDate.month;
  }

  /* ------------------------------------------------------------------
   * Read-only API (for UI)
   * ------------------------------------------------------------------ */

  getState() {
    return JSON.parse(JSON.stringify(this.state));
  }

  getViewMonth() {
    const engine = this._getEngine();
    const { year, month } = this.state.view;

    return engine.getMonth(year, month);
  }

  getSelectedDate() {
    const engine = this._getEngine();
    return engine.fromTimestamp(this.state.coreTimestamp);
  }

  /* ------------------------------------------------------------------
   * Navigation
   * ------------------------------------------------------------------ */

  nextMonth() {
    let { year, month } = this.state.view;

    month += 1;
    if (month > 12) {
      month = 1;
      year += 1;
    }

    this.state.view.year = year;
    this.state.view.month = month;
  }

  prevMonth() {
    let { year, month } = this.state.view;

    month -= 1;
    if (month < 1) {
      month = 12;
      year -= 1;
    }

    this.state.view.year = year;
    this.state.view.month = month;
  }

  /* ------------------------------------------------------------------
   * Selection
   * ------------------------------------------------------------------ */

  selectDay(day) {
    const engine = this._getEngine();

    const { year, month } = this.state.view;

    const dateTimestamp = engine.toTimestamp({
      year,
      month,
      day
    });

    this.state.coreTimestamp = this._applyTime(dateTimestamp);
    this._emitChange();
  }

  /* ------------------------------------------------------------------
   * Time Handling
   * ------------------------------------------------------------------ */

  setTime(hour, minute) {
    this.state.time.hour = hour;
    this.state.time.minute = minute;

    const engine = this._getEngine();
    const date = engine.fromTimestamp(this.state.coreTimestamp);

    const dateTs = engine.toTimestamp(date);
    this.state.coreTimestamp = this._applyTime(dateTs);

    this._emitChange();
  }

  _applyTime(dateTimestamp) {
    const d = new Date(dateTimestamp);

    d.setUTCHours(this.state.time.hour);
    d.setUTCMinutes(this.state.time.minute);
    d.setUTCSeconds(0);
    d.setUTCMilliseconds(0);

    return d.getTime();
  }

  /* ------------------------------------------------------------------
   * Calendar Switching
   * ------------------------------------------------------------------ */

  setDisplayCalendar(type) {
    if (!CALENDAR_ENGINES[type]) {
      throw new Error(`Unsupported calendar: ${type}`);
    }

    this.state.displayCalendar = type;
    this._syncViewWithCore();
  }

  /* ------------------------------------------------------------------
   * Output
   * ------------------------------------------------------------------ */

  _emitChange() {
    if (typeof this.options.onChange === 'function') {
      const value = this.outputAdapter.format(this.state.coreTimestamp);

      this.options.onChange(value, {
        timestamp: this.state.coreTimestamp,
        displayCalendar: this.state.displayCalendar,
        outputFormat: this.options.outputFormat
      });
    }
  }
}
