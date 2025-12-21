import OutputAdapter from './output.interface.js';
import GregorianCalendar from '../calendars/gregorian.js';

export default class GregorianDateOutput extends OutputAdapter {

  constructor() {
    super();
    this.engine = new GregorianCalendar();
  }

  format(timestamp) {
    return this.engine.fromTimestamp(timestamp);
  }
}
