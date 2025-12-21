import OutputAdapter from './output.interface.js';
import JalaliCalendar from '../calendars/jalali.js';

export default class JalaliDateOutput extends OutputAdapter {

  constructor() {
    super();
    this.engine = new JalaliCalendar();
  }

  format(timestamp) {
    return this.engine.fromTimestamp(timestamp);
  }
}
