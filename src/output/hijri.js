import OutputAdapter from './output.interface.js';
import HijriCalendar from '../calendars/hijri.js';

export default class HijriDateOutput extends OutputAdapter {

  constructor() {
    super();
    this.engine = new HijriCalendar();
  }

  format(timestamp) {
    return this.engine.fromTimestamp(timestamp);
  }
}
