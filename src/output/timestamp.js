import OutputAdapter from './output.interface.js';

export default class TimestampOutput extends OutputAdapter {

  format(timestamp) {
    return timestamp;
  }
}
